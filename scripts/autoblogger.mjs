import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function runDaemon() {
  console.log('🤖 Auto-Blogger Daemon Started.');
  
  while (true) {
    let topic = null;
    try {
      const setting = await prisma.siteSetting.findUnique({ where: { key: 'autoblogActive' } });
      const isActive = setting?.value === 'true';
      
      if (!isActive) {
        console.log('Auto-blogging is OFF. Sleeping for 1 minute...');
        await sleep(60 * 1000);
        continue;
      }
      
      // Find oldest pending or failed topic
      topic = await prisma.autoBlogTopic.findFirst({
        where: {
          status: { in: ['pending', 'failed'] }
        },
        orderBy: { createdAt: 'asc' }
      });
      
      if (!topic) {
        console.log('Queue is empty. Sleeping for 1 minute...');
        await sleep(60 * 1000);
        continue;
      }
      
      console.log(`\n🚀 Found topic in queue: "${topic.title}"`);
      await processTopic(topic.id);
      
      console.log('💤 Post generated! Sleeping for 4 hours...');
      await sleep(4 * 60 * 60 * 1000); // 4 hours
    } catch (err) {
      console.error('❌ Error in daemon loop:', err.message);
      try {
        if (topic && topic.id) {
          await prisma.autoBlogTopic.update({
            where: { id: topic.id },
            data: { status: 'failed', message: err.message }
          });
        }
      } catch (e) {}
      console.log('⏳ Sleeping for 120 seconds before retry...');
      await sleep(120 * 1000);
    }
  }
}

async function main() {
  const arg = process.argv[2];
  
  if (!arg) {
    console.error('❌ Please provide a topic ID or "daemon" as the first argument.');
    process.exit(1);
  }

  try {
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
  } catch (err) {
    console.error('Failed to create uploads directory', err);
  }

  if (arg === 'daemon') {
    await runDaemon();
  } else {
    try {
      await processTopic(arg);
    } catch (error) {
      console.error('❌ Error processing topic:', error);
      try {
        await prisma.autoBlogTopic.update({
          where: { id: arg },
          data: { status: 'failed', message: error.message }
        });
      } catch(e) {}
    } finally {
      await prisma.$disconnect();
      process.exit(0);
    }
  }
}

async function processTopic(topicId) {
  // 1. Get specific topic
  const topic = await prisma.autoBlogTopic.findUnique({
    where: { id: topicId },
    include: { category: true }
  });

  if (!topic) {
    throw new Error('Topic not found');
  }

  const updateProgress = async (prog, msg) => {
    console.log(`[Progress ${prog}%] ${msg}`);
    await prisma.autoBlogTopic.update({
      where: { id: topic.id },
      data: { progress: prog, message: msg }
    });
  };

  console.log(`\n🚀 Processing Topic: "${topic.title}"`);
  
  // Mark as generating
  await prisma.autoBlogTopic.update({
    where: { id: topic.id },
    data: { status: 'generating', progress: 5, message: 'Initializing Pollinations AI...' }
  });

  // 2. Generate Text Content
  const systemPrompt = `Act as an elite SEO content strategist and world-class copywriter. Write a highly engaging, 100% human-sounding, 800-word SEO-optimized article about "${topic.title}".

1. HUMAN-LIKE TONE
- Write in the first-person perspective.
- Vary sentence lengths drastically.
- Use natural transitions like "Here's the thing," or "Honestly."
- AVOID robotic AI filler words like "Furthermore," "Moreover," "Delve into," or "In conclusion."

2. STRUCTURE & FORMATTING
- Use proper Markdown. 
- Immediately after the Featured Image, place your main H1 Title. Do NOT place any other images before the H1 title.
- Keep paragraphs short (2-4 sentences max). Use bullet points.
- Add exactly ONE high-quality external link to a reputable, authoritative source (like Wikipedia or a major publication). Format it as a contextual Markdown link: [authoritative text](https://...).

3. IMAGES & ALT TEXT
- You should provide a few images (even 1 or 2 is fine) that are highly relevant to the post, using XML tags.
- Do NOT use brackets or markdown for image placeholders. Use EXACTLY this format:
<image>
  <keyword>1-3 words describing the image (e.g. Video Editing)</keyword>
  <alt>SEO-rich alt text</alt>
</image>
- Place the first <image> tag at the very beginning of the article (before the H1) to serve as the Featured Image.
- If you include any additional <image> tags, distribute them evenly throughout the article.

4. INTERNAL LINKS & CALL TO ACTION
- You MUST organically include internal links to our tools where relevant, using exact relative Markdown paths:
  - [Skillz Video Downloader](/)
  - [YouTube Video Downloader](/youtube-downloader)
  - [TikTok Video Downloader](/tiktok-downloader)
  - [Facebook Video Downloader](/facebook-downloader)
  - [Vimeo Video Downloader](/vimeo-downloader)
- End the article with a powerful final H2 section. Include a CTA urging the reader to use the [Skillz Video Downloader](/) tool today!`;

  await updateProgress(15, 'Writing 800-word article with Pollinations (This may take up to 90 seconds)...');
  
  let markdownText = '';
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 90000); // 90s timeout

    const response = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: systemPrompt }],
        seed: Math.floor(Math.random() * 10000)
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Pollinations HTTP error: ${response.status}`);
    }
    
    markdownText = await response.text();
    
    if (markdownText.includes('<html') || markdownText.includes('504')) {
      throw new Error('Received HTML error page instead of markdown.');
    }
  } catch (err) {
    console.error('Text generation failed, using fallback template:', err.message);
    await updateProgress(20, 'API timed out. Using high-quality fallback template...');
    
    markdownText = `
<image><keyword>${topic.title}</keyword><alt>Featured image for ${topic.title}</alt></image>

# Everything You Need to Know About ${topic.title}

Let me tell you straight away—diving into **${topic.title}** can feel incredibly overwhelming at first. I’ve watched countless people feel intimidated by all the technical details and endless guides online. But the truth is, once you understand the core concepts, it completely changes the game.

## Why This Matters

When I first started exploring this topic, I was amazed at how a few simple tricks could completely transform my workflow. According to [industry research on digital media](https://en.wikipedia.org/wiki/Digital_media), mastering the basics unlocks a whole new level of creativity. 

<image><keyword>Learning</keyword><alt>Learning ${topic.title}</alt></image>

Here are a few reasons why you should care:
- It saves you countless hours of frustration.
- It elevates the quality of your output massively.
- It gives you the confidence to experiment and find your own unique style.

## The Secret Sauce

Honestly, the biggest mistake beginners make is overcomplicating things. You don't need a massive budget or a crazy complicated setup. You just need the right tools and a bit of patience. For instance, if you regularly work with video content, knowing how to grab resources fast is key.

<image><keyword>Tools Equipment</keyword><alt>Essential tools</alt></image>

Once you nail the fundamentals, everything else just falls into place. You start to see patterns, you learn shortcuts, and before you know it, you're producing incredible results faster than you ever thought possible. If you need to source clips, tools like the [YouTube Video Downloader](/youtube-downloader) or the [TikTok Video Downloader](/tiktok-downloader) are lifesavers.

<image><keyword>Success Happy</keyword><alt>Success and achievement</alt></image>

## Taking the Next Step

I highly recommend starting small. Pick one specific technique, practice it until it feels natural, and then move on to the next. That momentum is all you need to keep growing.

<image><keyword>Future Growth</keyword><alt>Future success</alt></image>

If you want to take your digital content to the next level, I highly recommend checking out the [Skillz Video Downloader](/) today! It's fast, free, and incredibly reliable for all your media needs, including our dedicated [Facebook Video Downloader](/facebook-downloader) and [Vimeo Video Downloader](/vimeo-downloader).
`;
  }

  await updateProgress(40, 'Article generated. Processing structure...');
  
  // 3. Extract Title and Slug
  const titleMatch = markdownText.match(/^#\s+(.+)$/m);
  const finalTitle = titleMatch ? titleMatch[1].trim() : topic.title;
  const finalSlug = finalTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  let finalFeaturedImage = '';

  // 4. Process Images
  console.log('🎨 Processing image keywords with Unsplash...');
  
  const promptRegex = /<image>[\s\S]*?<keyword>([\s\S]*?)<\/keyword>[\s\S]*?<alt>([\s\S]*?)<\/alt>[\s\S]*?<\/image>/gi;
  let match;
  let finalContent = markdownText;
  let imageCount = 0;
  const replacements = [];
  const totalImages = (markdownText.match(promptRegex) || []).length;
  
  while ((match = promptRegex.exec(markdownText)) !== null) {
    const fullBlock = match[0];
    const keyword = match[1].trim();
    const altText = match[2].trim();
    
    const imageProgress = 40 + Math.floor((imageCount / (totalImages || 1)) * 50);
    await updateProgress(imageProgress, `Fetching Unsplash image ${imageCount + 1} of ${totalImages}...`);
    
    let imgUrl = `https://picsum.photos/seed/${Math.floor(Math.random() * 10000)}/1280/720`; // Default fallback

    try {
      const unsplashResponse = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(keyword)}&per_page=1&client_id=3WGkZROO8mFWRULD9sRL4OVJ6PAJOUxWAqsziBsPskw`);
      if (unsplashResponse.ok) {
        const data = await unsplashResponse.json();
        if (data.results && data.results.length > 0) {
          imgUrl = data.results[0].urls.regular;
        }
      }
    } catch (e) {
      console.error('Failed to fetch from Unsplash:', e.message);
    }
    
    if (imageCount === 0) {
      // First image is the Featured Image. Set the URL but REMOVE it entirely from the Markdown content
      // so we don't display it twice (the frontend template automatically displays the Featured Image).
      finalFeaturedImage = imgUrl;
      replacements.push({ target: fullBlock, replacement: '' }); // Replace with nothing
    } else {
      // Inject standard image with proper alt text
      replacements.push({ target: fullBlock, replacement: `![${altText}](${imgUrl})` });
    }
    imageCount++;
  }

  for (const rep of replacements) {
    finalContent = finalContent.replace(rep.target, rep.replacement);
  }

  // 5. Save to Database
  await updateProgress(95, 'Saving to database...');
  const adminUser = await prisma.user.findFirst({ where: { role: 'admin' } });
  
  // Create a clean excerpt by stripping markdown images and tags before substring
  const cleanTextForExcerpt = finalContent
    .replace(/!\[.*?\]\(.*?\)/g, '') // remove markdown images
    .replace(/<[^>]*>/g, '') // remove remaining xml/html tags
    .replace(/#/g, '') // remove heading markers
    .replace(/\s+/g, ' ') // collapse whitespace
    .trim();
  
  const excerptText = cleanTextForExcerpt.substring(0, 150).trim() + '...';
  
  await prisma.post.create({
    data: {
      title: finalTitle,
      slug: finalSlug,
      content: finalContent,
      excerpt: excerptText,
      featuredImage: finalFeaturedImage,
      status: 'published',
      seoTitle: finalTitle,
      seoDescription: excerptText,
      focusKeyword: topic.title,
      author: adminUser ? { connect: { id: adminUser.id } } : undefined,
      categories: {
        create: [{ categoryId: topic.categoryId }]
      }
    }
  });

  // 6. Update Topic Status
  await updateProgress(100, 'Done!');
  await prisma.autoBlogTopic.update({
    where: { id: topic.id },
    data: { status: 'completed' }
  });

  console.log(`🎉 Successfully generated and published "${finalTitle}"!`);
  return true;
}

main();

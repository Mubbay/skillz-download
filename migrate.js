const Database = require('better-sqlite3');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');

async function migrate() {
  console.log('Starting migration from SQLite to Neon Postgres...');
  
  // Connect to local SQLite DB
  const dbPath = path.join(__dirname, 'prisma', 'dev.db');
  const sqlite = new Database(dbPath, { readonly: true });
  
  try {
    // 1. Get the Neon Admin user
    const neonAdmin = await prisma.user.findFirst();
    if (!neonAdmin) {
      console.log('No admin user found in Neon DB! Run seed first.');
      return;
    }
    
    console.log('Migrating Categories...');
    const categories = sqlite.prepare('SELECT * FROM Category').all().map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      createdAt: new Date(cat.createdAt)
    }));
    await prisma.category.createMany({ data: categories, skipDuplicates: true });

    console.log('Migrating Tags...');
    const tags = sqlite.prepare('SELECT * FROM Tag').all().map(tag => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      createdAt: new Date(tag.createdAt)
    }));
    await prisma.tag.createMany({ data: tags, skipDuplicates: true });

    console.log('Migrating AutoBlogTopics...');
    const autoTopics = sqlite.prepare('SELECT * FROM AutoBlogTopic').all().map(topic => ({
      id: topic.id,
      title: topic.title,
      categoryId: topic.categoryId,
      status: topic.status,
      progress: topic.progress,
      message: topic.message,
      createdAt: new Date(topic.createdAt),
      updatedAt: new Date(topic.updatedAt)
    }));
    // Filter topics to ensure their categories exist in Neon
    const existingCatIds = (await prisma.category.findMany({ select: { id: true } })).map(c => c.id);
    const validTopics = autoTopics.filter(t => existingCatIds.includes(t.categoryId));
    await prisma.autoBlogTopic.createMany({ data: validTopics, skipDuplicates: true });

    console.log('Migrating Posts...');
    const posts = sqlite.prepare('SELECT * FROM Post').all().map(post => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt,
      featuredImage: post.featuredImage,
      status: post.status,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      focusKeyword: post.focusKeyword,
      seoScore: post.seoScore,
      readingTime: post.readingTime,
      authorId: neonAdmin.id, // assign to the one true admin
      createdAt: new Date(post.createdAt),
      updatedAt: new Date(post.updatedAt),
      views: post.views
    }));
    await prisma.post.createMany({ data: posts, skipDuplicates: true });

    console.log('Migrating PostCategories...');
    const postCategories = sqlite.prepare('SELECT * FROM PostCategory').all();
    const existingPostIds = (await prisma.post.findMany({ select: { id: true } })).map(p => p.id);
    const validPostCategories = postCategories.filter(pc => existingPostIds.includes(pc.postId) && existingCatIds.includes(pc.categoryId));
    await prisma.postCategory.createMany({ data: validPostCategories, skipDuplicates: true });

    console.log('Migrating PostTags...');
    const postTags = sqlite.prepare('SELECT * FROM PostTag').all();
    const existingTagIds = (await prisma.tag.findMany({ select: { id: true } })).map(t => t.id);
    const validPostTags = postTags.filter(pt => existingPostIds.includes(pt.postId) && existingTagIds.includes(pt.tagId));
    await prisma.postTag.createMany({ data: validPostTags, skipDuplicates: true });

    console.log('Migrating Media...');
    try {
      const media = sqlite.prepare('SELECT * FROM Media').all().map(m => ({
        id: m.id,
        filename: m.filename,
        url: m.url,
        mimetype: m.mimetype,
        size: m.size,
        alt: m.alt,
        createdAt: new Date(m.createdAt)
      }));
      await prisma.media.createMany({ data: media, skipDuplicates: true });
    } catch (e) {
      console.log('No media to migrate or error:', e.message);
    }
    
    console.log('Migration Complete!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    sqlite.close();
    await prisma.$disconnect();
  }
}

migrate();

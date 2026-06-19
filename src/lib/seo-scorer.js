/**
 * RankMath-style SEO Score Calculator
 * Analyzes content and returns a score from 0 to 100
 */

export function calculateSeoScore(data) {
  const {
    title = '',
    slug = '',
    content = '',
    seoTitle = '',
    seoDescription = '',
    focusKeyword = '',
  } = data;

  if (!focusKeyword.trim()) {
    return { score: 0, checks: [], message: 'Enter a focus keyword to calculate SEO score' };
  }

  const keyword = focusKeyword.toLowerCase().trim();
  const checks = [];
  let totalPoints = 0;
  let maxPoints = 0;

  // 1. Focus keyword in SEO Title (10 points)
  maxPoints += 10;
  const titleToCheck = (seoTitle || title).toLowerCase();
  if (titleToCheck.includes(keyword)) {
    totalPoints += 10;
    checks.push({ name: 'Focus keyword in SEO title', passed: true, points: 10, maxPoints: 10 });
  } else {
    checks.push({ name: 'Focus keyword in SEO title', passed: false, points: 0, maxPoints: 10, tip: 'Add your focus keyword to the SEO title.' });
  }

  // 2. Focus keyword in Meta Description (10 points)
  maxPoints += 10;
  if (seoDescription.toLowerCase().includes(keyword)) {
    totalPoints += 10;
    checks.push({ name: 'Focus keyword in meta description', passed: true, points: 10, maxPoints: 10 });
  } else {
    checks.push({ name: 'Focus keyword in meta description', passed: false, points: 0, maxPoints: 10, tip: 'Include your focus keyword in the meta description.' });
  }

  // 3. Focus keyword in URL/slug (10 points)
  maxPoints += 10;
  if (slug.toLowerCase().includes(keyword.replace(/\s+/g, '-'))) {
    totalPoints += 10;
    checks.push({ name: 'Focus keyword in URL slug', passed: true, points: 10, maxPoints: 10 });
  } else {
    checks.push({ name: 'Focus keyword in URL slug', passed: false, points: 0, maxPoints: 10, tip: 'Include your focus keyword in the URL slug.' });
  }

  // 4. Focus keyword in first 10% of content (10 points)
  maxPoints += 10;
  const contentLower = content.toLowerCase();
  const first10Percent = contentLower.substring(0, Math.max(100, contentLower.length * 0.1));
  if (first10Percent.includes(keyword)) {
    totalPoints += 10;
    checks.push({ name: 'Focus keyword in introduction', passed: true, points: 10, maxPoints: 10 });
  } else {
    checks.push({ name: 'Focus keyword in introduction', passed: false, points: 0, maxPoints: 10, tip: 'Use the focus keyword in the first paragraph of your content.' });
  }

  // 5. Content length (15 points)
  maxPoints += 15;
  const wordCount = content.trim().split(/\s+/).filter(w => w.length > 0).length;
  if (wordCount >= 1000) {
    totalPoints += 15;
    checks.push({ name: `Content length (${wordCount} words)`, passed: true, points: 15, maxPoints: 15 });
  } else if (wordCount >= 600) {
    totalPoints += 8;
    checks.push({ name: `Content length (${wordCount} words)`, passed: false, points: 8, maxPoints: 15, tip: `Content has ${wordCount} words. Aim for at least 1000 words.` });
  } else if (wordCount >= 300) {
    totalPoints += 4;
    checks.push({ name: `Content length (${wordCount} words)`, passed: false, points: 4, maxPoints: 15, tip: `Content has ${wordCount} words. Aim for at least 600+ words for better rankings.` });
  } else {
    checks.push({ name: `Content length (${wordCount} words)`, passed: false, points: 0, maxPoints: 15, tip: `Content is too short (${wordCount} words). Write at least 300 words.` });
  }

  // 6. SEO Title length (10 points)
  maxPoints += 10;
  const seoTitleLen = (seoTitle || title).length;
  if (seoTitleLen >= 30 && seoTitleLen <= 60) {
    totalPoints += 10;
    checks.push({ name: `SEO title length (${seoTitleLen} chars)`, passed: true, points: 10, maxPoints: 10 });
  } else if (seoTitleLen > 0) {
    totalPoints += 4;
    checks.push({ name: `SEO title length (${seoTitleLen} chars)`, passed: false, points: 4, maxPoints: 10, tip: 'SEO title should be between 30–60 characters.' });
  } else {
    checks.push({ name: 'SEO title length', passed: false, points: 0, maxPoints: 10, tip: 'Add an SEO title (30–60 characters recommended).' });
  }

  // 7. Meta Description length (10 points)
  maxPoints += 10;
  const descLen = seoDescription.length;
  if (descLen >= 120 && descLen <= 160) {
    totalPoints += 10;
    checks.push({ name: `Meta description length (${descLen} chars)`, passed: true, points: 10, maxPoints: 10 });
  } else if (descLen > 0) {
    totalPoints += 4;
    checks.push({ name: `Meta description length (${descLen} chars)`, passed: false, points: 4, maxPoints: 10, tip: 'Meta description should be 120–160 characters.' });
  } else {
    checks.push({ name: 'Meta description length', passed: false, points: 0, maxPoints: 10, tip: 'Add a meta description (120–160 characters recommended).' });
  }

  // 8. Keyword density (10 points)
  maxPoints += 10;
  if (wordCount > 0) {
    const keywordCount = (contentLower.match(new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
    const density = (keywordCount / wordCount) * 100;
    if (density >= 0.5 && density <= 2.5) {
      totalPoints += 10;
      checks.push({ name: `Keyword density (${density.toFixed(1)}%)`, passed: true, points: 10, maxPoints: 10 });
    } else if (density > 0) {
      totalPoints += 4;
      checks.push({ name: `Keyword density (${density.toFixed(1)}%)`, passed: false, points: 4, maxPoints: 10, tip: 'Keyword density should be between 0.5%–2.5%.' });
    } else {
      checks.push({ name: 'Keyword density (0%)', passed: false, points: 0, maxPoints: 10, tip: 'Use your focus keyword throughout the content.' });
    }
  }

  // 9. Headings contain keyword (5 points)
  maxPoints += 5;
  const headingRegex = /<h[2-6][^>]*>(.*?)<\/h[2-6]>/gi;
  const headings = content.match(headingRegex) || [];
  const headingWithKeyword = headings.some(h => h.toLowerCase().includes(keyword));
  if (headingWithKeyword) {
    totalPoints += 5;
    checks.push({ name: 'Focus keyword in subheadings', passed: true, points: 5, maxPoints: 5 });
  } else {
    checks.push({ name: 'Focus keyword in subheadings', passed: false, points: 0, maxPoints: 5, tip: 'Use the focus keyword in at least one H2 or H3 subheading.' });
  }

  // 10. Has internal/external links (10 points)
  maxPoints += 10;
  const linkRegex = /<a\s[^>]*href/gi;
  const links = content.match(linkRegex) || [];
  if (links.length >= 2) {
    totalPoints += 10;
    checks.push({ name: `Links found (${links.length})`, passed: true, points: 10, maxPoints: 10 });
  } else if (links.length >= 1) {
    totalPoints += 5;
    checks.push({ name: `Links found (${links.length})`, passed: false, points: 5, maxPoints: 10, tip: 'Add at least 2 internal or external links.' });
  } else {
    checks.push({ name: 'No links found', passed: false, points: 0, maxPoints: 10, tip: 'Add internal and external links to improve SEO.' });
  }

  // Calculate final score
  const score = maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0;

  return {
    score,
    checks,
    wordCount,
    readingTime: Math.ceil(wordCount / 200),
    message: score >= 80 ? 'Great SEO!' : score >= 50 ? 'Good, but can improve' : 'Needs improvement',
  };
}

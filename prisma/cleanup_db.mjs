import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

const prisma = new PrismaClient();

const categories = [
  'Download Guides',
  'Video SEO',
  'Content Strategies',
  'Tech Fixes',
  'Video Editing'
];

async function main() {
  console.log('Starting database cleanup...');

  // 1. Delete all relational data and core data
  await prisma.postCategory.deleteMany({});
  await prisma.postTag.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.tag.deleteMany({});

  console.log('Successfully deleted all posts, tags, and categories.');

  // 2. Create the exact 5 specific categories
  console.log('Seeding the 5 core categories...');
  for (const cat of categories) {
    await prisma.category.create({
      data: {
        name: cat,
        slug: slugify(cat, { lower: true, strict: true })
      }
    });
  }

  console.log('Successfully seeded 5 categories.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

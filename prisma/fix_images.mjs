import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.post.findMany();
  for (const post of posts) {
    if (post.featuredImage && post.featuredImage.includes('unsplash.com')) {
      // Generate a nice placehold.co image with a dark background and white text containing the post category or 'News'
      const newImage = `https://placehold.co/800x600/151b2d/ffffff?text=News`;
      await prisma.post.update({
        where: { id: post.id },
        data: { featuredImage: newImage }
      });
    }
  }
  console.log('Fixed post images in database!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

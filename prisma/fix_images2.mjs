import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.post.findMany();
  for (const post of posts) {
    if (post.featuredImage && (post.featuredImage.includes('unsplash.com') || post.featuredImage.includes('placehold.co'))) {
      await prisma.post.update({
        where: { id: post.id },
        data: { featuredImage: '/img/placeholder.svg' }
      });
    }
  }
  console.log('Fixed post images to use local SVG!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

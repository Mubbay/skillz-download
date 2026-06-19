import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const testImages = [
  '/img/blog_image_1.png',
  '/img/blog_image_2.png',
  '/img/blog_image_3.png'
];

async function main() {
  const posts = await prisma.post.findMany();
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const newImage = testImages[i % testImages.length];
    await prisma.post.update({
      where: { id: post.id },
      data: { featuredImage: newImage }
    });
  }
  console.log('Assigned real test images to all posts!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

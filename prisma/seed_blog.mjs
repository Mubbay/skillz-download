import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleImages = [
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
  'https://images.unsplash.com/photo-1523961131990-5ea7c6145d84?w=800&q=80'
];

const sampleTitles = [
  "Bulvinar Neque Laoreet Suspendisse Interdum",
  "Augue Neque Gravida Fermentum Sollicitudin",
  "Convallis Posuere Morbi Leo Orna Molestie",
  "Turpis Egestas Sed Tempus Urna Pharetra",
  "Congue Quisque Egestas Diam Arcu Euismod",
  "Ornare Arcu Duivivamus Arcu Felis Bibendum",
  "Scelerisque Varius Morbi Enim Nunc Faucibus",
  "Accumsan Tortor Posuere Aout Consequat Semper",
  "Pellentesque Eliteget Bravida Cumsociis Natoque",
  "Minulla Posuere Sollicitudin Aliquam Ultrices Sagittis"
];

const categoriesData = [
  { name: 'Politics', slug: 'politics' },
  { name: 'Technology', slug: 'technology' },
  { name: 'Travel', slug: 'travel' },
  { name: 'Economy', slug: 'economy' },
  { name: 'Science', slug: 'science' },
];

async function main() {
  console.log('Seeding dummy posts...');

  // 1. Get or create admin user
  let admin = await prisma.user.findFirst({ where: { role: 'admin' } });
  if (!admin) {
    admin = await prisma.user.create({
      data: {
        email: 'admin2@skillzdownload.com',
        password: 'dummy',
        name: 'Editor',
        role: 'admin'
      }
    });
  }

  // 2. Create categories
  const categoryIds = [];
  for (const cat of categoriesData) {
    let category = await prisma.category.findUnique({ where: { slug: cat.slug } });
    if (!category) {
      category = await prisma.category.create({ data: cat });
    }
    categoryIds.push(category.id);
  }

  // 3. Create 20 posts
  for (let i = 1; i <= 20; i++) {
    const title = sampleTitles[i % sampleTitles.length] + ` - Part ${i}`;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    const existing = await prisma.post.findUnique({ where: { slug } });
    if (existing) continue;

    const randomCatId = categoryIds[i % categoryIds.length];
    const randomImage = sampleImages[i % sampleImages.length];

    await prisma.post.create({
      data: {
        title: title,
        slug: slug,
        content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas dui id ornare arcu odio ut sem. Cras tincidunt lobortis feugiat vivamus at augue eget arcu.</p><p>Pellentesque id nibh tortor id aliquet lectus. Vitae aliquet nec ullamcorper sit amet risus. Turpis in eu mi bibendum neque egestas. Non diam phasellus vestibulum lorem sed risus ultricies tristique nulla.</p>`,
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas dui id ornare.",
        featuredImage: randomImage,
        status: 'published',
        authorId: admin.id,
        seoTitle: title,
        seoDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        readingTime: Math.floor(Math.random() * 5) + 3,
        categories: {
          create: [{ categoryId: randomCatId }]
        }
      }
    });
  }

  console.log('Dummy posts created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@123456', 12);
  
  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@skillzdownload.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@skillzdownload.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create default categories
  const categories = ['Tutorials', 'Tips & Tricks', 'News', 'How-To Guides', 'Uncategorized'];
  for (const name of categories) {
    await prisma.category.upsert({
      where: { slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') },
      update: {},
      create: {
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        description: `Posts about ${name.toLowerCase()}`,
      },
    });
  }
  console.log('✅ Default categories created');

  // Create default tags
  const tags = ['youtube', 'tiktok', 'facebook', 'vimeo', 'video-download', 'tutorial', 'free', 'online'];
  for (const name of tags) {
    await prisma.tag.upsert({
      where: { slug: name },
      update: {},
      create: {
        name: name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' '),
        slug: name,
      },
    });
  }
  console.log('✅ Default tags created');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

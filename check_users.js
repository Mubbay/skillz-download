const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  try {
    const users = await p.user.findMany();
    console.log('Users found:', users.length);
    users.forEach(u => {
      console.log(`  - ${u.email} (${u.name}) role=${u.role}`);
    });
  } catch (e) {
    console.error('DB Error:', e.message);
  } finally {
    await p.$disconnect();
  }
}

main();

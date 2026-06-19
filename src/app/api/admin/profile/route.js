import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { verifyAuth } from '@/lib/auth';

export async function POST(request) {
  const session = await verifyAuth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name, email, password } = await request.json();

    const dataToUpdate = {};
    if (name) dataToUpdate.name = name;
    if (email) dataToUpdate.email = email;
    if (password) {
      dataToUpdate.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.userId },
      data: dataToUpdate
    });

    // Update the session cookie with the new data
    const newSessionPayload = {
      userId: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      role: updatedUser.role,
    };
    
    // We need to import setSessionCookie at the top of the file if it's not already there.
    // Wait, let's just do it directly. No, I need to ensure it's imported.
    const { setSessionCookie } = await import('@/lib/auth');
    await setSessionCookie(newSessionPayload);

    return NextResponse.json({ success: true, user: { name: updatedUser.name, email: updatedUser.email } });
  } catch (error) {
    console.error('Profile Update Error:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}

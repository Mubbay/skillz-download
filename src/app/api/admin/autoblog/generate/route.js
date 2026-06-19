import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(request) {
  try {
    const { topicId } = await request.json();

    if (!topicId) {
      return NextResponse.json({ error: 'topicId is required' }, { status: 400 });
    }

    const scriptPath = path.join(process.cwd(), 'scripts', 'autoblogger.mjs');
    
    // Spawn the node process in the background
    const child = spawn('node', [scriptPath, topicId], {
      detached: true,
      stdio: 'ignore' // Ignore stdio to allow detached execution
    });

    // Unref allows the parent process to exit independently of the child
    child.unref();

    return NextResponse.json({ success: true, message: 'Generation started in background' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

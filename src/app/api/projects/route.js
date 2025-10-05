import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public', 'projects.json');

export async function GET() {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (err) {
    return NextResponse.json({ error: 'Failed to read projects.json' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const data = await fs.readFile(filePath, 'utf-8');
    const projects = JSON.parse(data);
    projects.push(body);
    await fs.writeFile(filePath, JSON.stringify(projects, null, 2));
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to add project' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { index } = await request.json();
    const data = await fs.readFile(filePath, 'utf-8');
    const projects = JSON.parse(data);
    projects.splice(index, 1);
    await fs.writeFile(filePath, JSON.stringify(projects, null, 2));
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}

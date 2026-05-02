import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'lib', 'data');

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');

  if (!file) {
    return NextResponse.json({ error: 'File parameter is required' }, { status: 400 });
  }

  try {
    const filePath = path.join(DATA_DIR, `${file}.json`);
    const content = await fs.readFile(filePath, 'utf-8');
    return NextResponse.json(JSON.parse(content));
  } catch (error) {
    console.error(`Error reading file ${file}:`, error);
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');
  const data = await request.json();

  if (!file) {
    return NextResponse.json({ error: 'File parameter is required' }, { status: 400 });
  }

  try {
    const filePath = path.join(DATA_DIR, `${file}.json`);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error writing file ${file}:`, error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}

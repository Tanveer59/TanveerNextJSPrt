import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path to the visitor count file
const visitorCountPath = path.join(process.cwd(), 'public', 'visitor.json');

// Ensure the directory exists
const ensureDirectoryExists = (filePath) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Initialize or read visitor data
const getVisitorData = () => {
  try {
    if (fs.existsSync(visitorCountPath)) {
      const fileContent = fs.readFileSync(visitorCountPath, 'utf8');
      return JSON.parse(fileContent);
    }
  } catch (err) {
    console.error('Error reading visitor file:', err);
  }
  return { count: 0 };
};

// Update visitor data
const updateVisitorData = (data) => {
  try {
    fs.writeFileSync(visitorCountPath, JSON.stringify(data, null, 2));
    return true;
  } catch (err) {
    console.error('Error writing visitor file:', err);
    return false;
  }
};

export async function GET() {
  try {
    // Ensure the directory exists
    ensureDirectoryExists(visitorCountPath);

    // Get current visitor data
    const visitorData = getVisitorData();
    
    // Increment the count
    visitorData.count += 1;
    
    // Update the file
    const success = updateVisitorData(visitorData);
    
    if (!success) {
      throw new Error('Failed to update visitor count');
    }

    return NextResponse.json(
      { count: visitorData.count },
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
        }
      }
    );
  } catch (error) {
    console.error('Visitor counter error:', error);
    return NextResponse.json(
      { count: 0 },
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
        }
      }
    );
  }
}

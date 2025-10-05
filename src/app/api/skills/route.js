import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // In a real application, this data would come from a database
    const skills = [
      { name: 'HTML', level: 95, color: 'rgba(234, 88, 12, 1)' },
      { name: 'CSS', level: 90, color: 'rgba(59, 130, 246, 1)' },
      { name: 'React', level: 70, color: 'rgba(59, 130, 246, 1)' },
      { name: 'Next.js', level: 75, color: 'rgba(0, 0, 0, 1)' },
      { name: 'Node.js', level: 60, color: 'rgba(22, 163, 74, 1)' },
      { name: 'TypeScript', level: 20, color: 'rgba(37, 99, 235, 1)' },
      { name: 'JavaScript', level: 85, color: 'rgba(234, 179, 8, 1)' },
      { name: 'Tailwind CSS', level: 100, color: 'rgba(6, 182, 212, 1)' },
      { name: 'MongoDB', level: 20, color: 'rgba(34, 197, 94, 1)' },
      { name: 'Express', level: 55, color: 'rgba(31, 41, 55, 1)' },
      { name: 'Git', level: 55, color: 'rgba(234, 88, 12, 1)' },
      { name: 'Figma', level: 70, color: 'rgba(168, 85, 247, 1)' },
      { name: 'PHP', level: 60, color: 'rgba(136, 146, 190, 1)' },
      { name: 'WordPress', level: 100, color: 'rgba(33, 117, 155, 1)' },
      { name: 'Shopify', level: 90, color: 'rgba(79, 91, 147, 1)' }
    ];

    // Validate skills data
    if (!Array.isArray(skills)) {
      throw new Error('Invalid skills data format');
    }

    // Ensure each skill has required properties
    const validSkills = skills.every(skill => 
      skill.name && 
      typeof skill.level === 'number' && 
      skill.color
    );

    if (!validSkills) {
      throw new Error('Invalid skill data structure');
    }

    return NextResponse.json(
      { skills },
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600'
        }
      }
    );
  } catch (error) {
    console.error('Skills API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch skills data',
        message: error.message
      },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
} 
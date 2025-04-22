import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authoptions from '@/app/auth/Authoptions';
import { IssueTracker } from '@/app/Validationschema';
import { prisma } from '@/prisma/client';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authoptions);
    if (!session)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const validation = IssueTracker.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    const newIssue = await prisma.issue.create({
      data: { title: body.title, description: body.description },
    });

    return NextResponse.json(newIssue, { status: 201 });
  } catch (error) {
    console.error('Failed to create issue:', error);
    return NextResponse.json(
      { error: 'An error occurred while creating the issue' },
      { status: 500 }
    );
  }
}
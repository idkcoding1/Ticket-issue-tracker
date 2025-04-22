import { IssueTracker } from "@/app/Validationschema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from 'next-auth';
import authoptions from '@/app/auth/Authoptions';

export type paramsType = Promise<{ id: string }>;

export async function PATCH(request: NextRequest, props: { params: paramsType }) {
  try {
    const session = await getServerSession(authoptions);
    if (!session)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const Validation = IssueTracker.safeParse(body);
    
    if (!Validation.success)
      return NextResponse.json(Validation.error.format(), { status: 400 });

    const { id } = await props.params;
    const issueid = Number(id);

    const issue = await prisma.issue.findUnique({
      where: { id: issueid },
    });

    if (!issue)
      return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });
   
    const updatedissue = await prisma.issue.update({
      where: { id: issue.id },
      data: {
        title: body.title,
        description: body.description
      }
    });
    return NextResponse.json(updatedissue);
  } catch (error) {
    console.error('Failed to update issue:', error);
    return NextResponse.json(
      { error: 'An error occurred while updating the issue' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, props: { params: paramsType }) {
  try {
    const session = await getServerSession(authoptions);
    if (!session)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const issue = await prisma.issue.findUnique({
      where: { id: parseInt((await props.params).id) }
    });
    
    if (!issue)
      return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });
      
    await prisma.issue.delete({
      where: { id: issue.id } 
    });

    return NextResponse.json({});
  } catch (error) {
    console.error('Failed to delete issue:', error);
    return NextResponse.json(
      { error: 'An error occurred while deleting the issue' },
      { status: 500 }
    );
  }
}
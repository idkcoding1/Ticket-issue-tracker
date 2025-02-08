import { IssueTracker } from "@/app/Validationschema";
import { prisma } from "@/prisma/client";
import { Param } from "@prisma/client/runtime/library";
import { error } from "console";
import delay from "delay";
import { NextRequest, NextResponse } from "next/server";



export type paramsType = Promise<{ id: string }>;

export async function PATCH(request: NextRequest,props:{ params:paramsType}){
   const body = await request.json();
   const Validation= IssueTracker.safeParse(body);
    
   if(!Validation.success)
    return NextResponse.json(Validation.error.format(),{status:400});

    const { id } = await props.params;
    const issueid = Number(id);

    const issue = await prisma.issue.findUnique({
    where: {id :issueid },
   });

   if(!issue)
    return NextResponse.json({error:'invalid user'},{status:404});

   
    const updatedissue = await prisma.issue.update({
    where: {id: issue.id},
    data:{
        title:body.title,
        description:body.description
    }
   });
   return NextResponse.json(updatedissue);

}

export async function DELETE(request: NextRequest,props:{ params:paramsType}){
    
    const issue= await prisma.issue.findUnique({
        where: {id:parseInt((await props.params).id)}
    });
    if(!issue)
        return NextResponse.json({error:'invalid issue'},{status:404})
    await prisma.issue.delete({
        where: {id: issue.id} 
    });

    return NextResponse.json({});
}
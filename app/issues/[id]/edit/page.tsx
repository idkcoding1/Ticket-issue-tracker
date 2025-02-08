import React from "react";
import Issueform from "../../_components/Issueform";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";

export type paramsType = Promise<{ id: string }>;

const EditIssuePage = async (props:{ params:paramsType}) => {
  const { id } = await props.params;
  const issueid = Number(id);

  if (isNaN(issueid)) {
    notFound(); // Handle invalid ID early
  }
  const issue = await prisma.issue.findUnique({
    where: {id :issueid },
   });
  if (!issue) {
    notFound();
  }

  return <Issueform issue={issue} />;
};

export default EditIssuePage;

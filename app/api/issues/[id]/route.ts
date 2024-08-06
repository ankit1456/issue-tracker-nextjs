import { updateIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await request.json();

  const validation = updateIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const issue = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!issue)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });

  const { title, description } = body;

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
    },
  });

  return NextResponse.json(updatedIssue);
}

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!issue)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });

  await prisma.issue.delete({ where: { id: params.id } });

  return NextResponse.json({});
};

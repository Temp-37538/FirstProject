import "server-only";
import prisma from "../../../packages/db/src";
import { auth } from "@FirstProject/auth";
import { headers } from "next/headers";

export async function getMyImages(session: string) {
  const image = await prisma.images.findMany({
    orderBy: {
      id: "desc",
    },
    where: {
      authorId: session,
    },
  });

  if (!image) throw new Error("Image not found");

  return image;
}

export async function getImage(id: number) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    const image = await prisma.images.findFirst({
      where: {
        id,
        authorId: session?.user.id,
      },
    });

    if (!image) throw new Error("Image not found");

    return image;
  } else {
    throw new Error("Image not found");
  }
}

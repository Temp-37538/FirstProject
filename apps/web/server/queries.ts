import "server-only";
import prisma from "../../../packages/db/src";
import { authClient } from "@/lib/auth-client";
import { auth } from "@FirstProject/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { serverAnalytics } from "./analytics";

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

  if (!session) {
    throw new Error("Not logged-in");
  }

  if (session) {
    const image = await prisma.images.findFirst({
      where: {
        id,
        authorId: session?.user.id,
      },
    });

    if (!image) throw new Error("Image not found");

    if (image.authorId !== session.user.id) throw new Error("Unauthorized");

    return image;
  }
}

export async function deleteImage(id: number) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Not logged-in");

  await prisma.images.delete({
    where: {
      id,
      authorId: session?.user.id,
    },
  });

  serverAnalytics.capture({
    distinctId: session.user.id,
    event: "delete image",
    properties: {
      id,
    },
  });

  // revalidatePath("/")
  redirect("/");
}

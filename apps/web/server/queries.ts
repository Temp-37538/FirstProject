import "server-only";
import prisma from "../../../packages/db/src";
import { authClient } from "@/lib/auth-client";

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
  const { data: session } = authClient.useSession();

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

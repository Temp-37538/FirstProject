import "server-only";
import prisma from "../../../packages/db/src";

export async function getMyImages(session: string) {
  const test = await prisma.images.findMany({
    orderBy: {
      id: "desc",
    },
    where: {
      authorId: session,
    },
  });

  return test;
}

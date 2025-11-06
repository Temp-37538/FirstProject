import { Button } from "@/components/ui/button";
import { auth } from "@FirstProject/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import prisma from "../../../../packages/db/src";
export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return (
      <div className="container mx-auto w-full px-4 py-2">
        <div className="flex flex-wrap justify-center gap-4 w-full">
          <h1 className="text-center">
            You need to{" "}
            <Link href={"/login"}>
              <Button className="cursor-pointer" variant={"ghost"}>
                Log-in,
              </Button>{" "}
            </Link>{" "}
            you can't access your pictures !
          </h1>
        </div>
      </div>
    );
  }

  const test = await prisma.images.findMany({
    orderBy: {
      id: "desc",
    },
    where: {
      authorId: session.user.id,
    },
  });

  return (
    <div  className="h-full flex flex-col gap-4">
      <h1 className="text-center text-2xl font-bold">
        Here are your pictures : 
      </h1>
      <div className="flex flex-wrap justify-between gap-4 w-full">
        <div className="container mx-auto w-[70%] px-4 py-2">
          {test.map((image) => {
            return (
              <div
                key={image.id}
                className="flex flex-col w-48 items-center gap-2"
              >
                <img src={image.url} alt="An image" />
                <p>{image.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

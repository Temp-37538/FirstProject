import { Button } from "@/components/ui/button";
import { auth } from "@FirstProject/auth";
import { headers } from "next/headers";
import { getMyImages } from "../../server/queries";
import Image from "next/image";
import Link from "next/link";
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

  const images = await getMyImages(session.user.id);

  return (
    <div className="h-full flex flex-col gap-4">
      <h1 className="text-center text-2xl font-bold">
        Here are your pictures :
      </h1>
      <div className="container mx-auto w-[80%] px-4 py-2">
        <div className="flex flex-wrap justify-start gap-6 w-full">
          {images?.map((image) => {
            return (
              <div
                key={image.id}
                className="flex flex-col w-48 items-center gap-2"
              >
                <Link href={`/photos/[${image.id}]`}>
                  <Image
                    src={image.url}
                    width={480}
                    height={480}
                    style={{ objectFit: "contain" }}
                    alt={image.name}
                  />
                </Link>
                <p>{image.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

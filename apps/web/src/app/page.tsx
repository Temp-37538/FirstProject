import prisma from "../../../../packages/db/src/index";

export const dynamic = "force-dynamic";

export default async function Home() {
  const test = await prisma.images.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return (
    <div className="container mx-auto w-full px-4 py-2">
      <div className="flex flex-wrap justify-between gap-4 w-full">
        {[...test, ...test].map((image, index) => {
          return (
            <div
              key={image.id + "-" + index}
              className="flex flex-col w-48 items-center gap-2"
            >
              <img src={image.url} alt="An image" />
              <p>{image.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import Image from "next/image";
import { getImage } from "../../../../../server/queries";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const image = await getImage(Number((await params).id));
  return (
    <div className="flex flex-col h-40 items-center gap-4 p-4">
      <img className="h-full" src={image?.url} alt={image?.name} />
    </div>
  );
}

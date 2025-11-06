import FullPageView from "@/components/full-image-page";

export default async function PhotoPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const idNumber = Number((await params).id); 

  if (Number.isNaN(idNumber)) throw new Error("Invalid photo id");

  return <FullPageView id={idNumber} />;
}

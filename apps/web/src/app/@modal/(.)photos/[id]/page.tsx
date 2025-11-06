import FullPageView from "@/components/full-image-page";
import { Modal } from "./modal";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const idNumber = Number((await params).id);

  if (Number.isNaN(idNumber)) throw new Error("Invalid photo id");

  return (
    <Modal>
      <FullPageView id={idNumber} />
    </Modal>
  );
}

import { getImage } from "../../server/queries";

export default async function FullPageView(props: { id: number }) {
  const image = await getImage(props.id);
  return (
    <div className="flex h-full w-full min-w-0 ">
      <div className="shrink flex justify-center items-center p-4">
        <img
          className="w-96 object-contain"
          src={image?.url}
          alt={image?.name}
        />
      </div>
      <div className="w-50 flex h-fit flex-col border-l">
        <h1 className="text-2xl font-bold mb-4">{image?.name}</h1>
      </div>
    </div>
  );
}

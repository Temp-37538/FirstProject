import { auth } from "@FirstProject/auth";
import { headers } from "next/headers";
import { getImage } from "../../server/queries";

export default async function FullPageView(props: { id: number }) {
  const image = await getImage(props.id);

  const uploaderInfo = await auth.api.getSession({
    headers: await headers(),
  }); 

  return (
    <div className="flex justify-center  h-full w-full">
      <div className="flex flex-2 justify-center items-center p-40">
        <img
          className="w-[80%] object-contain"
          src={image?.url}
          alt={image?.name}
        />
      </div>
      <div className="flex-1 flex justify-start space items-center flex-col border-l border-zinc-500">
        <h1 className="text-2xl w-full py-4 text-center border-b border-zinc-500 font-bold mb-4">
          {image?.name}
        </h1>
        <div className="flex w-full items-center p-2 flex-col">
          <span>Uploaded by : </span>
          <span>{uploaderInfo?.user.name}</span>
        </div>
        <div className="flex w-full items-center p-2 flex-col">
          <span>Created on : </span>
          <span>{image && new Date(image.createdAt).toLocaleDateString()}</span>
        </div> 
      </div>
    </div>
  );
}

"use client";
import { authClient } from "@/lib/auth-client";
import { UploadButton } from "@/utils/uploadthing";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";

export default function Header() {
  const links = [{ to: "/", label: "Home" }] as const;
  const router = useRouter();

  const { data: session } = authClient.useSession();

  return (
    <div>
      <div className="flex flex-row items-center justify-between p-4">
        <nav className="flex gap-4 text-lg">
          {links.map(({ to, label }) => {
            return (
              <Link key={to} href={to}>
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          {session && (
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                router.refresh();
                alert("Upload Completed");
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          )}
          <ModeToggle />
          <UserMenu />
        </div>
      </div>
      <hr />
    </div>
  );
}

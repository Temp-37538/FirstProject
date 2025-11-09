"use client";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";
import { UploadButton } from "./upload-button";
import { authClient } from "@/lib/auth-client";

export default function Header() {
  const links = [{ to: "/", label: "Gallery" }] as const;

  const { data: session } = authClient.useSession();

  return (
    <div>
      <div className="flex flex-row items-center justify-between p-4">
        <nav className="flex gap-4 text-lg">
          {links.map(({ to, label }) => {
            return (
              <Link className="font-bold text-2xl" key={to} href={to}>
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex  justify-between items-center gap-6">
          {session?.user.id ? <UploadButton /> : null}
          <UserMenu />
          <ModeToggle />
        </div>
      </div>
      <hr />
    </div>
  );
}

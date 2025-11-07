"use client";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";
import { UploadButton } from "./upload-button";

export default function Header() {
  const links = [{ to: "/", label: "Gallery" }] as const;

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
        <div className="flex  justify-between items-center gap-6">
          <UploadButton></UploadButton>
          <UserMenu />
          <ModeToggle />
        </div>
      </div>
      <hr />
    </div>
  );
}

import prisma from "../../../../packages/db/src/index";

export const dynamic = "force-dynamic"

export default async function Home() {
  const test = await prisma.user.findFirst();
 
  return (
    <div className="container mx-auto max-w-3xl px-4 py-2">
      <pre className="overflow-x-auto font-mono text-sm">{test?.email}</pre>
      <div className="grid gap-6">
        <section className="rounded-lg border p-4">
          <h2 className="mb-2 font-medium">API Status</h2>
        </section>
      </div>
    </div>
  );
}

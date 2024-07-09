import Link from "next/link";

import { Button } from "~/components/ui/button";

export function CtaSection() {
  return (
    <section className="container flex flex-col items-center gap-6 py-24 sm:gap-10">
      <h2 className="font-heading text-3xl font-semibold sm:text-4xl max-w-xl sm:leading-tight text-center">
        Build at the speed of no code. Export code and customize fully.
      </h2>
      <p className="text-lg text-muted-foreground max-w-xl text-center">
        Build websites at the speed of no-code. Export to Next.js, Tailwind and Shadcn UI code.
        Customize and host anywhere.
      </p>
      <Button
        size="lg"
        asChild
        variant="default"
        className="h-12 cursor-pointer border-border text-base sm:h-14 sm:px-10"
      >
        <Link href="#">Get Started</Link>
      </Button>
    </section>
  );
}

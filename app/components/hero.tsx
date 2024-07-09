import { ArrowRight } from "lucide-react";
import { Link } from "@remix-run/react";

import { Button } from "~/components/ui/button";

export function Hero() {
  return (
    <section className="container flex flex-col items-center gap-10 pb-28 pt-20 sm:gap-14 lg:flex-row">
      <div className="flex flex-1 flex-col items-center gap-8 lg:items-start lg:gap-10">
        <div className="flex cursor-pointer items-center gap-1 rounded-full border bg-secondary px-3 py-0.5 hover:bg-secondary/60">
          <span className="text-sm text-secondary-foreground">
            Announcing our seed round
          </span>
          <ArrowRight size={16} />
        </div>
        <h1 className="max-w-2xl text-center font-heading text-4xl font-semibold sm:text-5xl sm:leading-tight lg:text-left">
          Build beautiful landing pages in minutes
        </h1>
        <p className="max-w-md text-center text-lg text-muted-foreground lg:text-left">
          {" "}
          Build at the speed of no-code and then export to Next.js & Tailwind
          code for full customization.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Button
            size="lg"
            asChild
            variant="outline"
            className="h-12 cursor-pointer border-border text-base sm:h-14 sm:px-10"
          >
            <Link to="#">Learn More</Link>
          </Button>
          <Button
            size="lg"
            asChild
            className="h-12 cursor-pointer text-base sm:h-14 sm:px-10"
          >
            <Link to="#">Get Started</Link>
          </Button>
        </div>
      </div>
      <div className="relative flex-1">
        <img
          alt="SaaS Dashboard"
          src="https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          width={1000}
          height={698}
          className="rounded-xl border border-border shadow-lg"
        />
        <div className="absolute inset-0 -z-10 bg-primary/20 [filter:blur(180px)]" />
      </div>
    </section>
  );
}

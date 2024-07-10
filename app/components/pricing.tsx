import { Link } from "@remix-run/react";
import { Check } from "lucide-react";

import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

export function Pricing() {
  return (
    <section className="container h-full flex flex-col items-center gap-6 py-20 sm:gap-7">
      <div className="flex flex-col gap-3">
        <span className="font-bold uppercase text-primary text-center">Pricing</span>
        <h2 className="font-heading text-3xl font-semibold sm:text-4xl text-center">
          Simple pricing
        </h2>
      </div>
      <p className="text-lg text-muted-foreground max-w-lg text-center">
        Pricing that fits your needs and helps you scale.
      </p>
      <div className="mt-7 grid w-full grid-cols-1 gap-7 lg:grid-cols-3">
        <Card className="relative shadow-lg">
          <CardContent className="divide-y p-0">
            <CardContent className="flex flex-col items-center px-7 py-10">
              <h4 className="font-heading text-2xl font-semibold text-foreground">Basic</h4>
              <p className="mt-2 text-muted-foreground">For side project.</p>
              <div className="mt-5">
                <span className="font-heading text-5xl font-semibold">$9</span>
                <span className="text-sm"> /month</span>
              </div>
              <Button size="lg" asChild className="mt-10 w-full">
                <Link to="#">Get started</Link>
              </Button>
            </CardContent>
            <ul className="space-y-2 px-7 py-10">
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">Unlimited projects</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">Unlimited storage</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">24/7 support</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">API access</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">Custom branding</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className="relative shadow-lg border-2 border-primary">
          <CardContent className="divide-y p-0">
            <CardContent className="flex flex-col items-center px-7 py-10">
              <span className="absolute inset-x-0 -top-5 mx-auto w-32 rounded-full bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground shadow-md">
                Most popular
              </span>
              <h4 className="font-heading text-2xl font-semibold text-foreground">Pro</h4>
              <p className="mt-2 text-muted-foreground">For startups and teams.</p>
              <div className="mt-5">
                <span className="font-heading text-5xl font-semibold">$19</span>
                <span className="text-sm"> /month</span>
              </div>
              <Button size="lg" asChild className="mt-10 w-full">
                <Link to="#">Get started</Link>
              </Button>
            </CardContent>
            <ul className="space-y-2 px-7 py-10">
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">Everything in Basic</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">Priority support</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">Advanced analytics</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">Unlimited users</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">Custom domain</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className="relative shadow-lg">
          <CardContent className="divide-y p-0">
            <CardContent className="flex flex-col items-center px-7 py-10">
              <h4 className="font-heading text-2xl font-semibold text-foreground">Enterprise</h4>
              <p className="mt-2 text-muted-foreground">For large businesses.</p>
              <div className="mt-5">
                <span className="font-heading text-5xl font-semibold">$49</span>
                <span className="text-sm"> /month</span>
              </div>
              <Button size="lg" asChild className="mt-10 w-full">
                <Link to="#">Get started</Link>
              </Button>
            </CardContent>
            <ul className="space-y-2 px-7 py-10">
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">Everything in Pro</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">Single sign-on</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">Custom SLA</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">Custom integrations</span>
              </li>
              <li className="flex items-center gap-3">
                <Check size={24} className="text-primary" />
                <span className="text-muted-foreground">Custom reporting</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

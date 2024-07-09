import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "~/components/ui/accordion";

export function Faq() {
  return (
    <section className="container flex flex-col items-center gap-6 py-24 sm:gap-7">
      <div className="flex flex-col gap-3">
        <span className="font-bold uppercase text-primary text-center">Faq</span>
        <h2 className="font-heading text-3xl font-semibold sm:text-4xl text-center">
          Frequently Asked Questions
        </h2>
      </div>
      <p className="text-lg text-muted-foreground max-w-lg text-center">
        For any other questions, please feel free to contact us.
      </p>
      <Accordion type="single" collapsible className="mt-6 w-full divide-y max-w-3xl">
        <AccordionItem value="item-0" className="border-b-0">
          <AccordionTrigger className="py-6 text-left text-lg hover:no-underline">
            How is Reweb different than tools like Framer or Webflow?
          </AccordionTrigger>
          <AccordionContent className="text-lg text-muted-foreground">
            Most no-code/low-code tools don&apos;t allow you to export the code. This means that
            you&apos;re always limited in customization and you&apos;re forced to host on their
            platform. Reweb is built with developers in mind. Once you&apos;re done building your
            website, you can export a fully functional Next.js & Tailwind codebase, customize it and
            host anywhere you want.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger className="py-6 text-left text-lg hover:no-underline">
            How long does it take to learn Reweb?
          </AccordionTrigger>
          <AccordionContent className="text-lg text-muted-foreground">
            Reweb is designed to have a minimal learning curve for developers. You don&apos;t need
            to learn new mental models or frameworks. It&apos;s built to work with popular frontend
            technologies that most developers already know. If you know HTML, React and Tailwind,
            you know how to use Reweb. It will feel like editing your code but visually.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="border-b-0">
          <AccordionTrigger className="py-6 text-left text-lg hover:no-underline">
            How long does it take to make a landing page with Reweb?
          </AccordionTrigger>
          <AccordionContent className="text-lg text-muted-foreground">
            With Reweb, you can go from zero to a beautiful landing page in a few minutes. You can
            pick the pre-made sections that you need, customize your theme and colors with the help
            of AI, write the copy on the editor and you&apos;re ready to go. Depending on your needs
            you can then customize further in the editor, or export the code for even more
            flexibility.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="border-b-0">
          <AccordionTrigger className="py-6 text-left text-lg hover:no-underline">
            What does the exported code look like?
          </AccordionTrigger>
          <AccordionContent className="text-lg text-muted-foreground">
            Reweb exports a fully functional Next.js app (App router) with Typescript, Tailwind &
            Shadcn support. The code is based on what you see in the editor on the left panel. Same
            HTML elements, React components and Tailwind classes. No surprises. We will only include
            the Shadcn components that you have used and their dependencies.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4" className="border-b-0">
          <AccordionTrigger className="py-6 text-left text-lg hover:no-underline">
            Will the exported website look exactly like the preview?
          </AccordionTrigger>
          <AccordionContent className="text-lg text-muted-foreground">
            Yes, the exported website will look exactly like you see in the editor and in the
            preview.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5" className="border-b-0">
          <AccordionTrigger className="py-6 text-left text-lg hover:no-underline">
            Are the generated websites responsive?
          </AccordionTrigger>
          <AccordionContent className="text-lg text-muted-foreground">
            Yes, all the pre-made templates are responsive by default.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}

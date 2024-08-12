
interface SectionLayoutProps {
  subHeading: string;
  heading: string;
  text: string;
  children?: React.ReactNode;
}
export function SectionLayout(data: Readonly<SectionLayoutProps>) {
  if (!data) return null;
  const { subHeading, heading, text, children } = data;
  return (
    <section className="container h-full flex flex-col items-center gap-6 py-20 sm:gap-7">
      <div className="flex flex-col gap-3">
        <span className="font-bold uppercase text-primary text-center">
          {subHeading}
        </span>
        <h2 className="font-heading text-3xl font-semibold sm:text-4xl text-center">
          {heading}
        </h2>
      </div>
      <p className="text-lg text-muted-foreground max-w-2xl text-center">
        {text}
      </p>
      {children}
    </section>
  )
}

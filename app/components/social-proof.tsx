import Image from "next/image";

export function SocialProof() {
  return (
    <section className="container flex flex-col items-center gap-10 py-24">
      <h2 className="text-center text-lg font-semibold leading-8">
        Trusted by the world’s best companies
      </h2>
      <div className="grid w-full grid-cols-4 gap-10 sm:grid-cols-6 sm:gap-12 lg:grid-cols-5">
        <div className="relative col-span-2 h-11 flex-1 sm:h-10 lg:col-span-1">
          <Image alt="Company Logo" src="/images/microsoft.webp" fill className="object-contain" />
        </div>
        <div className="relative col-span-2 h-11 flex-1 sm:h-10 lg:col-span-1">
          <Image alt="Company Logo" src="/images/google.png" fill className="object-contain" />
        </div>
        <div className="relative col-span-2 h-11 flex-1 sm:h-10 lg:col-span-1">
          <Image alt="Company Logo" src="/images/amazon.png" fill className="object-contain" />
        </div>
        <div className="relative col-span-2 h-11 flex-1 sm:h-10 lg:col-span-1 sm:col-start-2">
          <Image alt="Company Logo" src="/images/netflix.png" fill className="object-contain" />
        </div>
        <div className="relative col-span-2 h-11 flex-1 sm:h-10 lg:col-span-1 col-start-2 sm:col-start-auto">
          <Image alt="Company Logo" src="/images/facebook.png" fill className="object-contain" />
        </div>
      </div>
    </section>
  );
}

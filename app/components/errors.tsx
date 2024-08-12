interface StrapiErrorsProps {
  message: string;
  name: string;
  statusCode: number;
}

type StrapiError = StrapiErrorsProps | undefined | null;
export function StrapiErrors({ error }: Readonly<{ error: StrapiError }>) {
  if (!error) return null;
  return (
    <div className="text-pink-500 text-md italic py-2">{error.message}</div>
  );
}

export function ZodErrors({ error }: { readonly error: string[] }) {
  if (!error?.length) return null;
  return error.map((err: string, index: number) => (
    <div key={index} className="text-pink-500 text-xs italic mt-1 py-2">
      {err}
    </div>
  ));
}
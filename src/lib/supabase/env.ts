function required(name: string, value: string | undefined) {
  if (!value) {
    throw new Error(`Falta la variable de entorno ${name}. Ver .env.example.`);
  }
  return value;
}

// Read with literal property access so Next can inline them into the browser bundle.
export const supabaseUrl = () =>
  required("NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL);

export const supabaseKey = () =>
  required(
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );

export const STORAGE_BUCKET = "catalogo";

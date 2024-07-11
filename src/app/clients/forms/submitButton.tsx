"use client";

import { Button } from "primereact/button";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  label: string; // Propiedad label de tipo string
}

export function SubmitButton({ label }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  console.log(pending);
  return (
    <Button
      type="submit"
      label={label} // Usando la prop label aquí
      className="p-button-success"
      disabled={pending}
    />
  );
}

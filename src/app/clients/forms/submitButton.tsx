"use client";

import { Button } from "primereact/button";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  label: string;
}

export function SubmitButton({ label }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      label={label}
      className="bg-primary"
      disabled={pending}
    />
  );
}

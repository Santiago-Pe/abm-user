"use client";

import { Button } from "primereact/button";
import { useFormStatus } from "react-dom";

function SubmitButton({ label, icon }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      label={label}
      className="bg-primary"
      disabled={pending}
      icon={icon}
    />
  );
}

export default SubmitButton;

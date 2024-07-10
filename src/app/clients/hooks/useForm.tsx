import { useState, ChangeEvent } from "react";

interface FieldsType {
  [key: string | symbol]: string;
}

export function useFormFields(
  initialState: FieldsType
): [
  FieldsType,
  (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      | { target: { id: string; value: string } }
  ) => void,
  React.Dispatch<React.SetStateAction<FieldsType>>
] {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    function (
      event:
        | ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
          >
        | { target: { id: string; value: string } }
    ) {
      const { id, value } = "target" in event ? event.target : event;
      setValues({
        ...fields,
        [id]: value,
      });
    },
    setValues,
  ];
}

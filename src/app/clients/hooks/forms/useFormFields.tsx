import { useState, ChangeEvent } from "react";
import { FieldsType } from "./useForm.types";

function useFormFields(
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

export default useFormFields;

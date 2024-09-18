import { SelectProps } from "@radix-ui/react-select";
import { FormScope, useField, ValueOfInputType } from "@rvf/remix";

import { useId } from "react";
import { Label } from "../ui/label";
import { Select } from "../ui/select";

export interface FormInputProps<T extends string> extends SelectProps {
  label?: string;
  scope: FormScope<ValueOfInputType<T>>;
}

export const FormSelect = ({
  scope,
  label,
  ...rest
}: FormInputProps<string>) => {
  const field = useField(scope);
  const inputId = useId();
  const errorId = useId();

  return (
    <div className="grid w-full items-center gap-1">
      <Label htmlFor={inputId}>{label}</Label>
      <Select
        {...rest}
        value={field.value()}
        onValueChange={(value) => field.onChange(value)}
      />
      {field.error() ? (
        <span id={errorId} role="alert" className="text-xs text-destructive">
          {field.error()}
        </span>
      ) : null}
    </div>
  );
};

FormSelect.displayName = "FormSelect";

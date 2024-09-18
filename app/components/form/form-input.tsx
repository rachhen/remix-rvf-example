import { FormScope, useField, ValueOfInputType } from "@rvf/remix";
import { forwardRef, useId } from "react";

import { Input, InputProps } from "../ui/input";
import { Label } from "../ui/label";

export interface FormInputProps<T extends string> extends InputProps {
  label?: string;
  scope: FormScope<ValueOfInputType<T>>;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps<string>>(
  ({ scope, label, ...rest }, ref) => {
    const { error, getInputProps } = useField(scope);
    const inputId = useId();
    const errorId = useId();

    return (
      <div className="grid w-full items-center gap-1">
        <Label htmlFor={inputId}>{label}</Label>
        <Input
          {...getInputProps({
            ...rest,
            ref,
            id: inputId,
            "aria-describedby": errorId,
            "aria-invalid": !!error(),
          })}
        />
        {error() ? (
          <span id={errorId} role="alert" className="text-xs text-destructive">
            {error()}
          </span>
        ) : null}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

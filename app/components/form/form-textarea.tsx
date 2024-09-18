import { FormScope, useField, ValueOfInputType } from "@rvf/remix";
import { forwardRef, useId } from "react";

import { Label } from "../ui/label";
import { Textarea, TextareaProps } from "../ui/textarea";

export interface FormTextareaProps<T extends string> extends TextareaProps {
  label?: string;
  scope: FormScope<ValueOfInputType<T>>;
}

export const FormTextarea = forwardRef<
  HTMLTextAreaElement,
  FormTextareaProps<string>
>(({ scope, label, ...rest }, ref) => {
  const { error, getInputProps } = useField(scope);
  const inputId = useId();
  const errorId = useId();

  return (
    <div className="grid w-full items-center gap-1">
      <Label htmlFor={inputId}>{label}</Label>
      <Textarea
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
});

FormTextarea.displayName = "FormTextarea";

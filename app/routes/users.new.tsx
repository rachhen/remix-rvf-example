import { ActionFunctionArgs, json } from "@remix-run/node";
import { FormProvider, useForm, validationError } from "@rvf/remix";
import { toast } from "sonner";

import { FormInput } from "~/components/form/form-input";
import { FormSelect } from "~/components/form/form-select";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { UserInput, UserRole, createUserValidator } from "~/validators/user";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const { data, error } = await createUserValidator.validate(formData);

  if (error) return validationError(error);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log(data);

  return json(data);
};

function CreateUserPage() {
  const form = useForm({
    validator: createUserValidator,
    defaultValues: {
      name: "",
      email: "",
      role: "user" as UserRole,
    } satisfies UserInput,
    onSubmitSuccess: () => {
      toast.success("User created successfully");
    },
    onInvalidSubmit: () => {
      toast.error("Please fix the errors");
    },
  });

  return (
    <div className="max-w-sm mx-auto h-screen flex flex-col justify-center">
      <h1>Create User</h1>

      <FormProvider scope={form.scope()}>
        <form {...form.getFormProps()} className="space-y-4">
          {form.renderFormIdInput()}
          <FormInput scope={form.scope("name")} />
          <FormInput scope={form.scope("email")} type="email" />
          <FormSelect scope={form.scope("role")} label="Select Custom Field">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </FormSelect>

          <div className="grid w-full max-w-sm items-center gap-1">
            <Label>Select Not Custom Field</Label>
            <Select
              value={form.value("role")}
              onValueChange={(value: UserRole) => form.setValue("role", value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            {form.error("role") ? (
              <span role="alert" className="text-xs text-destructive">
                {form.error("role")}
              </span>
            ) : null}
          </div>

          <pre>
            {JSON.stringify(
              {
                name: form.value("name"),
                email: form.value("email"),
                role: form.value("role"),
              },
              null,
              2
            )}
          </pre>

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Creating..." : "Create User"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}

export default CreateUserPage;

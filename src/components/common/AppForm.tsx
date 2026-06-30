import { type ReactNode } from "react";
import { useForm, FormProvider, useFormContext, type DefaultValues, type FieldValues, type Path, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodType } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

/**
 * Reusable enterprise form primitives built on react-hook-form + zod.
 *
 * Usage:
 *   <AppForm schema={schema} defaultValues={...} onSubmit={...}>
 *     <FormGrid>
 *       <TextField name="code" label="Code" required />
 *       <SelectField name="status" label="Status" options={[...]} />
 *       <TextareaField name="notes" label="Notes" className="md:col-span-2" />
 *     </FormGrid>
 *     <FormActions />
 *   </AppForm>
 */

type AppFormProps<T extends FieldValues> = {
  schema: ZodType<T>;
  defaultValues: DefaultValues<T>;
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
  className?: string;
  id?: string;
};

export function AppForm<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  children,
  className,
  id,
}: AppFormProps<T>) {
  const methods = useForm<T>({
    resolver: zodResolver(schema as ZodType<T>) as never,
    defaultValues,
    mode: "onBlur",
  });
  return (
    <FormProvider {...methods}>
      <form
        id={id}
        onSubmit={methods.handleSubmit(onSubmit)}
        className={cn("space-y-6", className)}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
}

export function FormGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("grid gap-4 md:grid-cols-2", className)}>{children}</div>;
}

export function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4 rounded-lg border border-border bg-card p-5 shadow-card">
      <header>
        <h3 className="text-sm font-semibold">{title}</h3>
        {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
      </header>
      {children}
    </section>
  );
}

function FieldShell({
  label,
  required,
  error,
  hint,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label className="text-xs font-medium">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </Label>
      {children}
      {error ? (
        <p className="text-[11px] text-destructive">{error}</p>
      ) : hint ? (
        <p className="text-[11px] text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

type BaseFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  required?: boolean;
  hint?: string;
  placeholder?: string;
  className?: string;
};

export function TextField<T extends FieldValues>({
  name,
  label,
  required,
  hint,
  placeholder,
  className,
  type = "text",
}: BaseFieldProps<T> & { type?: string }) {
  const { register, formState } = useFormContext<T>();
  const error = formState.errors[name]?.message as string | undefined;
  return (
    <FieldShell label={label} required={required} error={error} hint={hint} className={className}>
      <Input
        type={type}
        placeholder={placeholder}
        aria-invalid={!!error}
        {...register(name)}
      />
    </FieldShell>
  );
}

export function TextareaField<T extends FieldValues>({
  name,
  label,
  required,
  hint,
  placeholder,
  className,
  rows = 4,
}: BaseFieldProps<T> & { rows?: number }) {
  const { register, formState } = useFormContext<T>();
  const error = formState.errors[name]?.message as string | undefined;
  return (
    <FieldShell label={label} required={required} error={error} hint={hint} className={className}>
      <Textarea rows={rows} placeholder={placeholder} aria-invalid={!!error} {...register(name)} />
    </FieldShell>
  );
}

export function SelectField<T extends FieldValues>({
  name,
  label,
  required,
  hint,
  placeholder,
  className,
  options,
}: BaseFieldProps<T> & { options: { value: string; label: string }[] }) {
  const { setValue, watch, formState } = useFormContext<T>();
  const error = formState.errors[name]?.message as string | undefined;
  const value = watch(name) as string | undefined;
  return (
    <FieldShell label={label} required={required} error={error} hint={hint} className={className}>
      <Select
        value={value ?? ""}
        onValueChange={(v) => setValue(name, v as never, { shouldValidate: true, shouldDirty: true })}
      >
        <SelectTrigger aria-invalid={!!error}>
          <SelectValue placeholder={placeholder ?? "Select..."} />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FieldShell>
  );
}

export function FormActions({
  submitLabel = "Save",
  cancelLabel = "Cancel",
  onCancel,
}: {
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
}) {
  const { formState } = useFormContext();
  return (
    <div className="flex items-center justify-end gap-2 border-t border-border pt-4">
      {onCancel && (
        <Button type="button" variant="outline" onClick={onCancel}>
          {cancelLabel}
        </Button>
      )}
      <Button type="submit" disabled={formState.isSubmitting}>
        {submitLabel}
      </Button>
    </div>
  );
}

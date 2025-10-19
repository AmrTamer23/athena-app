import type { AnyFieldApi } from '@tanstack/react-form'

interface FieldInfoProps {
  field: AnyFieldApi
}

export function FieldInfo({ field }: FieldInfoProps) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <p className="text-sm text-destructive mt-1">
          {field.state.meta.errors.join(', ')}
        </p>
      ) : null}
      {field.state.meta.isValidating ? (
        <p className="text-sm text-muted-foreground mt-1">Validating...</p>
      ) : null}
    </>
  )
}
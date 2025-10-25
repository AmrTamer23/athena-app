import type { AnyFieldApi } from '@tanstack/react-form'

interface FieldInfoProps {
  field: AnyFieldApi
}

function formatError(error: any): string {
  if (typeof error === 'string') {
    return error
  }
  
  if (error && typeof error === 'object') {
    // Handle Zod error objects
    if (error.message) {
      return error.message
    }
    // Handle other error object formats
    if (error.code && error.message) {
      return error.message
    }
    // Fallback for complex objects
    return 'Invalid input'
  }
  
  return 'Invalid input'
}

export function FieldInfo({ field }: FieldInfoProps) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <p className="text-sm text-destructive mt-1">
          {field.state.meta.errors.map(formatError).join(', ')}
        </p>
      ) : null}
      {field.state.meta.isValidating ? (
        <p className="text-sm text-muted-foreground mt-1">Validating...</p>
      ) : null}
    </>
  )
}
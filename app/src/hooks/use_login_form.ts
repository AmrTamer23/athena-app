import { useForm } from '@tanstack/react-form'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function useLoginForm() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    } as LoginFormData,
    onSubmit: async ({ value }) => {
      console.log('Login attempt:', value)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Handle successful login or errors here
      alert('Login successful! (This is just a demo)')
    },
    validators: {
      onBlur: loginSchema,
      onSubmit: loginSchema,
    },
  })

  return form
}
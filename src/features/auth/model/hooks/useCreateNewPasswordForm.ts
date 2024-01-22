import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const createNewPasswordSchema = z.object({
  password: z.string().min(3, 'Min 3').trim(),
})

export type CreateNewPasswordFormValues = z.input<typeof createNewPasswordSchema>

export const useCreateNewPasswordForm = () =>
  useForm<CreateNewPasswordFormValues>({
    defaultValues: {
      password: '',
    },
    resolver: zodResolver(createNewPasswordSchema),
  })

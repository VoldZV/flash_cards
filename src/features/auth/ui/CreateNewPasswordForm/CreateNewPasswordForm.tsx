import { TypographyVariant } from '@/common/enums'
import { Button } from '@/common/ui/Button'
import { Card } from '@/common/ui/Card'
import { Typography } from '@/common/ui/Typography'
import { ControlledTextField } from '@/common/ui_controlled/ControlledTextField'
import { CatchingData } from '@/common/utils/handleErrorResponse'

import s from './CreateNewPasswordForm.module.scss'

import {
  CreateNewPasswordFormValues,
  useCreateNewPasswordForm,
} from '../../model/hooks/useCreateNewPasswordForm'

interface Props {
  isLoading: boolean
  onSubmit: (data: CreateNewPasswordFormValues) => Promise<CatchingData | undefined>
}

export const CreateNewPasswordForm = ({ isLoading, onSubmit }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useCreateNewPasswordForm()
  const handleSubmitAction = (data: CreateNewPasswordFormValues) => {
    onSubmit(data).then(error => {
      if (error && error.fieldErrors) {
        error.fieldErrors?.forEach(el => {
          setError(el.field as keyof CreateNewPasswordFormValues, { message: el.message })
        })
      }
    })
  }

  return (
    <Card as="form" className={s.formContent} onSubmit={handleSubmit(handleSubmitAction)}>
      <Typography as="h2" className={s.formTitle} variant={TypographyVariant.large}>
        Create new password
      </Typography>
      <ControlledTextField
        className={s.input}
        control={control}
        errorText={errors.password?.message}
        label="Password"
        name="password"
        type="password"
      />
      <Typography className={s.formInfoText} variant={TypographyVariant.body2}>
        Create new password and we will send you further instructions to email
      </Typography>
      <Button disabled={isLoading} fullWidth type="submit">
        Create New Password
      </Button>
    </Card>
  )
}

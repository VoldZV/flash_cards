import { Link } from 'react-router-dom'

import { ButtonVariant, TypographyVariant } from '@/common/enums'
import { Button } from '@/common/ui/Button'
import { Card } from '@/common/ui/Card'
import { Typography } from '@/common/ui/Typography'
import { ControlledTextField } from '@/common/ui_controlled/ControlledTextField'
import { CatchingData } from '@/common/utils/handleErrorResponse'
import cn from 'classnames'

import s from './ForgotPasswordForm.module.scss'

import { ForgotPasswordFormData, useForgotPassword } from '../../model/hooks/useForgotPasswordForm'

interface Props {
  className?: string
  isLoading: boolean
  onSubmit: (data: ForgotPasswordFormData) => Promise<CatchingData | undefined>
}
export const ForgotPasswordForm = ({ className, isLoading, onSubmit }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForgotPassword()
  const handleSubmitAction = (data: ForgotPasswordFormData) => {
    onSubmit(data).then(error => {
      if (error && error.fieldErrors) {
        error.fieldErrors?.forEach(el => {
          setError(el.field as keyof ForgotPasswordFormData, { message: el.message })
        })
      }
    })
  }

  return (
    <Card as="form" className={cn(s.form, className)} onSubmit={handleSubmit(handleSubmitAction)}>
      <Typography as="h2" className={s.headerText} variant={TypographyVariant.large}>
        Forgot your password?
      </Typography>
      <ControlledTextField
        className={s.input}
        control={control}
        errorText={errors?.email?.message}
        label="Email"
        name="email"
        type="email"
      />
      <Typography className={s.descriptionText} variant={TypographyVariant.body2}>
        Enter your email address and we will send you further instructions
      </Typography>
      <Button className={s.submitBtn} disabled={isLoading} fullWidth type="submit">
        Send Instructions
      </Button>
      <Typography className={s.forgotPasswordText} variant={TypographyVariant.body2}>
        Did you remember your password?
      </Typography>
      <Button
        as={Link}
        className={cn(s.signUpNav, { disabledLink: isLoading })}
        to="/sign-in"
        variant={ButtonVariant.link}
      >
        Try logging in
      </Button>
    </Card>
  )
}

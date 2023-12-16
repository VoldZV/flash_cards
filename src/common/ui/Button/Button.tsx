import { ComponentPropsWithoutRef, ElementRef, ElementType, ReactNode, forwardRef } from 'react'

import { ButtonVariant } from '@/common/enums'
import cn from 'classnames'

import s from './Button.module.scss'

type Props<T extends ElementType> = {
  as?: T
  className?: string
  endIcon?: ReactNode
  fullWidth?: boolean
  startIcon?: ReactNode
  variant?: ButtonVariant
} & ComponentPropsWithoutRef<T>

export const Button = forwardRef(
  <T extends ElementType = 'button'>(
    {
      as,
      children,
      className,
      endIcon,
      fullWidth,
      startIcon,
      variant = ButtonVariant.primary,
      ...restProps
    }: Props<T> & Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>,
    ref: ElementRef<T>
  ) => {
    const Component: ElementType = as || 'button'
    const finalClassNames = cn(s.button, s[variant], { [s.fullWidth]: fullWidth }, className)

    return (
      <Component className={finalClassNames} {...restProps} ref={ref}>
        {startIcon}
        {children}
        {endIcon}
      </Component>
    )
  }
)

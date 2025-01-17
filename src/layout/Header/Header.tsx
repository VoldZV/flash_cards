import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Link } from 'react-router-dom'

import Logo from '@/common/assets/images/logo.png'
import { ProfileData } from '@/common/types'
import { Button } from '@/common/ui/Button'
import { LangSwitcher } from '@/common/ui/LangSwitcher'
import { Page } from '@/common/ui/Page'
import cn from 'classnames'

import s from './Header.module.scss'

import { HeaderUser } from './HeaderUser'

type Props = {
  data?: ProfileData
  isAuth: boolean
  logout: () => void
} & ComponentPropsWithoutRef<'header'>

export const Header = forwardRef<ElementRef<'header'>, Props>(
  ({ className, data, isAuth, logout, ...rest }, ref) => {
    return (
      <header className={cn(s.header, className)} ref={ref} {...rest}>
        <Page className={s.container} mt={0}>
          <Link className={s.mainLink} to="/">
            <img alt="logo" className={s.logo} src={Logo} />
          </Link>
          {isAuth && data ? (
            <HeaderUser data={data} logout={logout} />
          ) : (
            <Button as={Link} to="/sign-in">
              Sign In
            </Button>
          )}
          <LangSwitcher />
        </Page>
      </header>
    )
  }
)

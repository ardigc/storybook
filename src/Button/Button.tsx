import classNames from 'classnames'
import { ReactNode, useState, MouseEventHandler, MouseEvent } from 'react'

export interface ButtonProps {
  children?: ReactNode
  variant?: 'contained' | 'outlined' | 'text'
  onClick?: (ev: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
  disabled?: boolean
  href?: string
  disableElevation?: boolean
}
export default function Button({
  children,
  variant = 'text',
  onClick,
  color = 'primary',
  disabled,
  href,
  disableElevation,
}: ButtonProps) {
  const [animation, setAnimation] = useState(false)
  const [clickCoord, setClickCoord] = useState<{ x: number; y: number }>()
  const RenderComponent = href ? 'a' : 'button'
  const onClickHandler: MouseEventHandler<
    HTMLButtonElement | HTMLAnchorElement
  > = (ev) => {
    const target = ev.currentTarget
    const location = target.getBoundingClientRect()
    const coord = {
      x: ev.clientX - location.left,
      y: ev.clientY - location.top,
    }
    setClickCoord({ x: coord.x, y: coord.y })
    setAnimation(true)
    setTimeout(() => {
      setAnimation(false)
    }, 600)
    if (onClick) {
      onClick(ev)
    }
  }
  return (
    <RenderComponent
      disabled={disabled}
      href={href}
      onClick={onClickHandler}
      className={classNames(
        'inline-flex items-center justify-center relative font-base  outline-none font-medium text-sm tracking-wide uppercase rounded-[4px] min-w-[64px]',
        'overflow-hidden',
        {
          ' hover:transition-all hover:duration-200 hover:linear  bg-transparent hover:bg-opacity-10 py-[6px] px-2':
            variant === 'text' && !disabled,
          ' hover:transition-all hover:duration-200 hover:linear  hover:bg-opacity-10 py-[6px] px-2':
            variant === 'contained' && !disabled,
          'bg-primary-color text-white bg-opacity-90 hover:bg-opacity-100':
            color === 'primary' && variant === 'contained' && !disabled,
          'bg-secondary-color text-white bg-opacity-90 hover:bg-opacity-100':
            color === 'secondary' && variant === 'contained' && !disabled,
          'bg-error-color text-white bg-opacity-90 hover:bg-opacity-100':
            color === 'error' && variant === 'contained' && !disabled,
          'bg-warning-color text-white bg-opacity-90 hover:bg-opacity-100':
            color === 'warning' && variant === 'contained' && !disabled,
          'bg-success-color text-white bg-opacity-90 hover:bg-opacity-100':
            color === 'success' && variant === 'contained' && !disabled,
          'bg-info-color text-white bg-opacity-90 hover:bg-opacity-100':
            color === 'info' && variant === 'contained' && !disabled,
          'text-primary-color hover:bg-primary-color':
            color === 'primary' && variant === 'text' && !disabled,
          'text-secondary-color hover:bg-secondary-color':
            color === 'secondary' && variant === 'text' && !disabled,
          'text-error-color hover:bg-error-color':
            color === 'error' && variant === 'text' && !disabled,
          'text-warning-color hover:bg-warning-color':
            color === 'warning' && variant === 'text' && !disabled,
          'text-info-color hover:bg-info-color':
            color === 'info' && variant === 'text' && !disabled,
          'text-success-color hover:bg-success-color':
            color === 'success' && variant === 'text' && !disabled,
          'text-gray-400 py-[6px] px-2': disabled,
          'bg-gray-200': disabled && variant === 'contained',
          'shadow shadow-black':
            variant === 'contained' && !disabled && !disableElevation,
        }
      )}
    >
      {animation && (
        <span
          style={{
            top: clickCoord?.y,
            left: clickCoord?.x,
            transform: 'translate(-50%, -50%)',
          }}
          className={classNames({
            'animate-ripple absolute inline-flex w-full h-full   rounded-full bg-opacity-25 origin-center':
              variant === 'text',
            'bg-primary-color': variant === 'text' && color === 'primary',
            'bg-secondary-color': variant === 'text' && color === 'secondary',
            'bg-error-color': variant === 'text' && color === 'error',
            'bg-warning-color': variant === 'text' && color === 'warning',
            'bg-info-color': variant === 'text' && color === 'info',
            'bg-success-color': variant === 'text' && color === 'success',
            'animate-ripple absolute inline-flex w-full h-full  bg-white rounded-full bg-opacity-25 origin-center':
              variant === 'contained',
          })}
        ></span>
      )}
      {children}
    </RenderComponent>
  )
}

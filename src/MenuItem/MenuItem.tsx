import classNames from 'classnames'
import { ElementType, MouseEventHandler, ReactNode, useState } from 'react'
export interface MenuItemProps {
  children?: ReactNode
  className?: string
  component?: ElementType
  dense?: boolean
  disableGutters?: boolean
}
export default function MenuItem({
  children,
  className,
  component,
  dense,
  disableGutters,
}: MenuItemProps) {
  const [animation, setAnimation] = useState(false)
  const [clickCoord, setClickCoord] = useState<{ x: number; y: number }>()
  const CustomComponent = component ? component : 'li'
  const onClickHandler: MouseEventHandler<HTMLLIElement> = (ev) => {
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
  }
  return (
    <CustomComponent
      className={classNames(
        'flex font-normal text-base font-base bg-transparent justify-start  hover:bg-neutral-50 relative',

        {
          'py-[6px]': !dense && !disableGutters,
          'px-4': !disableGutters,
          [className || '']: className,
        }
      )}
      onClick={onClickHandler}
    >
      {children}
      <span className={classNames('inset-0 overflow-hidden absolute')}>
        {animation && (
          <span
            style={{
              top: clickCoord?.y,
              left: clickCoord?.x,
              transform: 'translate(-50%, -50%)',
            }}
            className={classNames({
              'animate-ripple absolute inline-flex w-full h-full   rounded-full bg-opacity-25 origin-center bg-neutral-300':
                true,
            })}
          ></span>
        )}
      </span>
    </CustomComponent>
  )
}

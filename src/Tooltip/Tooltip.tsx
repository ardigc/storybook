import {
  // JSXElementConstructor,
  MouseEventHandler,
  // ReactElement,
  ReactNode,
  useState,
} from 'react'
import Popover from '../Popover/Popover'
import classNames from 'classnames'
export interface TooltipProps {
  children: ReactNode
  title?: ReactNode
}
export default function Tooltip({ children, title }: TooltipProps) {
  const [anchorEl, setAnchorEl] = useState<Element | undefined>(undefined)
  const [open, setOpen] = useState(false)
  const onMouseEnterHandler: MouseEventHandler<HTMLDivElement> = (ev) => {
    setAnchorEl(ev.currentTarget)
    setOpen(true)
  }

  const OnMouseLeaveHandler: MouseEventHandler<HTMLDivElement> = () => {
    console.log('hola')
    setOpen(false)
  }
  return (
    <div className="inline-flex">
      <Popover
        open={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        anchorEl={anchorEl}
        elevation={0}
        // className='bg-transparent'
        classes={{ root: 'pointer-events-none' }}
      >
        <div
          className={classNames(
            'bg-neutral-500 rounded text-white px-2 py-1 font-medium text-xs font-base ',
            { 'mt-[14px] ': true }
          )}
        >
          {title}
        </div>
      </Popover>
      <div
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={OnMouseLeaveHandler}
        // className={classNames('bg-gray-800 text-white')}
      >
        {children}
      </div>
    </div>
  )
}

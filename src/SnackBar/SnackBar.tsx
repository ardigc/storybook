import classNames from 'classnames'
import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useState,
} from 'react'
import Paper from '../Paper/Paper'

type DivReactProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>
export interface SnackBarProps extends DivReactProps {
  children?: ReactNode
  message?: ReactNode
  open?: boolean
  action?: ReactNode
}

export default function SnackBar({
  children,
  message,
  open,
  action,
  ...rest
}: SnackBarProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (open === true) {
      setVisible(Boolean(open))
    }
  }, [open])

  return (
    <>
      {visible && (
        <div
          className={classNames(
            '  fixed bottom-2 left-2 right-2 z-50 flex justify-start items-center sm:bottom-6 sm:left-6 sm:right-auto animate-opacity',
            { 'animate-opacity0 opacity-0': !open }
          )}
          onAnimationEnd={() => setVisible(Boolean(open))}
          {...rest}
        >
          <Paper
            className={classNames(
              'font-base font-normal text-base text-white grow bg-[#323232] flex px-4 py-[6px] items-center flex-wrap sm:min-w-[288px] sm:grow-[initial]'
            )}
          >
            <div className={classNames('py-2')}>{message}</div>
            {action&&<div className='flex items-center ml-auto pl-4 -mr-2'>{action}</div>}
          </Paper>
        </div>
      )}
    </>
  )
}
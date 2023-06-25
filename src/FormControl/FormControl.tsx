import classNames from 'classnames'
import {
  ReactNode,
  FormEvent,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ElementType,
} from 'react'
import Clickaway from '../ClickAway/ClickAway'

export type FormControlContextType = {
  contextVariant?: 'filled' | 'outlined' | 'standard'
  contextTouched?: boolean
  setLabel?: Dispatch<SetStateAction<ReactNode>>
  contextLabel?: ReactNode
  contextValue?: string | ReadonlyArray<string> | number | undefined
  setContextValue?: Dispatch<
    SetStateAction<string | ReadonlyArray<string> | number | undefined>
  >
  contextColor?:
    | 'primary'
    | 'secundary'
    | 'error'
    | 'warning'
    | 'info'
    | 'success'
    contextDisabled?: boolean
  // setTouched?: Dispatch<SetStateAction<boolean>>
  focused?:boolean
  hiddenLabel?:boolean
  contextRequired?:boolean
}
export const FormControlContext = createContext<FormControlContextType>({})

export interface FormControlProps {
  children?: ReactNode
  onSubmit?: (ev: FormEvent<HTMLFormElement>) => void
  variant?: 'filled' | 'outlined' | 'standard'
  margin?: 'dense' | 'none' | 'normal'
  color?: 'primary' | 'secundary' | 'error' | 'warning' | 'info' | 'success'
component?: ElementType
  fullWidth?: boolean
  className?: string
  disabled?: boolean
  error?:boolean
  focused?:boolean
  hiddenLabel?:boolean
  required?: boolean
}
export default function FormControl({
  children,
  onSubmit,
  variant = 'outlined',
  margin = 'normal',
  fullWidth,
  className,
  component,
  disabled,
  error,
  color = error?'error': 'primary',
  focused,
  hiddenLabel,
  required,
}: FormControlProps) {
  const [contextTouched, setTouched] = useState(false)
  const [contextLabel, setLabel] = useState<ReactNode>('')
  const [contextValue, setContextValue] = useState<
    string | ReadonlyArray<string> | number | undefined
  >()
  const RenderComponent=component?component:'form'
  return (
    <Clickaway
      onClickaway={() => {
        if (!contextValue) {
          setTouched(false)
        }
      }}
    >
      <RenderComponent
        className={classNames('relative inline-flex flex-col', {
          'mt-2 mb-1': margin === 'dense',
          'mt-4 mb-2': margin === 'normal',
          'w-full': fullWidth,
          [className || '']: className,
        })}
        onFocus={() => setTouched(true)}
        onSubmit={onSubmit}
      >
        <FormControlContext.Provider
          value={{
            contextTouched,
            contextColor: color,
            setContextValue,
            contextLabel,
            setLabel,
            contextVariant: variant,
            contextDisabled: disabled,
            focused,
            hiddenLabel,
            contextRequired:required,
          }}
        >
          {children}
        </FormControlContext.Provider>
      </RenderComponent>
    </Clickaway>
  )
}
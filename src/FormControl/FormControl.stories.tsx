import { Meta, StoryObj } from '@storybook/react'
import FormControl from './FormControl'
import Input from '../Input/Input'
import InputLabel from '../InputLabel/InputLabel'
const meta = {
  component: FormControl,
  title: 'GordoUI/FormControl',
  tags: ['autodocs'],
} satisfies Meta<typeof FormControl>
export default meta
type Story = StoryObj<typeof meta>
export const primary: Story = {
  args: {
    children: (
      <>
        <InputLabel>hola</InputLabel>
        <Input name="email" /> <button type="submit">button</button>
      </>
    ),
    onSubmit(ev) {
      ev.preventDefault()
      const formData = new FormData(ev.currentTarget)
      console.log(formData.get('email'))
    },
  },
}
export const filled: Story = {
  args: {
    children: (
      <>
        <InputLabel>hola</InputLabel>
        <Input name="email" /> <button type="submit">button</button>
      </>
    ),
    onSubmit(ev) {
      ev.preventDefault()
      const formData = new FormData(ev.currentTarget)
      console.log(formData.get('email'))
    },
    variant: 'filled',
  },
}

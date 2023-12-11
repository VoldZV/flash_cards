import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { TypographyVariant } from '@/common/enums'
import { Typography } from '@/common/ui/Typography'

import { Option, Select } from './Select'

const meta = {
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    onValueChange: {
      action: 'Select value changed!',
    },
    placeholder: {
      control: 'text',
    },
  },
  component: Select,
  tags: ['autodocs'],
  title: 'components/Select', //change
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

const options = [
  { title: 'title1', value: 'title1' },
  { title: 'title2', value: 'title2' },
  { title: 'title3', value: 'title3' },
  { title: 'title4', value: 'title4' },
]

const ControlledSelect = ({ options }: { options: Option[] }) => {
  const [current, setCurrent] = useState<null | string>(null)

  const handleChangeCurrentOption = (value: string) => {
    setCurrent(value)
  }

  return (
    <>
      <Typography variant={TypographyVariant.h3}>
        Current option value: {current || 'none'}
      </Typography>
      <Select onValueChange={handleChangeCurrentOption} options={options} />
    </>
  )
}

export const WithLabel: Story = {
  args: {
    label: 'Some text for label',
    options,
    placeholder: 'Placeholder text',
  },
}

export const ControlledDemo: Story = {
  args: { options },
  render: args => <ControlledSelect {...args} />,
}

export const Default: Story = {
  args: {
    options,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled select',
    options,
  },
}

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    label: 'Full width select',
    options,
    placeholder: 'Placeholder text',
  },
}

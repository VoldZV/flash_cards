import type { Meta, StoryObj } from '@storybook/react'

import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { store } from '@/app/store'
import { Trash } from '@/common/assets/icons'
import { IconButton } from '@/common/ui/IconButton'

import { RemoveCardModal } from './RemoveCardModal'

const meta = {
  component: RemoveCardModal,
  parameters: {
    layout: 'centered',
  },
  title: 'features/Card/Actions/RemoveCardModal',
} satisfies Meta<typeof RemoveCardModal>

export default meta

type Story = StoryObj<typeof meta>

export const Demo: Story = {
  args: {
    cardId: '123',
    cardName: 'SomeCardName',
    trigger: <IconButton icon={<Trash />} />,
  },
  render: args => (
    <Provider store={store}>
      <MemoryRouter>
        <RemoveCardModal {...args} />
      </MemoryRouter>
    </Provider>
  ),
}

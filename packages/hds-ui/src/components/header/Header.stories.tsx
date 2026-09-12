import { BackIcon, ShareIcon } from '@hashi/hds-icons'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'

import { IconButton } from '../iconButton'
import { Header } from './Header'

const mobileFrameDecorator = (Story: () => ReactNode) => (
  <div className="w-[393px] max-w-full bg-white">
    <Story />
  </div>
)

const backAction = (
  <IconButton aria-label="뒤로가기" size="xs">
    <BackIcon className="size-6" />
  </IconButton>
)

const shareAction = (
  <IconButton aria-label="공유하기" size="xs">
    <ShareIcon className="size-6" />
  </IconButton>
)

const textAction = (
  <button
    className="typo-body-6 text-primary-200 h-[35px] w-[45px]"
    type="button"
  >
    저장
  </button>
)

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  decorators: [mobileFrameDecorator],
  args: {
    elevated: true,
    leftAction: backAction,
    rightActionType: 'icon',
    title: '예약 상세',
    variant: 'center',
  },
  argTypes: {
    className: {
      control: false,
    },
    contentClassName: {
      control: false,
    },
    elevated: {
      control: 'boolean',
    },
    leftAction: {
      control: false,
    },
    rightAction: {
      control: false,
    },
    rightActionType: {
      control: 'select',
      options: ['icon', 'text'],
    },
    subtitle: {
      control: 'text',
    },
    title: {
      control: 'text',
    },
    variant: {
      control: 'select',
      options: ['center', 'largeTitle'],
    },
  },
} satisfies Meta<typeof Header>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithRightAction: Story = {
  args: {
    rightAction: shareAction,
    title: '오늘의 식당',
  },
}

export const WithTextAction: Story = {
  args: {
    elevated: false,
    rightAction: textAction,
    rightActionType: 'text',
    title: '내 정보 수정',
  },
}

export const TextActionOverflow: Story = {
  args: {
    rightAction: textAction,
    rightActionType: 'text',
    title: '개인정보 및 알림 설정 변경',
  },
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
}

export const TitleOnly: Story = {
  args: {
    leftAction: undefined,
    title: '매거진',
  },
}

export const Subtitle: Story = {
  args: {
    subtitle: '최종 업데이트: 2026. 06. 29',
    title: '개인정보 수집 및 이용 동의',
  },
}

export const LargeTitle: Story = {
  args: {
    rightAction: shareAction,
    title: '야키니쿠 리키마루 이케부쿠로 히가시구치 텐',
    variant: 'largeTitle',
  },
}

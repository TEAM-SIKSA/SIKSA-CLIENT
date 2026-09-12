import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cva } from 'class-variance-authority'

import { cn } from '../../utils'

type ChipBaseButtonProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'aria-pressed' | 'children' | 'onClick' | 'type'
>

type ChipBasicProps = Omit<
  ChipBaseButtonProps,
  'aria-disabled' | 'disabled'
> & {
  children: ReactNode
  count?: ReactNode
  disabledIcon?: never
  icon?: never
  onSelectedChange?: (selected: boolean) => void
  selected?: boolean
  variant?: 'basic'
}

type ChipIconProps = ChipBaseButtonProps & {
  children: ReactNode
  count?: never
  disabledIcon?: ReactNode
  icon: ReactNode
  onSelectedChange?: (selected: boolean) => void
  selected?: boolean
  variant: 'icon'
}

export type ChipProps = ChipBasicProps | ChipIconProps

const basicChipVariants = cva(
  'inline-flex h-9 max-w-full cursor-pointer appearance-none items-center justify-center gap-0.5 rounded-full border-0 px-3 py-2 text-center font-sans transition-colors focus-visible:outline-cool-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2',
  {
    variants: {
      selected: {
        true: 'bg-cool-gray-800 text-white hover:bg-cool-gray-700 active:bg-cool-gray-900',
        false:
          'bg-warm-gray-50 text-primary-200 hover:bg-warm-gray-100 active:bg-warm-gray-300',
      },
    },
  },
)

const basicChipLabelVariants = cva(
  'typo-body-6 min-w-0 truncate leading-[1.36] whitespace-nowrap',
)

const basicChipCountVariants = cva(
  'typo-caption-1 shrink-0 leading-[1.5] whitespace-nowrap',
)

const iconChipVariants = cva(
  'inline-flex h-9 max-w-full shrink-0 cursor-pointer appearance-none items-center justify-center gap-1 rounded-[5px] border px-2.5 py-1 font-sans text-black transition-colors focus-visible:outline-cool-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed',
  {
    variants: {
      disabled: {
        true: 'border-warm-gray-100 bg-primary-100 text-warm-gray-300',
        false: null,
      },
      selected: {
        true: 'border-[1.4px] border-primary-400 bg-primary-400/20 hover:bg-primary-400/30 active:bg-primary-400/50',
        false:
          'border-warm-gray-100 bg-white hover:bg-primary-100 active:bg-primary-400/20',
      },
    },
    compoundVariants: [
      {
        className: 'bg-primary-100 hover:bg-primary-100 active:bg-primary-100',
        disabled: true,
        selected: false,
      },
      {
        className: 'bg-primary-100 hover:bg-primary-100 active:bg-primary-100',
        disabled: true,
        selected: true,
      },
    ],
  },
)

const iconChipLabelVariants = cva(
  'typo-body-8 min-w-0 truncate whitespace-nowrap',
)

const ChipIconSlot = ({ icon }: { icon: ReactNode }) => {
  return (
    <span
      aria-hidden="true"
      className="flex size-6 shrink-0 items-center justify-center text-2xl"
    >
      {icon}
    </span>
  )
}

const getButtonProps = (props: ChipProps) => {
  const buttonProps = { ...props } as Record<string, unknown>

  delete buttonProps.children
  delete buttonProps.className
  delete buttonProps.count
  delete buttonProps.disabledIcon
  delete buttonProps.icon
  delete buttonProps.onSelectedChange
  delete buttonProps.selected
  delete buttonProps.variant

  return buttonProps as ComponentPropsWithoutRef<'button'>
}

export const Chip = (props: ChipProps) => {
  const { children, className, onSelectedChange, selected = false } = props

  const handleClick = () => {
    onSelectedChange?.(!selected)
  }

  if (props.variant === 'icon') {
    const { disabled = false, disabledIcon, icon } = props
    const buttonProps = getButtonProps(props)
    const displayIcon = disabled && disabledIcon ? disabledIcon : icon

    return (
      <button
        {...buttonProps}
        aria-pressed={selected}
        className={cn(iconChipVariants({ disabled, selected }), className)}
        disabled={disabled}
        onClick={handleClick}
        type="button"
      >
        <ChipIconSlot icon={displayIcon} />
        <span className={cn(iconChipLabelVariants())}>{children}</span>
      </button>
    )
  }

  const { count } = props
  const buttonProps = getButtonProps(props)

  return (
    <button
      {...buttonProps}
      aria-pressed={selected}
      className={cn(basicChipVariants({ selected }), className)}
      onClick={handleClick}
      type="button"
    >
      <span className={cn(basicChipLabelVariants())}>{children}</span>
      {count !== undefined && count !== null ? (
        <span className={cn(basicChipCountVariants())}>{count}</span>
      ) : null}
    </button>
  )
}

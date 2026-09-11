import type { ComponentPropsWithRef, ReactNode } from 'react'
import { useId, useState } from 'react'
import { TapDownIcon, TapUpIcon } from '@hashi/hds-icons'
import { cn } from '../../utils'

export type AccordionProps = Omit<
  ComponentPropsWithRef<'div'>,
  'children' | 'title'
> & {
  title: ReactNode
  children: ReactNode
  defaultExpanded?: boolean
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  contentClassName?: string
}

export const Accordion = ({
  title,
  children,
  defaultExpanded = false,
  expanded,
  onExpandedChange,
  className,
  contentClassName,
  ref,
  ...props
}: AccordionProps) => {
  const contentId = useId()
  const [uncontrolledExpanded, setUncontrolledExpanded] =
    useState(defaultExpanded)
  const isControlled = expanded !== undefined
  const isExpanded = isControlled ? expanded : uncontrolledExpanded
  const ToggleIcon = isExpanded ? TapUpIcon : TapDownIcon

  const handleToggle = () => {
    const nextExpanded = !isExpanded

    if (!isControlled) {
      setUncontrolledExpanded(nextExpanded)
    }

    onExpandedChange?.(nextExpanded)
  }

  return (
    <div
      ref={ref}
      className={cn(
        'border-secondary-200 flex w-full flex-col items-center border-b px-5 py-2',
        isExpanded && 'gap-1',
        className,
      )}
      {...props}
    >
      <button
        type="button"
        aria-controls={contentId}
        aria-expanded={isExpanded}
        className="focus-visible:outline-cool-gray-900 flex min-h-8 w-full appearance-none items-center justify-between gap-3 border-0 bg-transparent p-0 text-left font-sans focus-visible:outline-2 focus-visible:outline-offset-2"
        onClick={handleToggle}
      >
        <span
          className={cn(
            'min-w-0 flex-1 break-words text-black',
            isExpanded ? 'typo-sub-header-3' : 'typo-body-5',
          )}
        >
          {title}
        </span>
        <ToggleIcon
          aria-hidden="true"
          className="text-cool-gray-900 size-5 shrink-0"
          focusable="false"
        />
      </button>

      {isExpanded ? (
        <div
          id={contentId}
          className={cn(
            'typo-caption-2 text-warm-gray-300 w-full leading-[1.5]',
            contentClassName,
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  )
}

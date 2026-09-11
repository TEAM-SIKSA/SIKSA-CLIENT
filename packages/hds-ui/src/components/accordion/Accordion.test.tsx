import '@testing-library/jest-dom/vitest'

import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Accordion } from './Accordion'

afterEach(() => {
  cleanup()
})

describe('Accordion', () => {
  it('renders the title as a full-width toggle button', () => {
    render(<Accordion title="제1조 (목적)">약관 내용</Accordion>)

    const trigger = screen.getByRole('button', { name: '제1조 (목적)' })

    expect(trigger).toBeInTheDocument()
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(trigger.parentElement).toHaveClass('w-full')
  })

  it('does not render content while collapsed by default', () => {
    render(<Accordion title="제1조 (목적)">약관 내용</Accordion>)

    expect(screen.queryByText('약관 내용')).not.toBeInTheDocument()
  })

  it('renders content when expanded by default', () => {
    render(
      <Accordion title="제1조 (목적)" defaultExpanded>
        약관 내용
      </Accordion>,
    )

    expect(screen.getByText('약관 내용')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '제1조 (목적)' }),
    ).toHaveAttribute('aria-expanded', 'true')
  })

  it('toggles expanded state when the trigger is clicked', () => {
    render(<Accordion title="제1조 (목적)">약관 내용</Accordion>)

    fireEvent.click(screen.getByRole('button', { name: '제1조 (목적)' }))

    expect(screen.getByText('약관 내용')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '제1조 (목적)' }),
    ).toHaveAttribute('aria-expanded', 'true')
  })

  it('calls onExpandedChange without changing content in controlled mode', () => {
    const handleExpandedChange = vi.fn()

    render(
      <Accordion
        title="제1조 (목적)"
        expanded={false}
        onExpandedChange={handleExpandedChange}
      >
        약관 내용
      </Accordion>,
    )

    fireEvent.click(screen.getByRole('button', { name: '제1조 (목적)' }))

    expect(handleExpandedChange).toHaveBeenCalledTimes(1)
    expect(handleExpandedChange).toHaveBeenCalledWith(true)
    expect(screen.queryByText('약관 내용')).not.toBeInTheDocument()
  })

  it('applies Figma typography and color tokens by state', () => {
    const { rerender } = render(
      <Accordion title="제1조 (목적)">약관 내용</Accordion>,
    )

    expect(screen.getByText('제1조 (목적)')).toHaveClass(
      'typo-body-5',
      'text-black',
    )

    rerender(
      <Accordion title="제1조 (목적)" expanded>
        약관 내용
      </Accordion>,
    )

    expect(screen.getByText('제1조 (목적)')).toHaveClass(
      'typo-sub-header-3',
      'text-black',
    )
    expect(screen.getByText('약관 내용')).toHaveClass(
      'typo-caption-2',
      'text-warm-gray-300',
      'leading-[1.5]',
    )
  })
})

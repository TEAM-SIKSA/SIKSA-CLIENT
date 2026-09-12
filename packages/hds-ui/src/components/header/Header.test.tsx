import '@testing-library/jest-dom/vitest'

import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import type { HeaderRightActionType } from '../../index'
import { Header } from './Header'

afterEach(() => {
  cleanup()
})

describe('Header', () => {
  const textActionType: HeaderRightActionType = 'text'

  it('renders a full-width center header with a visible title', () => {
    render(<Header title="식당 상세 정보" />)

    const header = screen.getByRole('banner')

    expect(screen.getByText('식당 상세 정보')).toBeInTheDocument()
    expect(header).toHaveClass('h-[75px]', 'shadow-header', 'w-full')
    expect(header).not.toHaveClass('w-[393px]', 'w-[394px]')
  })

  it('renders caller-provided left and right action slots', () => {
    render(
      <Header
        title="오늘의 식당"
        leftAction={<button type="button">뒤로가기</button>}
        rightAction={<button type="button">공유하기</button>}
      />,
    )

    expect(screen.getByRole('button', { name: '뒤로가기' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '공유하기' })).toBeInTheDocument()
  })

  it('keeps the 75px header height and 18px subtitle line height', () => {
    render(
      <Header
        title="개인정보 수집 및 이용 동의"
        subtitle="최종 업데이트: 2026. 06. 29"
      />,
    )

    expect(screen.getByRole('banner')).toHaveClass('h-[75px]')
    expect(screen.getByText('최종 업데이트: 2026. 06. 29')).toHaveClass(
      'mt-[1.5px]',
      'leading-[18px]',
    )
  })

  it('renders valid falsy subtitle content', () => {
    render(<Header title="알림" subtitle={0} />)

    expect(screen.getByRole('banner')).toHaveClass('h-[75px]')
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('does not render false subtitle content', () => {
    render(<Header title="알림" subtitle={false} />)

    expect(screen.getByRole('banner')).toHaveClass('h-[75px]')
    expect(screen.getByText('알림').parentElement).toHaveTextContent('알림')
    expect(screen.getByText('알림').parentElement?.children).toHaveLength(1)
  })

  it('does not render an empty string subtitle', () => {
    render(<Header title="알림" subtitle="" />)

    expect(screen.getByRole('banner')).toHaveClass('h-[75px]')
    expect(screen.getByText('알림').parentElement?.children).toHaveLength(1)
  })

  it('positions a text right action using the Figma text-action layout', () => {
    render(
      <Header
        rightAction={<button type="button">저장</button>}
        rightActionType={textActionType}
        title="개인정보 및 알림 설정 변경"
      />,
    )

    expect(
      screen.getByRole('button', { name: '저장' }).parentElement,
    ).toHaveClass('top-[26px]', 'right-3', 'h-[39px]', 'w-[45px]')
    expect(
      screen.getByText('개인정보 및 알림 설정 변경').parentElement,
    ).toHaveClass('inset-x-[57px]')
  })

  it('removes the header elevation when elevated is false', () => {
    render(<Header elevated={false} title="마이 리뷰" />)

    expect(screen.getByRole('banner')).toHaveClass('shadow-none')
    expect(screen.getByRole('banner')).not.toHaveClass('shadow-header')
  })

  it('uses the single-line large title layout for restaurant names', () => {
    render(
      <Header
        title="야키니쿠 리키마루 이케부쿠로 히가시구치 텐"
        variant="largeTitle"
      />,
    )

    const title = screen.getByText('야키니쿠 리키마루 이케부쿠로 히가시구치 텐')

    expect(screen.getByRole('banner')).toHaveClass('h-[77px]')
    expect(title).toHaveClass(
      'typo-header-2',
      'truncate',
      'whitespace-nowrap',
      'text-left',
    )
    expect(title).not.toHaveClass('line-clamp-2')
  })

  it('merges root and content class names', () => {
    render(
      <Header
        className="data-test-root"
        contentClassName="data-test-content"
        title="리뷰 작성"
      />,
    )

    expect(screen.getByRole('banner')).toHaveClass('data-test-root')
    expect(screen.getByText('리뷰 작성').parentElement).toHaveClass(
      'data-test-content',
    )
  })
})

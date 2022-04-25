// 引入基础库
import React, { useState, useEffect, useMemo } from 'react'

// 默认每页显示多少条的选项
const defPageSizeOptions: number[] = [10, 20, 50, 100]
// 默认每页条数
const defPageSize: number = defPageSizeOptions[0]
// 默认显示每页条数控制器
const defShowSizeChange: boolean = true
// 默认当前页
const defDefaultCurrent = 1

// 分页器属性类型
type PaginationProps = {
  total: number // 记录总数
  current?: number // 当前页数 基于1
  defaultCurrent?: number // 默认当前页数 默认1
  showSizeChange?: boolean // 是否显示每页条数控制器
  pageSizeOptions?: number[] // 每页显示多少条的选项
  pageSize?: number // 每页条数 注：showSizeChange 为 true 时，以 defPageSizeOptions[0] 为准
  onChange?: (page: number, pageSize: number) => void // 当前页码、每页条数变更事件处理回调函数
}

// 标题对照表
const TitlesMap = {
  previousPage: 'Previous Page',
  nextPage: 'Next Page',
  pageSizeUnit: '/ page'
}

// 每页条数包装器
type PageSizeOptionItem = {
  label: string
  value: number
}

// 转换每页条数包装器
function convertPageSizeOptionsItems(options: number[]): PageSizeOptionItem[] {
  return options.map((value: number) => ({
    label: `${value} ${TitlesMap.pageSizeUnit}`,
    value
  }))
}

export function Pagination({
  total,
  current,
  defaultCurrent = defDefaultCurrent,
  pageSize = defPageSize,
  onChange,
  showSizeChange = defShowSizeChange,
  pageSizeOptions = defPageSizeOptions
}: PaginationProps) {
  // 当前页码
  const [p, setP] = useState<number>(0)
  // 每页条数
  const [ps, setPs] = useState<number>(
    showSizeChange ? defPageSizeOptions[0] : pageSize
  )
  // 最大页码
  const [mp, setMp] = useState<number>(1)
  // 每页条数包装器
  const pageSizeOptionsItems: PageSizeOptionItem[] = useMemo(
    () => convertPageSizeOptionsItems(pageSizeOptions),
    [pageSizeOptions]
  )

  // 执行当前页码、每页条数变更事件处理回调函数
  function dispatchChange() {
    typeof onChange === 'function' && onChange(p, ps)
  }

  /**
   * 当前页处理逻辑
   * current 为 number 时
   * 1.当前页数 > 最大页数，p = 0
   * 2.当前页数 <= 0, p = 0
   * ==============================================
   * current 为 undefined 时
   * 1.没数据时，p = 0
   * 2.默认当前页数 > 最大页数，赋值最大页数，p = maxpage*
   */
  useEffect(() => {
    if (typeof current === 'number') {
      // current 为 number 时
      if (current > mp || current <= 0) {
        setP(0)
      } else {
        setP(current)
      }
    } else {
      // current 为 undefined 时
      if (total === 0) {
        setP(0)
      } else if (defaultCurrent > mp) {
        setP(mp)
      } else {
        setP(defaultCurrent)
      }
    }
  }, [total, mp, defaultCurrent, current])

  // 处理最大页码
  useEffect(() => {
    const maxPage = total <= 0 ? 1 : Math.ceil(total / ps)
    setMp(maxPage)
  }, [total, ps])

  // 同步处理 当前页码、每页条数变更事件处理回调函数
  useEffect(() => {
    dispatchChange()
  }, [p, ps])

  const prevClassName = `pagination-prev ${
    p === 1 ? 'pagination-disabled' : ''
  }`
  const nextClassName = `pagination-next ${
    p === mp ? 'pagination-disabled' : ''
  }`

  return (
    <ul className="pagination">
      <li
        title={TitlesMap.previousPage}
        className={prevClassName}
        onClick={(e: React.MouseEvent<HTMLLIElement>) => {
          setP((p) => --p)
        }}
      >
        prev
      </li>
      {Array(mp)
        .fill(0)
        .map((_, idx) => {
          const page: number = ++idx // 页码
          const className = [
            'pagination-item',
            page === p ? 'pagination-item-active' : ''
          ].join(' ')
          return (
            <li
              key={idx}
              title={String(page)}
              className={className}
              onClick={(e: React.MouseEvent<HTMLLIElement>) => {
                setP(page)
              }}
            >
              {page}
            </li>
          )
        })}
      <li
        title={TitlesMap.nextPage}
        className={nextClassName}
        onClick={(e: React.MouseEvent<HTMLLIElement>) => {
          setP((p) => ++p)
        }}
      >
        next
      </li>
      {showSizeChange && (
        <li className="pagination-options">
          <select
            value={ps}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setPs(Number(e.target.value))
              dispatchChange()
            }}
          >
            {pageSizeOptionsItems.map(
              ({ label, value }: PageSizeOptionItem) => (
                <option key={value} value={value}>
                  {label}
                </option>
              )
            )}
          </select>
        </li>
      )}
    </ul>
  )
}

import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

export function Header({ children }: Props) {
  return (
    <div className="header">
      <h2>
        <strong>Github</strong> Jobs
      </h2>
      <div className="hero">{children}</div>
    </div>
  )
}

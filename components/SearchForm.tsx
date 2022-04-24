import React from 'react'
import { useState } from 'react'
import { useSearchSuggestions } from './useSearchSuggestions'

type SearchFormStaticProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  suggestions: string[]
  isLoading: boolean
  value: string
  onSuggestionClick: (s: string) => void
}

export function SearchFormStatic({
  onSubmit,
  onChange,
  suggestions,
  isLoading,
  value,
  onSuggestionClick
}: SearchFormStaticProps) {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <input type="search" value={value} onChange={onChange} />
      {isLoading ? (
        <ul className="loading suggestions">...</ul>
      ) : (
        suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((s) => (
              <li
                key={s}
                onClick={() =>
                  typeof onSuggestionClick === 'function' &&
                  onSuggestionClick(s)
                }
              >
                <div>{s}</div>
              </li>
            ))}
          </ul>
        )
      )}
      <button>Search</button>
    </form>
  )
}

type SearchFormProps = {
  onKeywordChange: (keyword: string) => void
}

export function SearchForm({ onKeywordChange }: SearchFormProps) {
  const [term, setTerm] = useState<string>('')
  const { suggestions, isLoading } = useSearchSuggestions(term)
  const [showSuggestions, setShowSuggestions] = useState<boolean>(true)
  function dispatchKeywordChange(k: string) {
    typeof onKeywordChange === 'function' && onKeywordChange(k)
    setShowSuggestions(false)
  }

  return (
    <SearchFormStatic
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatchKeywordChange(term)
      }}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setTerm(e.target.value)
        setShowSuggestions(true)
        if (e.target.value.length === 0) dispatchKeywordChange('')
      }}
      onSuggestionClick={(s: string) => {
        setTerm(s)
        dispatchKeywordChange(s)
      }}
      value={term}
      suggestions={showSuggestions ? suggestions : []}
      isLoading={isLoading}
    />
  )
}

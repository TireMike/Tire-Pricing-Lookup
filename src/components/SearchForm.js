import React, { useState } from "react"

function SearchForm({ onSearch, isLoading }) {
  const [partNumber, setPartNumber] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (partNumber.trim()) {
      onSearch(partNumber.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={partNumber}
        onChange={(e) => setPartNumber(e.target.value)}
        placeholder="Enter part number"
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        Search
      </button>
    </form>
  )
}

export default SearchForm


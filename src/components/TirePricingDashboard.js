import React, { useState } from "react"
import axios from "axios"
import SearchForm from "./SearchForm"
import TireCard from "./TireCard"

function TirePricingDashboard() {
  const [tires, setTires] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (partNumber) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.post("http://localhost:3001/api/query", { input: partNumber })
      setTires(response.data)
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred while fetching data")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="tire-pricing-dashboard">
      <SearchForm onSearch={handleSearch} isLoading={isLoading} />
      {isLoading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="tire-grid">
        {tires.map((tire) => (
          <TireCard key={tire.MY_PRODUCT_ID} tire={tire} />
        ))}
      </div>
    </div>
  )
}

export default TirePricingDashboard


"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import SearchForm from "./SearchForm"
import TireCard from "./TireCard"

interface TireData {
  MY_PRODUCT_ID: string
  PART_NUMBER: string
  BRAND: string
  CURRENT_PRICE_AMAZON: number
  CURRENT_PRICE_EBAY: number
  TOTAL_UNITS_ON_HAND: number
  AMAZON_URL: string
  EBAY_URL: string
}

const fetchTireData = async (partNumber: string): Promise<TireData[]> => {
  const response = await fetch("/api/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input: partNumber }),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch tire data")
  }

  return response.json()
}

export default function TirePricingDashboard() {
  const [partNumber, setPartNumber] = useState("")
  const { data, error, isLoading, refetch } = useQuery<TireData[], Error>({
    queryKey: ["tireData", partNumber],
    queryFn: () => fetchTireData(partNumber),
    enabled: false,
  })

  const handleSearch = (searchTerm: string) => {
    setPartNumber(searchTerm)
    refetch()
  }

  return (
    <div>
      <SearchForm onSearch={handleSearch} isLoading={isLoading} />
      {isLoading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center mt-4 text-red-500">{error.message}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {data && data.length > 0
          ? data.map((tire) => <TireCard key={tire.MY_PRODUCT_ID} tire={tire} />)
          : data && <p className="col-span-full text-center">No results found</p>}
      </div>
    </div>
  )
}


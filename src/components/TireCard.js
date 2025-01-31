import React from "react"

function TireCard({ tire }) {
  return (
    <div className="tire-card">
      <h2>{tire.PART_NUMBER}</h2>
      <p>
        <strong>Brand:</strong> {tire.BRAND}
      </p>
      <p>
        <strong>Price (Amazon):</strong> ${tire.CURRENT_PRICE_AMAZON.toFixed(2)}
      </p>
      <p>
        <strong>Price (eBay):</strong> ${tire.CURRENT_PRICE_EBAY.toFixed(2)}
      </p>
      <p>
        <strong>Inventory:</strong> {tire.TOTAL_UNITS_ON_HAND}
      </p>
      <div className="tire-links">
        <a href={tire.AMAZON_URL} target="_blank" rel="noopener noreferrer">
          View on Amazon
        </a>
        <a href={tire.EBAY_URL} target="_blank" rel="noopener noreferrer">
          View on eBay
        </a>
      </div>
    </div>
  )
}

export default TireCard


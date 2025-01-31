import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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

interface TireCardProps {
  tire: TireData
}

export default function TireCard({ tire }: TireCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{tire.PART_NUMBER}</CardTitle>
      </CardHeader>
      <CardContent>
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
        <div className="mt-4 space-x-2">
          <Button asChild variant="outline">
            <a href={tire.AMAZON_URL} target="_blank" rel="noopener noreferrer">
              View on Amazon
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={tire.EBAY_URL} target="_blank" rel="noopener noreferrer">
              View on eBay
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


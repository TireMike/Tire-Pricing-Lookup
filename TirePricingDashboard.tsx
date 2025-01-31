import React from "react"
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Link,
  Alert,
  CircularProgress,
  Grid,
} from "@mui/material"
import { Search as SearchIcon } from "@mui/icons-material"
import { useQuery } from "react-query"

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
  const response = await fetch("http://localhost:5009/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input: partNumber }),
  })

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.status}`)
  }

  return response.json()
}

export default function TirePricingDashboard() {
  const [partNumber, setPartNumber] = React.useState("")
  const { data, error, isLoading, refetch } = useQuery<TireData[], Error>(
    ["tireData", partNumber],
    () => fetchTireData(partNumber),
    { enabled: false },
  )

  const handleSearch = () => {
    if (partNumber) {
      refetch()
    }
  }

  const handleLinkClick = (url: string) => {
    console.log(`Navigating to: ${url}`)
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Tire Pricing Dashboard
      </Typography>

      <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ mb: 4 }}>
        <Grid item xs={12} sm={8} md={6}>
          <TextField
            fullWidth
            label="Enter part number"
            variant="outlined"
            value={partNumber}
            onChange={(e) => setPartNumber(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSearch}
            startIcon={<SearchIcon />}
            disabled={isLoading}
          >
            Search
          </Button>
        </Grid>
      </Grid>

      {isLoading && <CircularProgress sx={{ display: "block", margin: "20px auto" }} />}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error.message}
        </Alert>
      )}

      <Grid container spacing={3}>
        {data && data.length > 0
          ? data.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.MY_PRODUCT_ID}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {item.PART_NUMBER}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Brand:</strong> {item.BRAND}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Price (Amazon):</strong> ${item.CURRENT_PRICE_AMAZON.toFixed(2)}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Price (eBay):</strong> ${item.CURRENT_PRICE_EBAY.toFixed(2)}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Inventory:</strong> {item.TOTAL_UNITS_ON_HAND}
                    </Typography>
                    <Link
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        handleLinkClick(item.AMAZON_URL)
                      }}
                      sx={{ display: "block", mt: 1 }}
                    >
                      View on Amazon
                    </Link>
                    <Link
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        handleLinkClick(item.EBAY_URL)
                      }}
                      sx={{ display: "block", mt: 1 }}
                    >
                      View on eBay
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            ))
          : data && <Typography sx={{ mt: 2 }}>No results found</Typography>}
      </Grid>
    </Container>
  )
}


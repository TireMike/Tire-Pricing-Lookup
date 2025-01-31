const express = require("express")
const snowflake = require("snowflake-sdk")
const dotenv = require("dotenv")

dotenv.config()

const app = express()
app.use(express.json())

const snowflakeConfig = {
  account: process.env.SNOWFLAKE_ACCOUNT,
  username: process.env.SNOWFLAKE_USER,
  authenticator: "EXTERNALBROWSER",
  warehouse: process.env.SNOWFLAKE_WAREHOUSE,
  database: process.env.SNOWFLAKE_DATABASE,
  schema: process.env.SNOWFLAKE_SCHEMA,
}

app.post("/api/query", (req, res) => {
  console.log("Received query request:", req.body)
  const { input } = req.body

  const connection = snowflake.createConnection(snowflakeConfig)

  connection.connect((err) => {
    if (err) {
      console.error("Unable to connect to Snowflake:", err)
      res.status(500).json({ error: "Database connection error" })
      return
    }

    console.log("Connected to Snowflake")

    const query = `
      SELECT 
        MY_PRODUCT_ID, 
        PART_NUMBER, 
        BRAND, 
        CURRENT_PRICE_AMAZON, 
        CURRENT_PRICE_EBAY, 
        TOTAL_UNITS_ON_HAND, 
        AMAZON_URL, 
        EBAY_URL
      FROM TIRES
      WHERE PART_NUMBER = ?
    `

    connection.execute({
      sqlText: query,
      binds: [input],
      complete: (err, stmt, rows) => {
        connection.destroy()

        if (err) {
          console.error("Failed to execute query:", err)
          res.status(500).json({ error: "Query execution error" })
          return
        }

        console.log("Query executed successfully, rows:", rows.length)
        res.json(rows)
      },
    })
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.use((err, req, res, next) => {
  console.error("Server error:", err)
  res.status(500).json({ error: "Internal server error" })
})


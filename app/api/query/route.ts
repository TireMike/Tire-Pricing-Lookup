import { NextResponse } from "next/server"
import snowflake from "snowflake-sdk"

const snowflakeConfig = {
  account: process.env.SNOWFLAKE_ACCOUNT,
  username: process.env.SNOWFLAKE_USER,
  password: process.env.SNOWFLAKE_PASSWORD,
  warehouse: process.env.SNOWFLAKE_WAREHOUSE,
  database: process.env.SNOWFLAKE_DATABASE,
  schema: process.env.SNOWFLAKE_SCHEMA,
}

export async function POST(request: Request) {
  try {
    const { input } = await request.json()

    return new Promise((resolve) => {
      const connection = snowflake.createConnection(snowflakeConfig)

      connection.connect((err) => {
        if (err) {
          console.error("Unable to connect to Snowflake:", err)
          resolve(NextResponse.json({ error: "Database connection error" }, { status: 500 }))
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
              resolve(NextResponse.json({ error: "Query execution error" }, { status: 500 }))
              return
            }

            console.log("Query executed successfully, rows:", rows.length)
            resolve(NextResponse.json(rows))
          },
        })
      })
    })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}


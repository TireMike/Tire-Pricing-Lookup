/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SNOWFLAKE_USER: process.env.SNOWFLAKE_USER,
    SNOWFLAKE_ACCOUNT: process.env.SNOWFLAKE_ACCOUNT,
    SNOWFLAKE_AUTHENTICATOR: process.env.SNOWFLAKE_AUTHENTICATOR,
    SNOWFLAKE_WAREHOUSE: process.env.SNOWFLAKE_WAREHOUSE,
    SNOWFLAKE_DATABASE: process.env.SNOWFLAKE_DATABASE,
    SNOWFLAKE_SCHEMA: process.env.SNOWFLAKE_SCHEMA,
  },
}

module.exports = nextConfig


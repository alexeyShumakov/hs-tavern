use Mix.Config


# We don't run a server during test. If one is required,
# you can enable the server option below.
config :hs_tavern, HsTavernWeb.Endpoint,
  http: [port: 4001],
  server: true

config :hs_tavern, :sql_sandbox, true


# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :hs_tavern, HsTavern.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "hs_tavern_test",
  hostname: "localhost",
  timeout: 60_000,
  ownership_timeout: 60_000,
  pool_timeout: 60_000,
  pool: Ecto.Adapters.SQL.Sandbox

# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :hs_tavern,
  ecto_repos: [HsTavern.Repo]

# Configures the endpoint
config :hs_tavern, HsTavern.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "uMaHMwzutkHh/ObAPpQsFVK1NVYHprbzg94Q1HW50eJf60jJBzGcz1FxY7IA/khz",
  render_errors: [view: HsTavern.ErrorView, accepts: ~w(html json)],
  pubsub: [name: HsTavern.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

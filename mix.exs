defmodule HsTavern.Mixfile do
  use Mix.Project

  def project do
    [app: :hs_tavern,
     version: "0.0.1",
     elixir: "~> 1.2",
     elixirc_paths: elixirc_paths(Mix.env),
     compilers: [:phoenix, :gettext] ++ Mix.compilers,
     build_embedded: Mix.env == :prod,
     start_permanent: Mix.env == :prod,
     aliases: aliases(),
     deps: deps()]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [
      mod: {HsTavern.Application, []},
      applications: [
        :ex_machina,
        :phoenix, :phoenix_pubsub, :phoenix_html, :cowboy,
        :logger, :gettext, :phoenix_ecto, :postgrex,
        :httpoison, :scrivener_ecto, :arc_ecto, :poolboy,
        :ueberauth, :ueberauth_facebook,
        :ex_aws, :hackney, :poison
      ]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_),     do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:phoenix, "~> 1.3.0", override: true},
      {:phoenix_pubsub, "~> 1.0"},
      {:phoenix_ecto, "~> 3.0"},
      {:postgrex, ">= 0.0.0"},
      {:phoenix_html, "~> 2.6"},
      {:phoenix_live_reload, "~> 1.0", only: :dev},
      {:gettext, "~> 0.11"},
      {:httpoison, ">= 0.0.0", override: true},
      {:scrivener_ecto, "~> 1.2"},
      {:arc, "~> 0.8.0"},
      {:arc_ecto, "~> 0.7.0"},
      {:ex_aws, "~> 1.1"},
      {:hackney, "~> 1.0", override: true},
      {:poison, ">= 0.0.0", override: true},
      {:sweet_xml, "~> 0.6"},
      {:ecto_autoslug_field, "~> 0.2"},
      {:guardian, "~> 0.14"},
      {:ueberauth, "~> 0.4.0"},
      {:ueberauth_facebook, "~> 0.6"},
      {:cowboy, "~> 1.0"},
      {:giphy, "~> 0.1.1"},
      {:wallaby, "~> 0.18.1"},
      {:ex_machina, "~> 2.0"},
      {:credo, "~> 0.8", only: [:dev, :test], runtime: false},
      {:canada, "~> 1.0.1"},
      {:mock, "~> 0.2.0", only: :test}
    ]
  end
  # Aliases are shortcuts or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    ["ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
     "ecto.reset": ["ecto.drop", "ecto.setup"],
     "test": ["ecto.create --quiet", "ecto.migrate", "test"]]
  end
end

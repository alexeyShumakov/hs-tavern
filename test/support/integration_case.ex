defmodule HsTavernWeb.IntegrationCase do
  use ExUnit.CaseTemplate

  using do
    quote do
      use Wallaby.DSL

      alias HsTavern.Repo
      import Ecto
      import Ecto.Changeset
      import Ecto.Query

      import HsTavernWeb.Router.Helpers
    end
  end

  setup tags do
    :ok = Ecto.Adapters.SQL.Sandbox.checkout(HsTavern.Repo)

    unless tags[:async] do
      Ecto.Adapters.SQL.Sandbox.mode(HsTavern.Repo, {:shared, self()})
    end

    metadata = Phoenix.Ecto.SQL.Sandbox.metadata_for(HsTavern.Repo, self())
    {:ok, session} = Wallaby.start_session(metadata: metadata)
    {:ok, session: session}
  end
end

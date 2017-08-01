Enum.each([:wallaby], fn(app_name)->
  {:ok, _} = Application.ensure_all_started(app_name)
end)

Application.put_env(:wallaby, :base_url, HsTavernWeb.Endpoint.url)
Ecto.Adapters.SQL.Sandbox.mode(HsTavern.Repo, :manual)

ExUnit.start


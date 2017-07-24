Enum.each([:wallaby, :ex_machina], fn(app_name)->
  {:ok, _} = Application.ensure_all_started(app_name)
end)

Application.put_env(:wallaby, :base_url, HsTavern.Endpoint.url)
Ecto.Adapters.SQL.Sandbox.mode(HsTavern.Repo, :manual)

ExUnit.start


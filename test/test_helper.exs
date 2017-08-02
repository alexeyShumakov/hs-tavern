Enum.each([:wallaby], fn(app_name)->
  {:ok, _} = Application.ensure_all_started(app_name)
end)

Application.put_env(:wallaby, :base_url, HsTavernWeb.Endpoint.url)
Ecto.Adapters.SQL.Sandbox.mode(HsTavern.Repo, :manual)
ExUnit.start

defmodule HsTavernWeb.TestHelper do
  use HsTavernWeb.ConnCase
  def guardian_login(user) do
    build_conn()
    |> bypass_through(HsTavernWeb.Router, [:browser])
    |> get("/")
    |> Guardian.Plug.sign_in(user)
    |> send_resp(200, "")
    |> recycle()
  end
end

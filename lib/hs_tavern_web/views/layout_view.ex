defmodule HsTavernWeb.LayoutView do
  use HsTavern.Web, :view

  def shared_json_data(conn) do
    conn
    |> get_user_data
    |> Map.put(:is_authenticated, Guardian.Plug.authenticated?(conn))
    |> Map.put(:csrf_token, get_csrf_token())
    |> Map.put(:token, Guardian.Plug.current_token(conn))
    |> (fn map -> %{user: map} end).()
    |> Poison.encode!
    |> escape_javascript
    |> raw
  end

  def get_user_data(conn) do
    case Guardian.Plug.authenticated?(conn) do
      true ->
        conn
        |> Guardian.Plug.current_resource
        |> HsTavern.Serializers.UserSerializer.to_map
      false -> %{}
    end
  end
end

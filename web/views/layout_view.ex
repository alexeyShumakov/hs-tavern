defmodule HsTavern.LayoutView do
  use HsTavern.Web, :view

  def shared_json_data(conn) do
    get_user_data(conn)
    |> Map.put(:is_authenticated, Guardian.Plug.authenticated?(conn))
    |> Map.put(:csrf_token, get_csrf_token)
    |> (fn map -> %{user: map} end).()
    |> Poison.encode!
    |> escape_javascript
    |> raw
  end

  def get_user_data(conn) do
    case Guardian.Plug.authenticated?(conn) do
      true ->
        user = Guardian.Plug.current_resource(conn)
        %{
          token: Guardian.Plug.current_token(conn),
          email: user.email,
          name: user.name
        }
      false -> %{}
    end
  end
end

defmodule HsTavern.Api.UserController do
  use HsTavern.Web, :controller
  alias HsTavern.UserProvider
  alias HsTavern.Serializers.UserSerializer

  def search(conn, params) do
    users = UserProvider.search_users(params) |> UserSerializer.to_map
    conn |> json(users)
  end
end

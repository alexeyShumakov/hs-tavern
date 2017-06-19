defmodule HsTavern.Api.DeskController do
  use HsTavern.Web, :controller
  use Guardian.Phoenix.Controller
  alias HsTavern.DeskProvider
  alias HsTavern.Serializers.DeskSerializer

  def index(conn, params, user, _) do
    desks = DeskProvider.get_desks(user) |> DeskSerializer.to_map
    json(conn, desks)
  end

  def check_user(conn) do
    unless Guardian.Plug.authenticated?(conn) do
      conn |> json(%{status: :authenticated})
    end
  end
end

defmodule HsTavern.Api.DeskController do
  use HsTavern.Web, :controller
  use Guardian.Phoenix.Controller
  alias HsTavern.DeskProvider
  alias HsTavern.Serializers.DeskSerializer

  def index(conn, params, user, _) do
    {desks, filters} = DeskProvider.get_desks_with_filters(user, params)
    desks = DeskSerializer.short_to_map(desks)
    json(conn, %{desks: desks, filters: filters})
  end

  def show(conn, %{"id" => id}, user, _) do
    desk = DeskProvider.one_desk!(id, user) |> DeskSerializer.to_map
    json(conn, desk)
  end

  def check_user(conn) do
    unless Guardian.Plug.authenticated?(conn) do
      conn |> json(%{status: :authenticated})
    end
  end
end

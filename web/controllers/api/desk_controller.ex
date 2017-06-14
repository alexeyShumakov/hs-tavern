defmodule HsTavern.Api.DeskController do
  use HsTavern.Web, :controller
  use Guardian.Phoenix.Controller
  alias HsTavern.Desk
  alias HsTavern.DeskCard
  alias HsTavern.Serializers.DeskSerializer

  def index(conn, params, user, _) do
    query =  from d in Desk,
      join: u in assoc(d, :user),
      order_by: [desc: d.inserted_at],
      preload: [user: u]
    desks = query |> Repo.all |> DeskSerializer.to_map
    json(conn, desks)
  end

  def check_user(conn) do
    unless Guardian.Plug.authenticated?(conn) do
      conn |> json(%{status: :authenticated})
    end
  end
end

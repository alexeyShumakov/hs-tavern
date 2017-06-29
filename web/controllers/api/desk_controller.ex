defmodule HsTavern.Api.DeskController do
  use HsTavern.Web, :controller
  use Guardian.Phoenix.Controller
  alias HsTavern.DeskProvider
  alias HsTavern.Serializers.DeskSerializer
  plug Guardian.Plug.EnsureAuthenticated when action in [:delete]

  def index(conn, params, user, _) do
    {desks, filters} = DeskProvider.get_desks_with_filters(user, params)
    desks = DeskSerializer.short_to_map(desks)
    json(conn, %{desks: desks, filters: filters})
  end

  def show(conn, %{"id" => id}, user, _) do
    desk = DeskProvider.one_desk!(id, user) |> DeskSerializer.to_map
    json(conn, desk)
  end

  def delete(conn, %{"id" => id}, user, _) do
    desk = Repo.get!(HsTavern.Desk, id)
    if desk.user_id == user.id do
      Repo.delete! desk
    end
    json(conn, %{status: :deleted})
  end
end

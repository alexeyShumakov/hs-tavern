defmodule HsTavern.DeskController do
  use HsTavern.Web, :controller
  use Guardian.Phoenix.Controller
  alias HsTavern.{DeskProvider, Permissions}
  import Canada, only: [can?: 2]

  plug Guardian.Plug.EnsureAuthenticated when action in [:my_desks, :edit]

  def index(conn, params, user, _) do
    desks = DeskProvider.get_desks(user, params)
    render(conn, "index.html", desks: desks)
  end

  def my_desks(conn, params, user, _) do
    params = Map.put params, "my", "true"
    {desks, filters} = DeskProvider.get_desks_with_filters(user, params)
    render(conn, "my_desks.html", desks: desks, filters: filters)
  end

  def show(conn, %{"id" => id}, user, _) do
    desk = DeskProvider.one_desk!(id, user)
    render(conn, "show.html", desk: desk)
  end

  def edit(conn, %{"id" => id}, user, _) do
    desk = DeskProvider.one_desk!(id, user)
    if !can?(user, edit(desk)), do: Permissions.browser_forbidden(conn)

    params = %{"class" => desk.player_class, "page_size" => 6}
    {cards, filters} = HsTavern.CardFilter.filter(params)
    render(conn, "edit.html", cards: cards, filters: filters, desk: desk)
  end
end

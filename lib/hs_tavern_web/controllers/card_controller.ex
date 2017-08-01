defmodule HsTavernWeb.CardController do
  use HsTavern.Web, :controller
  use Guardian.Phoenix.Controller

  alias HsTavern.{CardFilter, CardProvider}

  def index(conn, params, _, _) do
    {cards, filters} = CardFilter.filter(params)
    render(conn, "index.html", cards: cards, filters: filters)
  end

  def show(conn, %{"id" => id}, user, _) do
    card = CardProvider.one_card!(id, user)
    render(conn, "show.html", card: card)
  end
end

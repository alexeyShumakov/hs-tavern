defmodule HsTavern.CardController do
  use HsTavern.Web, :controller
  use Guardian.Phoenix.Controller

  alias HsTavern.{Card, CardProvider}

  def index(conn, params, user, _) do
    {cards, filters} = HsTavern.CardFilter.filter(params)
    render(conn, "index.html", cards: cards, filters: filters)
  end

  def show(conn, %{"id" => id}, user, _) do
    card = CardProvider.one_card!(id, user)
    render(conn, "show.html", card: card, user: user)
  end
end

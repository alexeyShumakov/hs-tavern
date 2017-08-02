defmodule HsTavernWeb.Ajax.CardController do
  use HsTavern.Web, :controller
  use Guardian.Phoenix.Controller

  alias HsTavern.CardProvider

  def index(conn, params, _user, _) do
    {cards, filters} = HsTavern.CardFilter.filter(params)
    render(conn, "index.json", cards: cards, filters: filters)
  end

  def show(conn, %{"id" => id}, user, _) do
    card = CardProvider.one_card!(id, user)
    render(conn, "show.json", card: card)
  end
end

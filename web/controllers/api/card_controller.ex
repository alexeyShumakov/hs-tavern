defmodule HsTavern.Api.CardController do
  use HsTavern.Web, :controller

  alias HsTavern.Card
  alias HsTavern.CardProvider

  def index(conn, params) do
    {cards, filters} = HsTavern.CardFilter.filter(params)
    render(conn, "index.json", cards: cards, filters: filters)
  end

  def show(conn, %{"id" => id}) do
    card = CardProvider.one_card!(id)
    render(conn, "show.json", card: card)
  end
end

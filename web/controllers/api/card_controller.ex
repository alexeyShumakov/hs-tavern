defmodule HsTavern.Api.CardController do
  use HsTavern.Web, :controller

  alias HsTavern.Card
  alias HsTavern.CardProvider

  def index(conn, _params) do
    cards = Repo.all(Card)
    render(conn, "index.json", cards: cards)
  end

  def show(conn, %{"id" => id}) do
    card = CardProvider.one_card!(id)
    render(conn, "show.json", card: card)
  end
end

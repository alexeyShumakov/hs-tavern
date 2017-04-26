defmodule HsTavern.Api.CardController do
  use HsTavern.Web, :controller

  alias HsTavern.Card

  def index(conn, _params) do
    cards = Repo.all(Card)
    render(conn, "index.json", cards: cards)
  end

  def show(conn, %{"id" => id}) do
    card = Repo.get!(Card, id)
    render(conn, "show.json", card: card)
  end
end

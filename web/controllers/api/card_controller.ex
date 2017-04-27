defmodule HsTavern.Api.CardController do
  use HsTavern.Web, :controller

  alias HsTavern.Card
  alias HsTavern.CardProvider

  def index(conn, params) do
    page = Card |> Repo.paginate(params)
    render(conn, "index.json", cards: page.entries)
  end

  def show(conn, %{"id" => id}) do
    card = CardProvider.one_card!(id)
    render(conn, "show.json", card: card)
  end
end

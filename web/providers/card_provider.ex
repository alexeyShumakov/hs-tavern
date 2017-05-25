defmodule HsTavern.CardProvider do
  import Ecto.Query
  alias HsTavern.Card

  def one_card!(id) do
    case Integer.parse(id) do
      :error ->
        query = from card in Card,
          left_join: c in assoc(card, :comments),
          left_join: u in assoc(c, :user),
          where: card.slug == ^id,
          preload: [comments: {c, user: u}]

      {value, "" } ->
        query = from card in Card,
          left_join: c in assoc(card, :comments),
          left_join: u in assoc(c, :user),
          where: card.slug == ^id,
          or_where: card.id == ^id,
          preload: [comments: {c, user: u}]
    end

    HsTavern.Repo.one!(query)
  end
end

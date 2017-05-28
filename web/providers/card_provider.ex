defmodule HsTavern.CardProvider do
  import Ecto.Query
  alias HsTavern.Card

  def one_card!(slug) do
    sub = from c in HsTavern.Comment,
      left_join: u in assoc(c, :user),
      order_by: :inserted_at,
      preload: [user: u]

    query = from card in Card,
      where: [slug: ^slug],
      preload: [comments: ^sub]

    HsTavern.Repo.one!(query)
  end
end

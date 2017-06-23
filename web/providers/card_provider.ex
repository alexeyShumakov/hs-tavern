defmodule HsTavern.CardProvider do
  import Ecto.Query
  alias HsTavern.{Repo, Card, CommentProvider}

  def one_card!(id, user) do
    card = get_card(id, user) |> check_card(user)
  end

  def check_card(card, nil) do
    Map.put(card, :like_me, false)
  end

  def check_card(card, user) do
    Map.put(card, :like_me, Enum.member?(card.likes_users, user))
  end

  def get_card(id, user) do
    query = from card in Card,
      left_join: l in assoc(card, :likes),
      left_join: u in assoc(l, :user),
      preload: [:likes_users, likes: {l, user: u}]
    card = find_card(id, query)
    params = %{entity_id: card.id, entity_type: "card", comments_count: card.comments_count}
    Map.put(card, :comments, CommentProvider.get_last_three_comments(params, user))
  end

  def find_card(id, query) when is_integer(id), do: Repo.get!(query, id)
  def find_card(id, query) when is_bitstring(id), do: query |> where(slug: ^id) |> Repo.one!
end

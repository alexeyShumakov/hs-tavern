defmodule HsTavern.CardProvider do
  import Ecto.Query
  alias HsTavern.{Repo, Card, CommentProvider}

  def one_card!(slug, user) do
    card = get_card(slug, user) |> check_card(user)
  end

  def check_card(card, nil) do
      Map.put(card, :like_me, false)
  end

  def check_card(card, user) do
    case  Enum.member?(card.likes_users, user) do
      false-> Map.put(card, :like_me, true)
      true -> Map.put(card, :like_me, true)
    end
  end

  def get_card(slug, user) do
    query = from card in Card,
      left_join: l in assoc(card, :likes),
      left_join: u in assoc(l, :user),
      where: [slug: ^slug],
      preload: [:likes_users, likes: {l, user: u}]

    card = Repo.one!(query)
    params = %{entity_id: card.id, entity_type: "card", comments_count: card.comments_count}
    comments = CommentProvider.get_last_three_comments(params, user)
    card |> Map.put(:comments, comments)
  end
end

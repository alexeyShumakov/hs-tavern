defmodule HsTavern.CardProvider do
  import Ecto.Query
  alias HsTavern.Card
  alias HsTavern.CommentProvider

  def one_card!(slug, nil) do
    get_card(slug)
  end

  def one_card!(slug, user) do
    card = get_card(slug) |> check_card(user)

    card |> Map.put(:comments, CommentProvider.check_comments(card.comments, user))
  end

  def check_card(card, user) do
    case  Enum.member?(card.likes_users, user) do
      false-> card
      true -> Map.put(card, :like_me, true)
    end
  end

  def get_card(slug) do
    sub = CommentProvider.comments_query
    query = from card in Card,
      left_join: l in assoc(card, :likes),
      left_join: u in assoc(l, :user),
      where: [slug: ^slug],
      preload: [:likes_users, comments: ^sub, likes: {l, user: u}]

    HsTavern.Repo.one!(query)
  end
end

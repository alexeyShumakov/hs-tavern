defmodule HsTavern.CardProvider do
  import Ecto.Query
  alias HsTavern.Card

  def one_card!(slug, nil) do
    get_card(slug)
  end

  def one_card!(slug, user) do
    card = get_card(slug)

    comment_ids = Enum.map(card.comments, fn comment -> comment.id end)

    q = from l in HsTavern.Like,
      left_join: u in assoc(l, :user),
      where: l.user_id == ^user.id,
      where: l.entity_type == "comment",
      where: l.entity_id in ^comment_ids,
      preload: [user: u]
    likes = HsTavern.Repo.all(q)

    comments = Enum.map(card.comments, fn comment -> Map.put(comment, :like_me,  check_comment(likes, comment))  end)
    card |> Map.put(:comments, comments)
  end

  def check_comment(likes, comment) do
    Enum.find_value(likes, fn like -> like.entity_id == comment.id  end)
  end

  def get_card(slug) do
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

defmodule HsTavern.CommentProvider do
  import Ecto.Query
  alias HsTavern.Comment

  def get_comments(%{entity_id: entity_id}, nil) do
    comments(entity_id)
  end

  def get_comments(%{entity_id: entity_id}, user) do
    comments(entity_id) |> check_comments(user)
  end

  def check_comments(comments, user) do
    comments |> Enum.map(
      fn comment -> Map.put(comment, :like_me, Enum.member?(comment.likes_users, user) ) end
    )

  end
  def comments(entity_id) do
    HsTavern.Repo.all(comments_query)
  end

  def comments_query() do
    from c in HsTavern.Comment,
      left_join: u in assoc(c, :user),
      left_join: l in assoc(c, :likes),
      left_join: like_u in assoc(l, :user),
      order_by: :inserted_at,
      preload: [:likes_users, user: u, likes: {l, user: like_u}]

  end
end

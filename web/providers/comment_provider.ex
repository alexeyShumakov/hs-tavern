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
    comments_query |> where(card_id: ^entity_id) |> HsTavern.Repo.all
  end

  def calc_offset(total_count) do
    offset = total_count - 3;
    cond do
      offset < 0 -> 0
      offset >= 0 -> offset
    end
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

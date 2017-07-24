defmodule HsTavern.CommentProvider do
  import Ecto.Query
  alias HsTavern.{Comment, Repo}

  def get_comment!(id, user) do
    comments_query()
    |> Repo.get!(id)
    |> check_comment(user)
  end

  def get_last_three_comments(%{comments_count: comments_count} = params, user) do
    offset = calc_offset(comments_count)

    params
    |> Map.drop([:comments_count])
    |> comments
    |> offset(^offset)
    |> limit(3)
    |> Repo.all
    |> check_comments(user)
  end

  def get_comments(params, user) do
    comments(params)
    |> Repo.all
    |> check_comments(user)
  end

  def check_comment(comment, user) do
      Map.put(comment, :like_me, Enum.member?(comment.likes_users, user))
  end

  def check_comments(comments, nil), do: comments
  def check_comments(comments, user) do
    comments |> Enum.map(fn comment -> check_comment(comment, user)end)
  end


  def comments(%{entity_id: entity_id, entity_type: entity_type}) do
    comments_query()
    |> where(entity_type: ^entity_type)
    |> where(entity_id: ^entity_id)
    |> limit(100)
  end

  def calc_offset(total_count) do
    offset = total_count - 3;
    cond do
      offset < 0 -> 0
      offset >= 0 -> offset
    end
  end

  def comments_query() do
    from c in Comment,
      left_join: u in assoc(c, :user),
      left_join: l in assoc(c, :likes),
      left_join: like_u in assoc(l, :user),
      order_by: :inserted_at,
      preload: [:likes_users, user: u, likes: {l, user: like_u}]
  end
end

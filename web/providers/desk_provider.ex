defmodule HsTavern.DeskProvider do
  import Ecto.Query
  alias HsTavern.{Repo, Desk, CommentProvider}

  def one_desk!(id, nil) do
    get_desk id
  end

  def one_desk!(id, user) do
    desk = get_desk(id) |> check_like(user)
  end

  def check_like(desk, nil) do
    Map.put desk, :like_me,false
  end

  def check_like(desk, user) do
    Map.put(desk, :like_me, Enum.member?(desk.likes_users, user))
  end

  def get_desk(id) do
    query = desk_query() |> where(id: ^id)

    desk = Repo.one!(query)
  end

  def get_desks(nil) do
    Repo.all(desk_query())
  end

  def get_desks(user) do
    Repo.all(desk_query()) |> Enum.map(fn desk -> check_like(desk, user) end)
  end

  def desk_query do
    from desk in Desk,
      left_join: user in assoc(desk, :user),
      left_join: l in assoc(desk, :likes),
      left_join: u in assoc(l, :user),
      order_by: [desc: desk.inserted_at],
      preload: [:likes_users, user: user, likes: {l, user: u}]
  end
end

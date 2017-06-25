defmodule HsTavern.DeskProvider do
  import Ecto.Query
  alias HsTavern.{Like, DeskCard, User, Repo, Desk, CommentProvider}


  def one_desk!(id, user) do
   get_desk(id, user) |> check_like(user)
  end


  def get_desk(id, user) do

    desk = desk_query(id)
    params = %{comments_count: desk.comments_count, entity_id: id, entity_type: "desk"}
    comments = CommentProvider.get_last_three_comments(params, user)
    Map.put desk, :comments, comments
  end

  def get_desks(user, params \\ %{}) do
    {desks, _filters} = desks_query(params)
    check_like(desks, user)
  end

  def get_desks_with_filters(user, params \\ %{}) do
    {desks, filters} = desks_query(params)
    {check_like(desks, user), filters}
  end

  def check_like(desks, user) when is_list(desks) do
    desks |> Enum.map(fn desk -> check_like(desk, user) end)
  end
  def check_like(desk, nil), do: Map.put(desk, :like_me, false)
  def check_like(desk, user), do: Map.put(desk, :like_me, Enum.member?(desk.likes_users, user))

  def desk_query(id) do
    query = from desk in Desk,
      left_join: desk_cards in assoc(desk, :cards),
      left_join: card in assoc(desk_cards, :card),
      left_join: user in assoc(desk, :user),
      left_join: l in assoc(desk, :likes),
      left_join: u in assoc(l, :user),
      where: [id: ^id],
      preload: [:likes_users, user: user, likes: {l, user: u}, cards: {desk_cards, card: card}]
    Repo.one!(query)
  end

  def desks_query(params) do
    likes_query = from l in Like,
      left_join: u in assoc(l, :user),
      preload: [user: u]

    desk_q = from desk in Desk,
      left_join: user in assoc(desk, :user),
      order_by: [desc: desk.inserted_at],
      preload: [user: user, likes: ^likes_query]
    pag = Repo.paginate(desk_q, page_size: 12, page: params["page"])
    filters = %{page: pag.page_number, total_pages: pag.total_pages}
    {Repo.preload(pag.entries, :likes_users), filters}
  end
end

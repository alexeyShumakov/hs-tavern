defmodule HsTavern.DeskProvider do
  import Ecto.Query
  alias HsTavern.{Like, Repo, Desk, CommentProvider}


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
    {desks, filters} = desks_query(params, user)
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

  def desks_query(params, current_user \\ nil) do
    likes_query = from l in Like,
      left_join: u in assoc(l, :user),
      preload: [user: u]

    desk_q = from desk in Desk,
      left_join: user in assoc(desk, :user),
      preload: [user: user, likes: ^likes_query]

    {desks, filters} = {desk_q, %{}, params}
    |> keyword_filter
    |> class_filter
    |> popularity_filter
    |> user_filter(current_user)
    |> page_filter

    {Repo.preload(desks, :likes_users), filters}
  end

  defp keyword_filter({query, filters, params}) do
    case params["keyword"] do
      nil -> { query, Map.put(filters, :keyword, ""), params }
      keyword -> {
        query |> where([d], ilike(d.title, ^"%#{keyword}%")),
        Map.put(filters, :keyword, keyword),
        params
      }
    end
  end

  defp user_filter({query, filters, params}, nil), do: {query, filters, params}
  defp user_filter({query, filters, params}, user) do
    case params["my"] do
      "true" ->
        {
          where(query, user_id: ^user.id),
          Map.put(filters, :my, true),
          params
        }
      _ -> {query, filters, params}
    end
  end

  defp class_filter({query, filters, params}) do
    case params["player_class"] do
      nil -> {query, filters, params}
      "All" -> {query, filters, params}
      class ->
        {
          where(query, player_class: ^class),
          Map.put(filters, :player_class, class),
          params
        }
    end
  end

  defp popularity_filter({query, filters, params}) do
    case params["popularity"] do
      "hot" ->
        {
          query
          |> where([d], d.inserted_at > from_now(-1, "month"))
          |> order_by([desc: :likes_count, desc: :comments_count, desc: :inserted_at]),
          Map.put(filters, :popularity, "hot"),
          params
        }
      _ ->
        {
          query |> order_by([d], desc: d.inserted_at),
          Map.put(filters, :popularity, "new"),
          params
        }
    end
  end

  defp page_filter({query, filters, params}) do
    page = query |> Repo.paginate(params)
    filters = filters
              |> Map.put(:page, page.page_number)
              |> Map.put(:total_pages, page.total_pages)
    { page.entries,  filters}
  end
end

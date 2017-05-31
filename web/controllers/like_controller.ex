defmodule HsTavern.LikeController do
  use HsTavern.Web, :controller
  use Guardian.Phoenix.Controller

  plug Guardian.Plug.EnsureAuthenticated
  alias HsTavern.Like
  @models %{
    "comment" => HsTavern.Comment,
    "card"    => HsTavern.Card
  }

  def create(conn, %{"like" => like_params}, user, _) do
    params = like_params |> Map.put("user_id", user.id)
    changeset = Like.changeset(%Like{}, params)
    case Repo.insert(changeset) do
      {:ok, like} ->
        query = @models[like.entity_type] |> where(id: ^like.entity_id)
        query |> Repo.update_all(inc: [likes_count: 1])
        model = query |> Repo.one!
        model |> Repo.preload(:likes) |> Ecto.Changeset.change() |> Ecto.Changeset.put_assoc(:likes, [like]) |> Repo.update!
        broadcast(model, like)
        json(conn, %{ id: model.id, likes_count: model.likes_count, like_me: true})

      {:error, err} ->
        like = Repo.get_by!(Like, user_id: user.id, entity_id: params["entity_id"], entity_type: params["entity_type"])
        query = @models[like.entity_type] |> where(id: ^like.entity_id)
        query |> Repo.update_all(inc: [likes_count: -1])
        model = query |> Repo.one!
        Repo.delete! like
        broadcast(model, %{user_id: nil, entity_type: like.entity_type})
        json(conn, %{ id: model.id, likes_count: model.likes_count, like_me: false})
    end
  end

  def broadcast(model, like) do
    case like.entity_type do
      "comment" -> nil
      "card" ->
        HsTavern.Endpoint.broadcast("card:#{model.slug}", "like", %{likes_count: model.likes_count, user_id: like.user_id})
    end
  end
end

defmodule HsTavern.LikeController do
  use HsTavern.Web, :controller

  plug Guardian.Plug.EnsureAuthenticated
  alias HsTavern.Like
  @models %{
    "comment" => HsTavern.Comment
  }

  def create(conn, %{"like" => like_params}) do
    user = Guardian.Plug.current_resource(conn)
    params = like_params |> Map.put("user_id", user.id)
    changeset = Like.changeset(%Like{}, params)
    case Repo.insert(changeset) do
      {:ok, like} ->
        query = @models[like.entity_type] |> where(id: ^like.entity_id)
        query |> Repo.update_all(inc: [likes_count: 1])
        model = query |> Repo.one!
        json(conn, %{ id: model.id, likes_count: model.likes_count, like_me: true})

      {:error, err} ->
        like = Repo.get_by!(Like, user_id: user.id, entity_id: params["entity_id"], entity_type: params["entity_type"])
        query = @models[like.entity_type] |> where(id: ^like.entity_id)
        query |> Repo.update_all(inc: [likes_count: -1])
        model = query |> Repo.one!
        Repo.delete! like
        json(conn, %{ id: model.id, likes_count: model.likes_count, like_me: false})
    end

  end

  def delete(conn, %{"id" => id}) do
    json(conn, %{status: :ok})
  end
end

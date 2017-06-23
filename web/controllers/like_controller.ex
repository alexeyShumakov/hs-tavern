defmodule HsTavern.LikeController do
  use HsTavern.Web, :controller
  use Guardian.Phoenix.Controller

  plug Guardian.Plug.EnsureAuthenticated
  alias HsTavern.{Desk, Like, Comment, Card}
  @models %{
    "comment" => Comment,
    "card"    => Card,
    "desk"    => Desk
  }

  def create(conn, %{"like" => like_params}, user, _) do
    params = %{
      entity_id: like_params["entity_id"],
      entity_type: like_params["entity_type"],
      user_id: user.id
    }
    case Repo.get_by(Like, params) do
      nil ->
        Like.create_with_entity(%Like{}, params)
        |> Repo.insert!
        model = @models[params.entity_type] |> Repo.get!(params.entity_id)
        broadcast(model, %{user_id: user.id, entity_type: params.entity_type})
        json(conn, %{ id: model.id, likes_count: model.likes_count, like_me: true})
      like ->
        Like.remove_with_entity(like, params)
        |> Repo.delete!
        model = @models[params.entity_type] |> Repo.get!(params.entity_id)
        broadcast(model, %{user_id: nil, entity_type: like.entity_type})
        json(conn, %{ id: model.id, likes_count: model.likes_count, like_me: false})
    end
  end

  def broadcast(model, like) do
    case like.entity_type do
      "card" ->
        HsTavern.Endpoint.broadcast("card:#{model.slug}", "like", %{likes_count: model.likes_count, user_id: like.user_id})
    end
  end
end

defmodule HsTavern.CommentChannel do
  import Ecto.{Query}
  import Guardian.Phoenix.Socket
  use Phoenix.Channel
  alias HsTavern.{Like, Repo, Comment, CommentProvider}
  alias HsTavern.Serializers.CommentSerializer

  intercept ["like"]

  def join("comment:" <> id, _params, socket) do
    {:ok, socket}
  end

  def handle_in("like", %{"comment_id"=> comment_id}, socket) do
    case current_resource(socket) do
      nil -> nil
      user ->
        params = %{entity_id: comment_id, entity_type: "comment", user_id: user.id}
        create_like(params)
        broadcast! socket, "like", %{comment_id: comment_id}
    end
    {:noreply, socket}
  end

  def handle_out("like", %{comment_id: comment_id}, socket) do
    user = current_resource(socket)
    comment = CommentProvider.get_comment!(comment_id, user) |> CommentSerializer.to_map
    push socket, "like", comment
    {:noreply, socket}
  end
  def create_like(params) do
    case Repo.get_by(Like, params) do
      nil ->
        Like.create_with_entity(%Like{}, params)
        |> Repo.insert!
      like ->
        Like.remove_with_entity(like, params)
        |> Repo.delete!
    end
  end

end

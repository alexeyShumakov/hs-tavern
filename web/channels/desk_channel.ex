defmodule HsTavern.DeskChannel do
  import Ecto.{Query}
  import Guardian.Phoenix.Socket
  use Phoenix.Channel
  alias HsTavern.{Like, Desk, Repo, DeskProvider, LikeProvider, Comment}

  intercept ["like"]

  def join("desk:" <> id, _params, socket) do
    {:ok, socket}
  end

  def handle_in("like", %{"desk_id"=> desk_id}, socket) do
    case current_resource(socket) do
      nil -> nil
      user ->
        LikeProvider.do_like! %{entity_id: desk_id, user_id: user.id, entity_type: "desk"}
        broadcast! socket, "like", %{desk_id: desk_id}
    end
    {:noreply, socket}
  end

  def handle_out("like", %{desk_id: desk_id}, socket) do
    user = current_resource(socket)
    desk = DeskProvider.one_desk!(desk_id, user)
    push socket, "like", %{id: desk.id, likes_count: desk.likes_count, like_me: desk.like_me}
    {:noreply, socket}
  end

  def handle_in("comment", %{"desk_id" => desk_id, "body" => body}, socket) do
    case current_resource(socket) do
      nil -> nil
      user ->
        params = %{body: body, user_id: user.id, entity_type: "desk", entity_id: desk_id}
        new_comment = Comment.changeset_with_desk(%Comment{}, params) |> Repo.insert!
        new_comment = new_comment
                      |> Repo.preload(:user)
                      |> HsTavern.Serializers.CommentSerializer.to_map
        desk = Desk |> Repo.get!(desk_id)
        broadcast! socket, "comment", %{comments_count: desk.comments_count, comment: new_comment}
    end
    {:noreply, socket}

  end
end

defmodule HsTavern.CommentChannel do
  import Ecto.{Query}
  import Guardian.Phoenix.Socket
  use Phoenix.Channel
  alias HsTavern.{Like, Repo, Comment, CommentProvider, LikeProvider}
  alias HsTavern.Serializers.CommentSerializer

  intercept ["like"]

  def join("comment:" <> id, _params, socket) do
    {:ok, socket}
  end

  def handle_in("like", %{"comment_id"=> comment_id}, socket) do
    case current_resource(socket) do
      nil -> nil
      user ->
        LikeProvider.do_like! %{entity_id: comment_id, entity_type: "comment", user_id: user.id}
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
end

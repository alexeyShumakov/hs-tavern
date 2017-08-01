defmodule HsTavernWeb.CommentChannel do
  @moduledoc """
  comment channel
  """

  import Guardian.Phoenix.Socket
  use Phoenix.Channel
  alias HsTavern.{CommentProvider, LikeProvider}
  alias HsTavern.Serializers.CommentSerializer

  intercept ["like"]

  def join("comment:" <> _id, _params, socket) do
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
    comment = comment_id |> CommentProvider.get_comment!(user) |> CommentSerializer.to_map
    push socket, "like", comment
    {:noreply, socket}
  end
end

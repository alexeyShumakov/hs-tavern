defmodule HsTavern.CardChannel do
  import Ecto.Query
  import Guardian.Phoenix.Socket
  use Phoenix.Channel
  alias HsTavern.Comment
  alias HsTavern.Repo
  alias HsTavern.Serializers.CommentSerializer

  intercept(["create_comment", "like"])

  def join("card:" <> id, _params, socket) do
    {:ok, socket}
  end

  def handle_in("create_comment", %{"card_id" => card_id, "body" => body}, socket) do
    %{ id: user_id } = current_resource(socket)
    params = %{entity_id: card_id, entity_type: "card", card_id: card_id, body: body, user_id: user_id}
    changeset = Comment.changeset_with_card(%Comment{}, params)
    case Repo.insert(changeset) do
      {:ok, comment} ->
        card = Repo.get HsTavern.Card, card_id
        comment = Comment |> where(id: ^comment.id) |> preload(:user) |> Repo.one!
        comment_map = CommentSerializer.to_map(comment)
        broadcast! socket, "create_comment", %{comment: comment_map, comments_count: card.comments_count}
      {:error, _reason} -> nil
    end
    {:noreply, socket}
  end

  def handle_out("create_comment", payload, socket) do
    push socket, "create_comment", payload
    {:noreply, socket}
  end

  def handle_out("like", payload, socket ) do
    case current_resource(socket) do
      %{ id: current_user_id } ->
        push socket, "like", %{likes_count: payload.likes_count, like_me: current_user_id == payload.user_id }
      nil ->
        push socket, "like", %{likes_count: payload.likes_count, like_me: false }
    end
    {:noreply, socket}
  end
end

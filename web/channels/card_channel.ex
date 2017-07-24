defmodule HsTavern.CardChannel do
  import Ecto.Query
  import Guardian.Phoenix.Socket
  use Phoenix.Channel
  alias HsTavern.{Comment, Repo, CardProvider, LikeProvider}
  alias HsTavern.Serializers.CommentSerializer

  intercept(["create_comment", "like"])

  def join("card:" <> _id, _params, socket) do
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


  def handle_in("like", %{"card_id"=> card_id}, socket) do
    case current_resource(socket) do
      nil -> nil
      user ->
        LikeProvider.do_like! %{entity_id: card_id, user_id: user.id, entity_type: "card"}
        broadcast! socket, "like", %{card_id: card_id}
    end
    {:noreply, socket}
  end

  def handle_out("create_comment", payload, socket) do
    push socket, "create_comment", payload
    {:noreply, socket}
  end

  def handle_out("like", %{card_id: card_id}, socket) do
    user = current_resource(socket)
    card = CardProvider.one_card!(card_id, user)
    push socket, "like", %{likes_count: card.likes_count, like_me: card.like_me}
    {:noreply, socket}
  end

end

defmodule HsTavern.CardChannel do
  use Phoenix.Channel
  import Guardian.Phoenix.Socket
  alias HsTavern.Comment
  alias HsTavern.Repo

  def join("card:" <> id, _params, socket) do
    {:ok, socket}
  end

  def handle_in("create_comment", %{"card_id" => card_id, "body" => body}, socket) do
    %{ id: user_id } = current_resource(socket)
    changeset = Comment.changeset(%Comment{}, %{card_id: card_id, body: body, user_id: user_id})
    case Repo.insert(changeset) do
      {:ok, c} ->
        comment = c |> Repo.preload([:user])
        comment_map = %{ id: comment.id, body: comment.body, user: %{ id: comment.user.id, name: comment.user.name } }
        broadcast! socket, "create_comment", comment_map
      {:error, reason} -> nil
    end
    {:noreply, socket}
  end

  def handle_out("create_comment", payload, socket) do
    push socket, "create_comment", payload
    {:noreply, socket}
  end
end

defmodule HsTavern.DeskChannel do
  import Ecto.{Query}
  import Guardian.Phoenix.Socket
  use Phoenix.Channel
  alias HsTavern.{Like, Desk, Repo}


  def join("desk:" <> id, _params, socket) do
    {:ok, socket}
  end

  def handle_in("like", %{"desk_id"=> desk_id}, socket) do
    case current_resource(socket) do
      nil -> nil
      user ->
        desk = Repo.get!(Desk, desk_id)
        params = %{entity_id: desk.id, user_id: user.id, entity_type: "desk"}
        desk = Repo.get_by(Like, params) |> handle_like(params, desk)
        broadcast! socket, "like", %{id: desk.id, likes_count: desk.likes_count }
    end
    {:noreply, socket}
  end

  def handle_like(nil, params, desk) do
    like = Like.changeset(%Like{}, params) |> Repo.insert!
    desk
    |> Repo.preload(:likes)
    |> Ecto.Changeset.change(likes_count: desk.likes_count + 1)
    |> Ecto.Changeset.put_assoc(:likes, [like])
    |> Repo.update!
  end

  def handle_like(like, _params, desk) do
    Repo.delete! like
    Ecto.Changeset.change(desk, likes_count: desk.likes_count - 1) |> Repo.update!
  end

  def handle_out("like", payload, socket) do
    push socket, "like", payload
    {:noreply, socket}
  end
end

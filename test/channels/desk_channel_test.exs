defmodule HsTavernWeb.DeskChannelTest do
  use HsTavernWeb.ChannelCase
  import HsTavern.Factory
  alias HsTavernWeb.DeskChannel
  setup do
    user = insert(:user)
    desk = insert(:desk)
    desk_id = desk.id
    {:ok, jwt, _} = Guardian.encode_and_sign(user)
    {:ok, socket, _} = Guardian.Phoenix.Socket.sign_in(socket("auth_socket", %{}), jwt)
    {:ok, _, socket} = subscribe_and_join(socket, DeskChannel, "desk:#{desk_id}", %{"guardian_token" => jwt})

    {:ok, socket: socket, user: user, desk_id: desk_id}
  end

  test "create and broadcast desk comment", %{socket: socket, desk_id: desk_id} do
    params = %{"entity_id" => desk_id, "entity_type" => "desk", "body" => "body"}
    push socket, "comment", params
    assert_push "comment", %{comment: %{body: "body"}, comments_count: 1}
  end

  test "like desk", %{socket: socket, desk_id: desk_id} do
    push socket, "like", %{"desk_id" => desk_id}
    params = %{desk_id: desk_id}
    assert_push "like", params
  end
end

defmodule HsTavernWeb.CardChannelTest do
  use HsTavernWeb.ChannelCase
  import HsTavern.Factory

  alias HsTavernWeb.CardChannel
  setup do
    user = insert(:user)
    card = insert(:card)
    card_id = card.id
    {:ok, jwt, _} = Guardian.encode_and_sign(user)
    {:ok, socket, _} = Guardian.Phoenix.Socket.sign_in(socket("auth_socket", %{}), jwt)
    {:ok, _, socket} = subscribe_and_join(socket, CardChannel, "card:#{card_id}", %{"guardian_token" => jwt})

    {:ok, socket: socket, user: user, card_id: card_id}
  end


  test "create card comment", %{socket: socket, card_id: card_id} do
    params = %{"entity_id" => card_id, "entity_type" => "card", "body" => "body"}
    push socket, "create_comment", params
    assert_push "create_comment", %{comment: %{body: "body"}, comments_count: 1}
  end

  test "handle in like card", %{socket: socket, card_id: card_id} do
    push socket, "like", %{"card_id" => card_id}
    params = %{card_id: card_id}
    assert_push "like", params
  end

  test "handle out like card", %{socket: socket, card_id: card_id} do
    broadcast_from! socket, "like", %{card_id: card_id}
    assert_push "like", %{likes_count: 0}
  end
end

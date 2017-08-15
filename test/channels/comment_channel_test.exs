defmodule HsTavernWeb.CommentChannelTest do
  use HsTavernWeb.ChannelCase
  import HsTavern.Factory

  alias HsTavernWeb.CommentChannel
  setup do
    comment = insert(:comment)
    comment_id = comment.id
    user = insert(:user)
    comment = comment_id
    |> HsTavern.CommentProvider.get_comment!(user)
    |> HsTavern.Serializers.CommentSerializer.to_map

    {:ok, jwt, _} = Guardian.encode_and_sign(user)
    {:ok, socket, _} = Guardian.Phoenix.Socket.sign_in(socket("auth_socket", %{}), jwt)
    {:ok, _, socket} = subscribe_and_join(socket, CommentChannel, "comment:#{comment_id}", %{"guardian_token" => jwt})

    {:ok, socket: socket, comment: comment, comment_id: comment_id}
  end

  test "broadcast and push like", %{socket: socket, comment: comment, comment_id: comment_id} do
    push socket, "like", %{"comment_id" => comment_id}
    assert_broadcast "like",  %{comment_id: comment_id}
    assert_push "like", comment
  end

  test "push like with payload", %{socket: socket, comment: comment, comment_id: comment_id} do
    broadcast_from! socket, "like", %{comment_id: comment_id}
    assert_push "like", comment
  end
end

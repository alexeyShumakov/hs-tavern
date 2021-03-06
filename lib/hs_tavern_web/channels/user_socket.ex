defmodule HsTavernWeb.UserSocket do
  use Phoenix.Socket
  import Guardian.Phoenix.Socket

  ## Channels
  # channel "room:*", HsTavern.RoomChannel

  channel "card:*", HsTavernWeb.CardChannel
  channel "desk:*", HsTavernWeb.DeskChannel
  channel "comment:*", HsTavernWeb.CommentChannel

  ## Transports
  transport :websocket, Phoenix.Transports.WebSocket
  # transport :longpoll, Phoenix.Transports.LongPoll

  # Socket params are passed from the client and can
  # be used to verify and authenticate a user. After
  # verification, you can put default assigns into
  # the socket that will be set for all channels, ie
  #
  #     {:ok, assign(socket, :user_id, verified_user_id)}
  #
  # To deny connection, return `:error`.
  #
  # See `Phoenix.Token` documentation for examples in
  # performing token verification on connect.

  def connect(%{"guardian_token" => jwt} = _params, socket) do
    case sign_in(socket, jwt) do
      {:ok, authed_socket, _guardian_params} ->
        {:ok, authed_socket}
      _ ->
        {:ok, socket}
    end
  end

  def connect(_params, socket) do
    {:ok, socket}
  end

  # Socket id's are topics that allow you to identify all sockets for a given user:
  #
  #     def id(socket), do: "users_socket:#{socket.assigns.user_id}"
  #
  # Would allow you to broadcast a "disconnect" event and terminate
  # all active sockets and channels for a given user:
  #
  #     HsTavern.Endpoint.broadcast("users_socket:#{user.id}", "disconnect", %{})
  #
  # Returning `nil` makes this socket anonymous.
  def id(_socket), do: nil
end

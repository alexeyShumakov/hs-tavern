defmodule HsTavernWeb.FallbackController do
  use Phoenix.Controller

  def call(conn, {:error, :unauthorized}) do
    conn |> redirect(to: "/")
  end

  def unauthenticated(conn, _) do
    conn |> redirect(to: "/")
  end
end

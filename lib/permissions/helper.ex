defmodule HsTavern.Permissions do
  use HsTavern.Web, :controller

  def browser_forbidden(conn) do
    conn |> redirect(to: "/") |> halt()
  end

  def ajax_forbidden(conn) do
    conn |> send_resp(403, "")
  end
end

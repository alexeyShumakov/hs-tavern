defmodule HsTavern.DeskController do
  use HsTavern.Web, :controller
  use Guardian.Phoenix.Controller
  alias HsTavern.Desk
  alias HsTavern.DeskCard

  def index(conn, params, user, _) do
    query =  from d in Desk,
      join: u in assoc(d, :user),
      order_by: [desc: d.inserted_at],
      preload: [user: u]
    desks = query |> Repo.all
    render(conn, "index.html", desks: desks)
  end

  def create(conn, %{"desk" => params}, user, _) do
    check_user(conn)
    desk = Desk.changeset(%Desk{}, params |> Map.put("user_id", user.id))
    case Repo.insert(desk) do
      {:ok, desk} ->
        conn |> json(%{status: :ok})
      {:error, changeset} ->
        conn |> json(%{status: :bad})
    end
  end

  def check_user(conn) do
    unless Guardian.Plug.authenticated?(conn) do
      conn |> json(%{status: :authenticated})
    end
  end
end

defmodule HsTavern.DeskController do
  use HsTavern.Web, :controller
  use Guardian.Phoenix.Controller
  alias HsTavern.{Desk, DeskCard, DeskProvider}

  def index(conn, params, user, _) do
    desks = DeskProvider.get_desks(user, params)
    render(conn, "index.html", desks: desks)
  end

  def my_desks(conn, params, nil, _) do
    conn |> redirect to: "/"
  end

  def my_desks(conn, params, user, _) do
    params = Map.put params, "my", "true"
    {desks, filters} = DeskProvider.get_desks_with_filters(user, params)
    render(conn, "my_desks.html", desks: desks, filters: filters)
  end

  def show(conn, %{"id" => id}, user, _) do
    desk = DeskProvider.one_desk!(id, user)
    render(conn, "show.html", desk: desk)
  end

  def create(conn, %{"desk" => params}, user, _) do
    check_user(conn)
    desk = Desk.changeset(%Desk{}, params |> Map.put("user_id", user.id))
    case Repo.insert(desk) do
      {:ok, desk} ->
        conn |> json(%{status: :ok, id: desk.id})
      {:error, changeset} ->
        conn |> json(%{status: :bad})
    end
  end

  def check_user(conn) do
    unless Guardian.Plug.authenticated?(conn), do: conn |> json(%{status: :authenticated})
  end

  def unauthenticated(conn) do
    redirect conn, to: "/"
  end
end

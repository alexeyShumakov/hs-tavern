defmodule HsTavern.DeskController do
  use HsTavern.Web, :controller
  use Guardian.Phoenix.Controller
  alias HsTavern.{Desk, DeskCard, DeskProvider}

  def index(conn, params, user, _) do
    desks = DeskProvider.get_desks(user, params)
    render(conn, "index.html", desks: desks)
  end

  def my_desks(conn, _params, nil, _), do: conn |> redirect(to: "/")
  def my_desks(conn, params, user, _) do
    params = Map.put params, "my", "true"
    {desks, filters} = DeskProvider.get_desks_with_filters(user, params)
    render(conn, "my_desks.html", desks: desks, filters: filters)
  end

  def show(conn, %{"id" => id}, user, _) do
    desk = DeskProvider.one_desk!(id, user)
    render(conn, "show.html", desk: desk)
  end

  def edit(conn, _params, nil, _), do: conn |> redirect(to: "/")
  def edit(conn, %{"id" => id}, user, _) do
    desk = DeskProvider.one_desk!(id, user)
    params = %{"class" => desk.player_class, "page_size" => 6}
    {cards, filters} = HsTavern.CardFilter.filter(params)
    render(conn, "edit.html", cards: cards, filters: filters, desk: desk)
  end

  def update(conn, _params, nil, _), do: conn |> json(%{status: :authenticated})
  def update(conn, %{"id"=> id, "desk" => params}, user, _) do
    desk = DeskProvider.one_desk!(id, user)
    changeset = Desk.update_changeset(desk, params)
    if desk.user_id == user.id do
      case changeset.valid? do
        true ->
          DeskCard |> where(desk_id: ^params["id"]) |> Repo.delete_all
          params["cards"]
          |> Enum.map( fn card ->
            Map.put(card, "desk_id", params["id"]) |> create_desk_card
          end )
          desk = Repo.update!(changeset)
          conn |> json(%{id: desk.id})
        false ->
          conn |> send_resp(422, "invalid")
      end
    else
      conn |> send_resp(403, "")
    end
  end

  def delete(conn, _params, nil, _), do: conn |> send_resp(403, "")
  def delete(conn, %{"id" => id}, user, _) do
    desk = Repo.get!(HsTavern.Desk, id)
    if desk.user_id == user.id do
      Repo.delete! desk
    end
    json(conn, %{status: :deleted})
  end

  def create(conn, _params, nil, _), do: conn |> json(%{status: :authenticated})
  def create(conn, %{"desk" => params}, user, _) do
    desk = Desk.changeset(%Desk{}, params |> Map.put("user_id", user.id))
    case Repo.insert(desk) do
      {:ok, desk} ->
        conn |> json(%{status: :ok, id: desk.id})
      {:error, _} ->
        conn |> send_resp(422, "")
    end
  end

  def create_desk_card(card) do
    DeskCard.changeset(%DeskCard{}, card) |> Repo.insert!
  end
end

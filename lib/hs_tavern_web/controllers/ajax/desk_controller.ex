defmodule HsTavernWeb.Ajax.DeskController do
  use HsTavern.Web, :controller
  use Guardian.Phoenix.Controller
  alias HsTavern.{Desk, DeskCard, DeskProvider, Permissions}
  alias HsTavern.Serializers.DeskSerializer
  import Canada, only: [can?: 2]

  action_fallback HsTavernWeb.FallbackController
  plug Guardian.Plug.EnsureAuthenticated, [handler: HsTavernWeb.FallbackController] when action in [:delete, :update, :create]

  def index(conn, params, user, _) do
    {desks, filters} = DeskProvider.get_desks_with_filters(user, params)
    desks = DeskSerializer.short_to_map(desks)
    json(conn, %{desks: desks, filters: filters})
  end

  def show(conn, %{"id" => id}, user, _) do
    desk = DeskProvider.one_desk!(id, user)
    json(conn, DeskSerializer.to_map(desk))
  end

  def delete(conn, %{"id" => id}, user, _) do
    desk = Repo.get!(HsTavern.Desk, id)
    if can?(user, delete(desk)) do
      Repo.delete! desk
      json(conn, %{status: :deleted})
    else
      Permissions.forbidden()
    end
  end

  def update(conn, %{"id"=> id, "desk" => params}, user, _) do
    desk = DeskProvider.one_desk!(id, user)
    if can?(user, update(desk)) do
      changeset = Desk.update_changeset(desk, params)
      case changeset.valid? do
        true ->
          DeskCard |> where(desk_id: ^params["id"]) |> Repo.delete_all
          params["cards"]
          |> Enum.map(fn card ->
            card |> Map.put("desk_id", params["id"]) |> create_desk_card
          end)
          desk = Repo.update!(changeset)
          conn |> json(%{id: desk.id})
        false ->
          conn |> send_resp(422, "invalid")
      end
    else
      Permissions.forbidden()
    end
  end

  def create(conn, %{"desk" => params}, user, _) do
    desk = Desk.changeset(%Desk{}, params |> Map.put("user_id", user.id))
    case Repo.insert(desk) do
      {:ok, desk} ->
        conn |> json(%{status: :ok, id: desk.id})
      {:error, _} ->
        conn |> send_resp(422, "invalid")
    end
  end

  def create_desk_card(card) do
    %DeskCard{} |> DeskCard.changeset(card) |> Repo.insert!
  end
end

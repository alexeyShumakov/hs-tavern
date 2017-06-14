defmodule HsTavern.CardControllerTest do
  use HsTavern.ConnCase

  alias HsTavern.{Card, Repo}
  @valid_attrs %{
    title: "card title",
    game_id: "CRD_001",
    card_set: "standard",
    type: "spell",
    player_class: "mage",
    collectible: true
  }

  test "GET /cards", %{conn: conn} do
    Card.changeset(%Card{}, @valid_attrs) |> Repo.insert!
    conn = get conn, card_path(conn, :index)
    assert html_response(conn, 200) =~ "card title"
  end

  test "GET /card/:id", %{conn: conn} do
    card = Card.changeset(%Card{}, @valid_attrs) |> Repo.insert!
    conn = get conn, card_path(conn, :index, id: card.slug)
    assert html_response(conn, 200) =~ "card title"
  end
end

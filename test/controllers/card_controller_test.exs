defmodule HsTavern.CardControllerTest do
  use HsTavernWeb.ConnCase

  alias HsTavern.{Card, Repo}
  @valid_attrs %{
    title: "card title",
    game_id: "CRD_001",
    card_set: "standard",
    type: "spell",
    player_class: "mage",
    collectible: true,
    rarity: "Legendary",
    race: "dragon",
    cost: 1,
    attack: 1,
    health: 1
  }

  test "GET /cards", %{conn: conn} do
    Card.changeset(%Card{}, @valid_attrs) |> Repo.insert!
    conn = get build_conn(), card_path(conn, :index)
    assert html_response(conn, 200) =~ "card title"
  end

  test "GET /card/:id", %{conn: conn} do
    card = Card.changeset(%Card{}, @valid_attrs) |> Repo.insert!
    conn = get build_conn(), card_path(conn, :show, card.slug)
    assert html_response(conn, 200) =~ "card title"
  end

  test "Get /cards by keyword", %{conn: conn} do
    Card.changeset(%Card{}, @valid_attrs) |> Repo.insert!
    Card.changeset(%Card{}, @valid_attrs |> Map.put(:title, "foo bar")) |> Repo.insert!
    conn = get build_conn(), card_path(conn, :index, keyword: "card")
    assert html_response(conn, 200) =~ "card title"
    refute html_response(conn, 200) =~ "foo bar"
  end

  test "Get /cards by rarity", %{conn: conn} do
    Card.changeset(%Card{}, @valid_attrs) |> Repo.insert!
    Card.changeset(%Card{}, @valid_attrs |> Map.put(:rarity, "Basic")) |> Repo.insert!
    conn = get build_conn(), card_path(conn, :index, rarity: "Legendary")
    assert html_response(conn, 200) =~ "Legendary"
    refute html_response(conn, 200) =~ "Basic"
  end

  test "Get /cards by collectible", %{conn: conn} do
    Card.changeset(%Card{}, @valid_attrs |> Map.put(:title, "Collectible card")) |> Repo.insert!
    Card.changeset(%Card{}, @valid_attrs |> Map.put(:collectible, false)) |> Repo.insert!
    conn = get build_conn(), card_path(conn, :index, collectible: true)
    assert html_response(conn, 200) =~ "Collectible card"
    refute html_response(conn, 200) =~ "card title"
  end

  test "Get /cards by race", %{conn: conn} do
    Card.changeset(%Card{}, @valid_attrs) |> Repo.insert!
    Card.changeset(%Card{}, @valid_attrs |> Map.put(:race, "murloc")) |> Repo.insert!
    conn = get build_conn(), card_path(conn, :index, race: "dragon")
    assert html_response(conn, 200) =~ "dragon"
    refute html_response(conn, 200) =~ "murloc"
  end

  test "Get /cards by cost", %{conn: conn} do
    Card.changeset(%Card{}, @valid_attrs |> Map.put(:title, "One cost card")) |> Repo.insert!
    Card.changeset(%Card{}, @valid_attrs |> Map.put(:cost, 2)) |> Repo.insert!
    conn = get build_conn(), card_path(conn, :index, cost: "0;1")
    assert html_response(conn, 200) =~ "One cost card"
  end
end

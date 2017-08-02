defmodule HsTavernWeb.CardControllerTest do
  use HsTavernWeb.ConnCase
  import HsTavern.Factory

  setup _context do
    card = insert(:card, %{title: "card title"})
    conn = build_conn()
    {:ok, card: card, conn: conn}
  end

  test "GET /cards", %{card: card, conn: conn} do
    conn = conn |> get("/cards")
    assert html_response(conn, 200) =~ card.title
  end

  test "GET /cards/:id", %{card: card, conn: conn} do
    conn = conn |> get("/cards/#{card.slug}")
    assert html_response(conn, 200) =~ card.title
  end

  test "Get /cards by keyword", %{card: card, conn: conn} do
    card_1 = insert(:card, %{title: "foo bar"})
    conn = get conn, card_path(conn, :index, keyword: "card")
    assert html_response(conn, 200) =~ card.title
    refute html_response(conn, 200) =~ card_1.title
  end

  test "Get /cards by rarity", %{conn: conn, card: card} do
    card_1 = insert(:card, %{rarity: "Basic"})
    conn = get conn, card_path(conn, :index, rarity: "Legendary")
    assert html_response(conn, 200) =~ card.rarity
    refute html_response(conn, 200) =~ card_1.rarity
  end

  test "Get /cards by collectible", %{conn: conn, card: card} do
    card_1 = insert(:card, %{collectible: false, title: "foo bar"})
    conn = get conn, card_path(conn, :index, collectible: true)
    assert html_response(conn, 200) =~ card.title
    refute html_response(conn, 200) =~ card_1.title
  end

  test "Get /cards by race", %{conn: conn, card: card} do
    card_1 = insert(:card, %{race: "murlock"})
    conn = get build_conn(), card_path(conn, :index, race: "dragon")
    assert html_response(conn, 200) =~ card.race
    refute html_response(conn, 200) =~ card_1.race
  end

  test "Get /cards by cost", %{conn: conn, card: card} do
    card_1 = insert(:card, %{title: "Five cost card", cost: 5})
    conn = get conn, card_path(conn, :index, cost: "5;6")
    assert html_response(conn, 200) =~ card_1.title
    refute html_response(conn, 200) =~ card.title
  end
end

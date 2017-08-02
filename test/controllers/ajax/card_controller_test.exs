defmodule HsTavernWeb.AjaxCardControllerTest do
  use HsTavernWeb.ConnCase
  import HsTavern.Factory

  setup _context do
    card = insert(:card, %{title: "card title"})
    conn = build_conn()
    {:ok, card: card, conn: conn}
  end

  test "GET /ajax/cards", %{card: card, conn: conn} do
    conn = conn |> get(ajax_card_path(conn, :index))  |> json_response(200)
    %{"index" => [%{"title" => card_title}]} = conn
    assert card.title == card_title
  end

  test "GET /ajax/cards/:id", %{card: card, conn: conn} do
    conn = conn |> get("/ajax/cards/#{card.slug}")
    %{"title" => card_title} = json_response(conn, 200)
    assert card_title == card.title
  end


  test "Get /ajax/cards by rarity", %{conn: conn, card: card} do
    card_1 = insert(:card, %{rarity: "Basic"})
    conn = get conn, ajax_card_path(conn, :index, rarity: "Legendary")
    %{"index" => [%{"title" => card_title}]} = json_response(conn, 200)
    assert card_title == card.title
    assert card_title != card_1.title
  end

  test "Get /cards by collectible", %{conn: conn, card: card} do
    card_1 = insert(:card, %{collectible: false, title: "foo bar"})
    conn = get conn, ajax_card_path(conn, :index, collectible: true)
    %{"index" => [%{"title" => card_title}]} = json_response(conn, 200)
    assert card_title == card.title
    assert card_title != card_1.title
  end

  test "Get /cards by race", %{conn: conn, card: card} do
    card_1 = insert(:card, %{race: "murlock"})
    conn = get build_conn(), ajax_card_path(conn, :index, race: "dragon")
    %{"index" => [%{"title" => card_title}]} = json_response(conn, 200)
    %{"index" => cards } = json_response(conn, 200)
    assert card_title == card.title
    assert card_title != card_1.title
    assert length(cards) == 1
  end

  test "Get /cards by cost", %{conn: conn, card: card} do
    card_1 = insert(:card, %{title: "Five cost card", cost: 5})
    conn = get conn, ajax_card_path(conn, :index, cost: "5;6")
    %{"index" => [%{"title" => card_title}]} = json_response(conn, 200)
    %{"index" => cards } = json_response(conn, 200)
    assert card_title != card.title
    assert card_title == card_1.title
    assert length(cards) == 1
  end
end

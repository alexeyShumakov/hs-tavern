defmodule HsTavernWeb.AjaxDeskControllerTest do
  use HsTavernWeb.ConnCase
  import HsTavern.Factory
  import HsTavernWeb.TestHelper, only: [guardian_login: 1]

  setup _context do
    user = insert(:user)
    desk = insert(:desk, %{user: user, title: "desk title"})
    {:ok, desk: desk, user: user}
  end

  describe "index/4" do
    test "show all desks titles", %{desk: desk} do
      conn = build_conn() |> get("/ajax/desks")
      %{"desks" => [json_desk]} = json_response(conn, 200)
      assert json_desk["title"] == desk.title
    end
  end

  describe "show/4" do
    test "show desk", %{desk: desk} do
      conn = build_conn() |> get("/ajax/desks/#{desk.id}")
      %{"title" => desk_title} = json_response(conn, 200)
      assert desk_title == desk.title
    end
  end

  describe "delete/4" do
    test "successeful desk deletion", %{desk: desk, user: user} do
      conn = user |> guardian_login() |> delete("/ajax/desks/#{desk.id}")
      assert json_response(conn, 200) == %{"status" => "deleted"}
    end

    test "not owner cant delete desk", %{desk: desk} do
      new_user = insert(:user)
      conn = new_user |> guardian_login() |> delete("/ajax/desks/#{desk.id}")
      assert conn.status == 302
    end

    test "not registered users can not delete desk", %{desk: desk} do
      conn = build_conn() |> delete("/ajax/desks/#{desk.id}")
      assert conn.status == 302
    end
  end

  describe "update/4" do
    setup [:valid_params, :invalid_params]
    test "successeful desk update", %{desk: desk, user: user, valid_params: valid_params} do
      conn = user |> guardian_login() |> put("/ajax/desks/#{desk.id}", %{"desk" => valid_params})
      assert json_response(conn, 200) == %{"id" => desk.id}
    end

    test "update desk with invalid params", %{desk: desk, user: user, invalid_params: invalid_params} do
      conn = user |> guardian_login() |> put("/ajax/desks/#{desk.id}", %{"desk" => invalid_params})
      assert response(conn, 422) == "invalid"
    end

    test "not owner cant update desk", %{desk: desk, valid_params: valid_params} do
      new_user = insert(:user)
      conn = new_user |> guardian_login() |> put("/ajax/desks/#{desk.id}", %{"desk" => valid_params})
      assert conn.status == 302
    end

    test "not registered user can not update desk", %{desk: desk, valid_params: valid_params} do
      conn = build_conn() |> put("/ajax/desks/#{desk.id}", %{"desk" => valid_params})
      assert conn.status == 302
    end
  end

  describe "create/4" do
    setup [:valid_params, :invalid_params]

    test "successeful desk creation", %{valid_params: valid_params, user: user} do
      conn = user |> guardian_login() |> post("/ajax/desks", %{"desk" => valid_params})
      assert %{"status" => "ok", "id" => _} = json_response(conn, 200)
    end

    test "create desk with invalid params", %{invalid_params: invalid_params, user: user} do
      conn = user |> guardian_login() |> post("/ajax/desks", %{"desk" => invalid_params})
      assert response(conn, 422) == "invalid"
    end

    test "not registered users can not create desk", %{ valid_params: valid_params} do
      conn = build_conn() |> post("/ajax/desks", %{"desk" => valid_params})
      assert conn.status == 302
    end
  end

  defp valid_params(_context) do
    desk_cards = 1..30 |> Enum.map(fn(_) ->
      card = insert(:card)
      %{"count" => 1, "card_id" => card.id}
    end)
    valid_params = string_params_with_assocs(:desk, %{cards: desk_cards})
    [valid_params: valid_params]
  end

  defp invalid_params(_context) do
    desk_cards = 1..10 |> Enum.map(fn(_) ->
      card = insert(:card)
      %{"count" => 1, "card_id" => card.id}
    end)
    invalid_params = string_params_with_assocs(:desk, %{cards: desk_cards})
    [invalid_params: invalid_params]
  end
end

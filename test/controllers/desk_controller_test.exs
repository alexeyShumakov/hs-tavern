defmodule HsTavernWeb.DeskControllerTest do
  use HsTavernWeb.ConnCase
  import HsTavern.Factory
  import HsTavernWeb.TestHelper, only: [guardian_login: 1]

  describe "index/4" do
    test "show all desks titles" do
      user = insert(:user)
      desks = 1..3 |> Enum.map(fn(i) -> insert(:desk, %{user: user, title: "desk title##{i}"}) end)
      conn = user |> guardian_login() |> get("/desks")
      desks |> Enum.each(fn(desk) ->
        assert html_response(conn, 200) =~ desk.title
      end)
    end
  end

  describe "my_desks/4" do
    test "show only current_users desks" do
      user = insert(:user)
      desks = 1..3 |> Enum.map(fn(i) -> insert(:desk, %{title: "random desk##{i}"}) end)
      users_desks = 1..3 |> Enum.map(fn(i) -> insert(:desk, %{user: user, title: "my desk title##{i}"}) end)
      html = user |> guardian_login() |> get("/my_desks") |> html_response(200)

      users_desks |> Enum.each(fn(desk) -> assert html =~ desk.title end)
      desks       |> Enum.each(fn(desk) -> assert !(html =~ desk.title) end)
    end
  end

  describe "show/4" do
    test "page contain desks title" do
      desk = insert(:desk)
      html = build_conn() |> get("/desks/#{desk.id}") |> html_response(200)
      assert html =~ desk.title
    end

    test "page contain cards titles" do
      desk = insert(:desk)
      html = build_conn() |> get("/desks/#{desk.id}") |> html_response(200)
      desk.cards |> Enum.each(fn(card) -> assert html =~ card.card.title end)
    end
  end

  describe "edit/4" do
    test "otner users can't edit this desk" do
      user = insert(:user)
      desk = insert(:desk)
      conn = user |> guardian_login() |> get("/desks/#{desk.id}/edit")
      assert redirected_to(conn) == "/"
    end

    test "page contain desk title" do
      user = insert(:user)
      desk = insert(:desk, %{user: user})
      html = user |> guardian_login() |> get("/desks/#{desk.id}/edit") |> html_response(200)
      assert html =~ desk.title
    end

    test "guest can't edit desk" do
      desk = insert(:desk)
      conn = build_conn() |> get("/desks/#{desk.id}/edit") 
      assert redirected_to(conn) == "/"
    end
  end
end

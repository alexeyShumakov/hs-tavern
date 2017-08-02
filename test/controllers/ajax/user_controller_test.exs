defmodule HsTavernWeb.AjaxUserControllerTest do
  use HsTavernWeb.ConnCase
  import HsTavern.Factory

  setup _context do
    user = insert(:user, %{name: "Superman"})
    conn = build_conn()
    {:ok, user: user, conn: conn}
  end

  test "GET /ajax/search", %{user: user, conn: conn} do
    insert(:user)
    conn = get conn, ajax_user_path(conn, :search, name: "super")
    [%{"name" => user_name}] = json_response(conn, 200)
    users = json_response(conn, 200)
    assert user.name == user_name
    assert length(users) == 1
  end
end

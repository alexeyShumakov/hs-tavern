defmodule HsTavernWeb.BuilderControllerTest do
  use HsTavernWeb.ConnCase

  setup _context do
    conn = build_conn()
    {:ok, conn: conn}
  end

  test "GET /builder", %{conn: conn} do
    conn = get(conn, builder_path(conn, :index))
    assert conn.status == 200
  end

  describe "GET /builder/:class" do
    test "successeful get show", %{conn: conn} do
      conn = get(conn, builder_path(conn, :show, "druid"))
      assert html_response(conn, 200) =~ "Druid"
    end

    test "redirected to /builder", %{conn: conn} do
      conn = get(conn, builder_path(conn, :show, "foo"))
      assert redirected_to(conn) == "/builder"
    end
  end
end

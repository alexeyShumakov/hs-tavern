defmodule HsTavernWeb.MediaControllerTest do
  use HsTavernWeb.ConnCase

  import Mock

  setup _context do
    conn = build_conn()
    {:ok, conn: conn}
  end

  describe "GET /media/search" do
    test "without params", %{conn: conn} do
      with_mock Giphy, [search!: fn(_parms) -> [%{url: "url"}] end] do
        conn  = get(conn, media_path(conn, :search))
        assert called Giphy.search!("funny cat")
        assert json_response(conn, 200) == [%{"url" => "url"}]
      end
    end

    test "with keyword", %{conn: conn} do
      with_mock Giphy, [search!: fn(_parms) -> [%{url: "url"}] end] do
        conn  = get(conn, media_path(conn, :search, keyword: "hello giphy"))
        assert called Giphy.search!("hello giphy")
        assert json_response(conn, 200) == [%{"url" => "url"}]
      end
    end

    test "with keyword and offset", %{conn: conn} do
      with_mock Giphy, [search!: fn(_parms, offset: _offset) -> [%{url: "url"}] end] do
        conn  = get(conn, media_path(conn, :search, keyword: "hello giphy", offset: 20))
        assert called Giphy.search!("hello giphy", offset: "20")
        assert json_response(conn, 200) == [%{"url" => "url"}]
      end
    end
  end
end

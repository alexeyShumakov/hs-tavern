defmodule HsTavern.DeskControllerTest do
  use HsTavern.ConnCase
  import HsTavern.Factory

  def guardian_login(user) do
    build_conn()
      |> bypass_through(HsTavern.Router, [:browser])
      |> get("/")
      |> Guardian.Plug.sign_in(user)
      |> send_resp(200, "")
      |> recycle()
  end

  describe "index/4" do
    test "show all desks titles" do
      user = insert(:user)
      desks = 1..3 |> Enum.map(fn(i) -> insert(:desk, %{user: user, title: "desk title##{i}"}) end)
      conn = guardian_login(user) |> get("/desks")
      desks |> Enum.each(fn(desk) ->
        assert html_response(conn, 200) =~ desk.title
      end)
    end
  end
end

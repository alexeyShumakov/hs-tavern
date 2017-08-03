defmodule HsTavernWeb.AuthControllerTest do
  use HsTavernWeb.ConnCase
  import HsTavern.Factory
  import HsTavernWeb.TestHelper, only: [guardian_login: 1]
  import Mock
  alias HsTavern.{User}

  setup _context do
    conn = build_conn()
    user = insert(:user)
    {:ok, conn: conn, user: user}
  end

  test "DELETE /auth/sign_out", %{user: user} do
    conn = user |> guardian_login() |> delete("/auth/sign_out")
    refute Guardian.Plug.authenticated?(conn)
    assert json_response(conn, 200) == %{"status" => "ok"}
  end

  describe "GET /auth/facabook/callback" do
    test "create user and sign_in", %{conn: conn} do
      user_data = %{body: ~s({\"id\": \"0\", \"name\": \"John Doe\", \"email\": \"john@mail.com\"})}
      with_mock HTTPoison, [get: fn(_url) -> {:ok, user_data} end] do
        conn = conn
        |> assign(:ueberauth_auth,  %{credentials: %{token: "valid-token"}})
        |> get(auth_path(conn, :callback, "facebook"))

        last_user = User |> last() |> Repo.one!

        assert called HTTPoison.get("https://graph.facebook.com/v2.9/me?access_token=valid-token&fields=email,name,picture")
        assert Guardian.Plug.authenticated?(conn)
        assert conn.status == 200
        assert last_user.name == "John Doe"
        assert last_user.email == "john@mail.com"
      end
    end

    test "find and sign in, when user is exist", %{conn: conn, user: user} do
      %{authorizations: [%{uid: users_uid}]} = user
      user_data = %{body: ~s({\"id\": \"#{users_uid}\", \"name\": \"John Doe\"})}
      with_mock HTTPoison, [get: fn(_url) -> {:ok, user_data} end] do
        before_count = Repo.aggregate(User, :count, :id)

        conn = conn
        |> assign(:ueberauth_auth,  %{credentials: %{token: "valid-token"}})
        |> get(auth_path(conn, :callback, "facebook"))

        after_count = Repo.aggregate(User, :count, :id)
        assert Guardian.Plug.authenticated?(conn)
        assert conn.status == 200
        assert before_count == after_count
      end
    end

  end
end

defmodule HsTavernWeb.AuthController do
  alias HsTavern.{UserProvider}
  use HsTavern.Web, :controller

  plug Ueberauth

  def sign_out(conn, _params), do: conn |> Guardian.Plug.sign_out |> json(%{status: :ok})

  def callback(%{assigns: %{ueberauth_auth: auth}} = conn, %{"provider" => "facebook"}) do
    {:ok, data} = HTTPoison.get("https://graph.facebook.com/v2.9/me?access_token=#{auth.credentials.token}&fields=email,name,picture")
    user_data = Poison.decode!(data.body)

    user = case UserProvider.find_auth(user_data["id"], "facebook") do
      nil ->
        email = UserProvider.generate_email(%{provider: "facebook", email: user_data["email"], id: user_data["id"]})
        user = UserProvider.create!(%{email: email, name: user_data["name"]})
        UserProvider.create_auth!(%{provider: "facebook", user_id: user.id, uid: user_data["id"]})
        UserProvider.update!(user, %{avatar: user_data["picture"]["data"]["url"]})
        user
      auth -> auth.user
    end
    conn
    |> Guardian.Plug.sign_in(user)
    |> html("<html><body><script>window.opener.location.reload();window.close()</script></body></html>")
  end

end

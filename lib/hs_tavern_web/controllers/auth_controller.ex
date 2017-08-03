defmodule HsTavernWeb.AuthController do
  alias HsTavern.{User, Authorization}
  use HsTavern.Web, :controller

  plug Ueberauth

  def sign_out(conn, _params), do: conn |> Guardian.Plug.sign_out |> json(%{status: :ok})

  def callback(%{assigns: %{ueberauth_auth: auth}} = conn, %{"provider" => "facebook"}) do
    {:ok, data} = HTTPoison.get("https://graph.facebook.com/v2.9/me?access_token=#{auth.credentials.token}&fields=email,name,picture")
    user_data = Poison.decode!(data.body)

    user = case find_by_auth(user_data["id"], "facebook") do
      nil ->
        email = get_email(%{provider: "facebook", email: user_data["email"], id: user_data["id"]})
        user = create_user(%{email: email, name: user_data["name"]})
        add_user_avatar(user, user_data["picture"]["data"]["url"])
        create_auth(%{provider: "facebook", user_id: user.id, uid: user_data["id"]})
        user
      auth -> auth.user
    end
    conn
    |> Guardian.Plug.sign_in(user)
    |> html("<html><body><script>window.opener.location.reload();window.close()</script></body></html>")
  end

  def find_by_auth(uid, provider) do
    query = from auth in Authorization,
      preload: [:user],
      where: auth.uid == ^uid,
      where: auth.provider == ^provider
    Repo.one query
  end

  def add_user_avatar(user, url), do: user |> User.changeset(%{avatar: url}) |> Repo.update!
  def create_user(data), do: %User{} |> User.changeset(data) |> Repo.insert!
  def create_auth(data), do: %Authorization{} |> Authorization.changeset(data) |> Repo.insert!

  def get_email(%{email: nil, id: id, provider: provider}), do: "#{id}@#{provider}.com"
  def get_email(%{email: email, id: _, provider: _}), do: email
end

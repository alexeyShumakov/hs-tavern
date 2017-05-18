defmodule HsTavern.AuthController do
  alias HsTavern.User
  alias HsTavern.Authorization
  use HsTavern.Web, :controller

  plug Ueberauth

  def sign_out(conn, params) do
    conn
    |> Guardian.Plug.sign_out
    |> json(%{status: :ok})
  end

  def callback(%{assigns: %{ueberauth_auth: auth}} = conn, _params) do
    {:ok, data} = HTTPoison.get("https://graph.facebook.com/v2.9/me?access_token=#{auth.credentials.token}&fields=email,name,picture")
    user_data = Poison.decode!(data.body)

    case find_by_auth(user_data["id"], "facebook") do
      nil ->
        email = get_email(%{provider: "facebook", email: user_data["email"], id: user_data["id"]})
        user = create_user(%{email: email, name: user_data["name"]})
        auth = create_auth(%{provider: "facebook", user_id: user.id, uid: user_data["id"]})
      auth-> user = auth.user
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

  def create_user(data) do
    changeset = User.changeset(%User{}, data)
    Repo.insert!(changeset)
  end

  def create_auth(data) do
    changeset = Authorization.changeset(%Authorization{}, data)
    Repo.insert!(changeset)
  end

  def get_email(%{email: nil, id: id, provider: provider }) do
    "#{id}@#{provider}.com"
  end

  def get_email(%{email: email, id: _, provider: _ }) do
    email
  end
end

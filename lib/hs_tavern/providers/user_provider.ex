defmodule HsTavern.UserProvider do
  import Ecto.Query
  alias HsTavern.{User, Repo, Authorization}

  def search_users(%{"name" => name}) do
    User |> filter_by_name(name) |> limit(6) |> Repo.all
  end

  def find_auth(uid, provider) do
    query = from auth in Authorization,
      preload: [:user],
      where: auth.uid == ^uid,
      where: auth.provider == ^provider
    Repo.one query
  end

  def update!(user, data), do: user |> User.changeset(data) |> Repo.update!
  def create!(data), do: %User{} |> User.changeset(data) |> Repo.insert!
  def create_auth!(data), do: %Authorization{} |> Authorization.changeset(data) |> Repo.insert!
  def generate_email(%{email: nil, id: id, provider: provider}), do: "#{id}@#{provider}.com"
  def generate_email(%{email: email, id: _, provider: _}), do: email

  defp filter_by_name(request, name), do: request |> where([u], ilike(u.name, ^"%#{name}%"))
end

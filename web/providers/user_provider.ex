defmodule HsTavern.UserProvider do
  import Ecto.Query
  alias HsTavern.{User, Repo}

  def search_users(%{"name" => name}) do
    User
    |> filter_by_name(name)
    |> limit(6)
    |> Repo.all
  end

  defp filter_by_name(request, name \\ "") do
    request |> where([u], ilike(u.name, ^"%#{name}%"))
  end
end

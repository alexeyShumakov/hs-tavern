defmodule HsTavern.LikeProvider do
  import Ecto.Query
  alias HsTavern.{Repo, Like}

  def do_like!(params) do
    case Repo.get_by(Like, params) do
      nil ->
        Like.create_with_entity(%Like{}, params)
        |> Repo.insert!
      like ->
        Like.remove_with_entity(like, params)
        |> Repo.delete!
    end
  end
end

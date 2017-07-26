defmodule HsTavern.LikeProvider do
  @moduledoc """
  like provider
  """
  alias HsTavern.{Repo, Like}

  def do_like!(params) do
    case Repo.get_by(Like, params) do
      nil ->
        %Like{}
        |> Like.create_with_entity(params)
        |> Repo.insert!
      like ->
        like
        |> Like.remove_with_entity(params)
        |> Repo.delete!
    end
  end
end

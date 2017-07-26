defmodule HsTavern.GuardianSerializer do
  @moduledoc """
  guardian serializer
  """

  @behaviour Guardian.Serializer

  alias HsTavern.Repo
  alias HsTavern.User

  def for_token(%User{} = user), do: {:ok, "User:#{user.id}"}
  def for_token(_), do: {:error, "Unknown resource type"}

  def from_token("User:" <> id), do: {:ok, Repo.get(User, id)}
  def from_token(_), do: {:error, "Unknown resource type"}
end

defmodule HsTavern.Factory do
  use ExMachina.Ecto, repo: HsTavern.Repo

  def user_factory do
    %HsTavern.User {
      name: "John Doe",
      email: sequence(:email, &"user#{&1}example.com")
    }
  end
end

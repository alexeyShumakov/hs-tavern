defmodule HsTavern.User do
  use HsTavern.Web, :model

  schema "users" do
    field :name, :string
    field :email, :string
    has_many :authorizations, HsTavern.Authorization
    has_many :comments, HsTavern.Comment

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:email, :name])
    |> validate_required([:email, :name])
    |> unique_constraint(:email)
  end
end

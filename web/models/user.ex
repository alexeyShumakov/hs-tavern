defmodule HsTavern.User do
  use HsTavern.Web, :model
  use Arc.Ecto.Schema

  schema "users" do
    field :name, :string
    field :email, :string
    field :avatar, HsTavern.UserAvatar.Type
    has_many :authorizations, HsTavern.Authorization
    has_many :comments, HsTavern.Comment
    has_many :desks, HsTavern.Desk

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
    |> cast_attachments(params, [:avatar], allow_paths: true)
  end
end

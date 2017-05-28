defmodule HsTavern.Like do
  use HsTavern.Web, :model

  schema "likes" do
    belongs_to :user, HsTavern.User
    field :entity_type, :string
    field :entity_id, :integer

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:user_id, :entity_id, :entity_type])
    |> foreign_key_constraint(:user_id)
    |> validate_required([:user_id, :entity_id, :entity_type])
    |> unique_constraint(:entity_id, name: :like_signature_index)
  end
end

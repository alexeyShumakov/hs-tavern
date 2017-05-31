defmodule HsTavern.Like do
  use HsTavern.Web, :model

  schema "likes" do
    belongs_to :user, HsTavern.User
    field :entity_type, :string
    field :entity_id, :integer
    many_to_many :cards, HsTavern.Card, join_through: "cards_likes", on_delete: :delete_all
    many_to_many :comments, HsTavern.Comment, join_through: "comments_likes", on_delete: :delete_all

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

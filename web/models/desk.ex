defmodule HsTavern.Desk do
  use HsTavern.Web, :model

  schema "desks" do
    field :player_class, :string
    field :standard, :boolean, default: false
    field :description, :string
    field :title, :string
    has_many :cards, HsTavern.DeskCard
    belongs_to :user, HsTavern.User

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:user_id, :player_class, :standard, :description, :title])
    |> foreign_key_constraint(:user_id)
    |> validate_required([:user_id, :player_class, :standard, :description, :title])
  end
end

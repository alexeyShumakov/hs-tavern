defmodule HsTavern.DeskCard do
  use HsTavern.Web, :model

  schema "desk_cards" do
    field :count, :integer
    belongs_to :desk, HsTavern.Desk
    belongs_to :card, HsTavern.Card

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:count, :card_id, :desk_id])
    |> foreign_key_constraint(:card_id)
    |> foreign_key_constraint(:desk_id)
    |> validate_number(:count, less_than: 3, greater_than: 0)
    |> validate_required([:count, :card_id])
  end
end

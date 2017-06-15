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
    |> cast_assoc(:cards)
    |> foreign_key_constraint(:user_id)
    |> check_cards_count(params)
    |> validate_required([:user_id, :player_class, :standard, :description, :title])
  end

  defp check_cards_count(changeset, params) do
    count = params["cards"] |> Enum.map(fn(card)-> card["count"] end) |> Enum.sum

    if count != 30 do
      add_error(changeset, :cards_count, "cards count error")
    else
      changeset
    end
  end
end

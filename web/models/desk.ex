defmodule HsTavern.Desk do
  use HsTavern.Web, :model
  alias HsTavern.{DeskCard, User}

  schema "desks" do
    field :player_class, :string
    field :standard, :boolean, default: false
    field :description, :string
    field :title, :string
    has_many :cards, DeskCard
    belongs_to :user, User

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:user_id, :player_class, :standard, :description, :title])
    |> put_assoc(:cards, get_cards(params["cards"]))
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

  defp get_cards(cards) do
    Enum.map(cards, fn(card) -> DeskCard.changeset(%DeskCard{}, card) end)
  end
end

defmodule HsTavern.Desk do
  use HsTavern.Web, :model
  alias HsTavern.{DeskCard, User, Like, Comment}

  schema "desks" do
    field :player_class, :string
    field :standard, :boolean, default: false
    field :description, :string
    field :title, :string
    field :likes_count, :integer, default: 0
    field :comments_count, :integer, default: 0
    has_many :cards, DeskCard, on_delete: :delete_all
    belongs_to :user, User
    many_to_many :likes, Like, join_through: "desks_likes", on_delete: :delete_all
    many_to_many :comments, Comment, join_through: "comments_desks", on_delete: :delete_all
    has_many :likes_users, through: [:likes, :user]
    field :like_me, :boolean, virtual: true, default: false

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

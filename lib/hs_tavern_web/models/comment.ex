defmodule HsTavern.Comment do
  @moduledoc """
  comment model
  """
  import Ecto.Query, only: [from: 2]

  use HsTavern.Web, :model
  alias HsTavern.{Repo, User, Card, Like, Desk}

  schema "comments" do
    field :body, :string
    field :likes_count, :integer, default: 0
    field :like_me, :boolean, virtual: true, default: false
    field :entity_type, :string
    field :entity_id, :integer
    field :media_data, :string
    field :media_type, :string
    belongs_to :user, User
    belongs_to :card, Card
    many_to_many :desks, Desk, join_through: "comments_desks", on_delete: :delete_all
    many_to_many :likes, Like, join_through: "comments_likes", on_delete: :delete_all
    has_many :likes_users, through: [:likes, :user]

    timestamps()
  end

  @params [:body, :user_id, :entity_id, :entity_type, :media_data, :media_type]

  def changeset_with_card(struct, params \\ %{}) do
    struct
    |> cast(params, @params)
    |> prepare_changes(fn changeset ->
      query = from(c in Card, where: c.id == ^params["entity_id"])
      changeset.repo.update_all(query, inc: [comments_count: 1])
      changeset
    end)
    |> foreign_key_constraint(:user_id)

  end

  def changeset_with_desk(struct, params \\ %{}) do
    desk = Repo.get! Desk, params["entity_id"]
    struct
    |> cast(params, @params)
    |> prepare_changes(fn changeset ->
      query = from(d in Desk, where: d.id == ^params["entity_id"])
      changeset.repo.update_all(query, inc: [comments_count: 1])
      changeset
    end)
    |> put_assoc(:desks, [desk])
    |> foreign_key_constraint(:user_id)
  end
end

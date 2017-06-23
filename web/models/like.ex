defmodule HsTavern.Like do
  use HsTavern.Web, :model
  alias HsTavern.{Card, User, Comment, Desk, Repo}

  schema "likes" do
    belongs_to :user, User
    field :entity_type, :string
    field :entity_id, :integer
    many_to_many :cards, Card, join_through: "cards_likes", on_delete: :delete_all
    many_to_many :comments, Comment, join_through: "comments_likes", on_delete: :delete_all
    many_to_many :desks, Desk, join_through: "desks_likes", on_delete: :delete_all

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

  def create_with_entity(struct, %{entity_type: entity_type, entity_id: entity_id} = params) do
    ent = %{
      "comment" => {:comments, Comment},
      "desk" => {:desks, Desk},
      "card" => {:cards, Card}
    }

    { entity_atom, entity_module } = ent[entity_type]
    entity = Repo.get! entity_module, entity_id
    struct
    |> changeset(params)
    |> prepare_changes( fn changeset ->
      entity_module
      |> where(id: ^entity_id)
      |> changeset.repo.update_all(inc: [likes_count: 1])
      changeset
    end )
    |> put_assoc(entity_atom, [entity])
  end

  def remove_with_entity(struct, %{entity_type: entity_type, entity_id: entity_id} = params) do
    ent = %{
      "comment" => {:comments, Comment},
      "desk" => {:desks, Desk},
      "card" => {:cards, Card}
    }
    { entity_atom, entity_module } = ent[entity_type]
    struct
    |> changeset(params)
    |> prepare_changes( fn changeset ->
      entity_module
      |> where(id: ^entity_id)
      |> changeset.repo.update_all(inc: [likes_count: -1])
      changeset
    end )
  end
end

defmodule HsTavern.Factory do
  use ExMachina.Ecto, repo: HsTavern.Repo
  alias HsTavern.{Comment, User, Desk, DeskCard, Card, Authorization}

  def user_factory do
    %User {
      name: "John Doe",
      email: sequence(:email, &"user#{&1}example.com"),
      authorizations: [build(:authorization)]
    }
  end

  def authorization_factory do
    %Authorization {
      uid: sequence(:uid, &"#{&1}"),
      provider: "facebook"
    }
  end

  def desk_factory do
    %Desk {
      title: "desk title",
      description: "desk description",
      user: build(:user),
      cards: 1..30 |> Enum.map(fn(_) -> build(:desk_card) end ),
      player_class: "Druid"
    }
  end

  def comment_factory do
    %Comment{
      body: "comment",
      likes_count: 0,
      entity_type: "desk",
      entity_id: 1,
      user: build(:user)
    }
  end

  def desk_card_factory do
    %DeskCard {
      count: 1,
      card: build(:card)
    }
  end

  def card_factory do
    %Card {
      title: sequence(:slug, &"card title#{&1}"),
      game_id: "CRD_001",
      card_set: "standard",
      type: "spell",
      player_class: "mage",
      collectible: true,
      rarity: "Legendary",
      race: "dragon",
      cost: 1,
      attack: 1,
      health: 1,
      slug: sequence(:slug, &"card-title#{&1}")
    }
  end
end

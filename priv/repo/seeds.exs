defmodule Seeds.Helper do
  def desk_cards do
    1..30 |> Enum.map(fn id ->
      %{"count" => 1}
      |> Map.put("card_id", id)
    end)
  end
end

alias HsTavern.{Repo, Card, User, Comment, Like, Desk}
classes = ["Neutral", "Hunter", "Shaman",
 "Mage", "Druid", "Priest", "Paladin",
 "Rogue", "Warlock", "Warrior"
]
desk_classes = ["Hunter", "Shaman",
 "Mage", "Druid", "Priest", "Paladin",
 "Rogue", "Warlock", "Warrior"
]
rarity = ["Common", "Rare", "Epic", "Legendary"]
sets = [
  "Basic", "Classic", "Hall of Fame",
  "Naxxramas", "Goblins vs Gnomes",
  "Blackrock Mountain", "The Grand Tournament",
  "The League of Explorers", "Whispers of the Old Gods",
  "One Night in Karazhan", "Mean Streets of Gadgetzan",
  "Journey to Un'Goro"
]
races = ["Beast", "Dragon", "Elemental",
"Murloc", "Pirate", "Totem", "Mech"]

comments_body = ~s({"entityMap":{},"blocks":[{"key":"1inns","text":"comment","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]})
cards_count = 700
users_count = 100
comments_count = 500
likes_count = 100
desks_count = 100
Enum.each(1..cards_count, fn id ->
  params =
  %{
    text: "random text -- #{id}",
    flavor: "random flavor -- #{id}",
    title: "ranom card title --#{id}",
    collectible: true,
    elite: false,
    artist: "random artist -- #{id}",
    game_id: "CRD_#{id}"
  }
  |> Map.put(:player_class, Enum.random(classes))
  |> Map.put(:rarity, Enum.random(rarity))
  |> Map.put(:set, Enum.random(sets))
  |> Map.put(:race, Enum.random(races))
  |> Map.put(:attack, :rand.uniform(12))
  |> Map.put(:health, :rand.uniform(12))
  |> Map.put(:cost, :rand.uniform(12))

  Card.changeset(%Card{}, params) |> Repo.insert!
end)

Enum.each(1..users_count, fn id ->
  params = %{ name: "username #{id}", email: "user#{id}@example.com" }
  User.changeset(%User{}, params) |> Repo.insert!
end)

Enum.each(1..desks_count, fn id ->
  desk = %{
    "title" => "desk title##{id}",
    "description" => "desk deskription##{id}",
    "standard" => true
  }
  |> Map.put("player_class", Enum.random(desk_classes))
  |> Map.put("user_id", :rand.uniform(users_count))
  |> Map.put("cards", Seeds.Helper.desk_cards())

  Desk.changeset(%Desk{}, desk) |> Repo.insert!
end)

Enum.each(1..comments_count, fn id ->
  params = %{}
  |> Map.put("body", comments_body)
  |> Map.put("entity_id", :rand.uniform(cards_count))
  |> Map.put("entity_type", "card")
  |> Map.put("user_id", :rand.uniform(users_count))
  Comment.changeset_with_card(%Comment{}, params) |> Repo.insert!
end)

Enum.each(1..comments_count, fn id ->
  params = %{}
  |> Map.put("body", comments_body)
  |> Map.put("entity_id", :rand.uniform(desks_count))
  |> Map.put("entity_type", "desk")
  |> Map.put("user_id", :rand.uniform(users_count))
  Comment.changeset_with_desk(%Comment{}, params) |> Repo.insert!
end)

Enum.each(1..likes_count, fn id ->
  params = %{}
  |> Map.put(:user_id, :rand.uniform(users_count))
  |> Map.put(:entity_id, :rand.uniform(cards_count))
  |> Map.put(:entity_type, "card")
  Like.create_with_entity(%Like{}, params) |> Repo.insert
end)

Enum.each(1..likes_count, fn id ->
  params = %{}
  |> Map.put(:user_id, :rand.uniform(users_count))
  |> Map.put(:entity_id, :rand.uniform(comments_count))
  |> Map.put(:entity_type, "comment")
  Like.create_with_entity(%Like{}, params) |> Repo.insert
end)

Enum.each(1..likes_count, fn id ->
  params = %{}
  |> Map.put(:user_id, :rand.uniform(users_count))
  |> Map.put(:entity_id, :rand.uniform(desks_count))
  |> Map.put(:entity_type, "desk")
  Like.create_with_entity(%Like{}, params) |> Repo.insert
end)

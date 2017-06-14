defmodule HsTavern.CardFilterTest do
  use HsTavern.ConnCase

  alias HsTavern.{Card, Repo, CardFilter}
  @valid_attrs %{
    title: "card title",
    game_id: "CRD_001",
    card_set: "standard",
    type: "spell",
    player_class: "Mage",
    collectible: true,
    rarity: "Legendary",
    race: "dragon",
    cost: 1,
    attack: 1,
    health: 1,
    card_set: "ung"
  }

  def create_card(attr \\ @valid_attrs) do
    Card.changeset(%Card{comments: []}, attr) |> Repo.insert!
  end

  test "filter by keyword" do
    card_1 = create_card()
    create_card(@valid_attrs |> Map.put(:title, "foo bar"))
    {cards, _ } = CardFilter.filter(%{"keyword" => "card"})
    assert cards == [card_1]
  end

  test "filter by player_class" do
    create_card()
    card_1 = create_card(@valid_attrs |> Map.put(:player_class, "Druid"))
    {cards, _ } = CardFilter.filter(%{"class" => "Druid"})
    assert cards == [card_1]
  end

  test "filter by rarity" do
    create_card()
    card_1 = create_card(@valid_attrs |> Map.put(:rarity, "Basic"))
    {cards, _ } = CardFilter.filter(%{"rarity" => "Basic"})
    assert cards == [card_1]
  end

  test "filter by collectible" do
    card = create_card()
    card_1 = create_card(@valid_attrs |> Map.put(:collectible, true))
    {cards, _ } = CardFilter.filter(%{"collectible" => true})
    assert cards == [card, card_1]
  end

  test "filter by cost(and order)" do
    create_card(@valid_attrs |> Map.put(:cost, 7))
    card = create_card()
    card_1 = create_card(@valid_attrs |> Map.put(:cost, 3))
    {cards, _ } = CardFilter.filter(%{"cost" => "0;3"})
    assert cards == [card, card_1]
  end

  test "filter by attack" do
    create_card(@valid_attrs |> Map.put(:attack, 7))
    card = create_card()
    card_1 = create_card(@valid_attrs |> Map.put(:attack, 3))
    {cards, _ } = CardFilter.filter(%{"attack" => "0;3"})
    assert cards == [card, card_1]
  end

  test "filter by health" do
    create_card(@valid_attrs |> Map.put(:health, 7))
    card = create_card()
    card_1 = create_card(@valid_attrs |> Map.put(:health, 3))
    {cards, _ } = CardFilter.filter(%{"health" => "0;3"})
    assert cards == [card, card_1]
  end

  test "filter by class" do
    create_card()
    card_1 = create_card(@valid_attrs |> Map.put(:player_class, "Druid"))
    {cards, _ } = CardFilter.filter(%{"class" => "Druid"})
    assert cards == [card_1]
  end

  test "filter by set" do
    create_card()
    card_1 = create_card(@valid_attrs |> Map.put(:card_set, "Naxx"))
    {cards, _ } = CardFilter.filter(%{"set" => "Naxx"})
    assert cards == [card_1]
  end
end

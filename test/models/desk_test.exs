defmodule HsTavern.DeskTest do
  use HsTavern.ModelCase

  alias HsTavern.{Desk}

  @valid_attrs %{
    "user_id" => 1,
    "description" => "some content",
    "player_class" => "some content",
    "standard" => true,
    "title" => "some content",
    "cards" => []
  }

  @invalid_attrs %{
    "cards" => []
  }

  def cards(count \\ 2) do
    1..15 |> Enum.map( fn(id) -> %{"card_id" => id, "count" => count} end )
  end

  def invalid_cards() do
    1..10 |> Enum.map( fn(id) -> %{"card_id" => id, "count" => 3} end )
  end

  test "changeset with valid attributes" do
    desk = Desk.changeset(%Desk{}, %{@valid_attrs | "cards" => cards()})
    assert desk.valid?
  end

  test "changeset with invalid attributes" do
    desk = Desk.changeset(%Desk{}, %{@invalid_attrs | "cards" => cards(1)})
    refute desk.valid?
  end

  test "cards count invalid" do
    changeset = Desk.changeset(%Desk{}, %{@valid_attrs | "cards" => cards(1)})
    assert "cards count error" in errors_on(changeset).cards_count
  end

  test "desk cards is invalid" do
    desk = Desk.changeset(%Desk{}, %{@valid_attrs | "cards" => invalid_cards()})
    refute desk.valid?
  end
end

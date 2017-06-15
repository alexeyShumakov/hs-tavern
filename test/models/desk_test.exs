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

  test "changeset with valid attributes" do
    desk = Desk.changeset(%Desk{}, %{@valid_attrs | "cards" => cards()})
    assert desk.valid?
  end

  test "changeset with invalid attributes" do
    desk = Desk.changeset(%Desk{}, %{@invalid_attrs | "cards" => cards(1)})
    refute desk.valid?
  end

  test "cards count invalid" do
    attrs = %{@invalid_attrs | "cards" => cards(1)}
    assert {:cards_count, "cards count error"} in errors_on(%Desk{}, attrs)
  end
end

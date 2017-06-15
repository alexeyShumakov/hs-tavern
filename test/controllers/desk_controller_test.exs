defmodule HsTavern.DeskControllerTest do
  use HsTavern.ConnCase

  alias HsTavern.{Repo, User, Card}

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

  @card_attrs %{
    title: "card title",
    game_id: "CRD_001",
    card_set: "standard",
    type: "spell",
    player_class: "mage",
    collectible: true,
    rarity: "Legendary",
    race: "dragon",
    cost: 1,
    attack: 1,
    health: 1
  }

  def guardian_login() do
    user = User.changeset(%User{}, %{email: "email@e.com", name: "name"}) |> Repo.insert!
    build_conn()
      |> bypass_through(HsTavern.Router, [:browser])
      |> get("/")
      |> Guardian.Plug.sign_in(user)
      |> send_resp(200, "Hi")
      |> recycle()
  end

  def cards(count \\ 2) do
    1..15 |> Enum.map(fn(_) -> Card.changeset(%Card{}, @card_attrs) |> Repo.insert! end )
    |> Enum.map( fn card -> %{"count" => count, "card_id" => card.id} end )
  end

  test "POST /desks valid data" do
    conn = guardian_login()
           |> post("/desks", [desk: %{@valid_attrs | "cards" => cards()}])

    assert json_response(conn, 200) == %{"status" => "ok"}
  end

  test "POST /desks invalid data" do
    conn = guardian_login()
           |> post("/desks", [desk: %{@invalid_attrs | "cards" => cards()}])
    assert json_response(conn, 200) == %{"status" => "bad"}
  end

  test "POST /desks invalid cards" do
    conn = guardian_login()
           |> post("/desks", [desk: %{@valid_attrs | "cards" => cards(1)}])
    assert json_response(conn, 200) == %{"status" => "bad"}
  end
end

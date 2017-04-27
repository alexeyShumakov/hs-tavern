defmodule HsTavern.Seed.Worker do
  use GenServer
  alias HsTavern.Seed.ImgProcessor
  alias HsTavern.Card
  alias HsTavern.Repo

  def start_link([]) do
    GenServer.start_link(__MODULE__, [], [])
  end

  def init(_) do
    {:ok, nil}
  end

  def handle_call({:create_card, card}, _from, state) do
    case Repo.insert(get_changeset(card)) do
      {:error, _} ->
        IO.puts "bad! #{card["name"]}"
      {:ok, _} ->
        IO.puts "ok! #{card["name"]}"
    end

    {:reply, card, state}
  end

  def create_card(pid, card) do
    GenServer.call(pid, {:create_card, card})
  end

  def get_changeset(card) do
    case card["img"] do
      nil -> IO.puts "empty"
      image ->
        ImgProcessor.write_image(image)
        card_params = %{
          title: card["name"] || "name",
          game_id: card["cardId"],
          card_set: card["cardSet"],
          type: card["type"],
          faction: card["faction"],
          rarity: card["rarity"],
          cost: card["cost"],
          attack: card["attack"],
          health: card["health"],
          text: card["text"],
          flavor: card["flavor"],
          artist: card["artist"],
          collectible: card["collectible"],
          elite: card["elite"],
          race: card["race"],
          player_class: card["playerClass"],
          img: %Plug.Upload{
            content_type: "image/png",
            filename: "#{card["cardId"]}.png",
            path: "/tmp/images/#{card["cardId"]}.png"}
        }
        Card.changeset(%Card{}, card_params)
    end
  end
end

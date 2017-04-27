defmodule HsTavern.Seed.Master do
  use Application
  alias HsTavern.Seed.Worker

  def pool_name, do: :seed_pool
  @url "https://omgvamp-hearthstone-v1.p.mashape.com/cards"
  @headers ["X-Mashape-Key": "QFoPqBzZPBmshJ2Pq9hptKbD5WX0p18oBYFjsnLkliETS6QyN7"]

  def poolboy_config do
    [{:name, {:local, pool_name}},
      {:worker_module, Worker},
      {:size, 10},
      {:max_overflow, 2}]
  end

  def start do
    import Supervisor.Spec, warn: false

    children = [
      :poolboy.child_spec(pool_name, poolboy_config, [])
    ]

    options = [
      strategy: :one_for_one,
      name: HsTavern.Seed.Supervisor
    ]

    Supervisor.start_link(children, options)
  end

  def create_cards do
    File.mkdir("/tmp/images")

    {:ok, %HTTPoison.Response{status_code: 200, body: body}} = HTTPoison.get(@url, @headers)
    {:ok, sets} = Poison.Parser.parse(body)

    sets
    |> Enum.filter(fn({k, _v}) -> !Enum.member?(~w(Credits Debug Promotions System), k) end)
    |> Enum.reduce([], fn({_k, v}, cards) -> v ++ cards end)
    |> Enum.each(fn card ->
      spawn(fn() -> create_card(card) end) end)
  end

  def create_card(card) do
    :poolboy.transaction(
      pool_name,
      fn(pid) -> Worker.create_card(pid, card) end,
      :infinity
    )
  end
end

# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     HsTavern.Repo.insert!(%HsTavern.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
#

alias HsTavern.{Repo, Card}

1..100 |> Enum.each(fn id ->
  params = %{cost: 0, title: "title--#{id}", collectible: true, player_class: "Neutral"}
  card = Card.changeset(%Card{}, params) |> Repo.insert!
end)

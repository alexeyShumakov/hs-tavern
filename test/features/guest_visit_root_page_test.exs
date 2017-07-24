defmodule HsTavern.GuestVisitRootPageTest do
  use HsTavern.IntegrationCase, async: true

  import Wallaby.Query, only: [css: 2]

  test "first test", %{session: session} do
    session
    |> visit("/")
    |> assert_has(css("#app > div > section > div > div > div:nth-child(2) > h3", text: "Home"))
  end
end

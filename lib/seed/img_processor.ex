defmodule HsTavern.Seed.ImgProcessor do
  @moduledoc """
  img processor
  """

  def write_image(url) do
    img_name = url |> String.split("/") |> List.last
    unless File.exists?("/tmp/images/#{img_name}")  do
      IO.puts "get #{url}"
      url |> HTTPoison.get |> handle_response(url) |> write(img_name)
    end
  end

  def write(image, img_name) do
    File.write!("/tmp/images/#{img_name}", image)
  end

  def handle_response({:ok, %{status_code: 301, headers: headers}}, url) do
    headers
    |> Enum.into(%{})
    |> Map.fetch!("Location")
    |> HTTPoison.get
    |> handle_response(url)
  end

  def handle_response({:error, _response}, url) do
    url |> HTTPoison.get |> handle_response(url)
  end

  def handle_response({:ok, %{status_code: 200, body: body}}, _url), do: body
end

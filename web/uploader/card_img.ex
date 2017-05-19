defmodule HsTavern.CardImg do
  use Arc.Definition
  use Arc.Ecto.Definition

  @versions [:original, :thumb]
  @extension_whitelist ~w(.jpg .jpeg .gif .png)

  def acl(:thumb, _), do: :public_read
  def __storage, do: Arc.Storage.S3

  def validate({file, _}) do
    file_extension = file.file_name |> Path.extname |> String.downcase
    Enum.member?(@extension_whitelist, file_extension)
  end

  def transform(:thumb, _) do
    {:convert, "-thumbnail 286x395^ -gravity center -extent 286x395 -format png", :png}
  end

  def filename(version, _) do
    version
  end

  def storage_dir(_, {_file, card}) do
    "cards/#{card.slug}"
  end

  def default_url(:thumb) do
    "https://placehold.it/286x395"
  end
end

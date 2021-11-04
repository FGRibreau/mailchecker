defmodule MailChecker do
  use Agent

  @blacklist Enum.into([{{& listSTR }}], MapSet.new)
  @initial_config %{custom_domains: MapSet.new}

  def start_link do
    Agent.start_link(fn -> @initial_config end, name: __MODULE__)
  end

  def add_custom_domains(new_domains) do
    ensure_started()

    Agent.update(__MODULE__, fn config ->
      Map.update(config, :custom_domains, @initial_config[:custom_domains], fn existing_custom_domains ->
        new_domains
          |> Enum.reduce(existing_custom_domains, &(MapSet.put(&2, &1)))
      end)
    end)
  end

  def blacklist, do: @blacklist

  def valid?(email) do
    valid_address?(email) && !in_blacklist?(email)
  end

  def in_blacklist?(email) do
    Enum.any?(extract_domain_suffixes(email), fn domain ->
      MapSet.member?(blacklist(), domain) || contain_custom_domain?(domain)
    end)
  end

  def extract_domain_suffixes(email) do
    domain = String.split(email, "@") |> List.last()
    domain_parts = String.split(domain, ".")
    range = Range.new(0, length(domain_parts) - 1)

    Enum.map(range, fn n -> Enum.join(Enum.drop(domain_parts, n), ".") end)
  end

  def valid_address?(email) do
    Regex.match?(~r/\A{{& unanchoredRegexpString }}\z/i, email)
  end

  defp ensure_started do
    case start_link() do
      {:ok, pid} -> pid
      {:error, {:already_started, pid}} -> pid
    end
  end

  defp custom_domains do
    ensure_started()

    Agent.get(__MODULE__, & &1[:custom_domains])
  end

  defp contain_custom_domain?(domain) do
    MapSet.member?(custom_domains(), domain)
  end
end

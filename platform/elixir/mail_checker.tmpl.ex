defmodule MailChecker do
  @blacklist Enum.into([{{& listSTR }}], HashSet.new)

  def blacklist, do: @blacklist

  def valid?(email) do
    valid_address?(email) && !in_blacklist?(email)
  end

  def in_blacklist?(email) do
    Enum.any?(extract_domain_suffixes(email), fn domain -> HashSet.member?(blacklist, domain) end)
  end

  def extract_domain_suffixes(email) do
    domain          = String.split(email, "@") |> List.last
    domain_parts    = String.split(domain, ".")
    range           = Range.new(0, (length domain_parts) - 1)

    Enum.map(range, fn n -> Enum.join(Enum.drop(domain_parts, n), ".") end)
  end

  def valid_address?(email) do
    Regex.match?(~r/\A{{& unanchoredRegexpString }}\z/i, email)
  end
end

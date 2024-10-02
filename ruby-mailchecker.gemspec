# coding: utf-8
Gem::Specification.new do |spec|
  spec.name          = 'ruby-mailchecker'
  spec.version='6.0.11'
  spec.authors       = ['Francois-Guillaume Ribreau', 'Jacob Burenstam', 'Owen Stephens']
  spec.email         = ['github@fgribreau.com']

  spec.summary       = 'Temporary (disposable/throwaway) email detection library. Covers 1979 fake email providers.'
  spec.description   = 'Cross-language temporary (disposable/throwaway) email detection library. Covers 1979 fake email providers. http://twitter.com/FGRibreau'
  spec.homepage      = 'https://github.com/FGRibreau/mailchecker'
  spec.license       = 'MIT'

  spec.files         = ['platform/ruby/mail_checker.rb', 'platform/ruby/ruby-mailchecker.rb']
  spec.require_paths = ['platform/ruby']
  spec.add_development_dependency 'minitest', '~>5.8'
end

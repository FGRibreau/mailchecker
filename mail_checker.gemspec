# coding: utf-8
Gem::Specification.new do |spec|
  spec.name          = 'mail_checker'
  spec.version       = '0.1.0'
  spec.authors       = ['Francois-Guillaume Ribreau', 'Jacob Burenstam']
  spec.email         = ['github@fgribreau.com']

  spec.summary       = 'Temporary (disposable/throwaway) email detection library. Covers 1979 fake email providers.'
  spec.description   = 'Cross-language temporary (disposable/throwaway) email detection library. Covers 1979 fake email providers. http://twitter.com/FGRibreau'
  spec.homepage      = 'https://github.com/FGRibreau/mailchecker'
  spec.license       = 'MIT'

  spec.files         = ['platform/ruby/mail_checker.rb']
  spec.require_paths = ['platform/ruby']
end

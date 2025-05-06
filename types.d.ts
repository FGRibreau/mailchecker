export function isValid(email: string): boolean
export function blacklist(): Set<string>
/**
 * Adds custom domains to the Mailchecker module.
 *
 * This function enhances the default email validation behavior by allowing you to extend
 * the recognized list of email domains. The provided custom domains will be checked alongside
 * the built-in domains.
 *
 * @param domains - An array of custom domain strings to be added.
 */
export function addCustomDomains(domains: string[]): void

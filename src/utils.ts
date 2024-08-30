export function generateBasicAuthHeader(
  apiKey: string,
  clientSecret: string
): string {
  // Combine the apiKey and clientSecret with a colon
  const credentials = `${apiKey}:${clientSecret}`;

  // Encode the credentials to Base64 using btoa()
  const encodedCredentials = btoa(credentials);

  // Return the Authorization header value
  return `Basic ${encodedCredentials}`;
}

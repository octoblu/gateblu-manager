var clientId, providerUri;

if (process.env.NODE_ENV === 'production') {
  clientId    = '4d04c4c8-87ed-48c2-a3c0-9b308a028bf6'
  providerUri = 'https://oauth.octoblu.com'
} else {
  clientId    = 'b41987ad-4d53-4a0b-92c1-11b7e91875a4'
  providerUri = 'https://oauth.octoblu.dev'
}

export const CLIENT_ID    = clientId;
export const PROVIDER_URI = providerUri

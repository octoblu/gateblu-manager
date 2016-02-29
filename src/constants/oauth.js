var clientId, providerUri;

if (process.env.NODE_ENV === 'production') {
  clientId    = '4d04c4c8-87ed-48c2-a3c0-9b308a028bf6'
  providerUri = 'https://oauth.octoblu.com'
} else {
  clientId    = '03152f7a-e6fc-4c6e-9e70-9828957fbcb7'
  providerUri = 'https://oauth.octoblu.com'
}

export const CLIENT_ID    = clientId;
export const PROVIDER_URI = providerUri

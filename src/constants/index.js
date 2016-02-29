let OCTOBLU_URL = 'https://app.octoblu.com'
if (process.env.NODE_ENV == 'development') {
  OCTOBLU_URL = 'http://localhost:8080'
}

const constants = {
  OCTOBLU_URL
}

export default constants

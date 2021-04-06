export const headersApi = (credentials?) => {
    const basicHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
  
    if (credentials) {
        return { ...basicHeaders, Authorization: 'Bearer ' + credentials.t }
    }
  
    return basicHeaders
}
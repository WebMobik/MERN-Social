import { credentialsT } from "./api/types"

export const headersApi = (typeJson?: boolean, credentials?: credentialsT) => {
    const basicHeaders = {
        Accept: 'application/json',
    }

    switch(true) {
        case typeJson:
            basicHeaders['Content-Type'] = 'application/json'
        case !!credentials:
            basicHeaders['Authorization'] = 'Bearer ' + credentials?.t
        default:
            break
    }
  
    return basicHeaders
}
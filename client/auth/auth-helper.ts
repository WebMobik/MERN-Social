import { signout } from '../api/auth'

const auth = {
    isAuthenticated() {
        if (typeof window == 'undefined')
            return false
        
        if (sessionStorage.getItem('jwt'))
            return JSON.parse(sessionStorage.getItem('jwt'))
        else
            return false
    },
    authenticate(jwt: string, cb: Function) {
        if (typeof window !== 'undefined')
            sessionStorage.setItem('jwt', JSON.stringify(jwt))
        cb()
    },
    clearJWT(cb: Function) {
        if (typeof window !== 'undefined')
            sessionStorage.removeItem('jwt')
        cb()
        signout().then(() => {
            document.cookie = 't=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        })
    }
}

export default auth

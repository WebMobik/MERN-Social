export default class API {

    async get(url, headerParams, signal?) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: headerParams,
                signal
            })
            return await response.json()
        } catch (error) {
            console.log(error);
        }
    }

    async post(url, headerParams, body, signal?) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headerParams,
                body,
                signal
            })
            return await response.json()
        } catch (error) {
            console.log(error);
        }
    }

    async put(url, headerParams, body, signal?) {
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: headerParams,
                body,
                signal
            })
            return await response.json()
        } catch (error) {
            console.log(error);
        }
    }

    async delete(url, headerParams, signal?) {
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: headerParams,
                signal
            })
            return await response.json()
        } catch (error) {
            console.log(error);
        }
    }

}
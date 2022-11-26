import axios from "axios"
import https from 'https'

let apiUrl = process.env.NEXT_PUBLIC_API_URL || import.meta.env.VITE_API_URL

if (process.env.NODE_ENV === 'development') {
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    })
    axios.defaults.httpsAgent = httpsAgent
}

const axiosApi = axios.create({
    baseURL: apiUrl
})

axiosApi.interceptors.request.use(config => {
    config.headers['Accept'] = 'application/json'
    config.headers['X-Client'] = 'React'
    // if (localStorage && localStorage.getItem('locale')) {
    //   config.headers['Locale'] = localStorage.getItem('locale')
    // }
    return config
})

axiosApi.interceptors.response.use(
    response =>
        response
    ,
    error => {
        if (apiUrl === undefined) {
            throw new Error('You have not defined the NEXT_PUBLIC_API_URL or VITE_API_URL')
        }
        if (error.response === undefined) {
            throw new Error(error.message ? error.toString() : 'Unknown error')
        }
        if (error.response.status === 404) {
            throw new Error(`404\nService does not exist\n${error.request.path}\n${apiUrl}`)
        }
        if (error.response.status === 400 || error.response.status === 500) {
            var messages = ''
            var data = error.response.data
            if (typeof data !== "string") {
                for (var item in error.response.data) {
                    if (item.toLowerCase && item.toLowerCase() === 'type') {
                        continue
                    }
                    if (Array.isArray(data[item])) {
                        for (var i = 0; i < data[item].length; i++) {
                            messages += data[item][i] + "\n"
                        }
                    }
                    else if (typeof data[item] === 'object') {
                        console.log(data[item])
                    }
                    else {
                        messages += data[item] + "\n"
                    }
                }
            }
            else {
                messages = data
            }
            console.log(messages)
            throw new Error(messages)
        }
    }
)

export async function get(url) {
    const path = url.split('?')[0]
    let query = new URLSearchParams()
    if (url.indexOf('?') > 0) {
        query = url.split('?')[1]
        query = new URLSearchParams(query)
    }
    const params = {}
    query.forEach((value, key) => params[key] = value)
    console.log(params)
    return await
        axiosApi.get(path, {
            params: params,
            crossDomain: true
        }).then(response => {
            return response?.data
        })
}

export async function post(url, data) {
    return await axiosApi
        .post(url, { ...data })
        .then(response => response?.data)
}

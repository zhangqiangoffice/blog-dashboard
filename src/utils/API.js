import Axios from 'axios'
import Qs from 'qs'
import URI from './URI'
import { BASE_URL, API_VERSION } from './values'
import router from '@/router'

const axiosForm = Axios.create({
    baseURL: `${BASE_URL}${API_VERSION}`,
    transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
    }],

    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})

const login = (username, password) => axiosForm.post(URI.login(), {
    username,
    password
})

const checkLogin = () => axiosForm.get(URI.checkLogin())

const logout = () => axiosForm.get(URI.logout())

const getUserList = (page, limit) => axiosForm.get(URI.userList(), { params: { page, limit } })

const handleErr = err => {
    console.log('API err: ', err)
    if (err.response.status === 403 ) {
        router.replace('/')
    }
}

export default {
    login,
    checkLogin,
    logout,
    getUserList,
    handleErr,
}

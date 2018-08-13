import Axios from 'axios'
import Qs from 'qs'
import URI from './URI'
import { BASE_URL, API_VERSION, ALERT_VARIANT } from './values'
import store from '@/store'

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

const deleteUserById = id => axiosForm.delete(URI.users(id))

const getCategoryList = (page, limit) => axiosForm.get(URI.categories(), { params: { page, limit } })

const deleteCategoryById = id => axiosForm.delete(URI.categories(id))

const handleErr = (err, msg) => {
    console.log('API err: ', err)
    if (err.response.status === 403 ) {
        store.dispatch({ type: 'logoutCompleted' })
    }
    if (msg) {
        store.dispatch({ type: 'showAlert', content: msg, variant: ALERT_VARIANT.DANGER })
    }
}

export default {
    login,
    checkLogin,
    logout,
    handleErr,
    getUserList,
    deleteUserById,
    getCategoryList,
    deleteCategoryById,
}

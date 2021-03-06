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

const login = (username, password) => axiosForm.post(URI.login(), { username, password })

const checkLogin = () => axiosForm.get(URI.checkLogin())

const logout = () => axiosForm.get(URI.logout())

const getUserList = (page, limit) => axiosForm.get(URI.users(), { params: { page, limit } })

const deleteUserById = id => axiosForm.delete(URI.users(id))

const getCategoryList = (page, limit) => axiosForm.get(URI.categories(), { params: { page, limit } })

const deleteCategoryById = id => axiosForm.delete(URI.categories(id))

const updateCategory = (id, name) => axiosForm.put(URI.categories(id), { name })

const createCategory = (name) => axiosForm.post(URI.categories(), { name })

const getContentList = (page, limit) => axiosForm.get(URI.contents(), { params: { page, limit } })

const deleteContentById = id => axiosForm.delete(URI.contents(id))

const createContent = (category, title, description, content) => axiosForm.post(URI.contents(), { category, title, description, content })

const updateContent = (id, category, title, description, content) => axiosForm.put(URI.contents(id), { category, title, description, content })

const handleErr = (err, msg) => {
    console.log('API err: ', err)
    if (err.response && err.response.status === 403 ) {
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
    updateCategory,
    createCategory,
    getContentList,
    deleteContentById,
    createContent,
    updateContent,
}

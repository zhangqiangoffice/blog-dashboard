const login = () => '/api/user/dashboardLogin'
const checkLogin = () => '/api/user/checkAdminLogin'
const logout = () => '/api/user/logout'

const concatRestUri = (id, item) => id ? `/dashboard/${item}/${id}` : `/dashboard/${item}`

const users = id => concatRestUri(id, 'users')
const categories = id => concatRestUri(id, 'categories')

export default {
    login,
    checkLogin,
    logout,
    users,
    categories,
}

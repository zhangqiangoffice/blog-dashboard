const login = () => '/api/user/dashboardLogin'
const checkLogin = () => '/api/user/checkAdminLogin'
const logout = () => '/api/user/logout'

const userList = () => '/dashboard/users'
const users = id => `/dashboard/users/${id}`

const categories = id => id ? `/dashboard/categories/${id}` : '/dashboard/categories'

export default {
    login,
    checkLogin,
    logout,
    userList,
    users,
    categories,
}

const login = () => '/api/user/dashboardLogin'
const checkLogin = () => '/api/user/checkAdminLogin'
const logout = () => '/api/user/logout'

const userList = () => '/dashboard/users'
const users = id => `/dashboard/users/${id}`

export default {
    login,
    checkLogin,
    logout,
    userList,
    users,
}


const cache = {
    username: ''
}

export default {
    install(Vue) {
        Vue.prototype.cacheData = cache
    }
}


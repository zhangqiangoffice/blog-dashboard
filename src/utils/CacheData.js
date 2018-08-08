
export default {
    install(Vue, options) {
        Vue.prototype.cacheData = options.defaultCache
        Vue.prototype.$cacheData = options.defaultCache
    }
}


export const mainModule = {
    state: {
        likes: 0
    },
    getters: {
        doubleLikes(state){
            return state.likes * 2
        }
    },
    mutations: {
        incrementLikes(state){
            state.likes += 1
        }
    },
    actions: {

    },
    namespaced: true
}

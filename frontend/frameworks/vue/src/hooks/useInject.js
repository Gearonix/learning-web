import {inject} from 'vue'

export const useInject = () => {
    return inject('message')
}

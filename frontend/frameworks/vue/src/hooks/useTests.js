import {onMounted, ref} from 'vue'

export const useTests = () => {
    const tests = ref(2)
    const setTests = () => {
        tests.value += 1
    }
    onMounted(() => {
        console.log('this is hook useTests')
    })
    return {
        tests,
        setTests
    }
}

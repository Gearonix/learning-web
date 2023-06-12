import {PropType, defineComponent} from 'vue'

interface State{
    hello: 'world'
}

export default defineComponent({
    emits: {
        close: (q: number) => q
    },
    props: {
        isShow: {
            type: Boolean as PropType<boolean>,
            default: false
        }
    },
    data(): State{
        return {
        hello: 'world'
    }
    },
    methods: {
        showDialog(){
            this.$emit('close', 2)
        }
    },
    mounted() {
        console.log('dialog mounted')
    },
    unmounted() {
        console.log('dialog unmounted')
    }
})

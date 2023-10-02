import {create, StateCreator} from 'zustand'
import {devtools, persist} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';

interface ActionsSlice {
    addBear: () => void
    eatFish: () => void
    addFish: () => void
}

interface ServiceSlice{
    fetchTodos: () => void
}

const createServices : StateCreator<BoundStore,
[], [], ServiceSlice> = (set ,getState) => ({
    fetchTodos: async () => {
        // set({fishes: true})
        const res = await fetch('https://jsonplaceholder.typicode.com/todos')
        const json = await res.json()
        // set({todos: json})
    }
})

const createActionsSlice: StateCreator<
    BoundStore,
    [],
    [],
    ActionsSlice
> = (set, getState) => ({
    addBear: () => set({ bears: getState().bears + 1 }),
    eatFish: () => set((state) => ({ fishes: state.fishes - 1 })),
    addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
})

interface StateSlice {
    fishes: number
    bears: number
}
const createStateSlice: StateCreator<
    BoundStore,
    [],
    [],
    StateSlice
> = (set) => ({
    bears: 0,
    fishes: 0,
})

type BoundStore = StateSlice & {
    actions: ActionsSlice,
    services: ServiceSlice
}

const useBoundStore = create<BoundStore>()(persist(devtools(immer((...a) => ({
    ...createStateSlice(...a),
    actions: createActionsSlice(...a),
    services: createServices(...a)
}))), {version: 1, name: 'usersStore'}))


// useAuthState
// useAuthActions
// useAuthServices



const createStore = <T>(store: (...args: any[]) => T, name: string) => {
    return create<T>()(persist(devtools(immer(store)),
        {version: 1, name}))
}

export const useStore = create(devtools((set, getState) => ({
    todos: [
        {
            title: 'test'
        },
        {
            title: 'test'
        }
    ],
    loading: false,
    addTodo: (title: string) => {
        return set({
            todos: [...getState().todos, {title}]
        })
    },
    fetchTodos: async () => {
        set({loading: true})
        const res = await fetch('https://jsonplaceholder.typicode.com/todos')
        const json = await res.json()
        set({todos: json})
    }
})))


const sub1 = useStore.subscribe((state) => {
    console.log('callback')
    console.log(state)
})

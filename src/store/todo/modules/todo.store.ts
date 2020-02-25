/* todo.store.ts */
import {TodoModel} from '@/components/TodoModel'
import axios from 'axios'

import {MutationTree, ActionTree, Store} from 'vuex'
import {TodoStoreKeys} from '@/models/TodoStoreKeys'

/**
 * Return the store model interface
 */
const state = (): ITodoStore => ({
  todos: new Array<TodoModel>(),
})

/**
 * This is pointless, replace this with a state read.
 * Getters should be used for things like aggregations and safe access.
 */
// const getters: GetterTree<ITodoStore, {}> = {
//   todos(state) {
//     return state.todos
//   },
// }

/**
 * First Generic === store model interface
 * Second Generic === Root interface
 */
const mutations: MutationTree<ITodoStore> = {
  [TodoStoreKeys.mutations.addTodo](state, todo: TodoModel): void {
    state.todos.push(todo)
  },

  [TodoStoreKeys.mutations.deleteTodo](state, id: string): void {
    // I've never seen someone delete like this before, but it works
    state.todos = state.todos.filter(todo => todo.id !== id)
  },

  [TodoStoreKeys.mutations.initializeTodos](state, todos: TodoModel[]): void {
    state.todos = todos
  },
}

const actions: ActionTree<ITodoStore, {}> = {
  [TodoStoreKeys.actions.addTodo]({commit, state}, title: string): void {
    /*
     * I'm guessing this is simply an action to replicate what would normally contain an async
     */
    const id = state.todos.length + 1

    const todo = new TodoModel(id.toString(), title, false)

    commit(TodoStoreKeys.mutations.addTodo, todo)
  },

  async [TodoStoreKeys.actions.deleteTodo](
    {commit}, // I'm generally not a fan of this pattern, but it maintains type safety
    id: string
  ): Promise<void> {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    commit(TodoStoreKeys.mutations.deleteTodo, id)
  },

  async [TodoStoreKeys.actions.fetchTodos](
    {commit},
    limit: Number = 200
  ): Promise<void> {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    )

    const todos = new Array<TodoModel>()
    response.data.forEach(todo => {
      todos.push(new TodoModel(todo.id.toString(), todo.title, todo.completed))
    })

    commit(TodoStoreKeys.mutations.initializeTodos, todos)
  },
}

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations,
}

/**
 * strongly type your store model, then you can take advantage of vuex typing
 */
export interface ITodoStore {
  todos: TodoModel[]
}

/**
 * Idea that I've been fucking around with.  It's the only way to make EVERYTHING type safe.
 * It's a lot of code though, so like you'd need a generator for it to be reasonable
 *
 * The alternative to this is to implement Vuex-Class, which is a lot of what we do at work.
 * https://github.com/ktsn/vuex-class
 */

export class TodoStoreUtility {
  static todos(store: Store<any>): TodoModel[] {
    return store.state[TodoStoreKeys.namespace][
      TodoStoreKeys.state.todos
    ] as TodoModel[]
  }

  static async initializeTodos(
    store: Store<any>,
    filterCount?: number
  ): Promise<void> {
    store.dispatch(
      TodoStoreKeys.namespace + '/' + TodoStoreKeys.actions.fetchTodos,
      filterCount
    )
  }

  static async addTodo(store: Store<any>, title: string): Promise<void> {
    store.dispatch(
      TodoStoreKeys.namespace + '/' + TodoStoreKeys.actions.addTodo,
      title
    )
  }

  static async deleteTodo(store: Store<any>, id: string): Promise<void> {
    store.dispatch(
      TodoStoreKeys.namespace + '/' + TodoStoreKeys.actions.deleteTodo,
      id
    )
  }
}

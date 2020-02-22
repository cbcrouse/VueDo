/* todo.store.ts */
import { Vue } from 'vue-property-decorator';
import { TodoModel } from "@/components/TodoModel"

const state = {
  todos: [
    new TodoModel("1", "todo 1", false),
    new TodoModel("2", "todo 2", false),
    new TodoModel("3", "todo 3", false),
    new TodoModel("4", "todo 4", false),
    new TodoModel("5", "todo 5", false)
  ]
}

const getters = {
  todos(state) {
    return state.todos;
  }
}

const mutations = {

  addTodo(state, todo: TodoModel) {
    state.todos.push(todo);
  },

  deleteTodo(state, id: string) {
    const index = state.todos.findIndex(todo => {return todo.id === id});
    if (index != undefined) {
      Vue.delete(state.todos, index);
    }
  }
}

const actions = {

  addTodo({ commit }, todo: TodoModel) {
    commit('addTodo', todo);
  },

  deleteTodo({ commit }, id: string) {
    commit('deleteTodo', id);
  }
}

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
}
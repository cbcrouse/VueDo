/* todo.store.ts */
import { TodoModel } from "@/components/TodoModel"
import axios from "axios"

const state = {
  todos: new Array<TodoModel>()
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
    state.todos = state.todos.filter(todo => todo.id !== id)
  },

  initializeTodos(state, todos: TodoModel[]) {
    state.todos = todos;
  }
}

const actions = {

  addTodo({ commit }, todo: TodoModel) {
    commit('addTodo', todo);
  },

  async deleteTodo({ commit }, id: string) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    commit('deleteTodo', id);
  },

  async fetchTodos({ commit }) {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/todos'
    );

    const todos = response.data;
    todos.forEach(todo => {
      todos.push(new TodoModel(todo.id.toString(), todo.title, todo.completed))
    });

    commit('initializeTodos', todos);
  }
}

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
}
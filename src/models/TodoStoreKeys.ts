export const TodoStoreKeys = {
  actions: {
    addTodo: 'addTodo',
    deleteTodo: 'deleteTodo',
    fetchTodos: 'fetchTodos',
  },
  getters: {
    totalCompleted: 'totalCompleted',
    percentageCompleted: 'percentageCompleted',
  },
  mutations: {
    addTodo: 'addTodo',
    deleteTodo: 'deleteTodo',
    initializeTodos: 'initializeTodos',

    // Bind that to your v-checkbox change event instead of using v-model
    toggleCompleted: 'toggleCompleted',
  },
  namespace: 'Todo',
  state: {
    todos: 'todos',
  },
}

<template>
  <v-container>
    <v-container>
      <v-form @submit="onSubmit">
        <v-text-field placeholder="New Todo" required v-model="title" />
        <v-btn block color="primary" dark type="submit" on>ADD TODO</v-btn>
      </v-form>
    </v-container>
    <v-list subheader two-line flat>
      <v-list-item-group multiple v-for="todo in todos" :key="todo.id">
        <v-list-item>
          <template>
            <v-list-item-action>
              <v-checkbox v-model="todo.completed" color="primary"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ todo.title }}</v-list-item-title>
              <v-list-item-subtitle
                >{{ todo.id }}: {{ todo.completed }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Log } from "@/decorators/log";

export class TodoModel {
  id: String | undefined;
  title: String | undefined;
  completed: Boolean | undefined;

  constructor(id: string, title: string, completed: boolean) {
    this.id = id;
    this.title = title;
    this.completed = completed;
  }
}

@Component
export default class Todos extends Vue {
  // Data property
  title: string = "";
  todos: TodoModel[] = [];

  onSubmit(e: Event) {
    e.preventDefault();
    var id = this.todos.length + 1;
    var todo = new TodoModel(id.toString(), this.title, false);
    this.todos.push(todo);
    this.title = "";
  }

  // Initializing todo list using Lifecycle hooks.
  @Log
  created() {
    this.todos = [
      new TodoModel("1", "todo 1", false),
      new TodoModel("2", "todo 2", false),
      new TodoModel("3", "todo 3", false),
      new TodoModel("4", "todo 4", false),
      new TodoModel("5", "todo 5", false)
    ];
  }
}
</script>

<style scoped></style>

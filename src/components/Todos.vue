<template>
  <v-container fill-height align-center>
    <v-list subheader two-line flat>
      <v-list-item-group multiple v-for="todo in todos" :key="todo.id">
        <v-list-item>
          <template v-slot:default="{ active, toggle }">
            <v-list-item-action>
              <v-checkbox
                v-model=todo.completed
                color="primary"
                @click="toggle"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ todo.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ todo.id }}: {{ todo.completed }}</v-list-item-subtitle>
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
  todos: TodoModel[] = [];

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

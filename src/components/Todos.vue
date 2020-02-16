<template>
  <v-card class="mx-auto" max-width="400" tile>
      <v-list-item
        v-for="todo in getTodos()"
        :key="todo.id"
      >
        <v-list-item-content>
          <v-list-item-title>{{ todo.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ todo.id }}: {{ todo.completed }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Log } from "@/decorators/log"

@Component
export default class Todos extends Vue {
  // Data property
  todos: object[] = [
    {
        id: "1",
        title: "todo 1",
        completed: false
    },
    {
        id: "2",
        title: "todo 2",
        completed: false
    },
    {
        id: "3",
        title: "todo 3",
        completed: false
    },
    {
        id: "4",
        title: "todo 4",
        completed: false
    },
    {
        id: "5",
        title: "todo 5",
        completed: false
    }
  ];

  @Log
  getTodos() {
    return this.todos;
  }
}
</script>

<style scoped></style>

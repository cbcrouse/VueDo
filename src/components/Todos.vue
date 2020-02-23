<template>
  <v-container fluid>
    <v-container fluid>
      <v-form @submit="onSubmit">
        <v-text-field
          placeholder="New Todo"
          :rules="['Required']"
          v-model="title"
        />
        <v-btn block color="primary" dark type="submit" on>ADD TODO</v-btn>
      </v-form>

      <v-row>
        <v-col>
          <v-select
            @change="onFilterChange"
            :items="filterCounts"
            label="Filter Count"
            v-model="filterCount"
            dense
            outlined
          ></v-select>
        </v-col>
        <v-col>
          <span class="mr-2">Todos Completed: {{ totalCompleted }} </span>
          <v-progress-circular
            :value="percentageCompleted"
          ></v-progress-circular>
        </v-col>
        <v-col>
        </v-col>
        <v-col></v-col>
      </v-row>
    </v-container>
    <v-list subheader two-line flat>
      <v-list-item-group
        multiple
        v-for="todo in this.$store.getters.todos"
        :key="todo.id"
      >
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
            <v-btn
              @click="onDelete($event, todo.id)"
              color="primary"
              fab
              small
              dark
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { TodoModel } from "./TodoModel";

@Component
export default class Todos extends Vue {
  title: string = "";
  filterCounts: Number[] = [5, 10, 20, 50, 100];
  filterCount: Number | null = 200;

  get totalCompleted() {
    const todos = (this.$store.getters.todos as TodoModel[]).filter(todo => {
      return todo.completed;
    });
    return todos.length;
  }

  get percentageCompleted() {
    const total = (this.$store.getters.todos as TodoModel[]).length;
    const percentage = this.totalCompleted / total;
    return percentage * 100;
  }

  onFilterChange() {
    this.$store.dispatch("fetchTodos", this.filterCount);
  }

  onSubmit(e: Event) {
    e.preventDefault();
    var id = this.$store.getters.todos.length + 1;
    var todo = new TodoModel(id.toString(), this.title, false);
    this.$store.dispatch("addTodo", todo);
    this.title = "";
  }

  onDelete(e: Event, id: string) {
    e.preventDefault();
    this.$store.dispatch("deleteTodo", id);
  }

  created() {
    this.$store.dispatch("fetchTodos", this.filterCount);
  }
}
</script>

<style scoped></style>

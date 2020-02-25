<template>
  <v-container fluid>
    <v-container fluid>
      <v-form @submit="onSubmit">
        <v-text-field placeholder="New Todo" :rules="['Required']" v-model="title" />
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
          <span class="mr-2">Todos Completed: {{ totalCompleted }}</span>
          <v-progress-circular :value="percentageCompleted"></v-progress-circular>
        </v-col>
        <v-col></v-col>
        <v-col></v-col>
      </v-row>
    </v-container>
    <v-list subheader two-line flat>
      <v-list-item-group multiple v-for="todo in todos" :key="todo.id">
        <v-list-item>
          <template>
            <v-list-item-action>
              <!-- 
                Usually do not v-model state directly into a component without explicit get and set methods 
                binding to the store.
                This is technically implementing both getters and setters on state from the store.
                You don't want to set state you iterate from the store, only mutate those changes.
              -->
              <v-checkbox v-model="todo.completed" color="primary"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ todo.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ todo.id }}: {{ todo.completed }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-btn @click="onDelete($event, todo.id)" color="primary" fab small dark>
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
import { TodoStoreUtility } from "../store/todo/modules/todo.store";

@Component
export default class Todos extends Vue {
  /**
   * All of these can go in your store with mutations around them
   * Bind a get method to a state pull from your store
   * Bind a set method to the mutation (if necessary)
   *
   * It seems stupid and unnecessary at first, but you can start wrapping tests around it.
   * Think about even the submit method, you can validate that your title is cleared after submission.
   * Your initialize / onChange method would no longer be parameterized because you're reading sibling state.
   * It places all your component state into the store so you can maintain tests around interactions without
   * instantiating the full component and mounting it to a DOM.
   */
  title: string = "";
  filterCounts: number[] = [5, 10, 20, 50, 100];
  filterCount: number = 200;

  public get todos(): TodoModel[] {
    return TodoStoreUtility.todos(this.$store);
  }

  // Feels like a new getter that could live in a store with tests
  get totalCompleted(): number {
    const todos = this.todos.filter(todo => {
      return todo.completed;
    });
    return todos.length;
  }

  // Feels like a new getter that could live in a store with tests
  get percentageCompleted(): number {
    const total = this.todos.length;
    const percentage = this.totalCompleted / total;
    return percentage * 100;
  }

  async onFilterChange(): Promise<void> {
    await TodoStoreUtility.initializeTodos(this.$store, this.filterCount);
  }

  async onSubmit(e: Event): Promise<void> {
    e.preventDefault();
    await TodoStoreUtility.addTodo(this.$store, this.title);
    this.title = "";
  }

  async onDelete(e: Event, id: string): Promise<void> {
    e.preventDefault();
    await TodoStoreUtility.deleteTodo(this.$store, id);
  }

  async created(): Promise<void> {
    await TodoStoreUtility.initializeTodos(this.$store, this.filterCount);
  }
}
</script>

<style scoped></style>

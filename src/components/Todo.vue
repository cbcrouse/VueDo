<template>
  <div class="todo">
    
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ title }}</v-list-item-title>
          <v-list-item-subtitle>{{ id }}: {{ completed }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Todo extends Vue {
  // Data property
  id: String | undefined;
  title: String | undefined;
  completed: Boolean | undefined;
}
</script>

<style scoped>
.todo {
    display: block;
    width: 200px;
    height: 200px;
    
}
</style>

<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <span class="mr-2">TODO LIST</span>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>

  <Todos />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Todos from "./components/Todos.vue";

export default Vue.extend({
  name: "App",
  components: {
    Todos
  },

  data: () => ({
    //
  })
});
</script>

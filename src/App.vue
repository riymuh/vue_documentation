<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">Vue-App</div>

      <v-spacer></v-spacer>

      <v-btn href="https://github.com/riymuh" target="_blank" text>
        <span class="mr-2">github.com/riymuh</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <home-component />
    </v-main>
  </v-app>
</template>

<script>
import HomeComponent from "./pages/HomeComponent.vue";

export default {
  name: "App",

  components: {
    HomeComponent,
  },

  data: () => ({
    //
  }),
};
</script>

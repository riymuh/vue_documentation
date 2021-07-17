<template>
  <v-container class="lighten-5">
    <!-- Stack the columns on mobile by making one full-width and the other half-width -->
    <v-row>
      <v-col cols="12" md="8">
        <v-card class="pa-5" outlined tile>
          <DataTableComponent />
        </v-card>
      </v-col>
      <v-col cols="6" md="4">
        <v-card class="pa-5" outlined tile>
          <UserDetailComponent />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserDetailComponent from "../components/UserDetailComponent.vue";
import DataTableComponent from "../components/DataTableComponent.vue";
export default {
  name: "HomeComponent",

  components: {
    UserDetailComponent,
    DataTableComponent,
  },

  data: () => ({}),
};
</script>

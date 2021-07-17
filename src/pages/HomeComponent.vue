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
          <UserDetailComponent :user="viewedData" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserDetailComponent from "../components/UserDetailComponent.vue";
import DataTableComponent from "../components/DataTableComponent.vue";
import { EventBus } from "@/eventBus.js";

export default {
  name: "HomeComponent",

  created() {
    EventBus.$on("viewData", (data) => this.viewData(data));
    this.$store
      .dispatch("getUsers")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  beforeDestroy() {
    EventBus.$off("viewData");
  },

  data() {
    return {
      viewedData: [],
      loading: false,
    };
  },

  components: {
    UserDetailComponent,
    DataTableComponent,
  },

  methods: {
    viewData(data) {
      this.viewedData = data;
    },
  },
};
</script>

<template>
  <v-container class="lighten-5">
    <v-row>
      <v-col cols="12" md="8">
        <v-card class="pa-5" outlined tile>
          <div v-if="loadingBar" class="progress-status">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
          <DataTableComponent v-else />
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
      .then(() => {
        this.isLoading();
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
      loadingBar: true,
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
    isLoading() {
      setTimeout(() => {
        this.loadingBar = false;
      }, 1000);
    },
  },
};
</script>

<style scoped>
.progress-status {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
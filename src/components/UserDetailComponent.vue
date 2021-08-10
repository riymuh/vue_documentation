<template>
  <v-list two-line>
    <v-list-item>
      <v-list-item-icon>
        <v-icon color="primary"> mdi-account </v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>{{ user.name }}</v-list-item-title>
        <v-list-item-subtitle>Name</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider inset></v-divider>
    <v-list-item>
      <v-list-item-icon>
        <v-icon color="primary"> mdi-phone </v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>{{ user.phone_number }}</v-list-item-title>
        <v-list-item-subtitle>Phone</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider inset></v-divider>

    <v-list-item>
      <v-list-item-icon>
        <v-icon color="primary"> mdi-email </v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>{{ user.email }}</v-list-item-title>
        <v-list-item-subtitle>Email</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props: ["user"],
};
</script>
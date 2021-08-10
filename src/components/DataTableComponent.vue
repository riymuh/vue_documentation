<template>
  <v-data-table :headers="headers" :items="getUsers" sort-by="name">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Users</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Item
            </v-btn>
          </template>
          <v-card>
            <!-- modal create user & update user -->
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="editedItem.phone_number"
                      label="Phone"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
            <!-- modal create user & update user -->
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="viewItem(item)"> mdi-eye </v-icon>
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { EventBus } from "@/eventBus.js";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Email", value: "email" },
      { text: "Phone", value: "phone_number" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      email: "",
      phone_number: "",
    },
    viewedItem: {
      name: "",
      email: "",
      phone_number: "",
    },
    defaultItem: {
      name: "",
      email: "",
      phone_number: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    getUsers() {
      return this.$store.state.users;
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.$store.commit("increment");
    console.log(this.$store.state.count);
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.getUsers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    viewItem(item) {
      this.viewedItem = Object.assign({}, item);
      EventBus.$emit("viewData", this.viewedItem);
    },

    deleteItem(item) {
      this.editedIndex = this.getUsers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store
        .dispatch("deleteUser", {
          index: this.editedIndex,
          user: this.editedItem,
        })
        .then((res) => {
          console.log(res);
        })
        .catch(() => {
          console.log("hello");
        });
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex === -1) {
        this.$store
          .dispatch("createUser", this.editedItem)
          .then((res) => {
            console.log(res);
          })
          .catch(() => {
            console.log("hello");
          });
      } else {
        this.$store
          .dispatch("updateUser", {
            user: this.editedItem,
            index: this.editedIndex,
          })
          .then((res) => {
            console.log(res);
          })
          .catch(() => {
            console.log("hello");
          });
      }
      this.close();
    },
  },
};
</script>
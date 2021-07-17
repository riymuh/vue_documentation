import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Vuex, VueAxios, axios);

axios.defaults.baseURL = "http://localhost:3000/";

export const store = new Vuex.Store({
  state: {
    count: 0,
    users: [],
  },
  getters: {
    getUser: (state) => {
      return state.users.find((user) => user.user_id == 1);
    },
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    getUsers(state, data) {
      state.users = data;
    },
    createUser(state, data) {
      state.users.push(data);
    },
    updateUser(state, data) {
      state.users.splice(data.index, 1, data.user);
    },
    deleteUser(state, data) {
      state.users.splice(data.index, 1);
    },
  },
  actions: {
    increment(context) {
      context.commit("increment");
    },
    getUsers(context) {
      setTimeout(function() {
        return new Promise((resolve, reject) => {
          axios
            .get("/users")
            .then((response) => {
              context.commit("getUsers", response.data.result);
              resolve("sukses");
            })
            .catch((error) => {
              reject(error);
              console.log(error);
            });
        });
      }, 1000);
    },
    createUser(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/users", data)
          .then((response) => {
            context.commit("createUser", response.data.result);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
            console.log(error);
          });
      });
    },
    updateUser(context, data) {
      let updateData = {
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
      };
      return new Promise((resolve, reject) => {
        axios
          .put("/users/" + data.user.user_id, updateData)
          .then((response) => {
            const update = {
              index: data.index,
              user: response.data.result,
            };
            context.commit("updateUser", update);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
            console.log(error);
          });
      });
    },
    deleteUser(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .delete("/users/" + data.user.user_id)
          .then((response) => {
            const update = {
              index: data.index,
            };
            context.commit("deleteUser", update);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
            console.log(error);
          });
      });
    },
  },
});

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    count: 0,
    users: [
      {
        id: 1,
        name: "Riyadh Muhammad",
        phone: "0812221212",
        email: "mriyadh103@gmail.com",
      },
      {
        id: 2,
        name: "Diana Zelvi",
        phone: "12121",
        email: "diana@gmail.com",
      },
      {
        id: 3,
        name: "Budi",
        phone: "122222",
        email: "budi@gmail.com",
      },
    ],
  },
  getters: {
    getUser: (state) => {
      return state.users.find((user) => user.id == 1);
    },
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    createUser(state, data) {
      state.users.push(data);
    },
    updateUser(state, data) {
      state.users.splice(data.index, 1, data.user);
    },
    deleteUser(state, data) {
      state.users.splice(data, 1);
    },
  },
  actions: {
    increment(context) {
      context.commit("increment");
    },
    createUser(context, data) {
      context.commit("createUser", data);
      console.log(data);
    },
    updateUser(context, data) {
      console.log(data);
      context.commit("updateUser", data);
    },
    deleteUser(context, data) {
      console.log(data);
      context.commit("deleteUser", data);
    },
  },
});

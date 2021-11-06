import Vue from 'vue'
import Vuex from 'vuex'
import backend from "../api/backend";
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    state: {
        isLoggedIn: false,
        userInfos: null
    },
    mutations: {
        login_success: function (state, userInfos) {
            state.isLoggedIn = true;
            state.userInfos = userInfos;
        },
        login_error: function (state) {
            state.isLoggedIn = false;
            state.userInfos = null;
        },
        logout: function (state) {
            state.isLoggedIn = false;
            state.userInfos = null;
        }
    },
    actions: {
        login: async function (context, infos) {
            console.log( infos )
            return backend.login( infos.username, infos.password )
                    .then(function ( ) {
                        context.commit('login_success',{
                            username: infos.username,
                            password: infos.password
                    })
                })
        },
        logout: function (context) {
                context.commit('logout')
            }
    },
    getters: {
        isLoggedIn: state => state.isLoggedIn,
        getUserInfos: state => state.userInfos
    }
});

export default store;
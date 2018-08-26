import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth';
import globalAxios from 'axios';
import router from './router'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      idToken: null,
      userId: null,
      user: null
  },
  mutations: {
        authUser (state, userData) {
            state.idToken = userData.token;
            state.userId= userData.userId;
        },
        storeUser (state, user) {
            state.user = user;
        },
        clearAllData (state) {
            state.idToken = null;
            state.userId = null;
            state.user = null;
        }
  },
  actions: {
      setLogoutTimer ({commit}, expirationTime) {
          setTimeout(() =>{
              commit('clearAllData');
              router.replace('/signup');
          },expirationTime * 1000)
      },
      signup ({commit, dispatch}, authData) {
          axios.post('/signupNewUser?key=AIzaSyA_VQ3xAjrm8G6Iml729ZTXgi1B6cOxIWg', {
              email: authData.email,
              password: authData.password,
              returnSecureToken: true
          }).then( res => {
              console.log(res);
              commit('authUser', {
                  token: res.data.idToken,
                  userId: res.data.localId
              });
              const now = new Date();
              const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
              localStorage.setItem('token', res.data.idToken);
              localStorage.setItem('userId', res.data.localId);
              localStorage.setItem('expiresIn', expirationDate);
              dispatch('storeUser', authData);
              dispatch('setLogoutTimer', res.data.expiresIn);
          }).catch(err => console.error(err.message));
      },
      storeUser ({commit, state}, userData) {
          if (!state.idToken) return;
          globalAxios.post('/user.json' + '?auth=' + state.idToken, userData)
              .then( res => console.log(res))
              .catch(err => console.error(err.message));
      },
      login ({commit, dispatch}, authData) {
          axios.post('/verifyPassword?key=AIzaSyA_VQ3xAjrm8G6Iml729ZTXgi1B6cOxIWg', {
              email: authData.email,
              password: authData.password,
              returnSecureToken: true
          }).then( res => {
              console.log(res);
              const now = new Date();
              const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
              localStorage.setItem('token', res.data.idToken);
              localStorage.setItem('userId', res.data.localId);
              localStorage.setItem('expiresIn', expirationDate);
              commit('authUser', {
                  token: res.data.idToken,
                  userId: res.data.localId
              });
              dispatch('setLogoutTimer', res.data.expiresIn);
              router.replace('/dashboard');

          }).catch(err => console.error(err.message));
      },
      fetchUser ({commit, state}, payload) {
          if (!state.idToken) return;
          globalAxios.get('/user.json' + '?auth=' + state.idToken)
              .then((res) => {
                  const data = res.data;
                  console.log(data);

                  const users = [];
                  for(let key in data) {
                      users.push(data[key]);
                  }
                  commit('storeUser', users[0]);
                  console.log(users);
              }).catch( err => console.error(err.message));
      },
      tryAutoLogin ({commit}) {
          const token = localStorage.getItem('token');
          if (!token) return;
          const expirationDate = localStorage.getItem('expiresIn');
          const now = new Date();
          if (now >= expirationDate) return;

          const userId = localStorage.getItem('userId');
          commit('authUser', {
              token: token,
              userId: userId
          });
      },
      logOut ({commit}) {
          commit('clearAllData');
          localStorage.removeItem('token');
          localStorage.removeItem('expiresIn');
          localStorage.removeItem('userId');
          router.replace('/signin');
      }

  },
  getters: {
    user (state) {
        return state.user;
    },
    isAuth (state) {
        return state.idToken !== null;
    }
  }
})
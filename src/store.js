import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth';
import qs from 'qs' ;
import router from './router'

Vue.use(Vuex);

const config = {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
};

export default new Vuex.Store({
  state: {
      idToken: null,
      logError: null,
      usersName: null,
      videos: [],
      client_id: 'ZYzNI3AyutksMp7vnZWmvSGMwSkClqxW2cn9MaVW',
      grant_type: 'password',

  },
  mutations: {
        authUser (state, userData) {
            state.idToken = userData.token;
        },
        setUsersName(state, usersName) {
            state.usersName = usersName;
        },
        setErrorState (state, data) {
            state.logError = data;
        },
        storeVideos (state, videos) {
            state.videos = videos;
        },
        clearAllData (state) {
            state.idToken = null;
            state.usersName = null;
        }
  },
  actions: {
      setLogoutTimer ({commit}, expirationTime) {
          setTimeout(() =>{
              commit('clearAllData');
              router.replace('/signin');
          },expirationTime * 1000)
      },
      setCurrentUsersName({commit, state}, userEmail) {
        if (!state.idToken) return;
        axios.get('/api/v1/users/')
            .then((res) => {
              const data = res.data.results;
              // === FILTER OUT THE USERS DATA ===
              const userData = data.find( user => {
                return user.email === userEmail;
              });
              localStorage.setItem('userFirstName', userData.first_name);
              const firstname = localStorage.getItem('userFirstName');
              commit('setUsersName', firstname );

              if (userData) {
                router.replace('/dashboard');
              }
            }).catch( err => console.error(err.message));
      },
      login ({commit, state, dispatch}, authData) {

          let setData =  qs.stringify({
              username: authData.username,
              password: authData.password,
              client_id: state.client_id,
              grant_type: state.grant_type
          });

          axios.post('/oauth/token/', setData, config)
              .then( res => {
              const now = new Date();
              const expirationDate = new Date(now.getTime() + res.data.expires_in * 1000);
              localStorage.setItem('token', res.data.access_token);
              localStorage.setItem('expiresIn', expirationDate);
              commit('authUser', {
                  token: res.data.access_token
              });
              dispatch('setLogoutTimer', res.data.expires_in);

              // ==== RUN PROCESS TO GET & FILTER USERNAME ====
              dispatch('setCurrentUsersName', authData.username);


          }).catch(err => {
             commit('setErrorState', true);
             console.error(err.message);
          });
      },
      fetchVideos ({commit, state}) {
          if (!state.idToken) return;
          axios.get('/api/v1/videos/')
              .then((res) => {
                  const data = res.data;
                  commit('storeVideos', data.results);
              }).catch( err => console.error(err.message));
      },
      tryAutoLogin ({commit}) {
          const token = localStorage.getItem('token');
          if (!token) return;
          const expirationDate = localStorage.getItem('expiresIn');
          const now = new Date();
          if (now >= expirationDate) return;

          commit('authUser', {
              token: token
          });
      },
      logOut ({commit}) {
          commit('clearAllData');
          localStorage.removeItem('token');
          localStorage.removeItem('expiresIn');
          localStorage.removeItem('userFirstName');
          router.replace('/signin');
      }

  },
  getters: {
    loginErrorState (state) {
        return state.logError === true;
    },
    getVideos (state) {
        return state.videos;
    },
    isAuth (state) {
        return state.idToken !== null;
    },
    getUsersName (state) {
      return state.usersName;
    }
  }
})

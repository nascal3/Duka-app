<template>
  <header id="header">
    <div class="logo">
      <router-link to="/">Media resource library</router-link>
    </div>
    <nav>
      <ul>
        <li v-if="!show">
          <router-link to="/signin">Sign In</router-link>
        </li>
        <li v-if="show">
          <router-link to="/dashboard">Media Library</router-link>
        </li>
        <li v-if="show " class="settings">
          <div class="userArea">
            <div class="username">
              {{usersName}} <i class="fas fa-sign-out-alt"></i>
            </div>
            <button class="logout" @click="logout">Logout</button>
          </div>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>

  export default {
    data() {
      return {
        usersName: 'User'
      }
    },
      computed: {
        // usersName() {
        //   console.log(this.$store.getters.getUsersName);
        //   return this.$store.getters.getUsersName;
        // },
        show() {
            return this.$store.getters.isAuth;
        }

      },
      methods: {
          logout() {
            this.$store.dispatch('logOut');
          }
      },
    mounted() {
      this.usersName = localStorage.getItem('userFirstName');
    }
  }

</script>

<style scoped>
  #header {
    height: 56px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    background-color: #521751;
    padding: 0 20px;
  }

  .logo {
    font-weight: bold;
    color: white;
  }

  .logo a {
    text-decoration: none;
    color: white;
  }

  nav {
    height: 100%;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
    display: flex;
    flex-flow: row;
    align-items: center;
  }

  li {
    margin: 0 16px;
  }

  li a {
    text-decoration: none;
    color: white;
  }

  li a:hover,
  li a:active,
  li a.router-link-active {
    color: #fa923f;
  }

  .userArea {
    display: flex;
    justify-content: space-between;
  }

  .username {
    width: 70px;
    color: white;
    display: flex;
    padding: 5px 15px;
  }

  .username i {
    margin-left: 6px;
  }

  li.settings {
    width: 100px;
    background-color: #fa923f;
    border-radius: 5px;
    overflow: hidden;
    height: 27px;
    transition: all .3s;
  }

  li.settings:hover {
    width: 162px;
  }

  .logout {
    margin-right: 15px;
    background-color: transparent;
    border: none;
    font: inherit;
    color: white;
    cursor: pointer;
  }
</style>

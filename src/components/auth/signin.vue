<template>
  <div id="signin">
    <div class="loginError" v-if="show">Username or password did not match!</div>
    <div class="signin-form">
      <form @submit.prevent="onSubmit">
        <div class="input">
          <label for="email">Username</label>
          <input
                  type="email"
                  id="email"
                  v-model="username">
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input
                  type="password"
                  id="password"
                  v-model="password">
        </div>
        <div class="submit">
          <button type="submit">
            <span v-if="!loading">Submit</span>
            <span v-if="loading">logging in...</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import router from '../../router'

  export default {
    data () {
      return {
        loading: false,
        username: '',
        password: ''
      }
    },
    computed: {
      show() {
          return this.$store.getters.loginErrorState;
      }
    },
    methods: {
      onSubmit () {
        this.loading = true;

        const formData = {
          username: this.username,
          password: this.password,
        };

        this.$store.dispatch('login', formData);
        this.loading = false;
      }
    },
    created() {
        if (this.$store.getters.isAuth) {
            router.push('/dashboard');
        }
    }
  }
</script>

<style scoped>

  .loginError {
    position: relative;
    color: red;
    font-weight: 700;
    left: 39%;
    display: inline-block;
    top: 13px;
  }

  .signin-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

  .submit button {
    border: 1px solid #521751;
    color: #521751;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #521751;
    color: white;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }
</style>
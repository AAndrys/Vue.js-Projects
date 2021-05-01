<template>
  <div class="login-container">
      <div class="login-box">
        <div class="login-box-title" v-if="localState.isAuthenticated === false">
            <h1>Logowanie</h1>
        </div>
        <form method="GET" name="loginForm" v-if="localState.isAuthenticated === false">
            <label>Nazwa użytkownika</label>
            <input type="text" name="login" placeholder="Nazwa użytkownika" v-model="user" required>
            <label>Hasło</label>
            <input type="password" name="password" placeholder="Hasło" v-model="password" required>
            <button type="submit" @click="login">Zaloguj</button>
            <p v-if="notAuth">Błędne hasło lub login</p>
        </form>
        <h1 v-else>Zalogowano</h1>
      </div>
  </div>
</template>

<script>
import { globalStore } from '../main.js';
import { authUser } from './functions/LoginAuth.js';

export default {
    name: 'Login',
    data() {
        return {
            user: '',
            password: '',
            localState: globalStore,
            notAuth: false,
        }
    },
    watch: {
        user(value) {
            this.user = value.toLowerCase();
        }
    },
    methods: {
        async login(e) {
            e.preventDefault();
            await authUser(this.user, this.password)
                .then(() => {
                    if(globalStore.isAuthenticated === true) {
                        this.$router.push('/');
                    } else {
                        this.notAuth = true;
                    }
                })
        },
    },
}
</script>

<style>
@import '../assets/styles/style.css';
</style>
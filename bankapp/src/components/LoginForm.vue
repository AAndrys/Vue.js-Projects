<template>
    <div class="form-container">
        <div class="form-title">
            <p>{{ formTitle }}</p>
        </div>
        <div class="form-box">
            <form>
                <label for="login">Login</label>
                <input type="text" name="login" v-model="login" id="loginInput" placeholder="Login" autocomplete="off" maxlength="24" required>
                <label for="password">Password</label>
                <input type="password" name="password" v-model="password" id="passwordInput" placeholder="Password" autocomplete="off" maxlength="24" required>
                <button type="submit" v-on:click="(e) => auth(e)">{{ buttonText }}</button>
                <p v-if="wrongPass">Your login or password are wrong. Try again!</p>
            </form>
        </div>
    </div>
</template>

<script>
import { authUser } from './functions/Authentication.js'
import { globalStore } from '../main.js'

export default {
    name: 'LoginForm',
    data() {
        return {
            login: '',
            password: '',
            formTitle: 'Logowanie',
            buttonText: 'Login',
            wrongPass: false,
        }
    },
    watch: {
        login(value) {
            this.login = value.toLowerCase();
        }
    },
    methods: {
        async auth(e) {
            e.preventDefault();
            await authUser(this.login, this.password)
                .then(() => {
                    if(globalStore.isAuthenticated === true) {
                        this.$router.push('/panel');
                        this.login = '';
                        this.password = '';
                    } else {
                        this.login = '';
                        this.password = '';
                        this.wrongPass = true;
                    }
                })
        }
    }
}
</script>

<style>
@import '../assets/styles/style.css';
</style>
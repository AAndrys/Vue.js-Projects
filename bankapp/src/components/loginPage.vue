<template>
    <div>
        <NavigationBar />
        <div class="login-container">
            <LoginForm />
        </div>
    </div>
</template>

<script>
import LoginForm from './LoginForm'
import NavigationBar from './NavigationBar'

export default {
    name: 'loginPage',
    components: {
        LoginForm,
        NavigationBar
    }
}
</script>

<style>
@import '../assets/styles/style.css';
</style>
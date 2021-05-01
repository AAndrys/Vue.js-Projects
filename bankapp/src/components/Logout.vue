<template>
    <div>
        <NavigationBar />
        <div class="logout-container">
            <p>Successfully logged out.</p>
            <a href="/"><p>Return to home page.</p></a>
        </div>
    </div>
</template>

<script>
import NavigationBar from './NavigationBar'

export default {
    name: 'Logout',
    components: {
        NavigationBar,
    }
}
</script>

<style>
@import '../assets/styles/style.css';
</style>
<template>
    <div class="header-box">
        <header>
            <div class="header-container">
                <div class="header-container-logo">
                    <h1>{{ logo }}</h1>
                </div>
                <nav class="header-container-list">
                    <ul>
                        <li>Start</li>
                        <li>Produkty</li>
                        <li>O nas</li>
                        <li>Kontakt</li>
                        <li><router-link :to="{ path: '/box'}" >Box</router-link></li>
                    </ul>
                </nav>
                <div class="header-container-options">
                    <!-- <router-link :to="{ path: '/login' }" v-if="localStore.isAuthenticated == false"><button>Zaloguj</button></router-link> -->
                    <a href='/login' v-if="localStore.isAuthenticated == false"><button>Zaloguj</button></a>
                    <h1 v-else>Witaj {{ localStore.globalUser }} !</h1>
                    <button v-if="localStore.isAuthenticated" @click="logout">Wyloguj</button>
                    <button v-else>Rejestracja</button>
                </div>
            </div>
            <div class="header-mobile-menu">
                <div class="header-container-logo">
                    <h1>{{ logo }}</h1>
                </div>
                <span @click="menuShow"><i class="fas fa-bars" /></span>
            </div>
        </header>
        <div class="header-main-image">
            <img src="../assets/images/wave.png" alt="image">
        </div>
    </div>
</template>

<script>
// import { authUser } from './functions/LoginAuth.js';
import { globalStore } from '../main.js';

export default {
    name: 'NavigationBar',
    data() {
        return {
            logo: 'LOGO',
            localStore: globalStore
        }
    },
    mounted () {
        window.addEventListener('scroll', this.onScroll);
        window.addEventListener('resize', this.windowWidthGet);
    },
    beforeDestroy () {
        window.removeEventListener('scroll', this.onScroll);
        window.addEventListener('resize', this.windowWidthGet);
    },
    methods: {
        onScroll() {
            const header = document.querySelector('header');
            const headerContainer = document.querySelector('.header-container');
            const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            if(currentScrollPosition >= 40 && headerContainer.style.height != '100%') {
                header.style.backgroundColor = '#141933';
                header.style.position = 'fixed';
            } else if(currentScrollPosition < 40 && headerContainer.style.height != '100%' ) {
                header.style.backgroundColor = '';
                header.style.position = '';
            }
        },
        menuShow() {
            const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            if(window.innerWidth <= 750) {
                const header = document.querySelector('header');
                const mobileHeader = document.querySelector('.header-container');
                if(mobileHeader.style.height === '100%') {
                    if(currentScrollPosition >= 40) {
                        mobileHeader.style.height = '0';
                        header.style.backgroundColor = '#141933';
                        header.style.position = 'fixed';
                    } else {
                        mobileHeader.style.height = '0';
                        header.style.backgroundColor = '';
                        header.style.position = '';
                    }
                } else {
                    mobileHeader.style.height = '100%';
                    header.style.backgroundColor = '#141933';
                    header.style.position = 'fixed';
                }
            }
        },
        windowWidthGet() {
            if(window.innerWidth > 750) {
                const header = document.querySelector('header');
                const mobileHeader = document.querySelector('.header-container');

                header.style.backgroundColor = '';
                header.style.position = '';
                mobileHeader.style.height = '0';
            }
        },
        logout() {
            globalStore.isAuthenticated = false;
        }
    }
}
</script>

<style>
@import '../assets/styles/style.css';
</style>
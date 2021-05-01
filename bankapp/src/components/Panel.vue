<template>
  <div v-if="localState.isAuthenticated" class="panel-container">
    <div class="navigation-container">
        <div class="navigation-box">
            <div class="logo">
                <a href="/"><p>POLISH-BANK</p></a>
            </div>
            <div class="button-centre">
                <button v-on:click="logout" id="buttonPanel">Logout</button>
            </div>
        </div>
    </div>
    <div class="main-panel-container">
        <div class="top-options-container">
            <div class="top-options-box">
                <div class="top-options-show">
                    <input type="text" name="search" id="searchInput" placeholder="Search...">
                    <i class="fas fa-search"></i>
                    <button v-on:click="showMenu"><i class="fas fa-chevron-down"></i></button>
                </div>
                <div class="top-options">
                    <ul>
                        <router-link to="/transfer"><li>Make a transfer</li></router-link>
                        <router-link to="/payments"><li>Your payments</li></router-link>
                        <router-link to="/news"><li>Account</li></router-link>
                    </ul>
                </div>
            </div>
        </div>
        <div class="bottom-panel-container">
            <div class="money-amount-box">
                <div class="money-amount-content">
                    <div class="money-title-container">
                        <h1>Your balance:</h1>
                    </div>
                    <div class="money-amount-show">
                        <p>{{ moneyAmountFormat }} {{ localState.clientData.currency }}</p>
                    </div>
                </div>
            </div>
            <div class="personal-info-box">
                <div class="personal-info-content">
                    <div class="personal-title-container">
                        <h1>Personal details:</h1>
                    </div>
                    <div class="personal-info-show">
                        <p>Evidence: <span>{{ localState.clientData.evidence }}</span></p>
                        <p>Card number: <span>{{ localState.clientData.cardNumber }}</span></p>
                        <p>Origin: <span>{{ localState.clientData.origin }}</span></p>
                    </div>
                </div>
            </div>
            <div class="info-box">
                <div class="info-server-content">
                    <div class="info-server-title">
                        <h1>News</h1>
                    </div>
                    <div class="news-box">
                        <div class="news-container" v-for="info in localState.clientData.serverInfo.slice(0,3)" v-bind:key="info.title + Math.random()">
                            <h3>{{ info.title }}</h3>
                            <p>{{ info.desc }}</p>
                            <hr>
                        </div>
                        <p v-if="localState.clientData.serverInfo.length >= 3">Show more...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
  <div v-else class="notAuth">
      <p>Nastąpi przekierowanie do strony logowania...</p>
  </div>
</template>

<script>
import { globalStore } from '../main'
export default {
    name: 'Panel',
    data() {
        return {
            localState: globalStore,
            logoutUser: false,
            moneyAmountFormat: 0,
        }
    },
    methods: {
        logout() {
            globalStore.isAuthenticated = false;
            globalStore.clientData = {};
            this.logoutUser = true;
            return this.$router.push('/logout');
        },
        showMenu() {
            const menu = document.querySelector('.top-options-container');
            const downArrow = document.querySelector('.fa-chevron-down');

            if(menu.style.maxHeight === '300px') {
                menu.style.maxHeight = '45px';
                downArrow.style.transform = '';
            } else {
                menu.style.maxHeight = '300px';
                downArrow.style.transform = 'rotate(180deg)';
            }
        },
        async asyncMount() {
            if(await globalStore.isAuthenticated === true) {
                this.moneyFormat()
            } 
        },
        moneyFormat() {
            // let newValue = '';
            // let enabled = true;
            // const value = globalStore.clientData.amount;
            // let even = 2;
            // let zeroActive = true;

            // if(value.toString().length <= 4) {
            //     zeroActive = false;
            // } else {
            //     zeroActive = true;
            // }

            // if(value.toString().length % 2 === 0) {
            //     even = 3
            // } else if(value.toString().length === 7) {
            //     even = 1
            // } else if(value.toString().length === 6) {
            //     even = 1
            // } else if(value.toString().length == 8) {
            //     even = 2
            // } else if(value.toString().length % 2 !== 0) {
            //     even = 2
            // }

            // if(zeroActive) {
            //     for(let i = 0; i <= value.toString().substring(even, value.toString().length).length-1; i++) {
            //         if(enabled) {
            //             if(i === 2) {
            //             enabled = false;
            //             newValue += value.toString().substring(even, value.toString().length)[i]
            //             } else {
            //             newValue += value.toString().substring(even, value.toString().length)[i]
            //             }
            //         } else {
            //             if(i % 3 === 0) {
            //             newValue += " "
            //             newValue += value.toString().substring(even, value.toString().length)[i];
            //             } else {
            //             newValue += value.toString().substring(even, value.toString().length)[i]
            //             }
            //         }
            //     }
            //     this.moneyAmountFormat = value.toString().substring(0, even) + " " + newValue;
            // } else {
            //     this.moneyAmountFormat = value;
            // }
            const value = globalStore.clientData.amount;
            const valueLength = value.toString().length - 1;
            let counter = 0;
            let newValue = [];

            const reverseString = (str) => {
                str.reverse();
                if(str.toString()[0] === " ") {
                    str.shift();
                }
                return str.join('');
            }

            for(let i=valueLength; i >= 0; i--) {
                counter++
                if(counter === 3) {
                    newValue.push(value.toString()[i]);
                    newValue.push(" ");
                    counter = 0;
                } else {
                    newValue.push(value.toString()[i]);
                }
            }
            console.log(newValue)
            this.moneyAmountFormat = reverseString(newValue);
        },
    },
    mounted() {
        if(globalStore.isAuthenticated === false && this.logoutUser === false) {
            this.$router.push('/login');
        }
        this.asyncMount();
    }
}
</script>

<style>
@import '../assets/styles/style.css';
</style>
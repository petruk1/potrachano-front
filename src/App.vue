<template>
    <div id="app">
        <h3 class="title">Potracheno</h3>
        <ul class="menu">
            <router-link to="/income" active-class="active-route">
                <li class="item">Income</li>
            </router-link>
            <router-link to="/expends" active-class="active-route">
                <li class="item">Expends</li>
            </router-link>
            <router-link to="/stat" active-class="active-route">
                <li class="item">Statistic</li>
            </router-link>
        </ul>
        <div class="content-block">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import DatabaseService from "./database.service";
    import Expends from "./components/Expends";
    import Income from "./components/Income";
    import Statistic from "./components/Statistic";
    import VueRouter from "vue-router";

    const routes = [
        {
            path: "",
            redirect: "/expends"
        },
        {
            path: "/expends",
            component: Expends
        },
        {
            path: "/income",
            component: Income
        }, {
            path: "/stat",
            component: Statistic
        }
    ];

    const router = new VueRouter({
        routes
    });

    const dbService = DatabaseService.getInstance();
    export default {
        name: "app",
        components: {},
        provide: {dbService},
        router
    };
</script>

<style lang="scss">
    #app {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: .9rem;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        font-family: grenze-regular, sans-serif;
        background-image: url("assets/bg.png");
        background-size: cover;
    }

    .title {
        text-align: center;
        min-height: 50px;
        font-size: 2.5em;
    }

    .content-block {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 90%;
        height: calc(100% - 210px);
        padding: 10px 10px 0 10px;
    }

    .input {
        padding: 5px;
        outline: none;
        font-size: 1.2em;
        border-radius: 5px;
        border: 1px solid #dedbdb;
        box-shadow: 0 0 2px 0 #d8d1d1;
    }

    .menu {
        width: 100%;
        display: flex;
        list-style: none;
        justify-content: center;
        padding: 0;

        .item {
            padding: 10px 15px;
            border-radius: 2px;
            cursor: pointer;
            margin: 0 5px;
            font-size: 1.1rem;
            color: #44494e;
        }

        a {
            text-decoration: none;
        }
    }

    .elevation-1 {
        box-shadow: darkgrey 0 2px 5px 1px;
    }

    .elevation-2 {
        box-shadow: darkgrey 0 2px 5px 1px;
    }

    .active-route {
        background-color: #0000000f;
    }

    @media (max-width: 1080px) {
        #app {
            font-size: 0.8rem;
        }
    }

    @font-face {
        font-family: grenze-regular;
        src: url("assets/fonts/Grenze-Regular.ttf");
    }

    @font-face {
        font-family: granze-large;
        src: url("assets/fonts/Grenze-Bold.ttf");
    }
</style>

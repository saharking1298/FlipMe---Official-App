<template>
    <router-link class="heading center" :to="link">
        <h1>FlipMe <span class="optional">- A SaharScript Production</span></h1>
    </router-link>
</template>

<script>
export default {
    name: "AppHeader",
    data () {
        return {
            link: this.$route.name === 'Home' ? {name: "About"} : {name: "Home"},
        };
    },
}
</script>

<style scoped>
.heading {
    display: block;
    background-color: rgb(253, 108, 193);
    width: 100%;
    padding-bottom: 0px;
    padding-top: 0px;
    color: rgb(250, 225, 229);
    border-radius: 8px;
    user-select: none;
    transition: background-color 0.2s;
    text-align: center;
}
.heading:hover {
    background-color: rgb(248, 95, 184);
}
a, h1 {
    text-decoration: none;
}
</style>
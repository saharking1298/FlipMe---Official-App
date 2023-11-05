<template>
    <div class="background"></div>
    <app-header> </app-header>
    <vote-creator> </vote-creator>  
    <div class="section">
        <h2> Vote History </h2>
        <div v-if="voteHistory.length > 0">
            <div class="past-vote-card section" v-for="(item, index) in voteHistory" :key="index">
                <router-link :to="`/votes/${index}`" class="past-vote-link"> {{ item.question }} </router-link>
                <div class="past-vote-date">
                    <font-awesome-icon icon="calendar" />
                    {{ item.date }}
                </div>
            </div>
        </div>
        <p class="center info" v-else> It looks like you don't have any votes yet! </p>
    </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import VoteCreator from '@/components/VoteCreator.vue'
export default {
    components: { AppHeader, VoteCreator },
    name: 'HomeView',
    inject: ["getVoteHistory"],
    data () {
        return {
            voteHistory: this.getVoteHistory(),
        };
    },
}
</script>

<style scoped>
:root * {
    color: white;
}
h2 {
    margin: 0;
    text-align: center;
}
.background {
    background: #df6a91;
}
.section {
    background: rgba(0, 0, 0, 0.1);
    padding: 15px;
    border-radius: 8px;
    margin-top: 15px;
    margin-bottom: 15px;
    transition: background 0.1s;
}
.results-view:hover {
    background: rgba(0, 0, 0, 0.125);
}
.past-vote-link {
    margin-top: -5px;
    color: rgb(116, 40, 95);
    display: block;
    text-align: center;
    font-size: 1.25em;
}
.past-vote-date {
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
}
</style>
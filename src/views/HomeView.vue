<template>
    <div class="background"></div>
    <app-header> </app-header>
    <vote-creator> </vote-creator>
    <div class="section" v-if="currentVote !== null">
        <h2> Ongoing Votes </h2>
        <div class="section">
            <router-link :to="{name: 'Vote'}" class="vote-link"> {{ currentVote.question }} </router-link>
            <div class="vote-date">
                    <font-awesome-icon icon="calendar" />
                    {{ currentVote.date }}
                </div>
        </div>
    </div>
    <div class="section">
        <h2> Vote History </h2>
        <div v-if="reversedVoteHistory.length > 0">
            <div class="section" v-for="(item, index) in reversedVoteHistory" :key="index">
                <router-link :to="{name: 'Results', params: {voteId: reversedVoteHistory.length - 1 - index}}" class="vote-link"> {{ item.question }} </router-link>
                <div class="vote-date">
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
    inject: ["loadVoteHistory", "loadCurrentVote"],
    data () {
        return {
            voteHistory: this.loadVoteHistory(),
            currentVote: this.loadCurrentVote(),
        };
    },
    computed: {
        reversedVoteHistory () {
            return this.voteHistory.slice().reverse();
        }
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
.vote-link {
    margin-top: -5px;
    color: rgb(116, 40, 95);
    display: block;
    text-align: center;
    font-size: 1.25em;
}
.vote-date {
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
}
</style>
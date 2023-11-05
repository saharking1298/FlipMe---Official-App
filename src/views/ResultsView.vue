<template>
    <div class="background"></div>
    <app-header> </app-header>
    <vote-results :on-homepage="false" :vote-data="voteData"> </vote-results>
</template>

<script>
import VoteResults from "@/components/VoteResults.vue";
import AppHeader from '../components/AppHeader.vue';
import { useRoute } from 'vue-router';
export default {
    name: "ResultsView",
    components: { VoteResults, AppHeader },
    inject: ["getPastVote"],
    data() {
        const route = useRoute();
        const voteId = route.params.voteId;
        return {
            voteData: this.getPastVote(voteId),
        };
    }
}
</script>

<style scoped>
.background {
    background: #df6a91;
}
</style>
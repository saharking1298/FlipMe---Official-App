<template>
    <vote-results :on-homepage="false" :vote-results="voteResults"> </vote-results>
</template>

<script>
import VoteResults from "@/components/VoteResults.vue";
import { useRoute } from 'vue-router';
export default {
    name: "VoteResults",
    components: {VoteResults},
    inject: ["getVote"],
    data() {
        const route = useRoute();
        const voteId = route.params.voteId;
        return {
            voteResults: this.getVote(voteId),
        };
    }
}
</script>

<style>

</style>
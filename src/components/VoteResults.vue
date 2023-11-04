<template>
    <div id="result-screen">
        <div class="wrapper">
            <h1>Results</h1>
            <p class="info">Question:</p>
            <h2> {{voteResults.question}} </h2>
            <ul>
                <li v-for="(vote, index) in voteResults.votes" :key="index">
                    <div class="vote-result-bar">
                        <div class="vote-result-bar-darker" :style="{width: vote.percentage}">
                            <p class="vote-result-bar-text"> {{vote.option.trim()}} - {{vote.percentage}} ({{vote.votes}} votes) </p>
                        </div>
                    </div>
                </li>
                <li v-if="currentVote.totalVotes > 0">
                    <div class="vote-result-bar" id="total-votes">
                        <p class="total-votes"> Total votes: {{currentVote.totalVotes}} (100.00%)</p>
                    </div>
                </li>
            </ul>
            <p v-if="['range', 'oneToTen'].in(currentVote.type)" id="vote-avg">Your Vote Average: {{currentVote.average}}</p>
            <button class="start-button" @click="setScreen('main-screen')"> Start Another Vote </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "VoteResults",
    props: {
        voteResults: {
            type: Object,
            required: true
        },
        onHomepage: {
            type: Boolean,
            required: true
        }
    }
}
</script>

<style scoped>

</style>
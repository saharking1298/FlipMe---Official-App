<template>
    <div class="results-view">
        <router-link to="/">
            <font-awesome-icon icon="arrow-left" class="back-btn"/>
        </router-link>
        <h1> Vote Results </h1>
        <p class="info"> Question: </p>
        <h2> {{voteData.question}} </h2>
        <ul>
            <li v-for="(item, index) in voteData.results" :key="index">
                <div class="vote-result-bar">
                    <div class="vote-result-bar-darker" :style="{width: item.percentage}">
                        <p class="vote-result-bar-text"> {{item.name}} - {{item.percentage}} ({{item.qty}} votes) </p>
                    </div>
                </div>
            </li>
            <li>
                <div class="vote-result-bar" id="total-votes">
                    <p class="total-votes"> Total votes: {{totalVotes}} (100.00%)</p>
                </div>
            </li>
        </ul>
        <p v-if="voteData.preset.type === 'range'" id="vote-avg"> Your Vote Average: {{voteAverage}} </p>
        <button class="start-btn" @click="deleteVote"> Delete Vote </button>
    </div>
</template>

<script>
export default {
    name: "VoteResults",
    inject: ["deletePastVote"],
    props: {
        voteData: {
            type: Object,
            required: true
        },
        voteIndex: {
            type: Number,
            required: true
        },
    },
    data() {
        // Calculating total votes
        let totalVotes = 0;
        let voteAverage;
        this.voteData.results.forEach(item => {
            totalVotes += item.qty;
        });
        if (this.voteData.preset.type === 'range') {
            let sum = 0;
            this.voteData.results.forEach(item => {
                sum += parseInt(item.name) * item.qty;
            });
            voteAverage = (sum / totalVotes).toFixed(2);
        }
        return {
            totalVotes,
            voteAverage  
        };
    },
    created() {
        this.voteData.results.forEach(item => {
            item.percentage = (item.qty / this.totalVotes * 100).toFixed(2) + "%";
        });
    },
    methods: {
        deleteVote () {
            if (confirm("Delete this vote?")) {
                this.deletePastVote(this.voteIndex);
                this.$router.push("/");
            }
        }  
    },
}
</script>

<style scoped>
.back-btn {
    cursor: pointer;
    position: absolute;
    margin-left: 10px;
    margin-top: 12px;
    color: white;
}
.results-view {
    color: white;
    background: rgba(0, 0, 0, 0.1);
    padding: 15px;
    border-radius: 8px;
    transition: background 0.1s;
}
.results-view:hover {
    background: rgba(0, 0, 0, 0.125);
}
.results-view *::selection {
    background: rgba(0, 0, 0, 0.125);
}
h1{
    margin: 0;
    text-align: center;
}
h2{
    margin-top: 0px;
    margin-bottom: 0px;
    text-align: center;
}
ul{
    margin-bottom: 15px;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
}
.info{
    text-align: center;
    margin-top: 0px;
    margin-bottom: 0px;
    color: rgba(250, 225, 229, 0.568);
}
#vote-avg{
    text-align: center;
    margin-top: 0px;
}
#total-votes{
    background-color: rgba(110, 28, 88, 0.466);
}
.vote-result-bar{
    width: 98%;
    height: fit-content;
    background-color: rgb(156, 68, 133);
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 8px;
    max-width: 350px;
    text-align: center;
}
.vote-result-bar-darker {
    /* width: 0%; */
    height: 100%;
    transition: width 1.5s;
    border-radius: 8px;
    background-color: #863170;
    white-space: nowrap;
}
.vote-result-bar-text{
    margin-left: 20px;
}
.start-btn{
    background-color: rgb(194, 102, 171);
    border: 3px solid rgb(194, 102, 171);
    color: rgb(145, 56, 122);
    width: fit-content;
    display: block;
    cursor: pointer;
    font-size: 1.4em;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 30px;
    transition: 0.3s;
    margin-bottom: 10px;
    user-select: none;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    text-decoration: none;
}
.start-btn:hover{
    background-color: rgb(173, 87, 152);
    border-color: rgb(173, 87, 152);
}
</style>
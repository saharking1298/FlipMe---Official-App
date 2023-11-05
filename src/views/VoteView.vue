<template>
    <div class="background animated-background"> </div>
    <div id="vote-screen" :class="votesScreenClass">
        <h1> Votes Screen </h1>
        <p> Total Votes: {{ totalVotes }} </p>
        <h2 class="vote-title"> {{ vote.question }} </h2>
        <div>
            <div v-for="(item, index) in vote.votes" :key="index" @click="onAnswer(index)" class="vote-btn vote-screen-btn">
                <div class="darker"> {{ item.name }} </div>
            </div>
            <button @click="finishVote()" id="vote-finish-btn" class="vote-screen-btn">
                <div class="darker"> Finish Vote </div>
            </button>
        </div>
    </div>
</template>

<script>
const sounds = {
    pop: new Audio(require("@/assets/pop.mp3")),
};

export default {
    name: "VoteView",
    inject: ["getCurrentVote"],
    data () {
        return {
            vote: this.getCurrentVote(),
            totalVotes: 0
        };
    },
    created () {
        console.log(this.vote);
    },
    methods: {
        onAnswer (index) {
            console.log(this.vote.votes)
            this.vote.votes[index].qty++;
            this.totalVotes++;
            if (this.vote.config.soundEnabled) {
                sounds.pop.play();
            }
        },
        finishVote () {

        },

    },
}
</script>

<style scoped>
h1, h2, p {
    text-align: center;
    margin: 0;
}
#vote-screen {
    color: white;
}
#vote-finish-btn{
    background-color: rgba(255, 255, 255, 0);
    padding-left: 15px;
    padding-right: 15px;
    color: rgba(250, 225, 229, 0.658);
}
#vote-finish-btn>div.darker{
    padding-left: 15px;
    padding-right: 15px;
    margin-left: -15px;
    margin-right: -15px;
}
.vote-title{
    text-align: center;
}
.vote-screen-btn{
    border-radius: 30px;
    animation: vote-btn-color-change 10s infinite;
    border: 2px solid rgba(255, 255, 255, 0.397);
    margin-left: auto;
    margin-right: auto;
    display: block;
}
.vote-screen-btn:hover{
    cursor: pointer;
}
.vote-btn{
    width: 90%;
    text-align: center;
    max-width: 600px;
    margin-bottom: 10px;
    margin-top: 10px;
    font-size: 1.2em;
}
.animated-background{
    animation: background-color-change 10s infinite;
}
/* Animations */
@keyframes background-color-change{
    from{
        background-color: rgb(52, 170, 170);
    }
    50%{
        background-color: rgb(149, 71, 201);
    }
    100%{
        background-color: rgb(52, 170, 170);
    }
}
@keyframes vote-btn-color-change{
    from{
        background-color: rgb(149, 71, 201);
    }
    50%{
        background-color: rgb(52, 170, 170);
    }
    100%{
        background-color: rgb(149, 71, 201);
    }
}
</style>
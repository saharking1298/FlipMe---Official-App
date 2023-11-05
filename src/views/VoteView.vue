<template>
    <div class="background animated-background"> </div>
    <div id="vote-screen">
        <h1> Votes Screen </h1>
        <p> Total Votes: {{ totalVotes }} </p>
        <h2> {{ vote.question }} </h2>
        <div class="fade-in" :class="voteVisible ? 'visible': 'hidden'">
            <div v-for="(item, index) in vote.preset.choices" :key="index" @click="onAnswer(index)" class="vote-btn animated-btn">
                <div class="darker"> {{ item }} </div>
            </div>
            <button @click="finishVote()" id="vote-finish-btn" class="animated-btn">
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
            totalVotes: 0,
            voteActive: true,
            voteVisible: true
        };
    },
    methods: {
        onAnswer (index) {
            // Checking if vote is active
            if (!this.voteActive) {
                return;
            }

            // 
            this.vote.results[index].qty++;
            this.totalVotes++;
            this.voteVisible = false;
            this.voteActive = false;
            window.scrollTo(0, 0);
            setTimeout(() => {
                this.voteVisible = true;
            }, 500);
            setTimeout(() => {
                this.voteActive = true;
            }, 750);
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
    background-color: rgba(0, 0, 0, 0.1);
    padding: 15px;
    border-radius: 15px;
    transition: background-color 0.1s;
}
#vote-screen:hover {
    background-color: rgba(0, 0, 0, 0.125);
}
#vote-finish-btn {
    background-color: rgba(255, 255, 255, 0);
    padding-left: 15px;
    padding-right: 15px;
    color: rgba(250, 225, 229, 0.658);
}
#vote-finish-btn>div.darker {
    padding-left: 15px;
    padding-right: 15px;
    margin-left: -15px;
    margin-right: -15px;
}
.animated-btn {
    border-radius: 30px;
    animation: animated-btn-color 10s infinite;
    border: 2px solid rgba(255, 255, 255, 0.397);
    margin-left: auto;
    margin-right: auto;
    display: block;
}
.animated-btn:hover {
    cursor: pointer;
}
.vote-btn {
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
    margin-top: 10px;
    font-size: 1.3em;
}
.vote-btn *::selection {
    background: rgba(0, 0, 0, 0.2);
}
.animated-background {
    animation: animated-background-color 10s infinite;
}
.darker{
    padding-bottom: 5px;
    padding-top: 5px;
    border: 2px solid rgba(255, 255, 255, 0);
    border-radius: 30px;
    transition: background-color 0.1s;
}
/* Animations */
@keyframes animated-background-color {
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
@keyframes animated-btn-color {
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
@media (hover: hover) and (pointer: fine) {
    .darker:hover{
        background-color: rgba(0, 0, 0, 0.15);
    }
}
</style>
<template>
  <router-view> </router-view>
</template>

<script>
export default {
  name: 'App',
  components: {

  },
  methods: {
    loadVoteHistory() {
      let votes = localStorage.getItem('FlipMe.voteHistory');
      if (votes === null) {
        votes = [];
      }
      else {
        try {
          votes = JSON.parse(votes);
        }
        catch {
          votes = [];
        }
      }
      return votes;
    },
    saveVoteHistory(votes) {
      votes = votes || this.votes;
      localStorage.setItem('FlipMe.voteHistory', JSON.stringify(votes));
    },
    getVote(voteIndex) {
      return this.votes[voteIndex];
    }
  },
  data() {
    return {
      votes: this.loadVoteHistory(),
    };
  },
  async mounted() {
      await this.$router.isReady();
      console.log(this.$route.path);
      if(this.votes.length === 0 && ['/home', '/'].includes(this.$route.path)) {
        this.$router.push('/about');
      }
      this.saveVoteHistory();
  },
  provide() {
    return {
      getVote: this.getVote,
    };
  },
}
</script>

<style>
/* Importing Fonts */
@import url('https://fonts.googleapis.com/css2?family=Jost&display=swap');

/* Styling Classes */
.background {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: -1;
}
.flexbox{
    display: flex;
}
.fas{
    cursor: pointer;
}
.fade-in{
    animation: fadeIn ease 0.8s;
}
fade-in-quick{
    animation: fadeIn ease 0.4s;
}
@keyframes fadeIn{
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}
</style>
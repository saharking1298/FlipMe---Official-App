<template>
  <div id="wrapper">
    <router-view> </router-view>
  </div>
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
  @import url("assets/styles.css");
</style>
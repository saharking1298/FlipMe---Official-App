<template>
  <div id="wrapper">
    <router-view> </router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    loadVoteHistory () {
      let voteHistory = localStorage.getItem('FlipMe.voteHistory');
      if (voteHistory) {
        try {
          voteHistory = JSON.parse(voteHistory);
        }
        catch {
          voteHistory = [];
        }
      }
      else {
        voteHistory = [];
      }
      return voteHistory;
    },
    saveVoteHistory () {
      localStorage.setItem('FlipMe.voteHistory', JSON.stringify(this.voteHistory));
    },
    getPastVote (voteIndex) {
      return this.voteHistory[voteIndex];
    },
    setVoteSettings (voteSettings) {
      this.currentVote = {...voteSettings};
      this.currentVote.results = voteSettings.preset.choices.map(item => {
        return {name: item, qty: 0};
      });
      console.log(JSON.parse(JSON.stringify(this.currentVote)));
    }
  },
  data() {
    return {
      voteHistory: this.loadVoteHistory(),
      currentVote: {}
    };
  },
  async mounted() {
      await this.$router.isReady();
      if (this.$route.path === '/' && this.voteHistory.length === 0) {
        this.$router.push('/about');
      }
      if (this.$route.path === '/vote' && !this.voteSettings) {
        this.$router.push('/new');
      }
      this.saveVoteHistory();
  },
  provide() {
    return {
      setVoteSettings: this.setVoteSettings,
      getCurrentVote: () => this.currentVote,
      getPastVote: this.getPastVote,
    };
  },
}
</script>

<style>
  @import url("assets/styles.css");
</style>
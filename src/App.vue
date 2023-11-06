<template>
  <div id="wrapper">
    <router-view> </router-view>
  </div>
</template>

<script>
import {saveVoteHistory, loadVoteHistory, saveCurrentVote, loadCurrentVote} from "@/scripts/utils.js";

export default {
  name: 'App',
  methods: {
    getPastVote (voteIndex) {
      return this.voteHistory[voteIndex];
    },
    deletePastVote (voteIndex) {
      this.voteHistory.splice(voteIndex, 1);
      saveVoteHistory(this.voteHistory);
    },
    setVoteSettings (voteSettings) {
      this.currentVote = {...voteSettings};
      this.currentVote.results = voteSettings.preset.choices.map(item => {
        return {name: item, qty: 0};
      });
      this.currentVote.lastChoice = null;
      saveCurrentVote(this.currentVote);
    },
    submitCurrentVote (vote) {
      const index = this.voteHistory.length;

      // Resetting current vote
      saveCurrentVote(null);

      // Setting vote date
      const date = new Date();
      vote.date = date.toLocaleString();

      // Removing session data
      if (vote.lastChoice) {
        delete vote.lastChoice;
      }
      if (vote.config) {
        delete vote.config;
      }
      if (vote.preset.type === "range" && vote.preset.choices) {
        delete vote.preset.choices;
      }

      // Saving vote
      this.voteHistory.push(vote);
      saveVoteHistory(this.voteHistory);
      this.$router.push("/votes/" + index);
    }
  },
  data() {
    return {
      voteHistory: loadVoteHistory(),
      currentVote: loadCurrentVote(),
    };
  },
  async mounted() {
      await this.$router.isReady();
      if (this.$route.path === '/' && this.voteHistory.length === 0) {
        this.$router.replace('/about');
      }
      // saveVoteHistory(this.voteHistory);
  },
  provide() {
    return {
      setVoteSettings: this.setVoteSettings,
      getPastVote: this.getPastVote,
      loadVoteHistory: () => this.voteHistory,
      submitCurrentVote: this.submitCurrentVote,
      deletePastVote: this.deletePastVote,
      saveCurrentVote,
      loadCurrentVote,
    };
  },
}
</script>

<style>
  @import url("assets/styles.css");
</style>
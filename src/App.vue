<template>
  <div id="wrapper">
    <router-view> </router-view>
  </div>
</template>

<script>
import {saveVoteHistory, loadVoteHistory, saveCurrentVote, loadCurrentVote} from "@/scripts/utils.js";

export default {
  name: 'App',
  data() {
    return {
      voteHistory: loadVoteHistory(),
      currentVote: loadCurrentVote(),
      clonedVote: null,
    };
  },
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

      // Sorting answers from common to rare
      if (vote.preset.type !== "range") {
        vote.results.sort((a, b) => b.qty - a.qty);
      }

      // Saving vote
      this.voteHistory.push(vote);
      saveVoteHistory(this.voteHistory);
      this.$router.push({name: "Results", params: {voteId: index}});
    },
    setClonedVote (voteIndex) {
      if (typeof voteIndex === 'number') {
        this.clonedVote = this.voteHistory[voteIndex];
      }
      else {
        this.clonedVote = null;
      }
    },
  },
  async mounted() {
      await this.$router.isReady();
      if (this.$route.name === 'Home' && this.voteHistory.length === 0 && !this.currentVote) {
        this.$router.replace({name: "About"});
      }
      // saveVoteHistory(this.voteHistory);
  },
  provide() {
    return {
      setVoteSettings: this.setVoteSettings,
      getPastVote: this.getPastVote,
      loadVoteHistory: () => this.voteHistory,
      getClonedVote: () => this.clonedVote,
      submitCurrentVote: this.submitCurrentVote,
      deletePastVote: this.deletePastVote,
      setClonedVote: this.setClonedVote,
      saveCurrentVote,
      loadCurrentVote,
    };
  },
}
</script>

<style>
  @import url("assets/styles.css");
</style>
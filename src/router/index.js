const { baseURL } = require("../config.js");
import { createWebHistory, createRouter } from "vue-router";
import { loadCurrentVote } from "@/scripts/utils.js";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import VoteView from "@/views/VoteView.vue";
import VoteResults from "@/views/ResultsView.vue";

const routes = [
  {
    path: baseURL + "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: baseURL + "/about",
    name: "About",
    component: AboutView,
  },
  {
    path: baseURL + "/vote",
    name: "Vote",
    component: VoteView
  },
  {
    path: baseURL + "/votes/:voteId",
    name: "Results",
    component: VoteResults
  }
];

const router = createRouter({
  base: baseURL,
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === "Vote" && !loadCurrentVote()) {
    next({name: "Home"});
  }
  else {
    next();
  }
})

export default router;
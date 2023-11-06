import { createWebHistory, createRouter } from "vue-router";
import { loadCurrentVote } from "@/scripts/utils.js";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import VoteView from "@/views/VoteView.vue";
import VoteResults from "@/views/ResultsView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
  },
  {
    path: "/vote",
    name: "Vote",
    component: VoteView
  },
  {
    path: "/votes/:voteId",
    name: "Results",
    component: VoteResults
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === "Vote" && !loadCurrentVote()) {
    next('/');
  }
  else {
    next();
  }
})

export default router;
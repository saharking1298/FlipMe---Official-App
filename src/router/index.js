import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/HomeView.vue";
import About from "@/views/AboutView.vue";
import Vote from "@/views/VoteView.vue";
import Results from "@/views/VoteResults.vue";

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/",
    alias: "/home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/vote",
    name: "Vote",
    component: Vote
  },
  {
    path: "/votes/:voteId",
    name: "Results",
    component: Results
  },
  {
    path: "/vote/:voteId",
    alias: "/votes/:voteId",
    component: Results
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
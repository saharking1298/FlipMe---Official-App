import { createWebHistory, createRouter } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import VoteView from "@/views/VoteView.vue";
import VoteResults from "@/views/VoteResults.vue";
import NewVote from "@/views/NewVote.vue"; 

const routes = [
  {
    path: "/home",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/",
    alias: "/home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
  },
  {
    path: "/new",
    name: "NewVote",
    component: NewVote,
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
  },
  {
    path: "/vote/:voteId",
    alias: "/votes/:voteId",
    component: VoteResults
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
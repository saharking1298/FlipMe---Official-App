<template>
    <app-header> </app-header>
    <vote-creator> </vote-creator>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import VoteCreator from '@/components/VoteCreator.vue'
export default {
    name: "NewVote",
    components: { VoteCreator, AppHeader },
}
</script>

<style>

</style>
<template>
    <app-header> </app-header>
    <div>
        <h2> Start A New Vote</h2>
        <router-link to="/new">
            Start Vote
        </router-link>
    </div>
    <div>
        
    </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
export default {
  components: { AppHeader },
    name: 'HomeView',

}
</script>

<style scoped>

</style>
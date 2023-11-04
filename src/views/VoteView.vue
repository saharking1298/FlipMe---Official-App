<template>
    <div class="wrapper">
        <h1> Start a Vote </h1>
        <h2> What Do You Want To Ask? </h2>
        <div>
            <label for="question-input">Enter Your Question:</label>
            <input type="text" v-model="questionInput" id="question-input" class="main-screen-input">
        </div>
        <h2> Vote Settings </h2>
        <div>
            <input type="checkbox" v-model=currentVote.enableVoteSound id="vote-sound-enabler">
            <label for="vote-sound-enabler"> Enable Vote Sound </label>
        </div>
        <div>
            <input type="checkbox" v-model="sortResultsEnabled" id="sort-results-enbaler">
            <label for="sort-results-enbaler"> Sort Results By Number Of Votes </label>
        </div>
        <h2>Vote Type:</h2>
        <div v-for="(preset, index) of presets" :key="index">
            <input type="radio" name="vote-type" :value="preset.type" v-model="currentPreset" :id="preset.type">
            <label :for="preset.type">{{preset.name}}</label>
            <div v-if="preset.type == 'range'" v-show="currentPreset == 'range'">
                <div>
                    <label class="range-label" for="min-range">Minimum Number</label>
                    <input type="number" v-model="rangeMinNumber" class="main-screen-input" id="min-range">  
                </div>
                <div class="vertical-separator"></div>
                <div>
                    <label class="range-label" for="max-range">Maximum Number</label>
                    <input type="number" v-model="rangeMaxNumber" class="main-screen-input" id="max-range">  
                </div>
                <p v-if="!customRangeValid" class="warning"> Your total range of numbers must be under {{ rangeLimit }} </p>
            </div>
            <div v-else-if="preset.type == 'custom'" v-show="currentPreset == 'custom'">
                <label>Add a custom choice: </label>
                <input type="text" v-model="customChoiceInput" @keydown.enter="addCustomChoice()" class="main-screen-input">
                <button @click="addCustomChoice()" id="add-choice-btn"><strong>Add</strong></button>
                <p class="info" v-if="customChoices.length > 0">Click on a choice to delete it!</p>
                <div>
                    <div v-for="(choice, index) in customChoices" class="custom-choice-block" @click="removeCustomChoice(index)" :key="index"> {{choice}} </div>
                </div>
            </div>
        </div>
        <button @click="startVote()" class="start-button">Start My Vote!</button>
        <p class="warning" v-if="showQuestionWarning"> Please enter a question in order to start </p>
        <p class="warning" v-if="showCustomChoiceWarning"> Oh, looks like you don't have enough choices! Please have at least two. </p>
        <p class="warning" v-if="showRangeWarning"> Please fix your range! </p>
    </div>
</template>

<script>
export default {
    name: "VoteView",
    props: {
        preset: {
            type: Object,
            required: false
        }
    }
}
</script>

<style>

</style>
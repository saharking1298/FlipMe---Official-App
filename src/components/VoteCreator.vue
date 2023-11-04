<template>
    <div class="wrapper">
        <h1> Start a Vote </h1>
        <h2> What Do You Want To Ask? </h2>
        <div>
            <label for="question-input">Enter Your Question:</label>
            <input type="text" v-model="voteSettings.question" id="question-input" class="main-screen-input">
        </div>
        <h2> Vote Settings </h2>
        <div>
            <input type="checkbox" v-model="voteSettings.config.soundEnabled" id="vote-sound-enabler">
            <label for="vote-sound-enabler"> Enable Vote Sound </label>
        </div>
        <div>
            <input type="checkbox" v-model="voteSettings.config.sortResults" id="sort-results-enabler">
            <label for="sort-results-enabler"> Sort Results By Number Of Votes </label>
        </div>
        <div>
            <input type="checkbox" v-model="inputs.votersLimitEnabled" id="voter-limit-enabler">
            <label for="voter-limit-enabler"> Limit Number Of Voters </label>
            <input type="number" id="voters-limit" :disabled="!inputs.votersLimitEnabled" min="2" max="1000" v-model="voteSettings.config.votersLimit">
        </div>
        <h2>Vote Type:</h2>
        <div v-for="(preset, index) of presets" :key="index">
            <input type="radio" :value="preset.id" v-model="currentPreset" :id="preset.id">
            <label :for="preset.id"> {{preset.name}} </label>
            <div v-if="preset.id === 'presetCustomRange'" v-show="currentPreset === 'presetCustomRange'">
                <div>
                    <label class="range-label" for="min-range">Minimum Number</label>
                    <input type="number" v-model="inputs.rangeMinNumber" class="main-screen-input" id="min-range">  
                </div>
                <div class="vertical-separator"></div>
                <div>
                    <label class="range-label" for="max-range">Maximum Number</label>
                    <input type="number" v-model="inputs.rangeMaxNumber" class="main-screen-input" id="max-range">  
                </div>
            </div>
            <div v-if="preset.id === 'presetCustomChoice'" v-show="currentPreset === 'presetCustomChoice'">
                <label>Add a custom choice: </label>
                <input type="text" v-model="inputs.customChoice" @keydown.enter="addCustomChoice()" class="main-screen-input">
                <button @click="addCustomChoice()" id="add-choice-btn"><strong>Add</strong></button>
                <p class="info" v-if="customChoices.length > 0">Click on a choice to delete it!</p>
                <div>
                    <div v-for="(choice, index) in customChoices" :key="index" class="custom-choice-block" @click="removeCustomChoice(index)"> {{choice}} </div>
                </div>
            </div>
        </div>
        <button @click="startVote()" class="start-button"> Start My Vote! </button>
        <p class="warning" v-if="warning.active"> {{ warning.text }} </p>
    </div>
</template>

<script>
// Defining presets
const presets = [
    {name: "1 - 10", id: "presetDefaultRange", type: "range", min: 1, max: 10, step: 1}, 
    {name: "Yes / No", id: "presetYesNo", type: "choice", choices: ["Yes", "No"]},
    {name: "Custom Range", id: "presetCustomRange", type: "range"},
    {name: "Custom Choice", id: "presetCustomChoice", type: "choice"}
];

// Defining warnings
const warnings = {
    missingQuestion: "Please enter the vote question!",
    missingChoices: "Please enter at least 2 possible answers!",
};

export default {
    name: "VoteCreator",
    created () {
        this.setPreset(presets[0].id);
    },
    methods: {
        setPreset (presetId) {
            const preset = presets.find(item => item.id === presetId);
            if (preset) {
                this.currentPreset = presetId;
                this.voteSettings.preset = {...preset};
            }
            else {
                console.error("Can't find preset with ID: " + presetId);
            }
        },
        startVote () {
            const voteSettings = {...this.voteSettings};
            const preset = voteSettings.preset;

            // Validating vote question
            if (voteSettings.question.trim().length === 0) {
                return this.showWarning(warnings.missingQuestion);
            }

            // Validating custom vote presets
            if (preset.id === "presetCustomChoice") {
                if (this.customChoices.length < 2) {
                    return this.showWarning(warnings.missingChoices);
                }
                preset.choices = [...this.customChoices];
            }
            if (preset.id === "presetCustomRange") {
                preset.min = parseInt(this.inputs.rangeMinNumber);
                preset.max = parseInt(this.inputs.rangeMaxNumber);
                preset.step = preset.max >= preset.min ? 1 : -1;
            }

            if (!this.inputs.votersLimitEnabled) {
                voteSettings.config.votersLimit = -1;
            }
            console.log(JSON.parse(JSON.stringify(voteSettings)));
            // Start vote with voteSettings - TODO
        },
        showWarning (warning) {
            this.warning.text = warning;
            this.warning.active = true;
        },
        hideWarning () {
            this.warning.active = false;
        },
        addCustomChoice () {
            const text = this.inputs.customChoice.trim();
            if (text) {
                this.customChoices.push(text);
                this.inputs.customChoice = "";
            }
        },
        removeCustomChoice (index) {
            this.customChoices.splice(index, 1);
        }
    },
    data () {
        return {
            presets,
            warning: {
                active: false,
                text: ""
            },
            voteSettings: {
                question: "",
                config: {
                    soundEnabled: true,
                    sortResults: false,
                    votersLimit: 10
                },
                preset: null
            },
            customChoices: [],
            inputs: {
                question: "",
                customChoice: "",
                rangeMinNumber: "0",
                rangeMaxNumber: "10",
                votersLimitEnabled: false,
            },
            currentPreset: ""
        };
    },
    watch: {
        currentPreset (value) {
            if (this.warning.text === warnings.missingChoices) {
                this.hideWarning();
            }
            this.setPreset(value);
        },
        "inputs.customChoice" () {
            if (this.warning.text === warnings.missingChoices) {
                this.hideWarning();
            }
        },
        "voteSettings.question" () {
            if (this.warning.text === warnings.missingQuestion) {
                this.hideWarning();
            }
        }
    },
}
</script>

<style>

</style>
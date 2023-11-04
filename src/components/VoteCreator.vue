<template>
    <div id="vote-creator">
        <h1> Start a Vote </h1>
        <h2> What Do You Want To Ask? </h2>
        <div>
            <label class="block" for="question-input">Enter Your Question:</label>
            <input type="text" v-model="voteSettings.question" id="question-input" class="input">
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
                    <input type="number" v-model="inputs.rangeMinNumber" class="input" id="min-range">  
                </div>
                <div class="vertical-separator"></div>
                <div>
                    <label class="range-label" for="max-range">Maximum Number</label>
                    <input type="number" v-model="inputs.rangeMaxNumber" class="input" id="max-range">  
                </div>
            </div>
            <div v-if="preset.id === 'presetCustomChoice'" v-show="currentPreset === 'presetCustomChoice'">
                <label class="block">Add a custom choice: </label>
                <input type="text" v-model="inputs.customChoice" @keydown.enter="addCustomChoice()" class="input">
                <button @click="addCustomChoice()" id="add-choice-btn"><strong>Add</strong></button>
                <p class="info" v-if="customChoices.length > 0">Click on a choice to delete it!</p>
                <div class="vertical-flexbox">
                    <div v-for="(choice, index) in customChoices" :key="index" class="custom-choice-block" @click="removeCustomChoice(index)"> {{choice}} </div>
                </div>
            </div>
        </div>
        <button @click="startVote()" class="start-btn"> Start My Vote! </button>
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

<style scoped>
::selection {
    background: rgba(0, 0, 0, 0.1);
}
#vote-creator {
    background: #c45d7f;
    color: white;
    padding: 15px;
    padding-top: 5px;
    border-radius: 8px;
    transition: background-color 0.15s;
}
#vote-creator:hover {
    background: #be5a7b;
}
#question-input {
    width: 100%;
    display: block;
    margin-top: 4px;
    margin-left: 0;
}
.input{
    border-radius: 5px;
    color: rgb(250, 225, 229);
    background-color: rgba(0, 0, 0, 0.096);
    margin-left: 8px;
    border: 2px solid rgb(156, 53, 87);
    width: 70%;
}
.input:focus{
    border: 3px solid rgb(161, 37, 78);
    outline: none;
}
input[type=text]{
    font-size: 1.05em;
}
.range-label{
    margin-right: 6px;
}
.warning{
    color:rgb(148, 17, 17);
    font-size: 1.07em;
    margin-top: 8px;
    margin-bottom: 5px;
}
.info{
    margin-top: 3px;
    margin-bottom: 5px;
    color: rgba(250, 225, 229, 0.568);
    font-size: 0.9em;
}
.start-btn{
    background-color: rgb(194, 102, 171);
    border: 3px solid rgb(194, 102, 171);
    color: rgb(145, 56, 122);
    width: fit-content;
    display: block;
    cursor: pointer;
    font-size: 1.4em;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 30px;
    transition: 0.3s;
    margin-bottom: 10px;
    user-select: none;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
}
.start-btn:hover{
    background-color: rgb(173, 87, 152);
    border-color: rgb(173, 87, 152);
}
#add-choice-btn{
    margin-left: 5px;
    background-color: rgb(194, 102, 171);
    border: 2px solid rgb(145, 56, 122);
    color: rgb(145, 56, 122);
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 30px;
    font-size: 1.05em;
    cursor: pointer;
}
.custom-choice-block{
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 30px;
    background-color: rgb(172, 71, 147);
    color: white;
    flex: 1;
    overflow-wrap: break-word;
    text-align: center;
    transition: background-color 0.1s;
}
.custom-choice-block:hover{
    background-color: rgb(156, 58, 132);
    text-decoration: line-through;
    cursor: pointer;
}
h1 {
    margin: 0;
    text-align: center;
}
h2 {
    margin-top: 10px;
    margin-bottom: 10px;
}
.vertical-separator{
    height: 7px;
}
</style>
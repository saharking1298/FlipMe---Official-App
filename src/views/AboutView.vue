<template>
    <div class="background"> </div>
    <div id="wrapper" class="fade-in">
        <app-header> </app-header>
        <section id="app-description">
            <h2> What is FlipMe? </h2>
            <p>
                Ever wondered what your friends honestly think about you? <br>
                Ever wanted to know how pretty or nice people think you are without being hurt? <br>
                Well, if you do, this is the app for you!
            </p>
            <h3> How To Use It? </h3>
            <p>
                Simply, just just type a question and choose a way to vote, then, group with your friends in a shape of a circle. Give the phone to the person next to you, and the vote will begin. <br>
            </p>
            <p>
                The first person presses on the option he likes. then, he passes the phone to the person next to him. It goes like this until all the people in the circle vote, and when it gets back to you, just press "Finish"!
            </p>
            <h3> The Results Are Anonymous </h3>
            <p>
                When the results come to the screen, and You can check the statistics for your vote. If someone voted you down, you will never know who - because the vote is completely anonymous! So gather some courage and ask for something unusual!
            </p>  
        </section>
        <section id="enter-app">
            <h3> So Let's Go For It! </h3>
            <p> Click on the button to open FlipMe now!</p>
            <router-link to="/" alt="Open FlipMe">
                <button class="center"> Enter The World Of FlipMe! </button>
            </router-link>
            <a href="/" class="back-link"> Or go back to homepage instead </a>
        </section>
    </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
export default {
  components: { AppHeader },
    name: "AboutView",
}
</script>

<style scoped>
    .background {
        background-color: rgb(223, 106, 145);
    }
    /* Customizing Elements */
    ::selection{
        background-color: rgb(197, 86, 123);
    }
    a{
        text-decoration: none;
    }
    .back-icon{
        position: absolute;
        display: inline;
        color: rgb(250, 225, 229);
    }
    section{
        color: rgb(241, 210, 216);
        font-size: 1.08em;
    }
    h2 h3{
        color: rgb(253, 203, 212);
    }
    h3{
        font-size: 1.3em;
    }
    button{
        background-color: rgb(194, 102, 171);
        border: 3px solid rgb(194, 102, 171);
        color: rgb(145, 56, 122);
        width: fit-content;
        display: block;
        cursor: pointer;
        font-family: 'Jost', sans-serif;
        font-size: 1.5em;
        padding: 5px;
        padding-left: 12px;
        padding-right: 12px;
        border-radius: 30px;
        transition: 0.3s;
        margin-bottom: 10px;
        user-select: none;
    }
    button:hover{
        background-color: rgb(173, 87, 152);
        border-color: rgb(173, 87, 152);
    }
    .back-link{
        text-decoration: underline;
        color: rgb(126, 38, 102);
        display: block;
        margin-bottom: 30px;
    }
    #app-description{
        margin-bottom: 50px;
    }
    #enter-app{
        text-align: center;
    }
    #enter-app h3{
        margin-bottom: 0px;
    }
    #enter-app p {
        margin-top: 1px;
    }
</style>
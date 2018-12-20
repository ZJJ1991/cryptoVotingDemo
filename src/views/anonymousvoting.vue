<template>
    <div>
        <Initiate-Anonymous-Voting></Initiate-Anonymous-Voting>
        <set-Eligible class="mt-5"></set-Eligible>
        <begin-sign-up class="mt-5"></begin-sign-up>
        <register class="mt-5"></register>
        <finishRegistration class="mt-5"></finishRegistration>
        <submitCommitment class="mt-5"></submitCommitment>
        <submitVoting class="mt-5"></submitVoting>
        <computeTotal class="mt-5"></computeTotal>
    </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import  InitiateAnonymousVoting  from '@/components/InitiateAnonymousVoting.vue'; // @ is an alias to /src
import  setEligible  from '@/components/setEligible.vue'; // @ is an alias to /src
import  beginSignUp  from '@/components/beginSignUp.vue'; // @ is an alias to /src
import register from '@/components/register.vue'
import finishRegistration from '@/components/finishRegistration.vue'
import submitCommitment from '@/components/submitCommitment.vue'
import submitVoting from '@/components/submitVoting.vue'
import computeTotal from "@/components/computeTotal.vue"
// import 
@Component({
  components: {
    InitiateAnonymousVoting,
    setEligible,
    beginSignUp,
    register,
    finishRegistration,
    submitCommitment,
    submitVoting,
    computeTotal
  },
})
export default class anonymousvoting extends Vue {

}
</script>
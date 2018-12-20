<template>
    <b-card bg-variant="light" class="w-75 mx-auto" title="Submit Commitment">
        <b-row>
            <b-col>
                <b-form-input
                type="text" v-model="commitmentHash"
                placeholder="Enter Commitment Hash"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input
                type="text" v-model="address"
                placeholder="Enter Address"></b-form-input>
            </b-col>
            <b-col>
                <b-button @click="submitCommitment">Submit Commitment</b-button>
            </b-col>
        </b-row>
    </b-card>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  methodOfAnonymousVoting,
  extractValueFromDecoded
} from "@/contracts/utils";
const connex = window.connex
const delay = require("delay")
export default Vue.extend({
    data(){
        return{
            commitmentHash: "",
            address: ""
        }
    },
    methods: {
        async submitCommitment(){
            let clause = await methodOfAnonymousVoting("submitCommitment")!.asClause(this.commitmentHash);
            let message = [];
            message.push({...clause, comment: "submit commitment clause"})
            let signResult = await connex.vendor.sign('tx').comment("submit commitment tx").signer(this.address).request(message)
            console.log("request result: ", signResult);
            await delay(12000)
            const tx = connex.thor.transaction(signResult.txId);
            console.log("tx  is: ", tx);
            let receipt = await tx.getReceipt();
            if (receipt) {
            let txReverted = receipt.reverted;
            if (!txReverted) {
                console.log("receipt: ", receipt)
            } else {
                alert("fail to submit commitment")
            }
            }
        }
    }
})
</script>

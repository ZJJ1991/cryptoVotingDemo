<template>
    <b-card bg-variant="light" class="w-75 mx-auto" title="Generate ZPK Params for Voting">
        <b-row>
            <b-col>
                <b-form-input v-model="xG1"
                type="text"
                placeholder="Enter 1st Public Key"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input v-model="xG2"
                type="text"
                placeholder="Enter 2nd Public Key"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input v-model=yG1
                type="text"
                placeholder="Enter 1st reconstructed Public Key"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input v-model="yG2"
                type="text"
                placeholder="Enter 2nd reconstructed Public Key"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input v-model="x"
                type="text"
                placeholder="Enter Voting Private Key"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input v-model="address"
                type="text"
                placeholder="Enter Address"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-button @click="DeriveYesZKP">
                    DeriveYesZKP
                </b-button>
            </b-col>
            <b-col>
                <b-button @click="DeriveNoZKP">
                    DeriveNoZKP
                </b-button>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input
                type="text" v-model="params1"
                placeholder="Enter Params[1]"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input
                type="text" v-model="params2"
                placeholder="Enter Params[2]"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input
                type="text" v-model="params3"
                placeholder="Enter Params[3]"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input
                type="text" v-model="params4"
                placeholder="Enter Params[4]"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input
                type="text" v-model="xG1_"
                placeholder="Enter Public Key 1"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input
                type="text" v-model="xG2_"
                placeholder="Enter Public Key 2"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input
                type="text" v-model="yG1_"
                placeholder="Enter reconstructed Public Key 1"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input
                type="text" v-model="yG2_"
                placeholder="Enter reconstructed Public Key 2"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input
                type="text" v-model="y1"
                placeholder="Enter y[1]"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input
                type="text" v-model="y2"
                placeholder="Enter y[2]"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input
                type="text" v-model="a11"
                placeholder="Enter a1[1]"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input
                type="text" v-model="a12"
                placeholder="Enter a1[2]"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input
                type="text" v-model="b11"
                placeholder="Enter b1[1]"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input
                type="text" v-model="b12"
                placeholder="Enter b1[2]"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input
                type="text" v-model="a21"
                placeholder="Enter a2[1]"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input
                type="text" v-model="a22"
                placeholder="Enter a2[2]"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input
                type="text" v-model="b21"
                placeholder="Enter b2[1]"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input
                type="text" v-model="b22"
                placeholder="Enter b2[2]"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input
                type="text" v-model="address_"
                placeholder="Enter Address"></b-form-input>
            </b-col>
            <b-col>
                <b-button @click="commitToVote">CommitToVote</b-button>
            </b-col>
        </b-row>
    </b-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { methodOfAnonymousVoting, methodOfLocalCrypto, extractValueFromDecoded} from "@/contracts/utils"
import { stat } from 'fs';
import { constants } from 'http2';
const web3 = require("web3")

export default Vue.extend({
    data() {
        return {
            xG1: "",
            xG2: "",
            yG1: "",
            yG2: "",
            w: "",
            r: "",
            d: "",
            x: "",
            address: "",
            params1: "",
            params2: "",
            params3: "",
            params4: "",
            xG1_: "",  // xG1
            xG2_: "", // xG2
            yG1_: "",
            yG2_: "",
            y1: "",
            y2: "",
            a11: "",
            a12: "",
            b11: "",
            b12: "",
            a21: "",
            a22: "",
            b21: "",
            b22: "",
            address_: ""
        }
    },
    methods: {
        async getVoterRCK() { // Get the voter's reconstructed public key
            let randomCaller = "";
            let VMOutput = await methodOfAnonymousVoting("getVoter")!
            .caller(this.address)
            .call();
            if (VMOutput && !VMOutput.reverted) {
            let reconstructedPublicKey = extractValueFromDecoded(VMOutput, "1"); // this array contrains the reconstructed keys
            if (reconstructedPublicKey[0] != "0" && reconstructedPublicKey[1] != "0") {
                this.yG1 = reconstructedPublicKey[0]
                this.yG2 = reconstructedPublicKey[1]
                return true;
            } else {
                return false;
            }
            } else {
            return false;
            }
        },
        async DeriveYesZKP(){
            let status = await this.getVoterRCK();
            let xG = [this.xG1, this.xG2]
            let yG = [this.yG1, this.yG2]
            console.log('xG', xG)
            console.log('yG', yG)

            if(status){
                let hex = web3.utils.randomHex(6)
                // console.log("w hex: ", hex)
                let w = web3.utils.hexToNumber(hex)
                hex = web3.utils.randomHex(6)
                // console.log("r hex: ", hex)
                let r = web3.utils.hexToNumber(hex)
                hex = web3.utils.randomHex(6)
                // console.log("d hex: ", hex)
                let d = web3.utils.hexToNumber(hex)
                console.log('w: '+w)
                console.log('r: '+r)
                console.log('d: '+d)
                let VMOutput = await methodOfLocalCrypto("create1outof2ZKPYesVote")!.caller(this.address)
                .call(xG, yG, w, r, d, this.x)
                if (VMOutput && !VMOutput.reverted) {
                    console.log("DeriveYes ZKP VMOutput: ", VMOutput)
                    alert("Go To Console to Explore the Parameters!")
                }
            }
        },
        async DeriveNoZKP(){
            let status = await this.getVoterRCK();
            if(status){
                let hex = web3.utils.randomHex(6)
                // console.log("w hex: ", hex)
                let w = web3.utils.hexToNumber(hex)
                hex = web3.utils.randomHex(6)
                // console.log("r hex: ", hex)
                let r = web3.utils.hexToNumber(hex)
                hex = web3.utils.randomHex(6)
                // console.log("d hex: ", hex)
                let d = web3.utils.hexToNumber(hex)
                console.log('w: '+w)
                console.log('r: '+r)
                console.log('d: '+d)
                // this.prikey = Math.round(Math.random()*500)
                let xG = [this.xG1, this.xG2]
                let yG = [this.yG1, this.yG2]
                let VMOutput = await methodOfLocalCrypto("create1outof2ZKPNoVote")!.caller(this.address).call(xG, yG, w, r, d, this.x)
                if (VMOutput && !VMOutput.reverted) {
                    console.log("DeriveNo ZKP VMOutput: ", VMOutput)
                    alert("Go To Console to Explore the Parameters!")
                }
            }
        },
        async commitToVote(){
            let VMOutput = await methodOfLocalCrypto("commitToVote")!.caller(this.address_).call(
                [this.params1, this.params2, this.params3, this.params4], [this.xG1_, this.xG2_], [this.yG1_, this.yG2_], [this.y1, this.y2], [this.a11, this.a12], [this.b11, this.b12], [this.a21, this.a22], [this.b21, this.b22]
            )
            console.log("Commit To Vote: ", VMOutput)
            let commitmentHash = extractValueFromDecoded(VMOutput, '0')
            alert("commitment hash is: "+commitmentHash)

        }
    }
})
</script>

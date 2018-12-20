<template>
    <b-card bg-variant="light" class="w-75 mx-auto" title="Registration">
    <b-row class="mb-3">
        <b-col class = "mb-3">
        <b-form-input v-model="xG1"
            type="text"
            placeholder="1st Public Key"></b-form-input>
        </b-col>
        <b-col class = "mb-3">
        <b-form-input v-model="xG2" 
            type="text"
            placeholder="2nd public key"></b-form-input>
        </b-col>
    <!-- second row -->
    </b-row>
        <b-row class="mb-3">
        <b-col class = "mb-3">
        <b-form-input v-model="vG1"
            type="text"
            placeholder="ZKP arg 1"></b-form-input>
        </b-col>
        <b-col class = "mb-3">
        <b-form-input v-model="vG2"
            type="text"
            placeholder="ZKP arg 2"></b-form-input>
        </b-col>
        <b-col class = "mb-3">
        <b-form-input v-model="vG3"
            type="text"
            placeholder="ZKP arg 3"></b-form-input>
        </b-col>
    </b-row>
    <!-- third row -->
        <b-row class="mb-3">
        <b-col class = "mb-3">
        <b-form-input v-model="r"
            type="text"
            placeholder="ZKP Itself"></b-form-input>
        </b-col>
        <b-col class = "mb-3">
        <b-form-input v-model="registrant"
            type="text"
            placeholder="Registrant's Address"></b-form-input>
        </b-col>
        <!-- <b-col class = "mb-3">
        <b-form-input v-model="deposit"
            type="text"
            placeholder="Deposit"></b-form-input>
        </b-col> -->
    </b-row>
    <b-row class="mb-3 justify-content-md-center">
        <b-button @click="register" class="w-50 p-3 mb-1 bg-secondary">Register</b-button>
    </b-row>
    <!-- <b-table striped boarderd outlined small responsive :fields="initiateFields"></b-table> -->
</b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  methodOfAnonymousVoting,
  extractValueFromDecoded
} from "@/contracts/utils";
const delay = require("delay");
const connex = window.connex
@Component
export default class register extends Vue {
  @Prop() private msg!: string;

  registrant = "";
  xG1 = "";
  xG2 = "";
  vG1 = "";
  vG2 = "";
  vG3 = "";
  r = "";

  created() {
    // this.getVoter()
    // this.getEligible()
  }
  async getVoter() {
      console.log("get voter")
    let VMOutput = await methodOfAnonymousVoting("getVoter")!.caller(this.registrant)
      .call();
    console.log("vm output of get voter: ", VMOutput);
    if (VMOutput&&!VMOutput.reverted) {
      let publicKey = extractValueFromDecoded(VMOutput, "0");
        if(publicKey[0]!="0"&&publicKey[1]!="0"){
          return true
        } else{
            return false
        }
    }else{
        return false
    }
  }
  async getEligible(){
    let VMOutput = await methodOfAnonymousVoting("getEligible")!
    .caller("0x6A480C078BfA88aC6a4D323E7D9B00c94CB9eC22")
    .call();
    console.log("vm output of get eligible: ", VMOutput);
  }
  //     async beginSignUp(){
  //     let clause = await methodOfAnonymousVoting("beginSignUp")!.asClause(
  //         this.question, this.enableCP, this.finishSUP, this.endSUP, this.endCP, this.endVP, this.endRP, this.deposit
  //     );
  //     let message = [];
  //     message.push({ ...clause, comment: "test comment" });
  //     let signResult = await connex.vendor
  //       .sign("tx")
  //       .signer("0x6A480C078BfA88aC6a4D323E7D9B00c94CB9eC22")
  //       .comment("begin sign up")
  //       .request(message);
  //     console.log("request result: ", signResult);
  //     const tx = connex.thor.transaction(signResult.txId);
  //     console.log("tx  is: ", tx);
  //     await delay(12000)
  //     let receipt = await tx.getReceipt();
  //     if (receipt) {
  //       let txReverted = receipt.reverted;
  //       if (!txReverted) {
  //         let questionStatus = await this.getQuestion()
  //         if(questionStatus)
  //             alert("has successfully signed up")
  //         else
  //             alert("fail to sign up")
  //       } else {
  //         alert("fail to sign up")
  //       }
  //     }
  //   }
  async register() {
    console.log('registrant: ', this.registrant)
    console.log('vG1', this.vG1)
    let clause = await methodOfAnonymousVoting("register")!.asClause(
      [this.xG1, this.xG2],
      [this.vG1, this.vG2, this.vG3],
      this.r
    );
    let message = [];
    message.push({ ...clause, comment: "register" });
    let signResult = await connex.vendor
      .sign("tx")
      .signer(this.registrant)
      .comment("registeration")
      .request(message);
    console.log("request result: ", signResult);
    await delay(12000);
    const tx = connex.thor.transaction(signResult.txId);
    console.log("tx  is: ", tx);
    let receipt = await tx.getReceipt();
    if (receipt) {
      let txReverted = receipt.reverted;
      console.log('register receipt: ', receipt)
      if (!txReverted) {
        let voterStatus = await this.getVoter()
        console.log("voter status: ", voterStatus)
        if(voterStatus){
            alert("has successfully registered");
        }else{
            alert("Invalid ZKP parameters");
        }
      } else {
        alert("fail to register");
      }
    }
  }



}
</script>

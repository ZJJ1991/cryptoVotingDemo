<template>
    <b-card>
        <b-row bg-variant="light" class="w-75 mx-auto mt-3">
            <b-col>
                <b-form-input v-model="param1"
                type="text"
                placeholder="Enter Param1"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input v-model="param2"
                type="text"
                placeholder="Enter Param2"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input v-model="param3"
                type="text"
                placeholder="Enter Param3"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input v-model="param4"
                type="text"
                placeholder="Enter Param4"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input v-model="y1"
                type="text"
                placeholder="Enter y1"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input v-model="y2"
                type="text"
                placeholder="Enter y2"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input v-model="a11"
                type="text"
                placeholder="Enter a11"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input v-model="a12"
                type="text"
                placeholder="Enter a12"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input v-model="b11"
                type="text"
                placeholder="Enter b11"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input v-model="b12"
                type="text"
                placeholder="Enter b12"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input v-model="a21"
                type="text"
                placeholder="Enter a21"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input v-model="a22"
                type="text"
                placeholder="Enter a22"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input v-model="b21"
                type="text"
                placeholder="Enter b21"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input v-model="b22"
                type="text"
                placeholder="Enter b22"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3 justify-content-md-center">
            <b-col>
                <b-form-input v-model="address"
                type="text"
                placeholder="Enter Address"></b-form-input>            
            </b-col>
            <b-col>
                <b-button @click="submitVoting">SubmitVoting</b-button>
            </b-col>
        </b-row>
    </b-card>
</template>
<script lang="ts">
import Vue from "vue";
import { methodOfAnonymousVoting } from "@/contracts/utils";
const delay = require("delay");
export default Vue.extend({
  data() {
    return {
      param1: "",
      param2: "",
      param3: "",
      param4: "",
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
      address: ""
    };
  },
  methods: {
    async submitVoting() {
      let clause = await methodOfAnonymousVoting("submitVote")!.asClause(
        [this.param1, this.param2, this.param3, this.param4],
        [this.y1, this.y2],
        [this.a11, this.a12],
        [this.b11, this.b12],
        [this.a21, this.a22],
        [this.b21, this.b22]
      );
      let message = [];
      message.push({ ...clause, comment: "submit voting clause" });
      let signResult = await connex.vendor
        .sign("tx")
        .comment("submit commitment tx")
        .signer(this.address)
        .request(message);
      console.log("request result: ", signResult);
      await delay(12000);
      const tx = connex.thor.transaction(signResult.txId);
      console.log("tx  is: ", tx);
      let receipt = await tx.getReceipt();
      // console.log('receipt is: ', receipt)
      if (receipt) {
        let txReverted = receipt.reverted;
        if (!txReverted) {
          console.log("receipt: ", receipt);
        } else {
          alert("fail to submit commitment");
        }
      }
    }
  }
});
</script>

'use strict'
import localCryptoABI from './local-crypto.json'
import HelloWorldABI from './helloworld.json'
import anonymousVotingABI from './anonymous-voting.json'
import { ABIDef, decodedReturn } from '../types'
import store from '../store'

const localCryptoAdd = "0x97ebd1446eff8fe613e4a0d18db080612236fac7";
const anonymousVotingAdd = store.state.anonymousVotingAdd;
const helloworldAdd = "0x95319b8b42a250e1f1ba5e4934340f89256cf31d";  // 

export const methodOfLocalCrypto = function (name: string): Connex.Thor.Method | null {
    if (window.connex) {
        let contract = window.connex.thor.account(localCryptoAdd)
        return contract.method(findInABI(name, localCryptoABI))
    }
    return null
}

export const methodOfHelloWorld = function (name: string): Connex.Thor.Method | null {
    if (window.connex) {
        let contract = window.connex.thor.account(helloworldAdd)
        return contract.method(findInABI(name, HelloWorldABI))
    }
    return null
}

export const methodOfAnonymousVoting = function (name: string): Connex.Thor.Method | null {
    if (window.connex) {
        let contract = window.connex.thor.account("0x2be5168cc567cf9f9d6f15d7dc0f7c000d5b3b52")
        return contract.method(findInABI(name, anonymousVotingABI))
    }
    return null
}

export const findInABI = function (name: string, abi: ABIDef) {
    const ABI = abi.find((current) => {
        if (current.name === name) {
            return true
        } else {
            return false
        }
    })
    if (!ABI) {
        throw 'No ABI found'
    }
    return ABI;
}

export const extractValueFromDecoded = function(output: {decoded?: object|undefined}, key: string){
    return (output.decoded as decodedReturn)[key]
}
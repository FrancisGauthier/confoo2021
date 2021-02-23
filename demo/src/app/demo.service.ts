import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { Injectable } from '@angular/core';
import Web3 from "web3";
import {Contract} from "web3-eth-contract";
import {AbiItem} from "web3-utils";
@Injectable()
export class DemoService {

  private web3: Web3;
  private contract: Contract;

  private account: string = '';
  constructor() {
    
     this.web3 = new Web3(Web3.givenProvider);
     const abi = <AbiItem[]>[
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "Emails",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "Participants",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "title",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "email",
            "type": "string"
          }
        ],
        "name": "addParticipant",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "newTitle",
            "type": "string"
          }
        ],
        "name": "updateTitle",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getParticipants",
        "outputs": [
          {
            "internalType": "string[]",
            "name": "",
            "type": "string[]"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      }
    ];

    this.contract = new this.web3.eth.Contract(abi ,"0x97fb0192265EE5395d6b7124d0A46F308f266B21");
    
    this.web3.eth.getAccounts().then((accounts) => this.account = accounts[0]);
   }
/*
  public async hello(){
    console.log(await this.contract.methods.title().call());
    console.log(await this.web3.eth.getBalance("0x08A66D42737f9c9DE44D051393bDA99cAE4DaC3C"));
    console.log(await this.contract.methods.Participants("0x08A66D42737f9c9DE44D051393bDA99cAE4DaC3C").call());

  }*/

  public async title(): Promise<string>{
    return  this.contract.methods.title().call();
  }

  public async updateTitle(title: string): Promise<void>{
    console.log(await this.contract.methods.updateTitle(title).send({from: this.account}));
  }

  public async addParticipant(email: string): Promise<void>{
    console.log(await this.contract.methods.addParticipant(email).send({from: this.account}));
  }


  public async getParticipants(): Promise<string[]>{
    return  this.contract.methods.getParticipants().call();
  }
}

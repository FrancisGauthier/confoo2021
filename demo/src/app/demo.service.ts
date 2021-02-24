import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { Injectable } from '@angular/core';
import Web3 from "web3";
import {Contract} from "web3-eth-contract";
import {AbiItem} from "web3-utils";
import {Participant} from './participant';
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
        "name": "Participants",
        "outputs": [
          {
            "internalType": "string",
            "name": "prenom",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "nom",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "email",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "ville",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "contact",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "Participations",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
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
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "prenom",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "nom",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "email",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "ville",
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
            "components": [
              {
                "internalType": "string",
                "name": "prenom",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "nom",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "email",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "ville",
                "type": "string"
              },
              {
                "internalType": "address",
                "name": "contact",
                "type": "address"
              }
            ],
            "internalType": "struct Confoo2021.Participant[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ];

    this.contract = new this.web3.eth.Contract(abi ,"0x2Eb0D155055b513d629412EE4B188661921FeF24");
    
    this.web3.eth.getAccounts().then((accounts) => this.account = accounts[0]);
   }

  public async title(): Promise<string>{
    return  this.contract.methods.title().call();
  }

  public async updateTitle(title: string): Promise<void>{
    console.log(await this.contract.methods.updateTitle(title).send({from: this.account}));
  }

  public async addParticipant(nom: string,prenom: string,email: string,ville: string): Promise<void>{
    console.log(await this.contract.methods.addParticipant(nom,prenom,email,ville).send({from: this.account}));
  }

  public async getParticipants(): Promise<Participant[]>{
    return  this.contract.methods.getParticipants().call();
  }
}

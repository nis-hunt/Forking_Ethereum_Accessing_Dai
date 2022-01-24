const Web3 = require('web3');
const daiAbi = require("./abi.js");
const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const daiHolder = "0xC564EE9f21Ed8A2d8E7e76c085740d5e4c5FaFbE";
const daiRecipient = "0xb9d8789f8a886dcFAf96Bfaf89f2241844Ba14b1";
const web3 = new Web3("http://localhost:8545");
const dai = new web3.eth.Contract(daiAbi, daiAddress);
async function run() {   
    let holderBalance, recipientBalance;
    holderBalance = await (dai.methods.balanceOf(daiHolder).call());
    recipientBalance = await (dai.methods.balanceOf(daiRecipient).call());
    console.log('Balance of Holder is: ${holderBalance}');
    console.log('Balance of Recipient is: ${recipientBalance}');
    await dai.methods.transfer(daiRecipient, holderBalance).send({from:daiHolder});
    holderBalance = await (dai.methods.balanceOf(daiHolder).call());
    recipientBalance = await (dai.methods.balanceOf(daiRecipient).call());
    console.log('The new Balance of Holder is ${holderBalance}');
    console.log('The new Balance of Recipient is ${recipientBalance}');
}
run();

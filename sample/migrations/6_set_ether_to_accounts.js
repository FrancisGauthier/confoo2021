const contract = artifacts.require("./JobPosting.sol")

module.exports = async function(deployer, network, accounts) {

	await web3.eth.sendTransaction({from: accounts[0], to: '0x08A66D42737f9c9DE44D051393bDA99cAE4DaC3C', value: web3.utils.toWei("1000000", "ether")});
	await web3.eth.sendTransaction({from: accounts[0], to: '0x9041574471251813B9Cd7e7775768544c4e053E5', value: web3.utils.toWei("1000000", "ether")});
	await web3.eth.sendTransaction({from: accounts[0], to: '0x13150471dd3E565666e02aD4452ECECfc08884F6', value: web3.utils.toWei("1000000", "ether")});
	await web3.eth.sendTransaction({from: accounts[0], to: '0x654c27AD97167D2679a0D5a4967d1F3DD671B2eE', value: web3.utils.toWei("1000000", "ether")});

	await web3.eth.sendTransaction({from: accounts[0], to: '0x72106781ad7f8B24D60b0d107E633f01ba05F285', value: web3.utils.toWei("1000000", "ether")});

	await web3.eth.sendTransaction({from: accounts[0], to: '0x2D35D91303Bb00f63596031CF0CF22c7A1E559ed', value: web3.utils.toWei("1000000", "ether")});
	await web3.eth.sendTransaction({from: accounts[0], to: '0x30daE567927a65C547B5deF3a65046D849749E6C', value: web3.utils.toWei("1000000", "ether")});

	await web3.eth.sendTransaction({from: accounts[0], to: '0x30daE567927a65C547B5deF3a65046D849749E6C', value: web3.utils.toWei("1000000", "ether")});
	await web3.eth.sendTransaction({from: accounts[0], to: '0xA119359B823657c5D3FbfF8bf0DE5D0FB094F534', value: web3.utils.toWei("1000000", "ether")});


	await web3.eth.sendTransaction({from: accounts[0], to: '0xA119359B823657c5D3FbfF8bf0DE5D0FB094F534', value: web3.utils.toWei("1000000", "ether")});
	await web3.eth.sendTransaction({from: accounts[0], to: '0x599F8f635dE61aeCd2F9Ad5E3ED8C688B0814ceF', value: web3.utils.toWei("1000000", "ether")});

	await web3.eth.sendTransaction({from: accounts[0], to: '0xF30BEE8F7Df4458d8b5c11331B65becFCB076aF2', value: web3.utils.toWei("1000000", "ether")});
};

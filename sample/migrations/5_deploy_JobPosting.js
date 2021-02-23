const contract = artifacts.require("./JobPosting.sol")

module.exports = async function(deployer, network, accounts) {
	
    
	await deployer.deploy(contract,"ingénieur","concevoir des logiciels",2,{from:accounts[0], value: 3})
};

const contract = artifacts.require("./Bounty.sol")

module.exports = function(deployer, network, accounts) {
	deployer.deploy(contract,1,{from:accounts[0], value: 2});
};

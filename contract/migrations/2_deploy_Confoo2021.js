const contract = artifacts.require("./Confoo2021.sol")

module.exports = function(deployer, network, accounts) {
	deployer.deploy(contract);
};

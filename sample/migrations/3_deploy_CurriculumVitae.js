const contract = artifacts.require("./CurriculumVitae.sol")

module.exports = function(deployer) {
	        deployer.deploy(contract);
};

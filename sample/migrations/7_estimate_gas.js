const JobPosting = artifacts.require("./JobPosting.sol")
const CurriculumVitae = artifacts.require("./CurriculumVitae.sol")
const Bounty = artifacts.require("./Bounty.sol")

module.exports = async function(deployer, network, accounts) {
	let gasPrice = web3.utils.toWei("20","gwei");
	let employer = accounts[0];
    let candidate = accounts[1];
	let headhunter = accounts[2];
	
	let jobPosting = await JobPosting.new("ingénieur","concevoir des logiciels",5,{from:employer, value: 1});
	let cv = await CurriculumVitae.new({from:candidate});


	log("JobPosting new", await JobPosting.new.estimateGas("ingénieur","concevoir des logiciels",5,{from:employer, value: 1}), gasPrice);
	log("CV new", await CurriculumVitae.new.estimateGas({from:candidate}), gasPrice);

	log("CV addExperience", await cv.addExperience.estimateGas('0x0000000000000000000000000000000000000002',"Irosoft","Master Logiciel",0,1,{from : candidate}), gasPrice);


	log("JobPosting referenceCandidate", await  jobPosting.referenceCandidate.estimateGas(candidate,cv.address,{from: headhunter}), gasPrice);

	await  jobPosting.referenceCandidate(candidate,cv.address,{from: headhunter})

	log("JobPosting selectCandidate", await  jobPosting.selectCandidate.estimateGas(headhunter,{from: employer}), gasPrice);

	await  jobPosting.selectCandidate(headhunter,{from: employer})
	log("JobPosting acceptOffer", await  jobPosting.acceptOffer.estimateGas({from: candidate}), gasPrice);

	await  jobPosting.acceptOffer({from: candidate})

	log("JobPosting hireCandidate", await  jobPosting.hireCandidate.estimateGas({from: employer}), gasPrice);

	
	log("Bounty New", await  Bounty.new.estimateGas(1,{from: employer, value: 1}), gasPrice);

	let bountyContract = await Bounty.new(1,{from: employer, value: 1});

	log("Bounty PayHeadHunter", await bountyContract.payHeadHunter.estimateGas(headhunter,{from: employer}), gasPrice);
};

function log(name, gas, gasPrice)
{
	let estimate = {
		"operation" : name, 
		"gas":gas, 
		"eth": web3.utils.fromWei((gas * gasPrice).toString() ,"ether")
	};
}

module.exports = async function(deployer,network, accounts)  {
  if(accounts.length < 3)
	{
		let candidate = await web3.eth.personal.newAccount('');
		await web3.eth.personal.unlockAccount(candidate,'',3600);
	
		await web3.eth.sendTransaction({from: accounts[0], to: candidate, value: web3.utils.toWei("1000000", "ether")});

		let headHunter = await web3.eth.personal.newAccount('');
		await web3.eth.personal.unlockAccount(headHunter,'',3600);

	
		await web3.eth.sendTransaction({from: accounts[0], to: headHunter, value: web3.utils.toWei("1000000", "ether")});
	}
};

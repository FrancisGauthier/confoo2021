const Confoo2021 = artifacts.require("Confoo2021");

contract("TestConfoo2021", async  accounts => {
  it("should have Title and Presenter", async () =>{
    let contract = await Confoo2021.deployed();
    assert.equal(await contract.title.call(), "Confoo2021 - Ethereum & Solidity: Applications decentralisees");
  });

});
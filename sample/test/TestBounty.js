const Bounty = artifacts.require("Bounty");

contract("TestBounty", async  accounts => {
  it("should have created contract", async () =>{
    let bounty = await Bounty.deployed();
    let Prime = await bounty.Prime.call();

    assert.equal(Prime,2);

  });

  it("employer should not pay himself", async () =>{
    let bounty = await Bounty.deployed();
    let candidate = accounts[1];
    let headhunter = accounts[2];

    bounty.payHeadHunter(accounts[0],{from: accounts[0]}).then(function() {
      // Promise is resolved
      assert.fail('Expected throw not received');
    }).catch(function(reason) {
      assert(true);
    });
  });


  it("cancel should only be called by employer", async () =>{
    let employer = accounts[0];
    let candidate = accounts[1];
    let headhunter = accounts[2];
    
    let bounty = await Bounty.new(1,{from:employer, value: 5});

    bounty.cancel({from: headhunter}).then(function() {
      // Promise is resolved
      assert.fail('Expected throw not received');
    }, function(reason) {
 
      assert(true);
    });
  });



  it("cancel should refund employer", async () =>{
    let employer = accounts[0];
    let prime = 5;
    let gasPrice = web3.utils.toWei("20","gwei");

    let balance =await web3.eth.getBalance(employer);
    let bounty = await Bounty.new(1,{from:employer, value: prime});
    let txCost =  await  Bounty.new.estimateGas(1,{from: employer, value: prime}) * gasPrice;

   
    //assert.equal(await web3.eth.getBalance(employer), web3.utils.toBN(balance).minus(web3.utils.toBN(prime+txCost)).toString());

    await bounty.cancel({from: employer});

    assert.equal(await web3.eth.getBalance(employer), balance);

  });
});
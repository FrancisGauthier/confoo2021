const JobPosting = artifacts.require("JobPosting");
const Bounty = artifacts.require("Bounty");
const CurriculumVitae = artifacts.require("CurriculumVitae");

contract("TestJobPosting", async  accounts => {
  it("should have created contract", async () =>{
    let contract = await JobPosting.deployed();

    let agreement = await contract.agreement.call();

    let bounty = await Bounty.at(await contract.bounty.call());

    assert.equal(agreement.acceptedByCandidate,false);
    assert.equal(agreement.acceptedByEmployer,false);

    assert.equal(await bounty.Prime.call(),3);
  });


  it("given_candidate_when_candidate_refers_himself_then_deny", async () =>{
    let contract = await JobPosting.deployed();
    let candidate = accounts[1];

    let cv = await CurriculumVitae.new({from: candidate})
    
    assert.equal(await cv.Owner.call(),candidate);

    contract.referenceCandidate(candidate,cv.address,{from: candidate}).then(function() {
      // Promise is resolved
      assert.fail('Expected throw not received');
    }, function(reason) {
      assert(true);
    });

  });

  
  it("given_SelectedCandidate_when_thereIsAnAgreement_then_HireCandidate", async () =>{

    let employer = accounts[0];
    let candidate = accounts[1];
    let headhunter = accounts[2];

    let prime = 5;

    let contract = await JobPosting.new("ingénieur","concevoir des logiciels",5,{from:employer, value: prime});

    let cv = await CurriculumVitae.new({from: candidate});

    await contract.referenceCandidate(candidate,cv.address,{from: headhunter});

    let headHunterBalance = await web3.eth.getBalance(headhunter);

    await contract.selectCandidate(headhunter,{from: employer});

    let selectedCandidate = await contract.SelectedCandidate.call();
    
    assert.equal(selectedCandidate.Self,candidate);
    assert.equal(selectedCandidate.ReferencedBy,headhunter);
    assert.equal(selectedCandidate.CV,cv.address);

    let agreement = await contract.agreement.call();
    assert.equal(agreement.acceptedByCandidate,false);
    assert.equal(agreement.acceptedByEmployer,true);


    await contract.acceptOffer({from: candidate});

    agreement = await contract.agreement.call();
    assert.equal(agreement.acceptedByCandidate,true);
    assert.equal(agreement.acceptedByEmployer,true);

    await contract.hireCandidate({from: employer});
    
    let experience = await cv.Experiences.call(0);

    assert.equal(experience.Employer,employer);
    assert.equal(experience.Title,"ingénieur");
    assert.equal(experience.Description,"concevoir des logiciels");

    assert.equal(await web3.eth.getBalance(headhunter), web3.utils.toBN(headHunterBalance).add(web3.utils.toBN(prime)).toString());

  });
  


  it("given_NoReferencedCandidate_when_AttemptToHire_then_Fail", async () =>{

    let employer = accounts[0];
    let candidate = accounts[1];
    let headhunter = accounts[2];
    let prime = 5;

    let contract = await JobPosting.new("ingénieur","concevoir des logiciels",5,{from:employer, value: prime});

    contract.selectCandidate(headhunter,{from: employer}).then(function() {
      // Promise is resolved
      assert.fail('Expected throw not received');
    }, function(reason) {
      assert(true);
    });

    contract.selectCandidate(candidate,{from: employer}).then(function() {
      // Promise is resolved
      assert.fail('Expected throw not received');
    }, function(reason) {
      assert(true);
    });


    contract.hireCandidate({from: employer}).then(function() {
      // Promise is resolved
      assert.fail('Expected throw not received');
    }, function(reason) {
      assert(true);
    });

  });


  it("given_SelectedCandidateWithNoConsent_when_AttemptToHire_then_Fail", async () =>{

    let employer = accounts[0];
    let candidate = accounts[1];
    let headhunter = accounts[2];
    let prime = 5;

    let contract = await JobPosting.new("ingénieur","concevoir des logiciels",5,{from:employer, value: prime});
    let cv = await CurriculumVitae.new({from: candidate});
    await contract.referenceCandidate(candidate,cv.address,{from: headhunter});

    await contract.selectCandidate(headhunter,{from: employer});

    contract.hireCandidate({from: employer}).then(function() {
      // Promise is resolved
      assert.fail('Expected throw not received');
    }, function(reason) {
      assert(true);
    });
  });


  it("given_SelectedCandidate_when_OtherCandidateAttemptAccept_then_Fail", async () =>{

    let employer = accounts[0];
    let candidate = accounts[1];
    let headhunter = accounts[2];
    let prime = 5;

    let contract = await JobPosting.new("ingénieur","concevoir des logiciels",5,{from:employer, value: prime});
    let cv = await CurriculumVitae.new({from: candidate});
    await contract.referenceCandidate(candidate,cv.address,{from: headhunter});

    await contract.selectCandidate(headhunter,{from: employer});

    contract.acceptOffer({from: headhunter}).then(function() {
      // Promise is resolved
      assert.fail('Expected throw not received');
    }, function(reason) {
      assert(true);
    });
  });
  


  it("given_JobPostingCompleted_when_AttemptReemploy_then_CannotChange", async () =>{

    let employer = accounts[0];
    let candidate = accounts[1];
    let headhunter = accounts[2];
    let prime = 5;

    let contract = await JobPosting.new("ingénieur","concevoir des logiciels",5,{from:employer, value: prime});
    let cv = await CurriculumVitae.new({from: candidate});
    await contract.referenceCandidate(candidate,cv.address,{from: headhunter});
    let headHunterBalance = await web3.eth.getBalance(headhunter);

    await contract.selectCandidate(headhunter,{from: employer});
    await contract.acceptOffer({from: candidate});
    await contract.hireCandidate({from: employer});


    contract.hireCandidate({from: employer}).then(function() {
      // Promise is resolved
      assert.fail('Expected throw not received');
    }, function(reason) {
      assert(true);
    });

    contract.acceptOffer({from: candidate}).then(function() {
      // Promise is resolved
      assert.fail('Expected throw not received');
    }, function(reason) {
      assert(true);
    });

    contract.selectCandidate(headhunter,{from: employer}).then(function() {
      // Promise is resolved
      assert.fail('Expected throw not received');
    }, function(reason) {
      assert(true);
    });

    contract.referenceCandidate(candidate,cv.address,{from: headhunter}).then(function() {
      // Promise is resolved
      assert.fail('Expected throw not received');
    }, function(reason) {
      assert(true);
    });
  });
});
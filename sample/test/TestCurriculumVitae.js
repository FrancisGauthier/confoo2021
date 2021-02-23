const CurriculumVitae = artifacts.require("CurriculumVitae");

contract("TestCurriculumVitae", async  accounts => {
  it("should have created contract. Added experiences", async () =>{
    let cv = await CurriculumVitae.deployed();

    let date =Math.floor( Date.now() / 1000);
    let week = 7 * 24 * 60 * 60;
    await cv.addExperience('0x0000000000000000000000000000000000000001',"Pyxis-Studio","Ingénieur Logiciel",date,date + week,{from : accounts[0]});
    await cv.addExperience('0x0000000000000000000000000000000000000002',"Irosoft","Master Logiciel",date + week,date + 2 * week,{from : accounts[0]});
   
    let count = await cv.getExperienceCount();

    assert.equal(count,2, "failed");


    let experience = await cv.Experiences(0);


    assert.equal(experience.Employer,'0x0000000000000000000000000000000000000001', "failed");
    assert.equal(experience.Title,"Pyxis-Studio", "failed");
    assert.equal(experience.Description,"Ingénieur Logiciel", "failed");
    assert.equal(experience.StartDate,date, "failed");
    assert.equal(experience.EndDate,date + week, "failed");

    experience =  await cv.Experiences(1);
    assert.equal(experience.Employer,'0x0000000000000000000000000000000000000002', "failed");
    assert.equal(experience.Title,"Irosoft", "failed");
    assert.equal(experience.Description,"Master Logiciel", "failed");
    assert.equal(experience.StartDate,date + week,"failed");
    assert.equal(experience.EndDate,date + 2 * week, "failed");
  });

});
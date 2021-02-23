pragma solidity ^0.8.1;

contract CurriculumVitae {
   address public  Owner;
   Experience[] public  Experiences;

    struct Experience {
        address Employer;
        string Title;
        string Description;
        uint StartDate;
        uint EndDate;
    }

     constructor () {
       Owner = msg.sender;
    }

    function addExperience(address employer, string memory title,string memory description,uint startDate,uint endDate) public {
        require(msg.sender == Owner || tx.origin == employer);
        Experiences.push(Experience(employer,title, description,startDate, endDate));
    }

    function getExperienceCount() public view returns(uint count) {
        return Experiences.length;
    }
}
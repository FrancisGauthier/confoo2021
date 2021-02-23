pragma solidity ^0.8.1;
import {Bounty} from "./Bounty.sol";
import {CurriculumVitae} from "./CurriculumVitae.sol";

contract JobPosting {

    Candidate public  SelectedCandidate;
    mapping (address => Candidate) private ReferedCandidates;
    address private Employer;
    Bounty public bounty;
    Agreement public agreement;
    uint public CompletedDate;
    string  public Title;
    string  public Description;


    struct Agreement{
        bool acceptedByCandidate;
        bool acceptedByEmployer;
    }

    struct Candidate {
       address Self;
       CurriculumVitae CV;
       address payable ReferencedBy;
    }


    constructor (
        string memory _title,
        string memory _description,
        uint _duration
    )  payable{
        Title = _title;
        Description = _description;
        Employer = msg.sender;
        bounty = (new Bounty){value: msg.value}(_duration);
    }


    //Only one candidate can be proposed per headhunter
    function referenceCandidate(address candidate,address candidateCV) external OnGoing{
         require(
            msg.sender != candidate,
            "Candidate should not be an headhunter"
        );

        ReferedCandidates[msg.sender] = Candidate(candidate,CurriculumVitae(candidateCV),payable(msg.sender));
    }

    function acceptOffer() external onlySelectedCandidate OnGoing{
       agreement.acceptedByCandidate = true;
    }

    function selectCandidate(address referedBy) external onlyEmployer OnGoing{
       require(ReferedCandidates[referedBy].Self != 0x0000000000000000000000000000000000000000,"missing candidate");
       
       SelectedCandidate = ReferedCandidates[referedBy];
       agreement.acceptedByEmployer = true;
       agreement.acceptedByCandidate = false;
    }

    function hireCandidate() external onlyEmployer OnGoing{
      require(agreement.acceptedByCandidate == true,"candidate hasn't accepted the offer yet");
      require(agreement.acceptedByEmployer == true,"employer hasn't accepted the offer yet");
      
      CompletedDate = block.timestamp;
     
      SelectedCandidate.CV.addExperience(Employer,Title,Description,CompletedDate,0);
      bounty.payHeadHunter(SelectedCandidate.ReferencedBy);
     
    }

    modifier onlyEmployer() {
        require(
            msg.sender == Employer,
            "sender should be the employer"
        );
        _;
    }

    modifier onlySelectedCandidate() {
        require(
            msg.sender == SelectedCandidate.Self,
            "sender should be the selected candidate"
        );
        _;
    }

    modifier OnGoing() {
        require(
             CompletedDate == 0,
            "Job Offer has ended"
        );
        _;
    }

}
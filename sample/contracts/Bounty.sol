pragma solidity ^0.8.1;


contract Bounty {
    uint public Prime;
    address payable private  Employer;
    uint public Duration;
    
    constructor(
        uint _duration
    ) payable {
        Duration = block.timestamp + _duration;
        Prime = msg.value;
        Employer = payable(tx.origin);
    }

    function payHeadHunter(address payable hunter) external onlyEmployer payable {
         require(hunter != Employer,"employer can't pay himself");
        hunter.transfer(Prime);
    }

    function cancel()  external onlyEmployer payable{
       selfdestruct(Employer);
    }


    modifier onlyEmployer() {
        require(tx.origin == Employer);
        _;
    }
}
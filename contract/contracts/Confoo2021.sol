pragma solidity ^0.8.1;

contract Confoo2021{
    address private owner;
    mapping (address => string) public Participants;
    string[] public Emails;
    string public title;

    constructor() {
        owner = msg.sender;
        title =  "Confoo2021 - Ethereum & Solidity: Applications decentralisees";
        addParticipant("fgauthier@donetechno.com");
    }

    function addParticipant(string memory email) public{
        require(bytes(email).length > 0);
        Participants[msg.sender] = email;
        Emails.push(email);
    }

    function updateTitle(string memory newTitle) public {
        require(msg.sender == owner);
        require(bytes(newTitle).length > 0);
        title = newTitle;
    }

    function getParticipants() public view returns(string[] memory){
        return Emails;
    }
}
pragma solidity ^0.8.1;

contract Confoo2021{
    address private owner;
    mapping (address => bool) public Participations;
    Participant[] public Participants;
    string public title;

    struct Participant {
        string prenom;
        string nom;
        string email;
        string ville;
        address contact;
    }

    constructor() {
        owner = msg.sender;
        title =  "Confoo2021 - Ethereum & Solidity: Applications decentralisees";
        addParticipant("Francis","Gauthier","fgauthier@donetechno.com","Laval");
    }

    function addParticipant(string memory prenom,string memory nom,string memory email,string memory ville) public{
        require(bytes(email).length > 0);
        require(!Participations[msg.sender]);
        Participants.push(Participant(prenom,nom,email,ville,msg.sender));
        Participations[msg.sender] = true;
    }

    function updateTitle(string memory newTitle) public {
        require(msg.sender == owner);
        require(bytes(newTitle).length > 0);
        title = newTitle;
    }

    function getParticipants() public view returns(Participant[] memory){
        return Participants;
    }
}
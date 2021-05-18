pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";

contract EventManagement is ERC721Full{

    constructor(string memory name, string memory symbol) ERC721Full(name, symbol) public {}
  struct EventToken {
        string tokenName;
        uint256 quantity;
        string eventItem;
    }
    
    mapping(uint256 => EventToken) EventTokens;
    
    
    function mintToken(
        string memory _tokenName,
        uint256 _quantity,
        string memory _eventItem
        )
        public
        {
            uint256 eventId = totalSupply().add(1);
            EventTokens[eventId] = EventToken(_tokenName,_quantity,_eventItem);
            
            _mint(msg.sender, eventId);
            // _setTokenURI()
        }
        
    function getToken(uint256 _tokenId) public view returns(string memory _tokenName, uint256 _quantity, string memory _eventItem){
        return (EventTokens[_tokenId].tokenName,EventTokens[_tokenId].quantity,EventTokens[_tokenId].eventItem);
    }
    
}
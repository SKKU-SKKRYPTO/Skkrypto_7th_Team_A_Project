// Klaytn IDE uses solidity 0.4.24, 0.5.6 versions.
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.6.2;

// import "https://github.com/itinance/openzeppelin-solidity/blob/master/contracts/token/ERC721/ERC721Full.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.1.0/contracts/token/ERC721/ERC721.sol";
/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract EventManagement is ERC721{
    constructor(string memory name, string memory symbol) ERC721(name, symbol) public {}
		
		
    uint personID=0;
  
  struct parti{
        uint256 personID;
    }
  
  parti[] public people;
  	
    struct EventToken {
        string tokenName;
        uint256 quantity;
        string eventItem; 
      	uint whoCanParti;
    }
  
  	EventToken[] public events;
  	
  	mapping(address=>uint256) whatPID; // address값 받고 그사람의 personID를 반환한는 매핑
		mapping(uint256=>string) tokenToOwner; // 토큰이 누구의 소유인지
    mapping(string => EventToken) eventTokens; //eventID를 받고 Event토큰을 반환
  	mapping(string => uint256) leftGoods; // 이벤트명 => 남은 상품의 개수
  	mapping(address => mapping(string=>uint)) checkAlreadyParticipated; // 이미 이벤트에 참여했는지 확인(address와 string을 받고 uint반환)
  	mapping(string=>uint) saveLastToken; //이벤트에서 발행하는 마지막 토큰의 아이디를 저장


    function mintToken(
        string memory _tokenName, // 이벤트명
        uint256 _quantity, // 수량
        string memory _eventItem, // 상품명
        uint _whoCanParti // 대상
        )
        public
        {
      			eventTokens[_tokenName] = EventToken(_tokenName,_quantity,_eventItem, _whoCanParti);
                                                 
      		for(uint i =0;i<_quantity;i++){
                uint256 eventId = totalSupply().add(1);
                saveLastToken[_tokenName] = eventId;
            }          
        }
  
  
  function partiEvt(string memory _tokenName) public {
  	require(leftGoods[_tokenName]!=0, "No goods left");
    require(checkAlreadyParticipated[msg.sender][_tokenName]==0, "Already participated");
    
    checkAlreadyParticipated[msg.sender][_tokenName]=1;
    _mint(msg.sender, saveLastToken[_tokenName]);
    leftGoods[_tokenName]--;
    saveLastToken[_tokenName]--;  
  }
  
  function registerParti(uint256 _personID) public { // _personID입력 받을 때, 함수 호출시 마다 매개변수 +1씩 해줘야 할 것 같습니다.(이벤트 참여자마다 구별필요)
        people.push(parti(_personID));
      	whatPID[msg.sender]=_personID; // 함수 호출자와 _personID를 매핑
        personID++;
    }

 
}

pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";

contract EventManagement is ERC721Full{
    
    uint256 personID=0; //participant's ID start from 0 to ....
    uint256 eventID=1;
    
    constructor(string memory name, string memory symbol) ERC721Full(name, symbol) public {
      
    }

    mapping(address=>uint) checkAdmin; // 주소를 입력하면 어드민인지 아닌지 알려주는 매핑 (admin : 1 , non-admin : 0)
    mapping(uint256 => address) tokenToOwner; // 토큰 아이디 => 토큰 주인의 주소
    mapping(address => mapping(uint256=>uint)) checkAlreadyParticipated; // 이미 이벤트에 참여했는지 확인
    mapping(uint256 => uint256) leftGoods; // 이벤트 아이디 => 남은 상품의 개수
  	mapping(address=>uint256) whatPID; // address값 받고 그사람의 personID를 반환한는 매핑
  	//mapping(address=>parti) add2parti;//주소값 받고 parti 반환
  	
  	mapping(uint256=>mapping(uint256=>uint)) whatEvtPartiArray;
  	//어떤 이벤트에 참여 했는지 row는 personID를 받고 coloumn은 어떤 이벤트에 참여했는지를 저장
  // 예를 들면 personID =1이고 참여한 eventID가 1,3일때, whatEvtPartiArray[1][0]=1, whatEvtPartiArray[1][1]=3이 할당됨.
  
    struct admin{
        bool isAdmin; // check if it is administrator set 1
        uint256 personID;
    }
    
    admin[] public admins; // 어드민 목록 저장하는 배열

    struct parti{
        bool isAdmin; // check if it is administrator set 0
        uint256 personID;
      //	uint256[] whatEvt;
    }
    
    parti[] public people;
    
    struct eventBox {
        uint256 evtID;
        uint256 limitnumber;
        string goodsname;
    }
    
    eventBox[] public eventBoxes;
  
  	function whatEvtParticipated() public {
      uint256 i=0;
      uint256 j=0;
      uint256 PID = whatPID[msg.sender];
      for(i=0;i<=eventID;i++){
      	if(checkAlreadyParticipated[msg.sender][i]==1&&leftGoods[i]==0){
        	whatEvtPartiArray[PID][j]=i; // 매핑을 배열처럼 생각해서 저장함. (j는 그냥 column이고 PID는 row라고 생각하면됩니다.)
          j++;
        }
      }
    }
  
    function partiEvent(uint256 _evtID) public {
        require(leftGoods[_evtID]>=1, "There is no goods");
        require(checkAdmin[msg.sender]==0,"You are administrator");
        require(checkAlreadyParticipated[msg.sender][_evtID]==0, "You have already participated");
        uint tokenID = totalSupply().add(1);
        leftGoods[_evtID]--;
        tokenToOwner[tokenID]=msg.sender;
        _mint(msg.sender, tokenID);
        checkAlreadyParticipated[msg.sender][_evtID]=1;
    }
    
    function createEvent(uint256 _evtID, uint256 _limitnumber, string memory _goodsname) public {
        require(checkAdmin[msg.sender]==1,"You are not an administrator");
        eventBoxes.push(eventBox(_evtID,_limitnumber, _goodsname));
        leftGoods[_evtID]=_limitnumber;
        eventID++;
    }
    
    function registerAdmin(uint256 _personID, bool _isAdmin, string memory str) public { // _personID입력 받을 때, 함수 호출시 마다 매개변수 +1씩 해줘야 할 것 같습니다.
        // require(keccak256(str)==keccak256("uiopqwer12"));
        admins.push(admin(_isAdmin, _personID));
      	whatPID[msg.sender]=_personID;
        checkAdmin[msg.sender] = 1;
        personID++;
    }
    
    function registerParti(uint256 _personID, bool _isAdmin) public { // _personID입력 받을 때, 함수 호출시 마다 매개변수 +1씩 해줘야 할 것 같습니다.
        people.push(parti(_isAdmin,_personID));
      	whatPID[msg.sender]=_personID;
        checkAdmin[msg.sender]=0;
        personID++;
    }
}
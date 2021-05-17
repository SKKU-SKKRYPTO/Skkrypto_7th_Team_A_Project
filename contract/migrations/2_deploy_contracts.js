const EventManagement = artifacts.require('./EventManagement.sol')
const fs = require('fs')

module.exports = function (deployer) {
  var name = "EventManagement";
  var symbol = "EM";

  deployer.deploy(EventManagement, name, symbol)
    .then(() => {
      if (EventManagement._json) {
        fs.writeFile(
          'deployedABI',
          JSON.stringify(EventManagement._json.abi),
          (err) => {
            if (err) throw err
            console.log("파일에 ABI 입력 성공");
          })
      }

      fs.writeFile(
        'deployedAddress',
        EventManagement.address,
        (err) => {
          if (err) throw err
          console.log("파일에 주소 입력 성공");
        })
    })
}
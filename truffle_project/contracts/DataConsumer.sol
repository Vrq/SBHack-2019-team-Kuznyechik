pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC721.sol';
import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';


contract DataConsumer is ERC721Token, Ownable {
    constructor (string _name, string _symbol) public
        ERC721Token(_name, _symbol)
    {
    }

    /**
    * Custom accessor to create a unique token with metadata
    */
    function mintUniqueTokenTo(
        address _to,
        uint256 _tokenId,
        string  _tokenURI
    ) public
    {
        super._mint(_to, _tokenId);
        super._setTokenURI(_tokenId, _tokenURI);
    }
}
pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "zos-lib/contracts/Initializable.sol";
import './erc-1155/contracts/ERC1155Mintable.sol';

contract Polygoons is Initializable {

    event GoonCreated(uint256 id, string uri);

    struct Goon {
        uint256 tokenId;
        string metadataUri;
    }

    ERC1155Mintable public token;
    bool private initialized;

    Goon[] public goons;
    mapping (uint256 => address) public goonIndexToOwner;

    function initialize() initializer public {
        require(!initialized);
        token = new ERC1155Mintable();
        _createPolygoon("0th GOON");
        initialized = true;
    }

    function goonPopulation() public view returns (uint) {
        return goons.length;
    }

    function getGoon(uint256 goonTokenId) public view returns (Goon memory goon) {
        return goons[goonTokenId];
    }

    function _createPolygoon(string memory _uri) public returns (uint) {
        uint256 _tokenId = token.create(1, _uri);

        Goon memory _goon = Goon({
           tokenId: _tokenId,
           metadataUri: _uri
        });

        uint256 newGoonId = goons.push(_goon) - 1;
        goonIndexToOwner[newGoonId] = msg.sender;

        emit GoonCreated(_tokenId, _uri);

        return newGoonId;
    }
}

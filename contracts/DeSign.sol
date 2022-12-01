// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

/// @custom:security-contact bgro63@gmail.com
contract DeSign is ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _tokenIdCounter;

    struct Contract {
        uint256 tokenId;
        string buyer_name;
        uint256 buyer_sign_date;
        address buyer_wallet_address;
        string seller_name;
        uint256 seller_sign_date;
        address seller_wallet_address;
        string product;
        string price;
        string contract_date;
    }

    mapping(uint256 => Contract) public tokenIdToContract;

    constructor() ERC721("de|sign", "SIGN") {}

    function generateImage(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        Contract memory sourceContract = tokenIdToContract[tokenId];
        bytes memory svg = abi.encodePacked(
            '<svg width="700" height="700" viewBox="0 0 700 700" fill="none" xmlns="http://www.w3.org/2000/svg"><style>.base { fill: black; font-family: serif; font-size: 14px; } .title { font-size: 30px } .bold { font-weight: bold } .small { font-size: 11px; margin-top: 8px } .tiny { font-size: 8px; margin-top: 8px } p { margin: 0 } .flex { width: 100%; display: flex; justify-content: space-around } .margin-top-8 { margin-top: 8px } .margin-top-4 { margin-top: 4px } .italic { font-style: italic; } .underline { text-decoration: underline }</style><rect width="700" height="700" fill="#fff" /><path d="M51.5 20C50.1383 21.3033 48.5184 22.3065 46.745 22.945C44.875 23.275 39.7 20.875 37.15 23.325C36.725 23.75 36.2 24.175 35.65 24.6C34.45 24.075 32.6 23.275 31.25 22.5C29.9 21.725 26.5 20 26.5 20L19 28.75C19 28.75 20.85 31.25 22 32.9C22.75 34 23.675 35.675 24.275 36.8L23.425 37.8C23.2214 38.2044 23.1482 38.6619 23.2154 39.1096C23.2825 39.5573 23.4868 39.9732 23.8 40.3C24.1616 40.5711 24.6015 40.7172 25.0533 40.7163C25.5052 40.7154 25.9445 40.5675 26.305 40.295C26.1713 40.4515 26.0702 40.633 26.0074 40.829C25.9447 41.025 25.9216 41.2316 25.9395 41.4366C25.9574 41.6416 26.016 41.841 26.1118 42.0232C26.2076 42.2053 26.3387 42.3666 26.4975 42.4975C26.8793 42.7205 27.3136 42.8375 27.7557 42.8367C28.1978 42.8358 28.6316 42.717 29.0125 42.4925C28.7269 42.8485 28.5706 43.291 28.5692 43.7474C28.5678 44.2039 28.7215 44.6473 29.005 45.005C29.3735 45.1326 29.7666 45.1732 30.1534 45.1238C30.5402 45.0744 30.9104 44.9362 31.235 44.72C31.0733 45.1027 31.0314 45.5255 31.1149 45.9326C31.1983 46.3396 31.4032 46.7118 31.7025 47C32.1253 47.1879 32.5888 47.2653 33.0497 47.2251C33.5106 47.1848 33.9537 47.0283 34.3375 46.77L35.6275 45.6025C36.8075 46.7775 38.435 47.505 40.2325 47.505L40.385 47.5025C40.9774 47.4519 41.5448 47.2412 42.0266 46.8929C42.5084 46.5445 42.8863 46.0717 43.12 45.525C43.485 45.665 43.9 45.76 44.34 45.76C44.93 45.76 45.4775 45.59 45.94 45.2975C47.4025 44.33 47.0525 43.58 47.0525 43.58C47.5725 43.8039 48.1502 43.8569 48.7023 43.7316C49.2545 43.6063 49.7526 43.309 50.125 42.8825C50.512 42.4866 50.756 41.973 50.8185 41.4229C50.881 40.8728 50.7584 40.3176 50.47 39.845C50.4858 39.8544 50.5041 39.8588 50.5225 39.8575C51.575 39.8575 52.49 39.2775 52.9675 38.4225C53.2025 37.8148 53.2819 37.1581 53.1985 36.5119C53.1151 35.8657 52.8716 35.2506 52.49 34.7225L52.4975 34.735C54.5475 34.335 54.4725 33.31 55.4725 31.81C56.4193 30.5859 57.5975 29.5598 58.94 28.79L51.5 20ZM51.375 37.65C50.275 38.75 49.425 38.275 47.55 36.85C45.675 35.425 41.95 32.75 41.95 32.75C42.1025 33.5125 42.455 34.175 42.9525 34.7025C43.75 35.6 46.125 37.65 47.25 38.7C47.95 39.35 49.75 40.65 48.7 41.65C47.65 42.65 46.825 41.65 45.1 40.25C43.375 38.85 39.525 35.4 39.525 35.4C39.5038 35.7307 39.553 36.0621 39.6693 36.3724C39.7857 36.6827 39.9666 36.9648 40.2 37.2C40.625 37.7 43 40 44 41.05C45 42.1 45.875 42.725 45.025 43.55C44.175 44.375 42.45 43.075 41.5 42.1C40.025 40.675 37.1 38.025 37.1 38.025L37.0975 38.1575C37.0975 38.8675 37.3425 39.5175 37.755 40.0325C38.475 40.9775 39.875 42.2025 40.725 43.1525C41.575 44.1025 42.075 44.9025 40.725 45.6525C39.375 46.4025 37.375 44.5525 36.5 43.6525V43.6475C36.5002 43.4006 36.4114 43.1618 36.25 42.975C35.951 42.698 35.582 42.5078 35.1829 42.425C34.7837 42.3422 34.3696 42.3698 33.985 42.505C34.1432 42.3633 34.2701 42.1901 34.3574 41.9965C34.4447 41.8029 34.4905 41.5932 34.4919 41.3808C34.4933 41.1684 34.4503 40.9581 34.3656 40.7634C34.2809 40.5686 34.1563 40.3938 34 40.25C33.6718 40.0014 33.2713 39.867 32.8596 39.8675C32.4479 39.8679 32.0476 40.0031 31.72 40.2525C31.8857 40.0943 32.0135 39.9007 32.0941 39.6863C32.1747 39.4719 32.206 39.242 32.1856 39.0138C32.1652 38.7857 32.0936 38.565 31.9762 38.3683C31.8588 38.1716 31.6986 38.0038 31.5075 37.8775C31.06 37.5963 30.5348 37.4642 30.0075 37.5001C29.4801 37.536 28.9778 37.7382 28.5725 38.0775C28.8434 37.7492 28.9769 37.329 28.9452 36.9046C28.9135 36.4802 28.7191 36.0844 28.4025 35.8C28.009 35.4338 27.5076 35.2047 26.9732 35.147C26.4388 35.0893 25.9 35.2062 25.4375 35.48L23.775 32.6725C22.625 30.8475 21.275 28.9475 21.275 28.9475L26.975 22.0225C26.975 22.0225 29 23.2725 30.675 24.2225C31.5 24.6975 32.925 25.3225 34 25.8225C32.3 27.0975 30.875 28.3225 31.3 29.1725C32.0574 29.7162 32.9625 30.0161 33.8947 30.0322C34.8269 30.0482 35.7418 29.7797 36.5175 29.2625C37.5121 28.6013 38.6807 28.2506 39.875 28.255C40.7425 28.255 41.5675 28.435 42.315 28.7625C43.7 29.6975 46.25 31.9975 48.575 33.4475C51.5 35.5725 52.075 36.9475 51.375 37.6475V37.65Z" fill="#D50101" /><text x="50%" y="5.5%" class="base title bold" dominant-baseline="middle" text-anchor="middle">Sales Contract</text><text x="90%" y="5.5%" class="base" dominant-baseline="middle" text-anchor="middle">de-signature.xyz</text><foreignObject x="3%" y="9%" width="94%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml" class="base">',
            string.concat(
                '</span></div><p class="tiny">THIS SALES CONTRACT (this "Agreement" or this "Sales Contract"), effective as of ',
                sourceContract.contract_date,
                ", is made and entered into by and between ",
                sourceContract.seller_name,
                ", an individual controlling the Ethereum wallet address of "
            ),
            sourceContract.seller_wallet_address,
            string.concat(
                ' (hereinafter the "Seller"), and ',
                sourceContract.buyer_name,
                ", an individual controlling the Ethereum wallet address of "
            ),
            sourceContract.buyer_wallet_address,
            string.concat(
                ' (hereinafter the "Buyer").</p><p class="tiny">1. APPLICABILITY. The Buyer may place orders ("Order(s)") with Seller and all such Orders will be governed solely by the terms in this Sales Contract, unless otherwise mutually agreed. Any oral understandings are expressly excluded.</p><p class="tiny">2. DELIVERY. Delivery shall be made within the time specied on Order or in accordance with quoted lead time of Seller and monthly delivery rate, whichever is later. Transportation charges are included in the prices quoted herein and as such the responsibility of Seller.</p><p class="tiny">3. INSPECTION. The Buyer shall inspect and accept, or reject products delivered pursuant to the Order immediately after Buyer takes custody of such products.</p><p class="tiny">4. PRICES AND PAYMENT. Prices and payments will be in United States dollars, and payment shall be made in the United States currency or Ethereum mainnet ether. Payment is due immediately upon delivery. In the event payments are not made in a timely manner, Seller may, in addition to all other remedies provided at law, charge interest on the delinquency at a rate of 5% per month or the maximum rate permittedby law, if lower, for each month or part thereof of delinquency in payment.</p><p class="tiny"><p class="tiny">5. CANCELLATION. Buyer reserves the right to cancel any portion of this Order affected by a default of Seller or any insolvency or suspension of Seller operations or any petition led or proceeding commenced by or against Seller under any state or federal law relating to bankruptcy, arrangement, reorganization, receivership or assignment for the benefit of creditors.</p><p class="tiny">6. DISPUTES. Except as otherwise specically agreed in writing by Buyer and Seller, any dispute relating to an Order placed by a Buyer incorporated in the United States which is not resolved by the parties shall be adjudicated by any court of competent jurisdiction. For Orders placed by a Buyer incorporated outside the United States, the parties shall resort to binding arbitration under mutually agreed procedures.</p><p class="tiny">7. APPLICABLE LAW. This Agreement shall be interpreted in accordance with the laws of the jurisdiction in which the Seller facility accepting the Order hereunder is located, exclusive of any choice of law provisions. The Seller and Buyer expressly agree to exclude from this Agreement the United Nations Convention on Contracts for the International Sale of Goods, 1980, and any successor thereto.</p><p class="tiny">8. LIMITATION OF LIABILITY. Seller liability on any claim for loss or damage arising out of, connected with, or resulting from an Order, or from the performance or breach thereof, or from the manufacture, sale, delivery, resale, repair or use of any product covered by or furnished under an Order shall in no case exceed the price allocable to the product or part thereof which gives rise to the claim. In no event shall Seller be liable for special, incidental or consequential damages. Except as herein expressly provided to the contrary, the provisions of this Order are for the benefit of the parties to the Order and not for the benefit of any other person.</p><p class="tiny">9. TAXES. The prices quoted herein include sales taxes and duties. As such they are the responsibility of Seller.</p><p class="tiny"><div class="flex margin-top-8"><div><p>Buyer Signature:</p><p class="bold margin-top-4">',
                sourceContract.buyer_sign_date != 0
                    ? sourceContract.buyer_name
                    : "",
                '</p><p class="italic underline">',
                sourceContract.buyer_sign_date != 0
                    ? sourceContract.buyer_name
                    : "",
                "</p><p>"
            ),
            sourceContract.buyer_sign_date,
            string.concat(
                '</p></div><div><p>Seller Signature:</p><p class="bold margin-top-4">',
                sourceContract.seller_sign_date != 0
                    ? sourceContract.seller_name
                    : "",
                '</p><p class="italic underline">',
                sourceContract.seller_sign_date != 0
                    ? sourceContract.seller_name
                    : "",
                "</p><p>"
            ),
            sourceContract.seller_sign_date,
            "</p></div></div></div></foreignObject></svg>"
        );
        return
            string(
                abi.encodePacked(
                    "data:image/svg+xml;base64,",
                    Base64.encode(svg)
                )
            );
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name": "De|Sign Contract #',
            tokenId.toString(),
            '",',
            '"description": "A legally binding contract, published to the blockchain for eternity as an NFT | de-signature.xyz",',
            '"image": "',
            generateImage(tokenId),
            '"',
            "}"
        );
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(dataURI)
                )
            );
    }

    function mint(
        string memory buyer_name,
        address buyer_wallet_address,
        string memory seller_name,
        address seller_wallet_address,
        string memory product,
        string memory price,
        string memory contract_date
    ) public {
        address emptyAddress = address(0);
        require(
            seller_wallet_address != emptyAddress &&
                buyer_wallet_address != emptyAddress,
            "A buyer and seller wallet address must be provided"
        );
        require(
            msg.sender == seller_wallet_address ||
                msg.sender == buyer_wallet_address,
            "Only the buyer or seller can mint the contract"
        );
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        Contract memory newContract = Contract(
            tokenId,
            buyer_name,
            0,
            buyer_wallet_address,
            seller_name,
            0,
            seller_wallet_address,
            product,
            price,
            contract_date
        );
        tokenIdToContract[tokenId] = newContract;
        _setTokenURI(tokenId, getTokenURI(tokenId));
    }

    function updateContract(
        uint256 tokenId,
        string memory buyer_name,
        string memory seller_name,
        string memory product,
        string memory price,
        string memory contract_date
    ) public {
        require(_exists(tokenId), "This NFT contract does not exist");
        Contract memory existingContract = tokenIdToContract[tokenId];
        require(
            existingContract.seller_sign_date == 0 &&
                existingContract.buyer_sign_date == 0,
            "Cannot update a contract that has been signed"
        );
        require(
            existingContract.buyer_wallet_address == msg.sender ||
                existingContract.seller_wallet_address == msg.sender,
            "Must be buyer or seller to update contract"
        );
        tokenIdToContract[tokenId] = Contract(
            tokenId,
            buyer_name,
            0,
            existingContract.buyer_wallet_address,
            seller_name,
            0,
            existingContract.seller_wallet_address,
            product,
            price,
            contract_date
        );
        _setTokenURI(tokenId, getTokenURI(tokenId));
    }

    function signContract(uint256 tokenId) public {
        require(_exists(tokenId), "This NFT contract does not exist");
        Contract memory existingContract = tokenIdToContract[tokenId];
        require(
            existingContract.buyer_wallet_address == msg.sender ||
                existingContract.seller_wallet_address == msg.sender,
            "Must be buyer or seller to sign contract"
        );
        if (existingContract.buyer_wallet_address == msg.sender) {
            require(
                existingContract.buyer_sign_date == 0,
                "Contract has already been signed"
            );
            existingContract.buyer_sign_date = block.timestamp;
        } else if (existingContract.seller_wallet_address == msg.sender) {
            require(
                existingContract.seller_sign_date == 0,
                "Contract has already been signed"
            );
            existingContract.seller_sign_date = block.timestamp;
        }
        _setTokenURI(tokenId, getTokenURI(tokenId));
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}

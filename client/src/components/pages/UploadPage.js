import { MDBIcon, MDBCol, MDBRow, MDBInput, MDBBtn, MDBContainer, MDBNavLink } from 'mdbreact';
import * as constants from "../../constants";
import React from 'react';
import Web3 from 'web3'
import Cookies from 'universal-cookie';


class UploadPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            account: '',
            web3js: '',
            factory_contract: ''
        }
        this.loadBlockchainData = this.loadBlockchainData.bind(this);
        this.sendTx = this.sendTx.bind(this);
        this.smart_contract = "0x5cb01dfc56904c04e339948c8c93a62d0ea5b2f7";
        this.to = "0x138a0bbcd5b6b913435ffaf9f77885dc82239226";
        this.abi = [
            {
                "constant": false,
                "inputs": [],
                "name": "renounceOwnership",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "isOwner",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "name": "vouchers",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "transferOwnership",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "name": "datasales",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "id",
                        "type": "bytes32"
                    }
                ],
                "name": "DataOfferCreated",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "id",
                        "type": "bytes32"
                    },
                    {
                        "indexed": false,
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "EmitedVouchers",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "value",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "id",
                        "type": "bytes32"
                    }
                ],
                "name": "FundsForward",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "previousOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnershipTransferred",
                "type": "event"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "id",
                        "type": "bytes32"
                    }
                ],
                "name": "createDataOffer",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "id",
                        "type": "bytes32"
                    },
                    {
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "emitVouchers",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "hash",
                        "type": "bytes32"
                    }
                ],
                "name": "forwardFunds",
                "outputs": [],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            }
        ]
    }

    componentWillMount() {
        this.loadBlockchainData()
    }

    onETHChane() {
        //make the value of USD input 311 times the value in ETH

    }

    async loadBlockchainData() {
        if (window.web3 === undefined || window.web3.currentProvider === undefined) {
            this.setState({ noweb3: true })
        } else {
            window.addEventListener('load', async () => {
                // Modern dapp browsers...
                if (window.ethereum) {
                    window.web3 = new Web3(window.ethereum);
                    try {
                        // Request account access if needed
                        await window.ethereum.enable();
                        // Acccounts now exposed
                        web3.eth.sendTransaction({/* ... */ });
                    } catch (error) {
                        // User denied account access...
                    }
                }
                // Legacy dapp browsers...
                else if (window.web3) {
                    window.web3 = new Web3(web3.currentProvider);
                    // Acccounts always exposed
                    web3.eth.sendTransaction({/* ... */ });
                }
                // Non-dapp browsers...
                else {
                    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
                }
            });
            let web3 = new Web3(window.web3.currentProvider);
            let accounts = await web3.eth.getAccounts();
            this.factory = web3.eth.Contract(this.abi, this.smart_contract)
            window.factory = this.factory

            console.log(accounts)
            this.setState({ account: accounts[0], web3js: web3 })
        }
    }

    async waitForTxToBeMined(txHash) {
        let txReceipt
        while (!txReceipt) {

            try {
                txReceipt = await this.state.web3js.eth.getTransactionReceipt(txHash)
            } catch (err) {
                alert(err)
            }

        }

        alert('Success');
    }

    async sendTx() {
        var sender = this.state.account;
        //let contract = new this.state.web3js.eth.Contract(this.abi, this.smart_contract);
        //this.state.web3js.eth.sendTransaction({to:this.smart_contract,
        //from:sender,
        //value:this.state.web3js.utils.toWei("0.5", "ether")},
        //function (err, res){});
        console.log(sender)
        console.log(this.to)
        console.log(this.factory)
        await this.factory.methods.forwardFunds(this.to).send(
            {
                from: sender,
                value: this.state.web3js.utils.toWei("0.5", "ether"),
                gas: 1500000,
                gasPrice: '30'
            })
            .then((receipt) => {
                console.log(receipt)
            });
    }

    handleUpload = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const reward = formData.get('rewardValue')
        const cookies = new Cookies();
        const SERVER_URL = "http://tk19server-env.pmxnizzw2s.us-east-2.elasticbeanstalk.com"
        const LOCAL_SERVER = "http://localhost:3001"
        this.setState({showDone: true})
        // fetch(SERVER_URL + '/users/me/upload', {
        //     method: 'POST',
        //     body: formData,
        //     headers: {
        //         'Authorization': 'Bearer ' + cookies.get("userToken")
        //     }
        // }).then((res) => {
        //     if (res.ok) {
        //         //this.hash = res.hash
        //         console.log(reward)

        //         console.log("Successfully uploaded")
        //         res.json().then(responseBody => {
        //             // responseBody should contain the file hash
        //             console.log(reward)
        //         });
        //         this.sendTx()
        //     } else {
        //         console.log("failed to upload")
        //         console.log(res)
        //     }
        // })
        //     .catch(() => console.log("error"))
    };

    render() {
        const cookies = new Cookies();
        const token = cookies.get("userToken")
        return (
            <div>
                {this.state.noweb3 ? <h3 className="text-center">You need to install Metamask <a href="https://metamask.io/" target="_blank">(link)</a> to use our portal</h3>
                    :
                    <MDBContainer>
                        <MDBRow className="justify-content-center">
                            <MDBCol className="col-12 text-center">
                                {
                                    token ?
                                        <div>
                                            {/* <p>Your account: {this.state.account}</p> */}
                                            {this.state.showDone && <h2 className="green-text py-3">Your ownership is claimed</h2>}
                                            <h2 className="pb-5 mb-5"><b>Claim your digital ownership</b></h2>
                                            <form onSubmit={this.handleUpload}>
                                                <MDBRow>
                                                    <MDBCol md="5" className="px-5 mx-4">
                                                        <h4>Your piece of art 😺</h4>
                                                        <div className="grey-text">
                                                            <MDBInput required group type="file" name="upl" />
                                                        </div>
                                                    </MDBCol>
                                                    <MDBCol md="5" className="px-5 mx-5">
                                                        <h4>Reward for the reviewers 💰</h4>
                                                        <MDBInput label="USD $" name="rewardValue" />
                                                    </MDBCol>
                                                </MDBRow>
                                                <MDBRow>

                                                </MDBRow>
                                                <MDBRow className='justify-content-center'>
                                                    <div className="text-center my-5 mr-5">
                                                        <MDBBtn color="primary" type="submit">Upload</MDBBtn>
                                                    </div>
                                                </MDBRow>
                                            </form>
                                        </div>
                                        :
                                        <div>
                                            <div>You need to login to access this page</div>
                                            <MDBNavLink to="/app/login"><MDBBtn>Log in</MDBBtn></MDBNavLink>
                                        </div>
                                }
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                }
            </div>
        );
    }
}
export default UploadPage;



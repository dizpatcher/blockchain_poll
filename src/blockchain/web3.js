import Web3 from 'web3';

export class Web3Service {
    constructor() {
        if (window.web3) {

        } else {
            console.warn('Metamask not found!')
        }
    }
}
import { createStore, thunk, action } from 'easy-peasy';
import Web3 from 'web3';
import { userPinList } from '../src/pin';
import contractJSON from '../build/contracts/Polygoons.json';


const model = {
    accounts: [],
    contract: undefined,
    userGoons: [],
    web3: undefined,
    needsWallet: false,
    connect: thunk(async (actions) => {
        try {
            if (typeof window.ethereum === 'undefined') throw new Error("No wallet detected.");
            actions.setWalletNeeded(false);

            // Use Dapper web3 provider for Dapper interaction.
            const web3 = new Web3(window.ethereum);
            const GameContract = new web3.eth.Contract(contractJSON.abi, "0x037b7E9d7Ce9FB83A2cB9A25a404E604C5bB5D51");
            const accounts = await window.ethereum.enable();
            console.log('DapperProvider is connected to window.ethereum.');

            // Use Web3 1.0 for listening to events
            const rinkebyWeb3 = new Web3(new Web3.providers.WebsocketProvider("wss://rinkeby.infura.io/ws/v3/b7922ee061c44d33a236a2b35210cae9"));
            rinkebyWeb3.eth.defaultAccount = accounts[0];
            const eventSource = new rinkebyWeb3.eth.Contract(contractJSON.abi, "0x037b7E9d7Ce9FB83A2cB9A25a404E604C5bB5D51");
            console.log('Listening for contract events.');


            actions.initGame({ web3, events: eventSource.events, accounts, contract: GameContract })


        } catch (error) {
            console.warn('Error accessing Ethereum network.', error.message);
            actions.setWalletNeeded(true);
        }
    }),
    initGame: action((state, payload) => {
        return { ...payload }
    }),
    setWalletNeeded: action((state, payload) => {
        return { ...state, needsWallet: payload }
    }),
    getUserGoons: thunk(async (actions, payload) => {
        const { data } = await userPinList({ nameContains: payload.accounts[0] })
        actions.updateUserGoons(data.rows)
    }),
    updateUserGoons: action((state, payload) => {
        return { ...state, userGoons: payload }
    })
};

const store = createStore(model);

export default store;
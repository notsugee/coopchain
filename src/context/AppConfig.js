import React, { useState, createContext } from 'react';
import { ethers } from "ethers";
import contractabi from "../contract/artifacts/contracts/Lock.sol/Lock.json";
import { useEffect } from 'react';

export const AppConfig = createContext();

export const AppProvider = ({ children }) => {
    const [providerConnected, setProviderConnected] = useState(false);
    const [currentUser, setCurrentUser] = useState("");
    const provider = new ethers.providers.Web3Provider(window.ethereum);


    // const contractAddress = '0xdee029dF260132b7c9E2d659eA167a9355b0fb05'; ftm
    const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';
    const abi = contractabi.abi;

    const requestAccounts = async () => {
        const accns = await window.ethereum.request({ method: "eth_requestAccounts" });
        setProviderConnected(true);
    }

    const connectWallet = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await requestAccounts();
        const signer = provider.getSigner();
        setProviderConnected(true);
        let current = await signer.getAddress();
        setCurrentUser(current);
        console.log(currentUser)
    }

    const makeRaise = async (raising, title, desc) => {
        try {
            const signer = provider.getSigner();
            const newsignedContract = new ethers.Contract(contractAddress, abi, signer);
            await newsignedContract.performRaise(raising, title, desc);
        } catch (error) {
            alert("An error Occured while performing a Raise, make sure you don't have another raise going running, error type - ", error)
        }

    }
    const addVoter = async (voterAddress, voterName) => {
        try {
            // Ensure the user is connected to the provider
            if (!providerConnected) {
                alert("Please connect your wallet first.");
                return;
            }
    
            // Check if the current user has the necessary permission (e.g., the official)
            // Add your permission logic here if needed
    
            const signer = provider.getSigner();
            const newsignedContract = new ethers.Contract(contractAddress, abi, signer);
    
            // Call the addVoter function in your smart contract
            await newsignedContract.addVoter(voterAddress, voterName);
    
            // Update the total number of voters in the local state
            setTotalVoter((prevTotalVoter) => prevTotalVoter + 1);
    
            // You may want to update the UI or perform other actions after adding the voter
        } catch (error) {
            alert("Error adding voter. Please check your wallet and try again. Error: " + error.message);
        }
    };
    

    const voteForTransac = async (raiseId, transacId, vote) => {
        try {
            const signer = provider.getSigner();
            const newsignedContract = new ethers.Contract(contractAddress, abi, signer);
            // Assuming your voting function is exposed in the contract
            await newsignedContract.voteForTransac(raiseId, transacId, vote);
            console.log("Voted!");
        } catch (error) {
            alert("Voting Error Occurred. Please check your wallet and try again.");
        }
    }
    
    const endVote = async () => {
        try {
            const signer = provider.getSigner();
            const newsignedContract = new ethers.Contract(contractAddress, abi, signer);
            // Assuming your endVote function is exposed in the contract
            await newsignedContract.endVote();
            console.log("Voting Ended!");
        } catch (error) {
            alert("Error Ending Voting. Please check your wallet and try again.");
        }
    }
    

    const returnRaiseProgress = async () => {
        const signer = provider.getSigner();
        const newsignedContract = new ethers.Contract(contractAddress, abi, signer);
        const raiseCount = await newsignedContract.userInfo(currentUser)
        let temp = []
        for (let i = 0; i < parseInt(raiseCount.currentRaise._hex) + 1; i++) {
            const raise = await newsignedContract.raiseInfo(i);
            if (raise[6] === currentUser) {
                temp.push([raise, i]);
            }
        }
        console.log(temp)
        console.log(raiseCount)
        return temp;
    }


  




    return (
        <AppConfig.Provider value={{
            providerConnected, connectWallet,currentUser, addVoter, startVote, doVote, endVote
        }}>{children}</AppConfig.Provider>
    )
}
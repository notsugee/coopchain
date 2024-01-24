import React, {useContext} from 'react'
import { AppConfig } from './context/AppConfig'

function Home() {
    const {connectWallet, currentUser} = useContext(AppConfig)
  return (
    <div>
        <p>{currentUser}</p>
        <button onClick={connectWallet}>Connect wallet</button>
    </div>
  )
}

export default Home
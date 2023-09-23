import React, { useState } from 'react';
import styles from './ConnectWalletButton.css';
const ConnectWalletButton = ({ onPressLogout, onPressConnect, loading }) => {
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    onPressConnect();
    setConnected(true);
  };

  const handleLogout = () => {
    onPressLogout();
    setConnected(false);
  };

  return (
    <div>
      {connected && !loading ? (
        <button onClick={handleLogout} className={styles['connect-wallet']}>
          Disconnect
        </button>
      ) : loading ? (
        <button
          className={`${styles['connect-wallet']} ${styles['connect-button-loading']}`}
          disabled
        >
          <div>Loading...</div>
        </button>
      ) : (
        <button onClick={handleConnect} className={styles['connect-wallet']}>
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default ConnectWalletButton;

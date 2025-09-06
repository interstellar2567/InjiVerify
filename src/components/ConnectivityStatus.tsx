import React, { useState, useEffect } from 'react';
import { connectivityService, ConnectivityState } from '../services/connectivityService';

const ConnectivityStatus: React.FC = () => {
  const [connectivity, setConnectivity] = useState<ConnectivityState>(
    connectivityService.getCurrentState()
  );

  useEffect(() => {
    const unsubscribe = connectivityService.subscribe((state) => {
      setConnectivity(state);
    });

    return unsubscribe;
  }, []);

  const getStatusColor = () => {
    return connectivity.isOnline ? '#10b981' : '#ef4444'; // green for online, red for offline
  };

  const getStatusIcon = () => {
    return connectivity.isOnline ? '🟢' : '🔴';
  };

  const getStatusText = () => {
    return connectivity.isOnline ? 'Online' : 'Offline';
  };

  return (
    <div
      className="connectivity-status"
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        border: `2px solid ${getStatusColor()}`,
        borderRadius: '8px',
        padding: '8px 12px',
        fontSize: '14px',
        fontWeight: 'bold',
        color: getStatusColor(),
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      <span>{getStatusIcon()}</span>
      <span>{getStatusText()}</span>
    </div>
  );
};

export default ConnectivityStatus;

import React from 'react'
import { useEffect, useState } from 'react';
import { Container, Header, Content, Button, Navbar, Panel, Stack,Footer,Modal,ButtonToolbar} from 'rsuite';
import RemindIcon from '@rsuite/icons/legacy/Remind';
import 'rsuite/dist/rsuite.min.css'; // Import rsuite CSS
import 'rsuite/dist/rsuite.min.css'; // Import rsuite CSS


const Metamask = () => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
      setIsMetaMaskInstalled(true);
    } else {
      // Redirect to MetaMask download if not installed
      window.location.href = 'https://metamask.io/download.html';
    }
  }, []);

  const connectMetaMask = async () => {
    try {
      // Request account access if MetaMask is installed
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      // Redirect to next page after login
      window.location.href = '/dashboard';
    } catch (error) {
      console.error("User rejected the connection request");
    }
  };

  const [open, setOpen] = React.useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const proceedToDashboard = () => {
    window.location.href = '/dashboard'; // Navigate to the dashboard
    handleClose(); // Close the modal
  };

  return (
    <Container 
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5', // Light background color
        padding: '20px',
      }}
    >
      <Header>
        <h1 style={{ color: '#4CAF50' }}>Welcome to MetaMask Login</h1>
      </Header>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {isMetaMaskInstalled ? (
          <div>
            {account ? (
              <div>
                <Button 
                  appearance="primary" 
                  size="lg" // Large size button
                  onClick={handleOpen} // Open modal on button click
                  style={{ marginTop: '10px' }}
                >
                  Proceed to Dashboard
                </Button>
                {/* Modal for confirming navigation */}
                <Modal backdrop="static" role="alertdialog" open={open} onClose={handleClose} size="xs">
                  <Modal.Body>
                    <RemindIcon style={{ color: '#ffb300', fontSize: 24 }} />
                    You are about to proceed to the dashboard. Are you sure you want to continue?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={proceedToDashboard} appearance="primary">
                      Yes
                    </Button>
                    <Button onClick={handleClose} appearance="subtle">
                      Cancel
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            ) : (
              <Button 
                appearance="default" 
                size="lg" // Large size button
                onClick={connectMetaMask}
                style={{ marginTop: '10px' ,backgroundColor: '#4CAF50', color: 'white'}}
              >
                Connect with MetaMask
              </Button>
            )}
          </div>
        ) : (
          <Modal backdrop="static" role="alertdialog" open onClose={handleClose} size="xs">
            <Modal.Body>
              <RemindIcon style={{ color: '#ffb300', fontSize: 24 }} />
              Redirecting to install MetaMask...
            </Modal.Body>
          </Modal>
        )}
      </div>
      <footer style={{ marginTop: 'auto', textAlign: 'center', padding: '10px', backgroundColor: '#4CAF50', color: 'white' }}>
        <p>© {new Date().getFullYear()} Your Company. All Rights Reserved.</p>
      </footer>
    </Container>
  );
};

export default Metamask;
import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import { useRouter } from 'next/router';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 8,
};

const LoginComponent = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const router = useRouter();
let USER_ID
  const fetchProjectNames = async () => {
    let userDetails = localStorage.getItem('userDetails');
    userDetails = JSON.parse(userDetails);
    if(userDetails){
       USER_ID = userDetails.data._id;
    }
    try {
      const response = await fetch(`http://localhost:8000/api/users/${USER_ID}/projects`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch projects');
      }
      console.log('Fetched projects:', data);
      if(data.projects.length > 0){
          router.push({
            pathname: '/pages/project/list-project',
             // Pass projectId as a query parameter
          });
      }
     
    } catch (error) {
      console.error('Error fetching project names:', error);
    }
  };

  useEffect(() => {
    fetchProjectNames();
  }, []);
  const changeValue = async (event) => {
    const userId = event.target.value;
    console.log(userId, 'eventttttt');
    setSelectedUser(userId);

    // Make API call using the selected user ID
    try {
      const response = await fetch(`http://localhost:8000/api/users/getData/${userId}`);
      const data = await response.json();
      console.log('API response:', data);
      localStorage.setItem('userDetails', JSON.stringify(data));
      if (response.ok) {
        fetchProjectNames()
        if (response.status === 500) {
        console.error('Internal Server Error (500):', data.message || 'Failed to fetch projects');
      localStorage.clear() 
      } else {
          throw new Error(data.message || 'Failed to fetch projects');
        }
    } }catch (error) {
      console.error('Error fetching data:', error);
    }

    // Close the modal after the API call
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    // You can perform additional actions here if needed
    setIsModalOpen(false);
  };

  return (
    <Modal
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      open={isModalOpen}
      onClose={handleCloseModal} // Close the modal when onClose is triggered
      aria-labelledby="server-modal-title"
      aria-describedby="server-modal-description"
    >
      <Box sx={style}>
        <DatePickerWrapper>
          <label style={{ fontSize: '30px', display: 'block', color: '#000', fontWeight: '600', marginBottom: '10px' }}>
            Select User
          </label>
          <select
            style={{ width: '40%', height: '65px', padding: '13px', fontSize: '18px', borderRadius: '5px' }}
            onChange={changeValue}
          >
            <option>Select</option>
            <option value="65830fe400749ae097126ad0">User-1</option>
            <option value="657dd8884f16d776ea0069a1">User-2</option>
          </select>
        </DatePickerWrapper>
      </Box>
    </Modal>
  );
};

export default LoginComponent;

import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ModalComponent from './modal';
import LoginComponent from './login';
import { useRouter } from 'next/router';

const ProjectPage = () => {
const router = useRouter()
  const [open, setOpen] = useState(false);
let USER_ID
  const handleClose = () => {
    setOpen(false);
  };
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
  const createProject = async () => {

    setOpen(true);
    try {
      // const userId = ;
      const response = await fetch(`http://localhost:8000/api/users/getData/${userId}`);
      const data = await response.json();
      console.log('API response:', data);
      localStorage.setItem('userDetails', JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error
    }
  };
  

  return (
    <div className='flex-layout'>
      <h1>Create a new project</h1>
      <img src='/images/project/project.png' alt='Project' />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in
      </p>
      <Button
        size='medium'
        variant='contained'
        sx={{ marginBottom: 7 }}
        onClick={createProject} // Corrected function name
      >
        Create New Project
      </Button>
      <ModalComponent open={open} onClose={handleClose} />
      <LoginComponent />
    </div>
  );
};

export default ProjectPage;

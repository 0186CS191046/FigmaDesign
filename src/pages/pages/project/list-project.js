import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ModalComponent from './modal';
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import { useRouter } from 'next/router';

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  [theme.breakpoints.up('md')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))
// ... (other imports)

const ProjectPage = () => {
  const [open, setOpen] = useState(false);
  const [projectNames, setProjectNames] = useState([]);
  const [userId, setUserId] = useState(null); // Initialize userId as null
  const router = useRouter();
  const handleClose = () => {
    setOpen(false);
  };

  const createProject = async () => {
    setOpen(true);
  };

  useEffect(() => {
    // Fetch userId from localStorage
    let userDetails = localStorage.getItem('userDetails');
    userDetails = JSON.parse(userDetails);
    if (userDetails) {
      setUserId(userDetails.data._id);
    }
  }, []); // Empty dependency array means this effect runs once after the initial render

  useEffect(() => {
    if (userId) {
      // Fetch projects only if userId is available
      fetchProjectNames();
    }
  }, [userId]); // Trigger the effect whenever userId changes

  const fetchProjectNames = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/${userId}/projects`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch projects');
      }

      const projects = data.projects; // Assuming data.data is an array of projects
      console.log('Fetched projects:', projects);
      setProjectNames(projects);
    } catch (error) {
      console.error('Error fetching project names:', error);
    }
  };

  const routeToPage = (projectId) => {
    console.log(projectId, 'projectId');
    router.push({
      pathname: '/pages/project/project-details',
      query: { projectId }, // Pass projectId as a query parameter
    });
  };

  return (
    <div className='flex-layout text-left'>
      <div className='flex'>
        <h1>Projects</h1>
        <Button
          size='medium'
          variant='contained'
          sx={{ marginBottom: 7 }}
          onClick={createProject}
        >
          Create New Project
        </Button>
      </div>

      {projectNames?.map((project, index) => (
          <div className='media-object' key={index}  onClick={() => routeToPage(project._id)}>
            <div className='left'>
              <label>{project.name[0]} {project.name[1]}</label>
            </div>
            <div className='right'>
              <h5>{project.name}</h5>
              <small className='d-block'>4 Episodes</small>
              <em>Last edited a week ago</em>
          </div>
        </div>
      ))}
      <ModalComponent open={open} onClose={handleClose} />
    </div>
  );
};

export default ProjectPage;



import React, { useState, useEffect } from 'react';
import UploadComponent from './upload-modal';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles'

import Grid from '@mui/material/Grid'

// ** Icons Imports


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
const ProjectDetail = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

    const projectId = router.query.projectId;
  console.log(projectId, 'keyyyyyyyyyyyyyyyy');
  const handleClose = () => {
    setOpen(false);
  };
  
  const createProject = async () => {
    setOpen(true);
  };

  
  return (
    <div className='flex-layout text-left'>
      <div className='flex'>
      <h1>Upload</h1> 
     
      </div>
    
<div className='card'>
  <div className='media-object' onClick={createProject}>
    <div className='left mani'>
       <img src='/images/youtube.png' />
    </div>
    <div className='right'>
     <h5 className='text-upload'>Upload Youtube Video</h5>
    </div>
  </div>
  <div className='media-object'>
  <div className='left mani'>
       <img src='/images/spotify.png' />
    </div>
    <div className='right'>
    <h5 className='text-upload'>Upload 
Spotify Podcast</h5>
    </div>
  </div>
  <div className='media-object' >
  <div className='left mani'>
       <img src='/images/rss.png' />
    </div>
    <div className='right'>
    <h5 className='text-upload'>Upload from
RSS Feed</h5>
    </div>
  </div>

</div>
    <UploadComponent open={open} onClose={handleClose} projectId={projectId}  />
  </div>
  )
};

export default ProjectDetail;
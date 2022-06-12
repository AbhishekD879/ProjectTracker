import React from 'react'
import { Grid, Typography} from '@mui/material'
import ProjectCard from './ProjectCard'
import { Container } from '@mui/system'
import { projects } from '../data'

const CardContainer = () => {
//   const arr=[true,true,true,true,true,true,true,true,true]
  return (
    <>
    <Typography marginTop="1rem" textAlign="center" variant='h2' >
        Ongoing Projects
    </Typography>
     <Container sx={{margin:" 20px auto"}}>
     <Grid container={true} spacing={3} alignItems="center" justifyContent="center" >
       {projects.map((proj)=>
        (
            <Grid key={proj.id} item>
             <ProjectCard obj={proj} />
            </Grid>
        )
       )}
    </Grid>
   </Container>
    </>
  )
}

export default CardContainer
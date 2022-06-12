import React, { useState } from 'react'
import { Grid, Typography} from '@mui/material'
import ProjectCard from '../Utils/CardContainer/ProjectCard'
import { Container } from '@mui/system'
import { projects } from '../Utils/data'
import { useEffect } from 'react'
export const Followed = () => {
  const [items,setItems]=useState([])
  useEffect(()=>{
    const followedProject=JSON.parse(localStorage.getItem("follow"));
    if(followedProject){
      const  filtered=projects.filter((el)=>followedProject.includes(el.id))
      if(filtered.length!==0){
        setItems(filtered)
      }
    }
  },[])
  const unfollow=(id)=>{
    console.log(id)
    const followedProject=JSON.parse(localStorage.getItem("follow"));
    let index=followedProject.indexOf(`${id}`);
    if(index){
      [followedProject[index],followedProject[followedProject.length-1]]=[followedProject[followedProject.length-1],followedProject[index]];
      followedProject.pop()
      localStorage.setItem("follow",JSON.stringify(followedProject))
      const  filtered=projects.filter((el)=>followedProject.includes(el.id))
      setItems(filtered)
    }
  }
  return (
    <>
    <Typography marginTop="1rem" textAlign="center" variant='h4' >
        {items.length===0?"No followed Projects":"Followed Projects"}
    </Typography>
     <Container sx={{margin:" 20px auto"}}>
     <Grid container={true} spacing={3} alignItems="center" justifyContent="center" >
       {items.length!==0?items.map((proj)=>
        (
            <Grid key={proj.id} item>
             <ProjectCard unfollow={unfollow} hidden={true} obj={proj} />
            </Grid>
        )
       ):null}
    </Grid>
   </Container>
    </>
  )
}

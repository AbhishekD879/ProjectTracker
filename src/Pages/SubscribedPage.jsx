import React,{useState,useEffect} from 'react'
import { Grid, Typography} from '@mui/material'
import ProjectCard from '../Utils/CardContainer/ProjectCard'
import { Container } from '@mui/system'
import { projects } from '../Utils/data'
export const SubscribedPage = () => {
    const [items,setItems]=useState([])
    useEffect(()=>{
      const subProjects=JSON.parse(localStorage.getItem("sub"));
      if(subProjects){
        const  filtered=projects.filter((el)=>subProjects.includes(el.id))
        if(filtered.length!==0){
        setItems(filtered)
        }
      }
     
    },[])
    const unsubscribd=(id)=>{
      console.log(id)
      const subProjects=JSON.parse(localStorage.getItem("sub"));
      let index=subProjects.indexOf(`${id}`);
      if(index){
        [subProjects[index],subProjects[subProjects.length-1]]=[subProjects[subProjects.length-1],subProjects[index]];
      subProjects.pop()
      localStorage.setItem("sub",JSON.stringify(subProjects))
      const  filtered=projects.filter((el)=>subProjects.includes(el.id))
      setItems(filtered)
      }
    }
  return (
    <>
    <Typography marginTop="1rem" textAlign="center" variant='h4' >
        {items.length===0?"No Subscribed Projects":"Subscribed Projects"}
       
    </Typography>
     <Container sx={{margin:" 20px auto"}}>
     <Grid container={true} spacing={3} alignItems="center" justifyContent="center" >
       {items.length!==0?items.map((proj)=>
        (
            <Grid key={proj.id} item>
             <ProjectCard unsubscribe={unsubscribd} hidden={true} obj={proj} />
            </Grid>
        )
       ):null}
    </Grid>
   </Container>
    </>
  )
}

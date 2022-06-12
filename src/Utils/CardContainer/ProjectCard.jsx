import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { List, ListItemText } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
const ProjectCard = ({obj,hidden,unsubscribe,unfollow}) => {
  const location=useLocation()
  const [action,setAction]=useState("")
  const [open, setOpen] = React.useState(false);
  const subscribe=()=>{
    setAction("Subscribe")
    setOpen(true)
   

  }  
  const follow =()=>{
    setAction("Follow") 
    setOpen(true)
   
  }
  const handleClose = () => {
    setOpen(false);
  };
  const dispatchFun=()=>{
   if(action.toLowerCase()==="Subscribe".toLowerCase()){
    if(localStorage.getItem("sub")){
        let previous=localStorage.getItem("sub")
        previous=[...JSON.parse(previous)]
        if(!previous.includes(obj.id)){
            previous.push(obj.id)
        }
        localStorage.setItem("sub",JSON.stringify(previous))
    }else{
        localStorage.setItem("sub",JSON.stringify([obj.id]))
    }
   }else if(action.toLowerCase()==="Follow".toLowerCase()) {
    if(localStorage.getItem("follow")){
        let previous=localStorage.getItem("follow")
        previous=[...JSON.parse(previous)]
        if(!previous.includes(obj.id)){
            previous.push(obj.id)
        }
        localStorage.setItem("follow",JSON.stringify(previous))
    }else{
        localStorage.setItem("follow",JSON.stringify([obj.id]))
    }
   }
  }
  return (
    <>
        <Card sx={{ maxWidth: 345,minWidth:345,}}>
      <CardMedia
        component="img"
        height="140"
        image={obj?.img}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {obj?.name}
        </Typography>
        
            <List sx={{height:"11em",overflowY:"scroll"}}>
            {obj?.des.map((itm,ind)=>(
                <ListItemText key={ind}>
                    {"> "+itm}
                </ListItemText>  
            ))}
                
            </List>
      </CardContent>
     {!hidden?( <CardActions>
        <Button onClick={follow} size="small">Follow</Button>
        <Button onClick={subscribe} size="small">
            Subscribe<SubscriptionsIcon color='primary'/>
        </Button>
      </CardActions>):location.pathname==="/followed"?(
        <CardActions>
            <Button onClick={_=>{
                unfollow(obj.id)
            }} size='small'>
               Unfollow
            </Button>
        </CardActions>
      ):(<CardActions>
            <Button onClick={_=>{
                unsubscribe(obj.id)
            }} size='small'>
              Unsuscribe
            </Button>
        </CardActions>)}
    </Card>
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`${action} Project named ${obj?.name}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`${action} this project`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{
            handleClose()
          }}>{`Don't ${action}`}</Button>
          <Button onClick={()=>{
            handleClose()
            dispatchFun()
          }} autoFocus>
          {`${action}`}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </>
  )
}

export default ProjectCard
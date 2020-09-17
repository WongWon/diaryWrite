import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import  './diaryEntryCard.css';

import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseIcon from '@material-ui/icons/Pause';

import { makeStyles } from '@material-ui/core/styles';

import { useSpeechSynthesis, cancel } from 'react-speech-kit';


const useStyles = makeStyles({
    diaryCard: {
      maxWidth: 1200,
    },
    binButton: {
        color: 'red'
    }

  });

function DiaryEntryCard ({diaryEntry}) {

    const { speak,cancel } = useSpeechSynthesis();

    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [state, setState] = useState({diaryEntry})
    const [title, setTitle] = useState(diaryEntry.title)
    const [entry, setEntry] = useState(diaryEntry.entry)

    console.log(title)

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const formSubmit = () => {
        const titleElement = document.getElementById("title") as HTMLInputElement;
        const entryElement = document.getElementById("entry") as HTMLInputElement;

        const body = {
            id: diaryEntry.id,
            title: titleElement.value,
            entry: entryElement.value
        }
        console.log(body)
       
        fetch(`https://dwondiaryAPI.azurewebsites.net/api/Diaries/${diaryEntry.id}`,{
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json'
    
        },
        method:'PUT',
        body:JSON.stringify(body),
        }).then(res => console.log(res))
        setOpen(false);
    }

    const deleteEntry = () => {
        fetch(`https://dwondiaryAPI.azurewebsites.net/api/Diaries/${diaryEntry.id}`,{
            method:'DELETE'
        })


    }
    return(
        <div>
            <Card className={classes.diaryCard} id="diaryCard">
                <CardContent>
                    <h1 id="displayedTitle">{title}</h1>
                    <p id="displayedEntry">{entry}</p>
   
                </CardContent>

                <CardActions>
                    <ButtonGroup>
                        <IconButton onClick = {handleOpen} color="primary">
                            <CreateIcon/>
                        </IconButton>
                        <IconButton onClick = {deleteEntry} className={classes.binButton}>
                            <DeleteIcon/>
                        </IconButton>
                        <IconButton onClick ={() => speak({ text:entry})}>
                            <PlayCircleOutlineIcon/>
                        </IconButton>

                        <IconButton onClick ={cancel}>
                            <PauseIcon/>
                        </IconButton>
    
                    </ButtonGroup>
                </CardActions>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Edit Diary Entry</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Write in the fields below to edit the diary entry
                        </DialogContentText>

                        <TextField 
                        defaultValue={diaryEntry.title}
                        onChange={e =>setTitle(e.target.value)}

                        id="title"
                        margin="dense"
                        label="Title"
                        type="text"
                        inputProps={{
                            maxLength: 50,
                          }}
                        fullWidth
                    
                        />

                        <TextField 
                        defaultValue={diaryEntry.entry}
                        onChange={e =>setEntry( e.target.value)}

                        id="entry"
                        margin="dense"
                        label="Entry"
                        type="text"
                        multiline
                        fullWidth

                        inputProps={{
                            maxLength: 255,
                          }}
        
                        
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={formSubmit}>
                            Submit Edit
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>
        </div>
    )
}

export default DiaryEntryCard;
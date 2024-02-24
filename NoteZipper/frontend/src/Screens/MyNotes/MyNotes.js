import React, { useEffect, useState } from "react";
import MainScreen from "../../Components/MainScreen";
import { Accordion, Badge, Button, Card } from "react-bootstrap";

import axios from "axios";


function MyNotes() {


    const [notes,setNotes] = useState([])


  const deleteHandler = () => {
    if (window.confirm("Are You Sure?..")) {
    }
  };


const fetchNotes = async()=>{

    const {data} = await axios.get('/api/notes');
     setNotes(data)

} 

console.log(notes);


  useEffect(()=>{

   fetchNotes();

  },[])





  return (
    <MainScreen title={`Welcome Back Nimesh Hansaka..`}>
     
     <Button variant="primary" >
                   Create A New Note
      </Button>

     
     
      
        {notes.map((note, index) => (
            <Accordion key={note._id}>

          <Accordion.Item eventKey="0">
            <Card className="my-2">
              <Accordion.Header>
                <Card.Header>{note.title}</Card.Header>
              </Accordion.Header>
              <Accordion.Body>
                <Card.Body>
                  <Badge variant="success" > Category - {note.category}</Badge>
                  <Card.Text>{note.content}</Card.Text>
                  <Button variant="primary" href={`/note/${note._id}`}>
                    Edit
                  </Button>
                  <Button variant="danger" className="mx-2" onClick={()=> deleteHandler(note._id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Accordion.Body>
            </Card>
          </Accordion.Item>
          </Accordion>
        ))}
     
    </MainScreen>
  );
}

export default MyNotes;

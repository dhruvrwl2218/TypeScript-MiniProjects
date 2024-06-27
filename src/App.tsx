import "./index.css"
import { useLocalStorage } from './Hook/useLocalStorage'
import {v4 as uuidV4} from "uuid"
import { useMemo } from 'react'
import { Navigate, Route,Routes } from "react-router-dom"
import  {NoteList} from "./Pages/NoteList"
import NewNote from "./Pages/NewNote"
import Note from "./Pages/Note"
import Edit from "./Pages/Edit"
import {NoteLayout} from "./Components/NoteLayout"
import PostCommentData from "./Pages/PostCommentData"

export type NoteData = {
  title : string
  markdown : string 
  tags : Tag[]
}

export type Tag = {
id : string
label : string
} 

export type Note = {
  id : string
} & NoteData

export type rawNotes = {
  id : string
} & rawNoteData

export type rawNoteData = {
  title : string
  markdown : string 
  tagIds : string[]
}

function App() {

  const[notes,setNotes] = useLocalStorage<rawNotes[]>("Notes", [])
  const[tags,setTags] = useLocalStorage<Tag[]>("Tags", [])

  
  const noteswithTags = useMemo(() =>{
    return notes.map(note => {
        return {...note,tags : tags.filter(tag => note.tagIds.includes(tag.id))}
    })
},[notes,tags])

const onCreateNote = ({tags , ...data} : NoteData)=>{
  console.log("create fun"  + tags)
    setNotes(prevNotes => {
      return [...prevNotes,{...data, id : uuidV4(),tagIds : tags.map(tag => tag.id)},
        
      ]
    })
}
function updateTag (id : string , label : string){
    setTags(prevTags => {
      return prevTags.map(tag => {
        if(tag.id === id){
          return { ...tag , label}
        }else {
          return tag
        }
      })
    })
}

const deleteTag = (id : string)=>{
  setTags(prevTags => {
    return prevTags.filter(tag => tag.id !== id)
  })
}

const addTag = (tag : Tag)=>{
  setTags(prev => [...prev, tag])
}

const onDeleteNote = (id : string) => {
  setNotes(prevNotes =>{
    return prevNotes.filter(note=> note.id !== id)
  })
}

const onUpdateNote = (id : string ,{tags, ...data} : NoteData) =>{
  setNotes(prevNotes => {
    return prevNotes.map(note => {
      if(note.id === id){
        return{...note, ...data, tagIds : tags.map(tag => tag.id)}
      }else{
        return note
      }
    })
  })
}

  return ( 
    <>
      <Routes>
        <Route path="/"
         element = {<NoteList
                    notes = {noteswithTags}
                    availableTags = {tags}
                    onUpdateTag = {updateTag}
                    onDeleteTag = {deleteTag}
                     />}
                  />
        <Route path="/new" 
               element = {<NewNote
                onSubmit = {onCreateNote}
                onAddTag = {addTag} 
                availableTags = {tags}/>} 
               />
        <Route path = "/:id" element = {<NoteLayout notes = {noteswithTags}/>}>
          <Route index element = {<Note onDelete = {onDeleteNote}/>}/>
          <Route path = "edit"
                 element = {<Edit
                  onSubmit = {onUpdateNote}
                  onAddTag = {addTag} 
                  availableTags = {tags}/>}
                  />
        </Route>
         <Route path="/cmt" element = {<PostCommentData/>}/>// this one is for the mini comment section..
        <Route path = "*" element = {<Navigate to = "/"/>}/>
      </Routes>
    </>
  )
}

export default App

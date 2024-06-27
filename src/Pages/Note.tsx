import { useNavigate,Link } from "react-router-dom"
import { useNote } from "../Components/NoteLayout"
import ReactMarkdown from "react-markdown"

type NoteProps ={
  onDelete : (id : string) => void
}

const Note = ({onDelete}: NoteProps) => {
  const note = useNote()
  const navigate =useNavigate()

  return (
   <div className="flex flex-wrap lg:mx-80 ">
    <div  className=" flex flex-wrap w-full justify-between p-4">
       <div className="flex flex-col">
        <h1 className="text-2xl font-bold mb-3 ">{note.title}</h1>
        {note.tags.length > 0 && (
          <div className="flex gap-1">
            {note.tags.map(tag =>(
              <div className="text-md rounded-md p-1 bg-blue-500 shadow-sm shadow-gray-100">
                {tag.label}
              </div>
            ))}
          </div>
        )}
       </div>
       <div className="flex gap-2 ">
          <Link to = {`/${note.id}/edit`}>
            <p className="bg-blue-500 p-1 px-2 rounded-md border border-blue-500 shadow-sm shadow-gray-100">
              Edit
            </p>
          </Link>
          <button
          onClick={()=>{
            onDelete(note.id)
            navigate('/')
          }}
          className=" border border-gray-100 p-1 px-2 rounded-md h-9"
          >Delete
          </button>
          <Link to = "/">
            <p className="border border-gray-100 p-1 px-2 rounded-md">Back</p>   
          </Link>
        </div>
    </div>
    <div className="p-5"><ReactMarkdown>{note.markdown}</ReactMarkdown></div></div>
  )
}

export default Note
// tags are not been shown for the note in this component
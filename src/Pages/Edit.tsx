import { NoteData,Tag } from "../App"
import NoteForm from "../Components/NoteForm"
import { useNote } from "../Components/NoteLayout"

type EditNoteProps ={
  onSubmit : (id : string ,data : NoteData) => void
  onAddTag : (tag : Tag) => void
  availableTags : Tag[]
}
const Edit = ({
  onSubmit,
  onAddTag,
  availableTags
}: EditNoteProps) => {

  const note = useNote()
  console.log()
  return (
    <div className="lg:mx-80">
      <h1 className="text-3xl mt-4 font-bold m-1 ">Edit Note</h1>
      <NoteForm
      title={note.title}
      markdown={note.markdown}
      tags={note.tags}
      onSubmit={data => onSubmit(note.id , data)}
      onAddTag={onAddTag}
      availableTags={availableTags}
      ></NoteForm>
    </div>
  )
}

export default Edit

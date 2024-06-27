import { NoteData, Tag } from "../App";
import NoteForm from "../Components/NoteForm";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const NewNote = ({ onSubmit, onAddTag, availableTags }: NewNoteProps) => {
  return (
    <div className="lg:mx-80 ">
      <h1 className="text-3xl mt-4 font-bold m-1 ">Create New Note</h1>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </div>
  );
};

export default NewNote;

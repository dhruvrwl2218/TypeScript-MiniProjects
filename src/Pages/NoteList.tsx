import { useMemo, useState } from "react";
import { Tag } from "../App";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";

type NoteListProps = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
  onDeleteTag: (id: string) => void;
  onUpdateTag: (id: string, label: string) => void;
};

type SimplifiedNote = {
  tags: Tag[];
  title: string;
  id: string;
};

type EditTagModalProps = {
  show: boolean;
  availableTags: Tag[];
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
  handleClose: () => void;
};

export const NoteList = ({
  availableTags,
  notes,
  onUpdateTag,
  onDeleteTag,
}: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, notes, selectedTags]);
console.log(selectedTags)
console.log(filteredNotes)
  return (
    <div className="flex flex-wrap  mt-10 justify-center bg-blue-600 m-5 shadow-md shadow-gray-300 lg:mx-80 ">
      <div className="flex justify-center flex-wrap  justify-between w-full text-xl px-5 mt-12">
        <div>
          <h1 className="text-4xl font-bold ">Notes</h1>
        </div>
        <div className="flex gap-2">
          <Link to="/new">
            <button className="bg-blue-600 p-2 rounded-md m-1 shadow-md shadow-gray-300">
              Create
            </button>
          </Link>
          <button
            onClick={() => setEditTagsModalIsOpen(true)}
            className="bg-blue-600 p-2 rounded-md m-1 shadow-md shadow-gray-300"
          >
            Edit Tags
          </button>
        </div>
      </div>
      <div className=" flex  w-full px-5 justify-between text-2xl gap-5 ">
        <div className=" flex flex-col w-full gap-2">
          <label htmlFor="title">Title </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 rounded-md bg-white shadow-md shadow-gray-300 text-gray-400"
          />
        </div>
        <div className="w-full">
          <label htmlFor="Tags">
            Tags
            <ReactSelect
              value={selectedTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              options={availableTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              onChange={(tags) => {
                setSelectedTags(
                  tags.map((tag) => {
                    return { label: tag.label, id: tag.value };
                  })
                );
              }}
              isMulti
              
              className="p-2 rounded-md shadow-md shadow-gray-300 w-96 text-gray-500 text-nowrap "
            />
          </label>
        </div>
      </div>

      <div className=" w-full flex flex-wrap justify-around mt-10 p-5 ">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="w-56  my-4 rounded-lg h-44 flex shadow-md shadow-gray-300"
          >
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </div>
        ))}
      </div>
     { editTagsModalIsOpen &&  <EditTagModal
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
        show={editTagsModalIsOpen}
        handleClose={() => setEditTagsModalIsOpen(false)}
        availableTags={availableTags}
      />}
    </div>
  );
};

function NoteCard({ id, title, tags }: SimplifiedNote) {
  return (
    <Link to={`/${id}`}>
      <div className="w-full p-1 ">
        <div className="flex flex-wrap justify-center text-center">
          <span className="text-xl w-full">{title}</span>
          {tags.length > 0 && (
            <div className="flex">
              {tags.map((tag) => (
                <div key={tag.id} className="bg-blue-500 rounded-md shadow-sm shadow-gray-100 m-1 p-1 text-center">{tag.label}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

function EditTagModal({
  availableTags,
  handleClose,
  onDeleteTag,
  onUpdateTag,
}: EditTagModalProps) {

  return (
  
  <div className="absolute rounded-lg bg-white w-3/4 top-32 shadow-md shadow-gray-100">
      <div className="w-full flex justify-between p-4 shadow-lg">
        <h1 className="text-gray-700 font-semibold text-2xl ml-5">Edit Tags</h1>
        <button className="mr-3"><img src="/2.png" alt="close" 
        onClick={handleClose}/></button>  
      </div>
      <div className="b mt-8 p-4 flex flex-wrap">
        {availableTags.map((tag) => (
          <div key={tag.id} className="w-full flex justify-between m-2 shadow shadow-gray-600 ">
                 <input type="text" value = {tag.label} onChange = {e => onUpdateTag(tag.id, e.target.value)} className="bg-white p-1 rounded-md text-lg text-gray-500 "/>
          <div className="p-1 mt-1">
              <button onClick={() => onDeleteTag(tag.id)}><img src="/remove.png" />
              </button>
          </div>
          </div>
        ))}
      </div>
    </div>
    
  );
}

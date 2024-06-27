import CreatableReactSelect from "react-select/creatable";
import { FormEvent, useRef, useState } from "react";
import { Link ,useNavigate } from "react-router-dom";
import { NoteData ,Tag} from "../App";
import { v4 as uuidV4 } from "uuid"

//while editing the body there is no tags or body data is avilable pre data are not there to edit..
type NoteFormProps = {
  onSubmit: (data: NoteData) => void
  onAddTag : (tag : Tag) => void
  availableTags : Tag[]
} & Partial<NoteData>

const NoteForm = ({ onSubmit,
                    onAddTag,
                    availableTags,
                    title = "",
                    markdown = "",
                    tags = [],

}: NoteFormProps) => {
  const titleref = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate()


  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      title: titleref.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });
    navigate("..")
  }
  console.log(tags)
  return (
    <div className="bg-blue-600  mt-8 p-5 shadow-md shadow-gray-100 lg:p-24">
      <form action="" onSubmit={handleSubmit}>
       <div className="flex  justify-between gap-12">
      <div className="flex flex-col w-full text-xl">
      <label htmlFor="title">
          Title
       </label>
          <input
            type="text"
            id="title"
            placeholder="Note Title"
            ref={titleref}
            required
            defaultValue={title}
            className="text-lg p-2 rounded-md bg-white shadow-md shadow-gray-400 text-gray-400"
          /> 
      </div>
       <div className="w-full text-xl text-gray-400">
       <label htmlFor="tags">
          Tags
          <CreatableReactSelect
            onCreateOption={label => {
            const newTag = {id : uuidV4(), label}
            onAddTag(newTag)
            setSelectedTags(prev => [...prev, newTag])
          }}
            value={selectedTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            options = {availableTags.map(tag =>{
              return {
                label : tag.label , value : tag.id
              }
            })}
            onChange={(tags) => {
              setSelectedTags(
                tags.map((tag) => {
                  return { label: tag.label, id: tag.value };
                })
              );
            }}
            isMulti
            className="text-lg rounded-lg shadow-md shadow-gray-100 bg-white text-gray-500"
          />
        </label>
       </div>
       </div>

        <div className="mt-8 text-xl" >
          <label htmlFor="Body">
            Body
          </label>
            <textarea
              name="body"
              id="body"
              rows={15}
              className="w-full rounded-lg bg-white shadow-md shadow-gray-100 text-gray-500"
              ref={markdownRef}
              required   
              defaultValue={markdown}        
             />
        </div>
        <div className="flex justify-around mt-4">
          <input type="submit" className="bg-blue rounded-lg shadow-md shadow-gray-100 p-2" />
          <Link to="..">
            <button className="bg-blue rounded-lg shadow-md shadow-gray-100 p-2 px-4">Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;

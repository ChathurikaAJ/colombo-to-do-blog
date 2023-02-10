import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

const AddImage = (props) => {
  const {name, label = name} = props
  const {register, unregister, setValue, watch} = useFormContext()
  const files = watch (name)

  const onDrop = useCallback(
    (droppedFiles) => {
      setValue(name, droppedFiles, {shouldValidate: true})
    }, 
    [setValue, name]
  )

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1, 
    accept: {
     'image/*': ['.jpeg', '.jpg', '.png'],
    }, onDrop
  });

  useEffect(()=>{
    register(name)
    return()=> {
      unregister(name)
    }
  }, [register, unregister, name])

  return (
    <div {...getRootProps()}>
      <input id={name} {...getInputProps()} />
       <p className="bg-gray-400  text-white pl-1.5 w-20 cursor-pointer mt-3">Add File</p>
       {!!files?.length &&  files.map((file)=> (
        <div key={file.name}>
          <p>{file.name}</p>
        </div>
        
       ))}
    </div>
  );
};

export default AddImage;

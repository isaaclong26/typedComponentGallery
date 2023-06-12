import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Table,  Row } from 'react-bootstrap';
import styled from 'styled-components';
import { useEloise, AppIcon, View, Button } from '../../';
import { mdiFileUploadOutline } from '@mdi/js';

const StyledTable = styled(Table)`
  // Your styles here
  border: 2px solid grey;
  border-radius: 5px !important;
  min-height: 40vh;

`;
const DropZone = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  text-align:center;
  width: 100%;
  overflow: hidden;
`;
interface File {
  name: string;
  fullPath: string;
}

interface Action {
  text: string;
  action: (file: File) => void;
}

interface FileTableProps {
  folderPath: string;
  actions: Action[];
  color?: "primary" | "secondary" | "accent" | "accent2";
  uploadCallBack?: Function
  noAuth?: boolean
  otherUser?: string;

}

const FileTable = ({ folderPath, actions, color, uploadCallBack, noAuth, otherUser}: FileTableProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [manual, setManual] = useState(false)

  const {logic} = useEloise()

  useEffect(() => {
    if(!noAuth){
    const fetchFiles = async () => {
      const result = await logic.fb.storageMethods.getUserStorageFolder(folderPath);
      if (result) {
        
        setFiles(result);
      }
    };
    fetchFiles();
    }
  }, [folderPath, manual]);

  const getResult = async(file:any)=>{
    if(otherUser){
      let x = await logic.fb.storage.uploadOtherUserFile(folderPath, otherUser, file)
      return x
    }
    else if(noAuth){
      let x = await logic.fb.storage.uploadFileNoAuth(folderPath, file) 
      return x
    }
    else{
      let x = await logic.fb.storage.uploadFile(folderPath, file)
      return x
    }
  }

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setDragging(true);
  };

  const onDragLeave = () => {
    setDragging(false);
  };

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      setDragging(false);

      Array.from(event.dataTransfer.files).forEach(async (file) => {
        // Upload the file to Firebase here.
        // Update your state with the new file info.
        // You may need to adjust this depending on how your Firebase upload function works.
        const result = await getResult(file)

        if (result) {
            if(uploadCallBack){
                uploadCallBack()
            }
          setFiles(prevFiles => [...prevFiles, result]);
        }
      });
    },
    [folderPath],
  );

  
  const fileInputRef = useRef<HTMLInputElement>(null); // Create a ref

  const onIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the click on the hidden file input
    }
  };

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(async (file) => {
        // Upload the file to Firebase here.
        // Update your state with the new file info.
        const result = noAuth? await logic.fb.storage.uploadFileNoAuth(folderPath, file) : await logic.fb.storage.uploadFile(folderPath, file);

        if (result) {
            if(uploadCallBack){
                uploadCallBack()
            }
                      setFiles(prevFiles => [...prevFiles, result]);
        }
      });
    }
  };

  const getFileExtension = (file: File): string => {
    const parts = file.name.split('.');
    return parts.length > 1 ? `.${parts[parts.length - 1]}` : '';
  };

  const actionHandler = async(action:any, file:any)=>{

    await action.action(file)

    setManual(!manual)
  }

  return (
    <StyledTable  onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}  striped bordered hover responsive>
          <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={onFileInputChange}
      />
      <thead>
        <tr>
          <th>File Name</th>
          {!(files.length === 0 || dragging) && (
            actions.map((action, index) => (
            <th key={index}>{action.text}</th>
          )))
             }
         
        </tr>
      </thead>
      <tbody >
       

            
        {(files.length === 0 || dragging) ? ( 
            <tr>
            <td>
          <DropZone className="mx-auto">

             <AppIcon  title="upload file" onClick={onIconClick} icon={mdiFileUploadOutline}  color="grey" size={3} />

          </DropZone>
          </td>
        </tr>
        ) : 

         ( files.map((file, fileIndex) => (
            <tr key={fileIndex}>
              <td>{file.name}</td>
              {/* <td>{getFileExtension(file)}</td> */}
              {actions.map((action, actionIndex) => (
                <td key={actionIndex}>
                  <Button  style={{padding:"2px 5px" }}color={color?? "primary"} onClick={()=>actionHandler(action, file)}>
                    {action.text}
                  </Button>
                </td>
              ))}
            </tr>
          ))
         )
        }

      </tbody>
    </StyledTable>
  );
  
}

export default FileTable;

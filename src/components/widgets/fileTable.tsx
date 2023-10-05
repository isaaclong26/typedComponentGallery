import { mdiFileUploadOutline } from "@mdi/js";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import { AppIcon, Button, useEloise } from "../../";
import { Color } from "../../functions/color";

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
  text-align: center;
  width: 100%;
  overflow: hidden;
`;
export interface File {
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
  color?: Color | number;
  uploadCallBack?: Function;
  noAuth?: boolean;
  otherUser?: string;
  setSelectedState?: React.Dispatch<React.SetStateAction<File[]>>; // new prop
}

const FileTable = ({
  folderPath,
  actions,
  color,
  uploadCallBack,
  noAuth,
  otherUser,
  setSelectedState,
}: FileTableProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [manual, setManual] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Local state for selected files

  const { logic } = useEloise();

  useEffect(() => {
    if (!noAuth) {
      const fetchFiles = async () => {
        const result = await logic.fb.storageMethods.getUserStorageFolder(
          folderPath
        );
        if (result) {
          setFiles(result);
        }
      };
      fetchFiles();
    }
  }, [folderPath, manual]);

  const getResult = async (file: any) => {
    if (otherUser) {
      let x = await logic.fb.storageMethods.uploadOtherUserFile(
        folderPath,
        otherUser,
        file
      );
      return x;
    } else if (noAuth) {
      let x = await logic.fb.storageMethods.uploadFileNoAuth(folderPath, file);
      return x;
    } else {
      let x = await logic.fb.storageMethods.uploadFile(folderPath, file);
      return x;
    }
  };

  useEffect(() => {
    // When a file is selected or unselected, use the prop to update the parent component.
    if (setSelectedState) {
      setSelectedState(selectedFiles);
    }
  }, [selectedFiles, setSelectedState]);

  const toggleFileSelected = (file: File) => {
    setSelectedFiles((prevSelectedFiles) => {
      if (prevSelectedFiles.includes(file)) {
        return prevSelectedFiles.filter((f) => f !== file);
      } else {
        return [...prevSelectedFiles, file];
      }
    });
  };
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
        const result = await getResult(file);

        if (result) {
          if (uploadCallBack) {
            uploadCallBack();
          }
          setFiles((prevFiles) => [...prevFiles, result]);
        }
      });
    },
    [folderPath]
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
        const result = noAuth
          ? await logic.fb.storageMethods.uploadFileNoAuth(folderPath, file)
          : await logic.fb.storageMethods.uploadFile(folderPath, file);

        if (result) {
          if (uploadCallBack) {
            uploadCallBack();
          }
          setFiles((prevFiles) => [...prevFiles, result]);
        }
      });
    }
  };

  const getFileExtension = (file: File): string => {
    const parts = file.name.split(".");
    return parts.length > 1 ? `.${parts[parts.length - 1]}` : "";
  };

  const actionHandler = async (action: any, file: any) => {
    await action.action(file);

    setManual(!manual);
  };

  return (
    <StyledTable
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      striped
      bordered
      hover
      responsive>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={onFileInputChange}
      />
      <thead>
        <tr>
          {setSelectedState && <th>Select</th>}
          <th>File Name</th>
          {!(files.length === 0 || dragging) &&
            actions.map((action, index) => <th key={index}>{action.text}</th>)}
        </tr>
      </thead>
      <tbody>
        {files.length === 0 || dragging ? (
          <tr>
            <td>
              <DropZone className="mx-auto">
                <AppIcon
                  title="upload file"
                  onClick={onIconClick}
                  icon={mdiFileUploadOutline}
                  color="grey"
                  size={3}
                />
              </DropZone>
            </td>
          </tr>
        ) : (
          files.map((file, fileIndex) => (
            <tr key={fileIndex}>
              {setSelectedState && (
                <td>
                  <input
                    type="checkbox"
                    checked={selectedFiles.some(
                      (f) => f.fullPath === file.fullPath
                    )}
                    onChange={() => toggleFileSelected(file)}
                  />
                </td>
              )}
              <td>{file.name}</td>
              {actions.map((action, actionIndex) => (
                <td key={actionIndex}>
                  <Button
                    style={{ padding: "2px 5px" }}
                    color={color ?? 0}
                    onClick={() => actionHandler(action, file)}>
                    {action.text}
                  </Button>
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </StyledTable>
  );
};

export default FileTable;

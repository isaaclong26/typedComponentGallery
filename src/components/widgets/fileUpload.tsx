import { mdiCheck, mdiUpload } from "@mdi/js";
import { Icon } from "@mdi/react";
import React, { ChangeEvent, useCallback, useRef, useState } from "react";
import { useUploadFile } from "react-firebase-hooks/storage";
import styled from "styled-components";
import { EloiseWidget, Loading, useEloise } from "../..";
import { EloiseIntel } from "../../App";

type FileUploadPropsBase = {
  onFileUpload?: Function;
  next?: Function;
  accept?: string[];
  multiple?: boolean;
  customIcon?: React.ReactNode;
  intel?: EloiseIntel;
  path: string;
};
/**
 * @typedef FileUploadProps
 * @property {Function} [onFileUpload] - Callback for file upload
 * @property {Function} [next] - Callback for next action
 * @property {string[]} [accept] - Accepted file types
 * @property {boolean} [multiple] - Allow multiple files
 * @property {React.ReactNode} [customIcon] - Custom icon
 * @property {EloiseIntel} [intel] - Intel property
 * @property {string} path - Path to the file
 * @property {boolean} [dbMirror] - If true, `data` property must be provided for database mirroring
 * @property {{[key: string]: any}} [data] - Data for the database; required if `dbMirror` is true. Will also add the filepath field.
 */

export type FileUploadProps = FileUploadPropsBase &
  (
    | { dbMirror: true; data: { [key: string]: any } }
    | { dbMirror?: false; data?: { [key: string]: any } }
  );

export const FileUploadContainer = styled.div<{ isDragging: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #000;
  border-radius: 4px;
  min-height: 200px;
  max-height: 200px;
  position: relative;
  ${({ isDragging }) => isDragging && "background-color: #f0f0f0;"}
`;

const HiddenInput = styled.input`
  display: none;
`;

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  next,
  accept = [".json"],
  multiple = false,
  customIcon,
  intel,
  path,
  data,
  dbMirror,
}) => {
  const { logic, fireBaseConfig } = useEloise();

  const [uploadFile, uploading, snapshot, error] = useUploadFile();

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(true);
    },
    []
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
    },
    []
  );

  const handleDragLeave = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);
    },
    []
  );

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    processFiles(event.dataTransfer.files);
  }, []);

  const processFiles = useCallback(
    (files: FileList) => {
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        if (file) {
          const extension = file.name.split(".").pop()?.toLowerCase() || "";
          if (accept.includes(`.${extension}`)) {
            if (onFileUpload) {
              onFileUpload(file);
            } else {
              handleFileUpload(file);
            }
          }
        }
      }
    },
    [accept]
  );

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      processFiles(files);
    }
  };

  const handleFileUpload = async (file: File) => {
    const result = await logic.fb.storageMethods.uploadFile(path, file);

    if (dbMirror) {
      let result2 = await logic.fb.docs.setUserDoc(path, data);
    }
    if (typeof next === "function") {
      next(result);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <EloiseWidget eloiseIntel={{ ...intel }}>
      <FileUploadContainer
        isDragging={isDragging}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}>
        {uploading ? (
          <Loading />
        ) : snapshot ? (
          customIcon ? (
            <>{customIcon}</>
          ) : (
            <Icon
              path={mdiCheck}
              style={{
                position: "absolute",
                width: "50%",
                height: "50%",
                top: "25%",
                left: "25%",
              }}
            />
          )
        ) : customIcon ? (
          <>{customIcon}</>
        ) : (
          <Icon
            path={mdiUpload}
            style={{
              position: "absolute",
              width: "50%",
              height: "50%",
              top: "25%",
              left: "25%",
            }}
          />
        )}

        <HiddenInput
          ref={fileInputRef}
          type="file"
          accept={accept.join(",")}
          onChange={handleFileInputChange}
          multiple={multiple}
        />
      </FileUploadContainer>
    </EloiseWidget>
  );
};

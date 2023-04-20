import React, { ChangeEvent, useState, useCallback, useRef } from 'react';
import { Icon } from '@mdi/react';
import { mdiUpload, mdiCheck } from '@mdi/js';
import styled from 'styled-components';
import { useUploadFile } from 'react-firebase-hooks/storage';
import { Loading, useEloise } from '../..';
import { ref } from "firebase/storage"

export interface FileUploadProps {
  onFileUpload?: Function;
  next?: Function;
  accept?: string[];
  multiple?: boolean;
  customIcon?: React.ReactNode;
}


export const FileUploadContainer = styled.div<{ isDragging: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #000;
  border-radius: 4px;
  min-height: 200px;
  max-height: 200px;
  position: relative;
  ${({ isDragging }) => isDragging && 'background-color: #f0f0f0;'}
`;

const HiddenInput = styled.input`
  display: none;
`;

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  next,
  accept = ['.json'],
  multiple = false,
  customIcon,
}) => {

  const { logic, fireBaseConfig } = useEloise()

  const [uploadFile, uploading, snapshot, error] = useUploadFile();

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    processFiles(event.dataTransfer.files);
  }, []);

  const processFiles = useCallback((files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        const extension = file.name.split('.').pop()?.toLowerCase() || '';
        if (accept.includes(`.${extension}`)) {
          if (onFileUpload) {
            onFileUpload(file)
          }
          else {
            handleFileUpload(file);
          }
        }
      }
    }
  }, [accept]);

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      processFiles(files);
    }
  };

  const handleFileUpload = async (file: File) => {
    const result = await uploadFile(ref(logic.fb.storage, fireBaseConfig.storageDir), file, {
      contentType: 'image/jpeg',
    });

    if (typeof next === 'function') {
      next(result);
    }
  };


  const openFileDialog = () => {
    fileInputRef.current?.click();
  };


  return (
    <FileUploadContainer
      isDragging={isDragging}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={openFileDialog}
    >
      {uploading ? (
        <Loading />
      ) : snapshot ? (
        customIcon ? (
          <>{customIcon}</>
        ) : (
          <Icon
            path={mdiCheck}
            style={{
              position: 'absolute',
              width: '50%',
              height: '50%',
              top: '25%',
              left: '25%',
            }}
          />
        )
      ) : customIcon ? (
        <>{customIcon}</>
      ) : (
        <Icon
          path={mdiUpload}
          style={{
            position: 'absolute',
            width: '50%',
            height: '50%',
            top: '25%',
            left: '25%',
          }}
        />
      )}


      <HiddenInput
        ref={fileInputRef}
        type="file"
        accept={accept.join(',')}
        onChange={handleFileInputChange}
        multiple={multiple}
      />
    </FileUploadContainer>
  );
};

"use client";

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, File as FileIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}

export function FileUploader({ onFileUpload }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      onFileUpload(selectedFile);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'application/pdf': [],
    },
    multiple: false,
  });

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    onFileUpload(null!);
  };

  return (
    <div
      {...getRootProps()}
      className={`relative flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300
      ${isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}`}
    >
      <input {...getInputProps()} />
      {file ? (
        <div className="text-center">
            <div className="relative inline-block">
                <FileIcon className="w-16 h-16 text-primary" />
                <Button variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full" onClick={removeFile}>
                    <X className="h-4 w-4" />
                </Button>
            </div>
          <p className="mt-4 font-semibold text-foreground">{file.name}</p>
          <p className="text-sm text-muted-foreground">
            {(file.size / 1024).toFixed(2)} KB
          </p>
        </div>
      ) : (
        <div className="text-center text-muted-foreground">
          <UploadCloud className="w-16 h-16 mx-auto mb-4" />
          <p className="font-semibold text-lg">
            {isDragActive ? 'Drop the file here...' : 'Drag & drop a file here, or click to select'}
          </p>
          <p className="text-sm mt-1">PDF, PNG, JPG accepted</p>
        </div>
      )}
    </div>
  );
}

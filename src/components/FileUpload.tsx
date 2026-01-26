import React, { useState, useRef, useCallback } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { uploadDocument } from '../services/api';

interface FileUploadProps {
  onUploadSuccess: (doc: any) => void;
  onUploadError: (error: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess, onUploadError }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<{[key: string]: {name: string, progress: number}}>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFiles(e.dataTransfer.files);
    }
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await processFiles(e.target.files);
    }
  };

  const processFiles = async (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Validate file type
      if (!file.type.includes('pdf')) {
        onUploadError('Only PDF files are allowed');
        continue;
      }

      // Track file upload progress
      const fileId = `${file.name}-${Date.now()}`;
      setUploadingFiles(prev => ({
        ...prev,
        [fileId]: { name: file.name, progress: 0 }
      }));

      try {
        // Simulate progress updates
        const interval = setInterval(() => {
          setUploadingFiles(prev => {
            const currentProgress = prev[fileId]?.progress || 0;
            if (currentProgress >= 95) {
              clearInterval(interval);
              return prev;
            }
            return {
              ...prev,
              [fileId]: { name: file.name, progress: currentProgress + 5 }
            };
          });
        }, 200);

        // Upload the file
        const response = await uploadDocument(file);
        
        // Clear progress interval
        clearInterval(interval);
        
        // Update progress to 100%
        setUploadingFiles(prev => ({
          ...prev,
          [fileId]: { name: file.name, progress: 100 }
        }));

        // Remove from uploading list after a delay
        setTimeout(() => {
          setUploadingFiles(prev => {
            const newUploading = {...prev};
            delete newUploading[fileId];
            return newUploading;
          });
        }, 1000);

        onUploadSuccess(response);
      } catch (error) {
        setUploadingFiles(prev => {
          const newUploading = {...prev};
          delete newUploading[fileId];
          return newUploading;
        });
        onUploadError(error instanceof Error ? error.message : 'Upload failed');
      }
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="mb-6">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,application/pdf"
          multiple
        />
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-700 mb-1">Drag and drop PDF files here</p>
        <p className="text-sm text-gray-500 mb-4">or click to browse</p>
        <p className="text-xs text-gray-400">Supports PDF files only</p>
      </div>

      {/* Uploading files list */}
      {Object.keys(uploadingFiles).length > 0 && (
        <div className="mt-4 space-y-2">
          {Object.entries(uploadingFiles).map(([fileId, fileData]) => (
            <div key={fileId} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div className="flex items-center truncate">
                <FileText className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                <span className="truncate text-sm text-gray-700">{fileData.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${fileData.progress}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 w-8">{fileData.progress}%</span>
                <X className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
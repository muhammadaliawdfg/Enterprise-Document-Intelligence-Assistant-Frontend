import React, { useState } from 'react';
import Header from '../components/Header';
import FileUpload from '../components/FileUpload';
import DocumentList from '../components/DocumentList';
import ChatWindow from '../components/ChatWindow';
import { Document } from '../types';

const Dashboard: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleUploadSuccess = (doc: any) => {
    // Assuming the API returns document info
    const newDoc: Document = {
      id: doc.id || Date.now().toString(),
      name: doc.name || 'Unknown Document',
      status: 'ready',
      uploadDate: new Date().toISOString(),
      pages: doc.pages || 0
    };
    
    setDocuments(prev => [...prev, newDoc]);
    setError(null);
  };

  const handleUploadError = (errorMessage: string) => {
    setError(errorMessage);
    setTimeout(() => setError(null), 5000); // Clear error after 5 seconds
  };

  const handleRemoveDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Documents</h2>
          
          <FileUpload 
            onUploadSuccess={handleUploadSuccess} 
            onUploadError={handleUploadError} 
          />
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div className="flex-1">
            <DocumentList 
              documents={documents} 
              onRemoveDocument={handleRemoveDocument} 
            />
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <ChatWindow documentCount={documents.length} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
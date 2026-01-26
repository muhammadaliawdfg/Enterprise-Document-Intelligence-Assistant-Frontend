import React from 'react';
import { FileText, AlertCircle, CheckCircle, Clock, X } from 'lucide-react';
import { Document } from '../types';

interface DocumentListProps {
  documents: Document[];
  onRemoveDocument?: (id: string) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({ documents, onRemoveDocument }) => {
  const readyDocuments = documents.filter(doc => doc.status === 'ready');
  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'ready':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-yellow-500 animate-pulse" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'uploading':
        return <Clock className="h-5 w-5 text-blue-500 animate-pulse" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: Document['status']) => {
    switch (status) {
      case 'ready':
        return 'Ready';
      case 'processing':
        return 'Processing';
      case 'error':
        return 'Error';
      case 'uploading':
        return 'Uploading';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'ready':
        return 'text-green-600 bg-green-50';
      case 'processing':
        return 'text-yellow-600 bg-yellow-50';
      case 'error':
        return 'text-red-600 bg-red-50';
      case 'uploading':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Documents ({readyDocuments.length} indexed)
        </h2>
        {readyDocuments.length > 0 && (
          <span className="inline-flex items-center text-sm text-green-600">
            <CheckCircle className="h-4 w-4 mr-1" />
            Ready for questions
          </span>
        )}
      </div>

      {documents.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <FileText className="mx-auto h-12 w-12 text-gray-300 mb-2" />
          <p>No documents uploaded yet</p>
        </div>
      ) : (
        documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center truncate">
              <FileText className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
              <div className="truncate">
                <p className="font-medium text-gray-800 truncate">{doc.name}</p>
                <div className="flex items-center mt-1">
                  {getStatusIcon(doc.status)}
                  <span className={`ml-1 text-xs px-2 py-0.5 rounded-full ${getStatusColor(doc.status)}`}>
                    {getStatusText(doc.status)}
                  </span>
                </div>
              </div>
            </div>
            {onRemoveDocument && (
              <button
                onClick={() => onRemoveDocument(doc.id)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default DocumentList;
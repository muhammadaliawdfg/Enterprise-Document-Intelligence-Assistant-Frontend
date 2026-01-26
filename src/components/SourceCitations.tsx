import React, { useState } from 'react';
import { ChevronDown, ChevronRight, FileText } from 'lucide-react';
import { SourceCitation } from '../types';

interface SourceCitationsProps {
  sources: SourceCitation[];
}

const SourceCitations: React.FC<SourceCitationsProps> = ({ sources }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 pt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none"
      >
        {isOpen ? (
          <ChevronDown className="h-4 w-4 mr-1" />
        ) : (
          <ChevronRight className="h-4 w-4 mr-1" />
        )}
        Sources ({sources.length})
      </button>

      {isOpen && (
        <div className="mt-2 space-y-3">
          {sources.map((source, index) => (
            <div
              key={index}
              className="p-3 bg-blue-50 rounded-md border border-blue-100 hover:bg-blue-100 transition-colors cursor-pointer"
            >
              <div className="flex items-start">
                <FileText className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <div className="flex items-center text-sm font-medium text-blue-700">
                    <span className="underline decoration-blue-500 decoration-1 underline-offset-2">
                      {source.documentName}
                    </span>
                    {source.pageNumber !== undefined && (
                      <span className="ml-2 text-xs text-blue-500 bg-blue-100 px-1.5 py-0.5 rounded">
                        Page {source.pageNumber}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{source.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SourceCitations;
export interface Document {
  id: string;
  name: string;
  status: 'uploading' | 'processing' | 'ready' | 'error';
  uploadDate: string;
  pages?: number;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: SourceCitation[];
}

export interface SourceCitation {
  documentName: string;
  pageNumber?: number;
  text: string;
  relevanceScore?: number;
}

export interface ChatRequest {
  question: string;
}

export interface ChatResponse {
  answer: string;
  sources: SourceCitation[];
}
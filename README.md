# Enterprise Document Intelligence Assistant (EDIA) Frontend

EDIA is an enterprise-grade document-based AI assistant that allows users to upload business documents and ask natural-language questions to receive accurate answers grounded only in uploaded documents.

## Features

- Drag-and-drop PDF document upload with progress indicators
- Real-time chat interface for asking questions about documents
- Source citations showing document references for transparency
- Professional enterprise UI with clean, accessible design
- Responsive layout for desktop and mobile devices

## Tech Stack

- **Framework**: React (with Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React hooks
- **HTTP Client**: Axios
- **Icons**: Lucide React

## Project Structure

```
src/
 ├── components/
 │   ├── Header.tsx
 │   ├── FileUpload.tsx
 │   ├── DocumentList.tsx
 │   ├── ChatWindow.tsx
 │   ├── MessageBubble.tsx
 │   └── SourceCitations.tsx
 ├── pages/
 │   └── Dashboard.tsx
 ├── services/
 │   └── api.ts
 ├── types/
 │   └── index.ts
 ├── App.tsx
 └── main.tsx
```

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with your API configuration:
   ```
   VITE_API_BASE_URL=http://localhost:8000
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:3000`

## API Integration

The frontend communicates with the backend API through the following endpoints:

- `POST /upload-doc` - Upload PDF documents
- `POST /chat` - Send questions and receive answers with citations
- `GET /documents` - Retrieve list of uploaded documents

## Key Components

- **FileUpload**: Handles drag-and-drop PDF uploads with progress tracking
- **DocumentList**: Displays uploaded documents with status indicators
- **ChatWindow**: Main interface for asking questions and viewing responses
- **MessageBubble**: Displays individual messages with source citations
- **SourceCitations**: Shows document references for AI-generated answers

## Design Principles

- Clean, professional enterprise UI
- Clear typography and spacing
- Accessible color scheme with sufficient contrast
- Responsive design for various screen sizes
- Intuitive user flows with clear feedback

## Environment Variables

- `VITE_API_BASE_URL` - Base URL for the backend API (defaults to http://localhost:8000)
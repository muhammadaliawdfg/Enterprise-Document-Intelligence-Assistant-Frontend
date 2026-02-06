# Enterprise Document Intelligence Assistant (EDIA) Frontend

EDIA is a sophisticated document intelligence platform that enables users to upload documents and interact with them through an intelligent chat interface. The frontend provides a clean, responsive user interface built with React, TypeScript, and Tailwind CSS.

## Features

- **Document Upload**: Drag-and-drop interface for uploading PDF documents
- **Real-time Processing**: Visual feedback during document upload and processing
- **Intelligent Chat Interface**: Ask questions about your documents and receive contextual answers
- **Source Citations**: View references to specific documents and pages that support the AI responses
- **Document Management**: View and manage uploaded documents
- **Responsive Design**: Works seamlessly across devices

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS for utility-first styling
- **Icons**: Lucide React icon library
- **HTTP Client**: Axios for API communication
- **Build Tool**: Vite for fast development and builds
- **Linting**: ESLint with TypeScript support
- **Markdown Rendering**: React Markdown for content display

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd edia-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and configure the API endpoint:
```env
VITE_API_BASE_URL=http://localhost:8000
```

## Development

To start the development server:

```bash
npm run dev
```

This will launch the application at `http://localhost:3000` with hot-reload capabilities.

## Building for Production

To create a production-ready build:

```bash
npm run build
```

The optimized build will be created in the `dist` folder.

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Header.tsx        # Application header
│   ├── FileUpload.tsx    # Document upload interface
│   ├── DocumentList.tsx  # List of uploaded documents
│   ├── ChatWindow.tsx    # Main chat interface
│   ├── MessageBubble.tsx # Individual message display
│   └── SourceCitations.tsx # Source reference display
├── pages/               # Page components
│   └── Dashboard.tsx    # Main dashboard layout
├── services/            # API and business logic
│   └── api.ts           # API client and methods
├── types/               # Type definitions
│   └── index.ts         # Shared TypeScript interfaces
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## Environment Variables

- `VITE_API_BASE_URL`: Base URL for the backend API (defaults to http://localhost:8000)

## API Integration

The frontend communicates with the backend API for:
- Document uploads (`POST /upload`)
- Query processing (`POST /query`)

Make sure the backend service is running and accessible at the configured API URL.

## Components Overview

### File Upload Component
- Drag-and-drop interface for PDF files
- Progress indicators during upload
- Validation for supported file types

### Document List
- Displays uploaded documents with status
- Shows document metadata (name, pages, upload date)
- Allows document removal

### Chat Window
- Interactive chat interface for querying documents
- Message history display
- Source citations for AI-generated responses

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please contact the development team or open an issue in the repository.
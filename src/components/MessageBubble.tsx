// MessageBubble.tsx
import React from 'react';
import { User, Bot } from 'lucide-react';
import { Message } from '../types';
import SourceCitations from './SourceCitations';
import ReactMarkdown from 'react-markdown';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div
        className={`max-w-3xl px-4 py-3 ${
          isUser
            ? 'bg-blue-500 text-white rounded-2xl rounded-br-none max-w-2xl'
            : 'bg-white text-gray-800 rounded-2xl rounded-bl-none max-w-3xl shadow-sm'
        }`}
      >
        <div className="flex">
          {/* Assistant Icon */}
          {!isUser && (
            <div className="mr-3 mt-1 flex-shrink-0">
              <div className="bg-blue-100 rounded-full p-2">
                <Bot className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          )}

          {/* Message Content */}
          <div className="flex-1 min-w-0">
            {/* Assistant Name */}
            {!isUser && (
              <div className="font-semibold text-gray-900 mb-1 flex items-center">
                <span>EDIA Assistant</span>
              </div>
            )}

            {/* Markdown Content */}
            <div className="whitespace-pre-wrap text-gray-800">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>

            {/* Source Citations */}
            {!isUser && message.sources && message.sources.length > 0 && (
              <SourceCitations sources={message.sources} />
            )}
          </div>

          {/* User Icon */}
          {isUser && (
            <div className="ml-3 mt-1 flex-shrink-0">
              <div className="bg-gray-100 rounded-full p-2">
                <User className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;

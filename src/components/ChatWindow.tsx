import React, { useState, useRef, useEffect } from 'react';
import { Send, RotateCcw } from 'lucide-react';
import { Message, ChatResponse } from '../types';
import MessageBubble from './MessageBubble';
import { sendMessage } from '../services/api';

interface ChatWindowProps {
  documentCount: number;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ documentCount }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: documentCount > 0 
        ? 'Hello! I\'m your Enterprise Document Intelligence Assistant. Ask me anything about your uploaded documents.' 
        : 'Hello! Please upload some documents first, then ask me questions about them.',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Call API to get response
      const response: ChatResponse = await sendMessage(inputValue);
      
      // Add assistant message with sources
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.answer,
        timestamp: new Date(),
        sources: response.sources,
        
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: documentCount > 0 
          ? 'Hello! I\'m your Enterprise Document Intelligence Assistant. Ask me anything about your uploaded documents.' 
          : 'Hello! Please upload some documents first, then ask me questions about them.',
        timestamp: new Date(),
      }
    ]);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 pb-20">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="max-w-3xl rounded-2xl rounded-tl-none bg-gray-100 text-gray-800 px-4 py-3">
              <div className="flex items-center">
                <div className="mr-3 mt-0.5 flex-shrink-0">
                  <div className="h-5 w-5 text-gray-600">EDIA</div>
                </div>
                <div className="flex space-x-2">
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 bg-white p-4 sticky bottom-0">
        <p className="text-xs text-gray-500 mb-2 text-center">
          EDIA Assistant can only provide information based on your uploaded documents
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              documentCount > 0
                ? "Ask a question about your documents..."
                : "Upload documents first to start asking questions..."
            }
            disabled={isLoading || documentCount === 0}
            className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading || documentCount === 0}
            className="bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <Send className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading}
            className="bg-gray-200 text-gray-700 rounded-full p-3 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
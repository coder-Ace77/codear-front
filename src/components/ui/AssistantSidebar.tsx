import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { aiService } from '@/service/aiService';
import { MessageSquare, ChevronLeft, ChevronRight, Send, Loader2, Copy, Check, Bot, User } from 'lucide-react';

interface AssistantSidebarProps {
  problemStatement: string;
  code: string;
}

const AssistantSidebar = ({ problemStatement, code }: AssistantSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isLoading]);

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMsg = message;
    setChatHistory(prev => [...prev, { role: 'user', content: userMsg }]);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await aiService.chatWithAssistant(problemStatement, code, userMsg);
      setChatHistory(prev => [...prev, { role: 'assistant', content: response.reply || response.message }]);
    } catch (err) {
      setChatHistory(prev => [...prev, { role: 'assistant', content: "⚠️ Failed to connect to AI. Please check your API." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-50 flex transition-all duration-500 ease-in-out ${isOpen ? 'w-[400px]' : 'w-0'}`}>
      
      <div className={`flex flex-col w-full bg-[#0d1117] border-r border-slate-700 shadow-2xl overflow-hidden ${!isOpen && 'invisible opacity-0'}`}>
        
        <div className="p-4 border-b border-slate-800 bg-[#161b22] flex items-center gap-2">
          <Bot className="text-blue-400" size={20} />
          <span className="font-semibold text-slate-200">AI Coding Buddy</span>
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-6 custom-scrollbar">
          {chatHistory.length === 0 && (
            <div className="text-center text-slate-500 mt-10 text-sm">
              Ask me about the problem statement or your current code.
            </div>
          )}
          
          {chatHistory.map((chat, i) => (
            <div key={i} className={`flex gap-3 ${chat.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${chat.role === 'user' ? 'bg-indigo-600' : 'bg-slate-700'}`}>
                {chat.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`max-w-[85%] rounded-lg px-4 py-2 text-sm leading-relaxed ${
                chat.role === 'user' ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-200 border border-slate-700'
              }`}>
                <ReactMarkdown
                  components={{
                    code({ inline, className, children, ...props }: any) {
                      const match = /language-(\\w+)/.exec(className || '');
                      return !inline && match ? (
                        <div className="relative group my-2">
                          <SyntaxHighlighter
                            style={atomDark}
                            language={match[1]}
                            PreTag="div"
                            className="rounded-md !bg-[#010409] !p-4 border border-slate-700"
                            {...props}
                          >
                            {String(children).replace(/\\n$/, '')}
                          </SyntaxHighlighter>
                        </div>
                      ) : (
                        <code className="bg-slate-900 px-1 rounded text-pink-400" {...props}>
                          {children}
                        </code>
                      );
                    }
                  }}
                >
                  {chat.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 animate-pulse">
              <div className="w-8 h-8 rounded-full bg-slate-700 shrink-0" />
              <div className="h-10 w-2/3 bg-slate-800 rounded-lg" />
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 bg-[#161b22] border-t border-slate-800">
          <div className="relative flex items-center">
            <textarea 
              rows={1}
              className="w-full bg-[#0d1117] text-slate-200 text-sm p-3 pr-12 rounded-lg outline-none border border-slate-700 focus:border-blue-500 transition-colors resize-none"
              placeholder="Ask a question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <button 
              onClick={handleSendMessage}
              disabled={isLoading || !message.trim()}
              className="absolute right-2 p-2 text-blue-500 hover:text-blue-400 disabled:text-slate-600 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="h-12 w-8 mt-16 flex items-center justify-center bg-[#161b22] border border-l-0 border-slate-700 rounded-r-xl text-slate-400 hover:text-white hover:bg-slate-700 transition-all shadow-lg"
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>
    </div>
  );
};

export default AssistantSidebar;
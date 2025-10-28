// import { Sidebar } from '@/components/Sidebar';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Activity, Send } from 'lucide-react';
// import { useState } from 'react';
// import { supabase } from '@/integrations/supabase/client';
// import { toast } from 'sonner';
// import { useLanguage } from '@/contexts/LanguageContext';

// interface Message {
//   role: 'user' | 'assistant';
//   content: string;
//   timestamp: string;
// }

// export default function AIAssistant() {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       role: 'assistant',
//       content: 'Namaste! 🌾 I am your AgriSmart AI assistant. I can help you with crop suggestions, fertilizer advice, disease management, market predictions, and weather insights. How can I assist you today?',
//       timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
//     },
//   ]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { language } = useLanguage();

//   const suggestedQuestions = [
//     'What are the best crops to grow in monsoon season?',
//     'How can I prevent pest attacks naturally?',
//     'What fertilizers should I use for wheat?',
//     'How to improve soil fertility?',
//     'When is the best time to harvest rice?',
//   ];

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMessage: Message = {
//       role: 'user',
//       content: input,
//       timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInput('');
//     setLoading(true);

//     try {
//       const { data, error } = await supabase.functions.invoke('ai-assistant', {
//         body: {
//           message: input,
//           language: language,
//           conversationHistory: messages.map((m) => ({ role: m.role, content: m.content })),
//         },
//       });

//       if (error) {
//         toast.error('Failed to get response');
//       } else if (data?.response) {
//         const assistantMessage: Message = {
//           role: 'assistant',
//           content: data.response,
//           timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
//         };
//         setMessages((prev) => [...prev, assistantMessage]);
//       }
//     } catch (error) {
//       toast.error('An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar />
//       <main className="flex-1 p-8">
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold">AI Assistant</h1>
//           <p className="text-muted-foreground">Get expert farming advice powered by AI</p>
//         </div>

//         <Card className="h-[calc(100vh-200px)] flex flex-col">
//           <div className="p-4 border-b border-border flex items-center gap-3">
//             <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
//               <Activity className="w-6 h-6 text-primary-foreground" />
//             </div>
//             <div>
//               <h2 className="font-semibold">AgriSmart AI Assistant</h2>
//               <p className="text-xs text-muted-foreground">Online • Responds in your selected language</p>
//             </div>
//           </div>

//           <div className="flex-1 p-6 overflow-y-auto space-y-4">
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
//               >
//                 <div
//                   className={`max-w-[70%] rounded-lg p-4 ${
//                     message.role === 'user'
//                       ? 'bg-primary text-primary-foreground'
//                       : 'bg-secondary text-foreground'
//                   }`}
//                 >
//                   {message.role === 'assistant' && (
//                     <div className="flex items-center gap-2 mb-2">
//                       <Activity className="w-4 h-4 text-primary" />
//                       <span className="text-xs font-semibold">AgriSmart AI Assistant</span>
//                     </div>
//                   )}
//                   <p className="text-sm whitespace-pre-wrap">{message.content}</p>
//                   <p className="text-xs opacity-70 mt-2">{message.timestamp}</p>
//                 </div>
//               </div>
//             ))}
//             {loading && (
//               <div className="flex justify-start">
//                 <div className="bg-secondary rounded-lg p-4">
//                   <p className="text-sm text-muted-foreground">Thinking...</p>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="p-4 border-t border-border">
//             <div className="flex flex-wrap gap-2 mb-3">
//               {suggestedQuestions.map((question, index) => (
//                 <Button
//                   key={index}
//                   variant="outline"
//                   size="sm"
//                   onClick={() => setInput(question)}
//                   className="text-xs"
//                 >
//                   {question}
//                 </Button>
//               ))}
//             </div>

//             <div className="flex gap-2">
//               <Input
//                 placeholder="Type your question here..."
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//                 disabled={loading}
//               />
//               <Button onClick={handleSend} disabled={loading || !input.trim()}>
//                 <Send className="w-4 h-4" />
//               </Button>
//             </div>
//           </div>
//         </Card>
//       </main>
//     </div>
//   );
// }
import { Sidebar } from '@/components/Sidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Activity, Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// ⚠️ Replace with your API key (for testing only — don’t expose in production)
const genAI = new GoogleGenerativeAI('AIzaSyAJQSqjLfUr7NDnEAFz6Y60jABfbDEKJps');
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

export default function AIAssistant() {
  const { language } = useLanguage();

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('ai_assistant_chat');
    if (saved) return JSON.parse(saved);
    return [
      {
        role: 'assistant',
        content:
          'Namaste! 🌾 I am your AgriSmart AI assistant. I can help you with crop suggestions, fertilizer advice, disease management, market predictions, and weather insights. How can I assist you today?',
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ];
  });

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('ai_assistant_chat', JSON.stringify(messages));
  }, [messages]);

  const suggestedQuestions = [
    'What are the best crops to grow in monsoon season?',
    'How can I prevent pest attacks naturally?',
    'What fertilizers should I use for wheat?',
    'How to improve soil fertility?',
    'When is the best time to harvest rice?',
  ];

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Combine the previous messages into one context prompt
      const historyText = messages
        .map((m) => `${m.role === 'user' ? '👤 User' : '🤖 Assistant'}: ${m.content}`)
        .join('\n');

      const prompt = `
You are AgriSmart AI, an intelligent farming assistant.
Respond in ${language} language if possible.
Use the following conversation context to continue naturally:

${historyText}

👤 User: ${input}
`;

      const result = await model.generateContent(prompt);
      const response = await result.response.text();

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.trim(),
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      toast.error('Gemini API request failed or model overloaded.');
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    localStorage.removeItem('ai_assistant_chat');
    setMessages([
      {
        role: 'assistant',
        content:
          'Namaste! 🌾 I am your AgriSmart AI assistant. I can help you with crop suggestions, fertilizer advice, disease management, market predictions, and weather insights. How can I assist you today?',
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ]);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">AI Assistant</h1>
            <p className="text-muted-foreground">
              Get expert farming advice powered by Gemini AI
            </p>
          </div>
          <Button variant="outline" onClick={clearChat}>
            Clear Chat
          </Button>
        </div>

        <Card className="h-[calc(100vh-200px)] flex flex-col">
          <div className="p-4 border-b border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold">AgriSmart AI Assistant</h2>
              <p className="text-xs text-muted-foreground">
                Online • Responds in your selected language
              </p>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-primary" />
                      <span className="text-xs font-semibold">
                        AgriSmart AI Assistant
                      </span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-secondary rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Thinking...</p>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-border">
            <div className="flex flex-wrap gap-2 mb-3">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setInput(question)}
                  className="text-xs"
                >
                  {question}
                </Button>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Type your question here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                disabled={loading}
              />
              <Button onClick={handleSend} disabled={loading || !input.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}

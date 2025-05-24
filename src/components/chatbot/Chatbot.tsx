
"use client";

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { MessageSquare, Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { chatWithBot, type ChatbotInput } from '@/ai/flows/chatbot-flow';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      // ShadCN ScrollArea nests the viewport.
      const viewport = scrollAreaRef.current.querySelector('div[style*="overflow: scroll;"]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && messages.length === 0 && !isLoading) {
      setMessages([
        {
          id: 'greeting',
          sender: 'bot',
          text: "Hello! I'm Mama Mboga's assistant. How can I help you find fresh produce or navigate the app today?",
          timestamp: new Date(),
        }
      ]);
    }
     if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, messages.length, isLoading]);


  const handleSendMessage = async (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (inputValue.trim() === '' || isLoading) return;

    const userMessageText = inputValue;
    setInputValue(''); // Clear input immediately

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userMessageText,
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const historyForAI = messages
        .map(msg => ({
          [msg.sender]: msg.text
        }))
        .slice(-6); // Send last 6 interactions (3 user, 3 bot)
      
      const inputForFlow: ChatbotInput = {
         message: userMessage.text,
         history: historyForAI
      };

      const response = await chatWithBot(inputForFlow);
      
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.reply,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        sender: 'bot',
        text: 'Sorry, I seem to be having a little trouble connecting. Please try again in a moment.',
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
       if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 rounded-full h-16 w-16 shadow-xl border-2 border-background z-[60]"
          size="icon"
          aria-label="Open chat"
        >
          <MessageSquare className="h-7 w-7" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md w-[90vw] p-0 flex flex-col h-[80vh] max-h-[650px] shadow-2xl rounded-lg">
        <DialogHeader className="p-4 border-b bg-muted/30 rounded-t-lg">
          <DialogTitle className="text-lg font-poppins flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-primary" />
            Mama Mboga Assistant
          </DialogTitle>
           <DialogDescription>
            Ask about products, offers, or how to use the app!
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-grow bg-background" ref={scrollAreaRef}>
          <div className="p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  'flex items-end gap-2 w-full',
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    'max-w-[80%] rounded-xl px-3.5 py-2.5 text-sm shadow-md',
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-card text-card-foreground border border-border rounded-bl-none'
                  )}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <p className={cn(
                      "text-xs mt-1.5",
                      msg.sender === 'user' ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground text-left'
                    )}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
                <div className="flex justify-start gap-2 items-end">
                    <div className="max-w-[80%] rounded-xl px-3.5 py-2.5 text-sm shadow-md bg-card text-card-foreground border border-border rounded-bl-none flex items-center">
                        <Loader2 className="h-4 w-4 animate-spin mr-2 text-primary" /> Thinking...
                    </div>
                </div>
            )}
          </div>
        </ScrollArea>
        
        <DialogFooter className="p-3 border-t bg-muted/30 rounded-b-lg">
          <form
            onSubmit={handleSendMessage}
            className="flex w-full items-center gap-2"
          >
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow h-10 text-sm bg-background focus-visible:ring-primary"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" className="h-10 w-10" disabled={isLoading || inputValue.trim() === ''}>
              <Send className="h-5 w-5" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

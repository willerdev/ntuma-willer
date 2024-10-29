'use client';

import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Send } from 'lucide-react';

const messages = [
  {
    id: 1,
    text: 'Hello! How can I help you today?',
    sender: 'agent',
    timestamp: '10:00 AM',
  },
  {
    id: 2,
    text: 'I have a question about my order',
    sender: 'user',
    timestamp: '10:01 AM',
  },
  {
    id: 3,
    text: 'Sure, I\'d be happy to help. Could you please provide your order number?',
    sender: 'agent',
    timestamp: '10:02 AM',
  },
];

export default function ChatPage() {
  const [message, setMessage] = useState('');

  return (
    <div className="container max-w-3xl py-6 space-y-6">
      <Card className="p-4 h-[calc(100vh-12rem)] flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 p-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <span className="text-xs opacity-70">{msg.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t pt-4 space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
            />
            <Button size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

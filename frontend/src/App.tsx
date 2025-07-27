// React App UI
// src/App.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import Recorder from './Recorder';

interface LogEntry {
  id: number;
  timestamp: string;
  question: string;
  response: string;
  rating: number | null;
}

export default function App() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [token, setToken] = useState<string>('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedResponse, setEditedResponse] = useState<string>('');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  useEffect(() => {
    if (token) fetchLogs();
  }, [token]);

  const fetchLogs = async () => {
    const res = await axios.get('/logs', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setLogs(res.data);
  };

  const login = async () => {
    const formData = new URLSearchParams();
    formData.append('username', loginForm.username);
    formData.append('password', loginForm.password);
    const res = await axios.post('/token', formData);
    setToken(res.data.access_token);
  };

  const saveEdit = async (id: number) => {
    await axios.post(
      '/logs/update',
      { id, updated_response: editedResponse },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setEditingId(null);
    setEditedResponse('');
    fetchLogs();
  };

  const rateResponse = async (id: number, rating: number) => {
    await axios.post(
      '/logs/rate',
      { id, rating },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchLogs();
  };

  if (!token) {
    return (
      <div className="max-w-sm mx-auto mt-10 p-4 shadow rounded bg-white">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <Input
          placeholder="Username"
          value={loginForm.username}
          onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
        />
        <Input
          className="mt-2"
          type="password"
          placeholder="Password"
          value={loginForm.password}
          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
        />
        <Button className="mt-4 w-full" onClick={login}>
          Sign In
        </Button>
      </div>
    );
  }

  return (
      <div className="max-w-4xl mx-auto py-6 px-4">
        <Recorder/>
        <h1 className="text-2xl font-bold mb-6">Conversation History</h1>
      {logs.map((log) => (
        <Card key={log.id} className="mb-4">
          <CardContent className="space-y-2">
            <div className="text-sm text-gray-500">{new Date(log.timestamp).toLocaleString()}</div>
            <div><strong>Q:</strong> {log.question}</div>
            {editingId === log.id ? (
              <Textarea
                value={editedResponse}
                onChange={(e) => setEditedResponse(e.target.value)}
              />
            ) : (
              <div><strong>A:</strong> {log.response}</div>
            )}

            {editingId === log.id ? (
              <Button size="sm" onClick={() => saveEdit(log.id)}>Save</Button>
            ) : (
              <Button size="sm" variant="outline" onClick={() => {
                setEditingId(log.id);
                setEditedResponse(log.response);
              }}>
                Edit
              </Button>
            )}

            <div className="mt-2 space-x-2">
              {[1, 2, 3, 4, 5].map((r) => (
                <Button
                  key={r}
                  size="sm"
                  variant={log.rating === r ? 'default' : 'outline'}
                  onClick={() => rateResponse(log.id, r)}
                >
                  {r} ⭐
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}


import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Button } from './components/ui/button';

const Recorder: React.FC = () => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const chunks: BlobPart[] = [];

    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      setAudioBlob(blob);
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  const uploadAudio = async () => {
    if (!audioBlob) return;
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');

    await axios.post('/upload-audio', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  return (
    <div className="p-4">
      <Button onClick={recording ? stopRecording : startRecording}>
        {recording ? 'Stop Recording' : 'Start Recording'}
      </Button>
      {audioBlob && (
        <>
          <audio controls src={URL.createObjectURL(audioBlob)} className="mt-4" />
          <Button onClick={uploadAudio} className="mt-2">Upload</Button>
        </>
      )}
    </div>
  );
};

export default Recorder;
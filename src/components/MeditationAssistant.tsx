'use client';

import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { MicrophoneIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function MeditationAssistant() {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [justStopped, setJustStopped] = useState(false);


  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // Sync transcript into the question field
  useEffect(() => {
    if (listening) {
      setQuestion(transcript);
    }
  }, [transcript, listening]);

  const handleMicClick = () => {
  if (!browserSupportsSpeechRecognition) {
    alert('Your browser does not support speech recognition.');
    return;
  }

  if (listening) {
    SpeechRecognition.stopListening();
    setJustStopped(true);
    setTimeout(() => setJustStopped(false), 2000);
  } else {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false, language: 'en-US' });
  }
};


  const handleSubmit = () => {
    if (!question.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setModalOpen(true);
    }, 2000);
  };

  return (
    <div className="bg-orange-50 min-h-screen p-6 flex flex-col items-center">
      <h2 className="text-xl md:text-2xl font-semibold text-center animate-pulse text-orange-700 mb-6">
        Does anyone have a question they would like to ask?
      </h2>

      <p className="text-center text-gray-700 mb-4">
        Press the microphone to dictate your question or type your question. We'll do our very best to find the most relevant talk.
      </p>

      {/* Mic Icon */}
<div className="relative my-4">
  <button
    onClick={handleMicClick}
    className={clsx(
      'w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300',
      'bg-white shadow-md border border-orange-300 relative z-10',
      listening && 'ring-4 ring-orange-300 animate-pulse'
    )}
  >
    <MicrophoneIcon className="w-10 h-10 text-orange-600" />
  </button>

  {/* Live transcript preview */}
  {listening && (
    <p className="mt-3 text-sm text-orange-700 text-center italic animate-fade-in-fast">
      {transcript || 'Listening...'}
    </p>
  )}

  {/* Just stopped listening cue */}
  {!listening && justStopped && (
    <p className="mt-3 text-sm text-gray-500 text-center italic animate-fade-out">
      Done listening
    </p>
  )}
</div>


      {/* Text input */}
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        rows={4}
        placeholder="Type your question here..."
        className="mt-6 w-full max-w-xl p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-300 focus:outline-none bg-white"
      />

      <button
        onClick={handleSubmit}
        disabled={!question.trim()}
        className="mt-4 px-6 py-3 bg-orange-600 text-white font-medium rounded-lg shadow hover:bg-orange-700 transition"
      >
        Search
      </button>

      {/* Spinner */}
      {isLoading && (
        <div className="mt-6 animate-spin rounded-full h-10 w-10 border-t-2 border-orange-500 border-opacity-50" />
      )}

      {/* Results modal */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="max-w-2xl w-full bg-white rounded-xl shadow-xl p-6 space-y-4">
            <Dialog.Title className="text-xl font-semibold">
              We found a few talks for you
            </Dialog.Title>
            <p className="text-sm text-gray-500">
              Click a video or continue searching for the right recording.
            </p>

            {/* Placeholder result cards */}
            {['Recommended Talk', 'Related Talk 1', 'Related Talk 2'].map((title, i) => (
              <div
                key={i}
                className="border p-4 rounded shadow-sm hover:shadow transition cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{title}</h3>
                  {i === 0 && (
                    <span className="ml-2 inline-block bg-orange-200 text-orange-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">Short summary of the talk...</p>
              </div>
            ))}

            <div className="flex justify-end">
              <button
                onClick={() => setModalOpen(false)}
                className="text-sm text-orange-600 hover:underline"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

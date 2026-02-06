"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

// Types
interface MessMeal { meal_type: string; menu: string; rating: number; }
interface MailSummary { action_item: string; category: string; is_urgent: boolean; }
interface SentimentResult { sentiment: string; score: number; emoji: string; is_toxic: boolean; }
interface ExtractionResult { deadlines: string[]; events: string[]; }

export default function NexusDashboard() {
  const [messMenu, setMessMenu] = useState<MessMeal[]>([]);
  
  // Feature 1: Mail Summary
  const [summaryInput, setSummaryInput] = useState("");
  const [emails, setEmails] = useState<MailSummary[]>([]);
  const [isSummarizing, setIsSummarizing] = useState(false);

  // Feature 2: Sentiment
  const [feedbackText, setFeedbackText] = useState("");
  const [sentiment, setSentiment] = useState<SentimentResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Feature 3: Deadline Extractor (New)
  const [extractorInput, setExtractorInput] = useState("");
  const [extraction, setExtraction] = useState<ExtractionResult | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/mess-menu')
      .then(res => setMessMenu(res.data))
      .catch(console.error);
  }, []);

  const handleSummarize = async () => {
    if (!summaryInput) return;
    setIsSummarizing(true);
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/summarize', { subject: "Input", body: summaryInput });
      setEmails([res.data, ...emails]);
      setSummaryInput("");
    } catch { alert("Backend Error"); } finally { setIsSummarizing(false); }
  };

  const handleSentiment = async () => {
    if (!feedbackText) return;
    setIsAnalyzing(true);
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/analyze-sentiment', { text: feedbackText });
      setSentiment(res.data);
    } catch { alert("Backend Error"); } finally { setIsAnalyzing(false); }
  };

  const handleExtraction = async () => {
    if (!extractorInput) return;
    setIsExtracting(true);
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/extract-deadlines', { subject: "Input", body: extractorInput });
      setExtraction(res.data);
    } catch { alert("Backend Error"); } finally { setIsExtracting(false); }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-6">
      <header className="max-w-7xl mx-auto mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-indigo-600">Project Nexus</h1>
        <p className="text-slate-500 mt-2">Campus Super-App: 4 Intelligent Modules</p>
      </header>

      {/* 2x2 GRID LAYOUT */}
      <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto">
          
        {/* 1. MESS MENU */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            🍽️ <span className="underline decoration-green-400">Live Mess Menu</span>
          </h2>
          <div className="space-y-4">
            {messMenu.map((meal, idx) => (
              <div key={idx} className="flex justify-between border-b pb-2 last:border-0">
                <span className="font-bold text-slate-600">{meal.meal_type}</span>
                <span className="text-right">{meal.menu} <span className="text-yellow-500">★{meal.rating}</span></span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. CAMPUS VOICE (SENTIMENT) */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            📢 <span className="underline decoration-rose-400">Voice AI</span>
          </h2>
          <div className="flex gap-2">
            <input className="flex-1 p-2 border rounded bg-slate-50 text-sm" 
              placeholder="e.g. Food was great!" value={feedbackText} onChange={e => setFeedbackText(e.target.value)} />
            <button onClick={handleSentiment} className="bg-rose-600 text-white px-4 rounded font-bold text-sm">Analyze</button>
          </div>
          {sentiment && (
            <div className="mt-4 p-3 bg-slate-50 rounded flex items-center justify-between">
              <span className="text-2xl">{sentiment.emoji}</span>
              <span className="font-bold">{sentiment.sentiment}</span>
              <span className="text-xs text-slate-400">Score: {sentiment.score}</span>
            </div>
          )}
        </div>

        {/* 3. MAIL SUMMARIZER */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            🤖 <span className="underline decoration-blue-400">Mail Summarizer</span>
          </h2>
          <textarea className="w-full p-2 border rounded bg-slate-50 text-sm mb-2" rows={2}
            placeholder="Paste long email..." value={summaryInput} onChange={e => setSummaryInput(e.target.value)} />
          <button onClick={handleSummarize} disabled={isSummarizing} className="w-full bg-indigo-600 text-white font-bold py-2 rounded text-sm">
            {isSummarizing ? "..." : "Get Quick Summary"}
          </button>
          <div className="mt-3 space-y-2">
            {emails.slice(0, 2).map((mail, idx) => (
              <div key={idx} className={`p-2 rounded border-l-4 text-sm ${mail.is_urgent ? 'border-red-500 bg-red-50' : 'border-blue-500 bg-blue-50'}`}>
                <b>{mail.category}:</b> {mail.action_item}
              </div>
            ))}
          </div>
        </div>

        {/* 4. DEADLINE EXTRACTOR (NEW) */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            📅 <span className="underline decoration-purple-400">Event Extractor</span>
          </h2>
          <p className="text-xs text-slate-500 mb-2">Extracts dates & deadlines automatically.</p>
          <textarea className="w-full p-2 border rounded bg-slate-50 text-sm mb-2" rows={2}
            placeholder="e.g. Quiz on 12th March, submit by 5 PM..." value={extractorInput} onChange={e => setExtractorInput(e.target.value)} />
          <button onClick={handleExtraction} disabled={isExtracting} className="w-full bg-purple-600 text-white font-bold py-2 rounded text-sm">
            {isExtracting ? "Scanning..." : "Extract Dates"}
          </button>
          
          {extraction && (
            <div className="mt-3 grid grid-cols-2 gap-4 text-xs">
              <div className="bg-red-50 p-2 rounded border border-red-100">
                <strong className="text-red-700 block mb-1">Deadlines</strong>
                {extraction.deadlines.length ? (
                  <ul className="list-disc pl-3 text-red-600 space-y-1">
                    {extraction.deadlines.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                ) : <span className="text-slate-400">None detected</span>}
              </div>
              <div className="bg-blue-50 p-2 rounded border border-blue-100">
                <strong className="text-blue-700 block mb-1">Events</strong>
                {extraction.events.length ? (
                  <ul className="list-disc pl-3 text-blue-600 space-y-1">
                    {extraction.events.map((e, i) => <li key={i}>{e}</li>)}
                  </ul>
                ) : <span className="text-slate-400">None detected</span>}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
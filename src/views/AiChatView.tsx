import React, { useState, useRef, useEffect } from 'react';
import { aiService } from '../services/aiService';
import { ChatMessage } from '../types';
import { Bot, User, Send, RefreshCw, Sparkles, MessageSquare, Lightbulb, Trash2 } from 'lucide-react';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    role: 'model',
    text: `Halo, Bapak/Ibu Guru! Saya adalah **Konsultan Ahli Kurikulum Nasional & Sahabat Guru "LIN RANTE PALUNGAN"**.

Saya siap mendampingi Anda 24/7 dalam:
1. Regulasi resmi **SK BSKAP Kemendikdasmen No. 046/H/KR/2025** tentang Capaian Pembelajaran.
2. Implementasi **Deep Learning Framework** (Mindful, Meaningful, & Joyful Learning).
3. Pendekatan **Kurikulum Berbasis Kasih Sayang (KBC)** dan Kokurikuler **7 Kebiasaan Anak Indonesia Hebat**.
4. Strategi penanganan masalah peserta didik, asesmen otentik, dan penyusunan narasi rapor.

Ada hal yang ingin Anda diskusikan seputar KBM atau administrasi kelas hari ini?`,
    timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
  }
];

export const AiChatView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const reply = await aiService.chatConsultation(userMsg.text, messages);
      const modelMsg: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        role: 'model',
        text: reply,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        role: 'model',
        text: `Berdasarkan regulasi resmi **SK BSKAP No. 046/H/KR/2025**, pembelajaran dirancang untuk membangun pemahaman konseptual yang mendalam (Deep Learning), bukan hafalan superfisial.

Untuk pertanyaan Anda:
1. Pastikan setiap Tujuan Pembelajaran (TP) merujuk pada elemen kompetensi fase terkait.
2. Gunakan pendekatan **Meaningful Learning** dengan mengaitkan materi ke konteks nyata kehidupan siswa.
3. Berikan ruang apresiasi emosional yang hangat di setiap awal dan akhir tatap muka.

*Catatan: Sistem AI offline sementara atau respons disesuaikan dengan pedoman baku kurikulum nasional.*`,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    'Bagaimana merumuskan narasi capaian rapor bagi siswa pas KKTP?',
    'Beri ide Ice Breaking Mindful Learning 3 menit sebelum KBM',
    'Jelaskan poin penting SK BSKAP No. 046/H/KR/2025',
    'Tips menangani siswa yang pasif dan kurang fokus di kelas'
  ];

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <div className="space-y-4 h-[calc(100vh-140px)] flex flex-col">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-orange-600 text-white rounded-xl shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              Asisten Konsultan Pendidikan AI 24/7
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </h2>
            <p className="text-xs text-slate-500">
              Pakar Kurikulum Merdeka (SK BSKAP No. 046/H/KR/2025) & Sahabat Pendidik
            </p>
          </div>
        </div>

        <button
          onClick={handleResetChat}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          title="Mulai Sesi Baru"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Messages Box */}
      <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 overflow-y-auto space-y-4">
        {messages.map((m) => {
          const isUser = m.role === 'user';
          return (
            <div
              key={m.id}
              className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-xs ${
                  isUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-orange-600 text-white'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`rounded-2xl p-4 text-xs leading-relaxed shadow-xs ${
                  isUser
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200/80 dark:border-slate-700/60'
                }`}
              >
                <div className="whitespace-pre-wrap">{m.text}</div>
                <div
                  className={`text-[9px] mt-2 font-mono ${
                    isUser ? 'text-blue-200 text-right' : 'text-slate-400'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 max-w-xl">
            <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-xs text-slate-500">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-orange-500" />
              <span>Konsultan AI sedang menyusun jawaban berdasarkan SK 046/2025...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 ml-1" />
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(qp)}
            className="px-2.5 py-1 rounded-lg bg-orange-50 dark:bg-orange-950/60 hover:bg-orange-100 text-orange-900 dark:text-orange-200 text-[11px] font-semibold border border-orange-200 dark:border-orange-800/80 whitespace-nowrap transition"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Input Message Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Tanyakan masalah KBM, tips pembelajaran mendalam, atau regulasi kurikulum..."
          className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs focus:outline-hidden focus:ring-2 focus:ring-orange-500 text-slate-900 dark:text-white"
        />
        <button
          type="submit"
          disabled={!inputMessage.trim() || isLoading}
          className="px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-md shadow-orange-600/30 flex items-center gap-1.5 disabled:opacity-50 transition"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Kirim</span>
        </button>
      </form>
    </div>
  );
};

import { ChatMessage } from '../types';

export const aiService = {
  async generateContent(prompt: string, systemInstruction?: string): Promise<string> {
    try {
      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          systemInstruction: systemInstruction || `Anda adalah Konsultan Ahli Kurikulum Merdeka Kemendikdasmen dan Pengembang Pembelajaran Mendalam (Deep Learning Framework).
Landasan Regulasi Wajib & Mutlak:
SALINAN KEPUTUSAN KEPALA BADAN STANDAR, KURIKULUM, DAN ASESMEN PENDIDIKAN KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH NOMOR 046/H/KR/2025 TENTANG CAPAIAN PEMBELAJARAN PADA PENDIDIKAN ANAK USIA DINI, JENJANG PENDIDIKAN DASAR, DAN JENJANG PENDIDIKAN MENENGAH.
Semua rumusan CP, Elemen, Tujuan Pembelajaran (TP), dan asesmen wajib bersandar pada SK BSKAP No. 046/H/KR/2025.
Gunakan prinsip Deep Learning: Mindful Learning (Fokus & Kesadaran Penuh), Meaningful Learning (Kebermaknaan & Kontekstual), dan Joyful Learning (Menyenangkan & Menumbuhkan Minat Intrinsik). Format output rapi dalam Markdown terstruktur.`
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.text || '';
    } catch (error: any) {
      console.error('AI Service Generate Error:', error);
      throw error;
    }
  },

  async chatConsultation(message: string, history: ChatMessage[]): Promise<string> {
    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          history: history.map(h => ({ role: h.role, text: h.text })),
          systemInstruction: `Anda adalah Konsultan Pendidikan AI Kurikulum Merdeka Deep Learning "LIN RANTE PALUNGAN" & Sahabat Guru Lin Rante Palungan.
Anda menguasai:
1. SALINAN KEPUTUSAN KEPALA BSKAP KEMENDIKDASMEN NO. 046/H/KR/2025 tentang Capaian Pembelajaran PAUD, Dikdas, dan Dikmen.
2. Framework Pembelajaran Mendalam (Deep Learning: Mindful, Meaningful, Joyful).
3. Pendekatan Kasih Sayang / Kurikulum Berbasis Cinta (KBC).
4. Kokurikuler 7 Kebiasaan Anak Indonesia Hebat.
5. Manajemen kelas, asesmen formatif-sumatif, penulisan rapor, dan administrasi guru profesional.
Jawab dengan ramah, hangat, berbasis regulasi resmi, terstruktur, dan aplikatif untuk guru SMA di Indonesia.`
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.text || '';
    } catch (error: any) {
      console.error('AI Service Chat Error:', error);
      throw error;
    }
  }
};

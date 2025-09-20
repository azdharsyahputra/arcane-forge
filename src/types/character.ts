export type Skill = {
  name: string;
  power: number;
};

export type Character = {
  id: number;
  name: string;
  level: number;
  exp: number;             // EXP total saat ini
  expToNextLevel: number;  // EXP yang dibutuhkan untuk level berikutnya
  totalExp: number;        // total EXP akumulatif
  completedQuests: number; // jumlah quest yang sudah selesai
  totalQuests: number;     // total quest yang ada
  streak: number;          // daily streak
  lastClaim?: string;      // ISO string terakhir kali streak diclaim
  avatar?: string;         // URL gambar avatar
  skills?: Skill[];        // daftar skill karakter
  maxHp?: number;          // maksimal HP
};

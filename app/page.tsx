//page.tsx ทำงานในฝั่ง layout เท่านั้น แยกฝั่ง logic ไปอยู่ที่ SearchClient เพื่อให้สามารถใช้ useSearchParams ได้ เพื่อทำเป็น Static Site Generation (SSG)
import { Suspense } from 'react';
import SearchClient from './components/SearchClient';

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-8 text-purple-700 drop-shadow-md">
        🔎 Pokémon Search
      </h1>

      <Suspense fallback={<p className="text-center mt-10 text-gray-400">Loading...</p>}>
        <SearchClient />
      </Suspense>
    </main>
  );
}
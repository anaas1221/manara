import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/providers/ThemeProvider';
import { Shell } from './components/layout/Shell';

import Home from './pages/Home';
import Quran from './pages/Quran';
import Adhkar from './pages/Adhkar';
import AdhkarSession from './pages/AdhkarSession';
import Duas from './pages/Duas';
import HadithPage from './pages/Hadith';
import Prayer from './pages/Prayer';
import Qibla from './pages/Qibla';
import Mosques from './pages/Mosques';
import Tasbeeh from './pages/Tasbeeh';
import Names from './pages/Names';
import Hajj from './pages/Hajj';
import Library from './pages/Library';
import Learn from './pages/Learn';
import LessonView from './pages/LessonView';
import MyJourney from './pages/MyJourney';
import Settings from './pages/Settings';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Shell>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quran" element={<Quran />} />
            <Route path="/adhkar" element={<Adhkar />} />
            <Route path="/adhkar/:slug" element={<AdhkarSession />} />
            <Route path="/duas" element={<Duas />} />
            <Route path="/hadith" element={<HadithPage />} />
            <Route path="/prayer" element={<Prayer />} />
            <Route path="/qibla" element={<Qibla />} />
            <Route path="/mosques" element={<Mosques />} />
            <Route path="/tasbeeh" element={<Tasbeeh />} />
            <Route path="/names" element={<Names />} />
            <Route path="/hajj" element={<Hajj />} />
            <Route path="/library" element={<Library />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/learn/lesson/:id" element={<LessonView />} />
            <Route path="/my-journey" element={<MyJourney />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Shell>
      </BrowserRouter>
    </ThemeProvider>
  );
}
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Lessons = lazy(() => import('./pages/Lessons').then(m => ({ default: m.Lessons })));
const LessonDetail = lazy(() => import('./pages/LessonDetail').then(m => ({ default: m.LessonDetail })));
const Prompts = lazy(() => import('./pages/Prompts').then(m => ({ default: m.Prompts })));
const PromptGenerator = lazy(() => import('./pages/PromptGenerator').then(m => ({ default: m.PromptGenerator })));
const Guides = lazy(() => import('./pages/Guides').then(m => ({ default: m.Guides })));
const GuideDetail = lazy(() => import('./pages/GuideDetail').then(m => ({ default: m.GuideDetail })));
const Community = lazy(() => import('./pages/Community').then(m => ({ default: m.Community })));
const CommunityDetail = lazy(() => import('./pages/CommunityDetail').then(m => ({ default: m.CommunityDetail })));
const Settings = lazy(() => import('./pages/Settings').then(m => ({ default: m.Settings })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-pulse text-muted-foreground">Loading...</div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Lessons */}
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/lessons/:category" element={<Lessons />} />
          <Route path="/lessons/:category/:slug" element={<LessonDetail />} />
          
          {/* Prompts */}
          <Route path="/prompts" element={<Prompts />} />
          <Route path="/prompts/generator" element={<PromptGenerator />} />
          
          {/* Guides */}
          <Route path="/guides" element={<Guides />} />
          <Route path="/guides/:model" element={<GuideDetail />} />
          
          {/* Community */}
          <Route path="/community" element={<Community />} />
          <Route path="/community/:id" element={<CommunityDetail />} />
          
          {/* Settings & About */}
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

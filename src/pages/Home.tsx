import { AppShell } from '../components/layout';
import { ProgressOverview } from '../components/home/ProgressOverview';
import { FeaturedLessons } from '../components/home/FeaturedLessons';
import { QuickStartPrompts } from '../components/home/QuickStartPrompts';
import { RecentGuides } from '../components/home/RecentGuides';
import { HeroSection } from '../components/home/HeroSection';

export function Home() {
  return (
    <AppShell>
      <div className="space-y-12">
        <HeroSection />
        <ProgressOverview />
        <FeaturedLessons />
        <QuickStartPrompts />
        <RecentGuides />
      </div>
    </AppShell>
  );
}

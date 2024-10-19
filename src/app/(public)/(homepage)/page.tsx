import React, { lazy, Suspense } from 'react';

import Hero from './Hero';
import SkeletonHomePage from './SkeletonHomePage';

// Lazy load components
const WeeklyActivities = lazy(() => import('./WeeklyActivities'));
const FullScreenCalendar = lazy(() => import('./FullScreenCalender'));
const Pricing = lazy(() => import('./Pricing'));
const Testimonials = lazy(() => import('./Testimonials'));
const CallToAction = lazy(() => import('./CallToAction'));
const Footer = lazy(() => import('./Footer'));

export default function HomePage(): React.JSX.Element {
  return (
    <>
      <Hero />
      <Suspense fallback={<SkeletonHomePage />}>
        <WeeklyActivities />
        <FullScreenCalendar />
        <Pricing />
        <Testimonials />
        <CallToAction />
        <Footer />
      </Suspense>
    </>
  );
}

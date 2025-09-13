'use client';

import { Suspense } from 'react';
import LeadCaptureGate from '@/components/landing/LeadCaptureGate';

export default function LeadCapturePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LeadCaptureGate />
    </Suspense>
  );
} 
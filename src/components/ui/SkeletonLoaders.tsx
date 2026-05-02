import React from 'react';
import { cn } from '@/lib/utils';

export const SkeletonSection = ({ className, heightClass = 'h-96' }: { className?: string; heightClass?: string }) => (
  <section className={cn('w-full py-12 md:py-24 lg:py-32 overflow-hidden', className)}>
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <div className="skeleton-shimmer h-8 w-64 md:w-96 rounded-lg bg-card/20 mx-auto" />
          <div className="skeleton-shimmer h-4 w-48 md:w-72 rounded-lg bg-card/20 mx-auto" />
        </div>
      </div>
      <div className={cn('mt-8 rounded-xl bg-card/10 border border-white/5 skeleton-shimmer w-full', heightClass)} />
    </div>
  </section>
);

export const SkeletonCards = ({ count = 3 }: { count?: number }) => (
  <section className="w-full py-12 md:py-24 lg:py-32">
    <div className="container px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="rounded-xl border border-white/5 bg-card/10 p-6 flex flex-col space-y-4">
            <div className="skeleton-shimmer h-12 w-12 rounded-full bg-card/20" />
            <div className="space-y-2">
              <div className="skeleton-shimmer h-6 w-3/4 rounded bg-card/20" />
              <div className="skeleton-shimmer h-4 w-full rounded bg-card/20" />
              <div className="skeleton-shimmer h-4 w-5/6 rounded bg-card/20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const SkeletonHero = () => (
  <div className="relative w-full h-[80vh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
    <div className="space-y-6 text-center z-10 w-full max-w-4xl px-4">
      <div className="skeleton-shimmer h-8 w-48 rounded-full bg-card/20 mx-auto" />
      <div className="skeleton-shimmer h-16 md:h-24 w-full max-w-3xl rounded-xl bg-card/20 mx-auto" />
      <div className="skeleton-shimmer h-6 w-full max-w-2xl rounded-lg bg-card/20 mx-auto" />
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
        <div className="skeleton-shimmer h-14 w-48 rounded-lg bg-card/20" />
        <div className="skeleton-shimmer h-14 w-48 rounded-lg bg-card/20" />
      </div>
    </div>
  </div>
);

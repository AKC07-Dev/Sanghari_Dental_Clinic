import type { ReactNode } from "react";

export function PageHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-bold uppercase tracking-[0.13em] text-clinic-blue">{eyebrow}</p>
      <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-clinic-navy sm:text-5xl">{title}</h1>
      {children && <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{children}</p>}
    </div>
  );
}
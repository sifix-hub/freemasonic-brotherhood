import type { SVGProps } from "react";

const paths = {
  arrow: "M4 12h15m-6-6 6 6-6 6",
  heart: "M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6l1.2 1.2L12 21l7.6-7.6 1.2-1.2a5.4 5.4 0 0 0 0-7.6Z",
  shield: "M12 22s7-3.4 7-10V5l-7-3-7 3v7c0 6.6 7 10 7 10Zm-3-10 2 2 4-4",
  hands: "M2 13h4l4-4a2 2 0 0 1 3 0l2 2a2 2 0 0 1-3 3l-1-1m-9 3h5l4 3h6l5-5m-6-5 2-2 4 4",
  growth: "M3 3v18h18M6 15l5-5 4 4 6-7m-5 0h5v5",
  star: "m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6Z",
  lock: "M6 11h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Zm2 0V7a4 4 0 0 1 8 0v4m-4 4v2",
  menu: "M3 6h18M3 12h18M3 18h18",
  close: "m6 6 12 12M18 6 6 18",
  previous: "m15 18-6-6 6-6",
  next: "m9 18 6-6-6-6",
  search: "M21 21l-5-5m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z",
  mail: "M3 5h18v14H3zM3 6l9 7 9-7",
};

export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: keyof typeof paths }) {
  return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[name]} /></svg>;
}

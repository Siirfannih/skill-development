import React from 'react';
import {siGithub} from 'simple-icons';

export type IconName = 'repo' | 'folder' | 'file' | 'branch' | 'code' | 'issue' | 'pull' | 'clock' | 'chevron' | 'search' | 'menu' | 'check' | 'github';

const paths: Record<Exclude<IconName, 'github'>, React.ReactNode> = {
  repo: <><path d="M4 3h14v18H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 14h14M7 3v10M7 20h6" /></>,
  folder: <path d="M2 6a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1Z" fill="currentColor" stroke="none" />,
  file: <><path d="M5 2h9l5 5v15H5ZM14 2v6h5M8 13h8M8 17h8" /></>,
  branch: <><circle cx="6" cy="4" r="2.5"/><circle cx="6" cy="20" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M6 6.5v11M18 7.5c0 5-12 3-12 8"/></>,
  code: <path d="m8 5-7 7 7 7m8-14 7 7-7 7m-3-17-3 20" />,
  issue: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/></>,
  pull: <><circle cx="5" cy="4" r="2"/><circle cx="5" cy="20" r="2"/><circle cx="19" cy="20" r="2"/><path d="M5 6v12M19 18V8a4 4 0 0 0-4-4h-3m3-3-3 3 3 3"/></>,
  clock: <><path d="M3 7a9 9 0 1 1-1 7M2 3v5h5M12 6v6l4 2"/></>,
  chevron: <path d="m7 10 5 5 5-5" />,
  search: <><circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/></>,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  check: <path d="m5 12 5 5L20 7" />,
};

export const Icon: React.FC<{name: IconName; size?: number; color?: string}> = ({name, size = 24, color = 'currentColor'}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden style={{display: 'block', flexShrink: 0, color}} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
    {name === 'github' ? <path d={siGithub.path} fill="currentColor" stroke="none" /> : paths[name]}
  </svg>
);

import React, {useEffect, useState} from 'react';
import {AbsoluteFill, cancelRender, continueRender, delayRender, Freeze, interpolateColors, useCurrentFrame} from 'remotion';
import {move} from '../lib/curves';
import {cameraK01} from './K01/camera';
import {REPO} from './K01/data';
import {fontCss} from './K01/fonts';
import {Icon, type IconName} from './K01/icons';

export type RepoGitHubProps = {mulai: number; kSelesai: number};

const C = {ink: '#1F2328', muted: '#59636E', line: '#D0D7DE', soft: '#F6F8FA', blue: '#0969DA', green: '#1A7F37'};
const rowStart = (mulai: number, index: number) => mulai + 10 + index * 2;
const ellipsis: React.CSSProperties = {overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'};
const flex: React.CSSProperties = {display: 'flex', alignItems: 'center'};
const button: React.CSSProperties = {...flex, height: 48, gap: 12, padding: '0 20px', border: `1px solid ${C.line}`, borderRadius: 7, background: C.soft, fontWeight: 600, fontSize: 22};

export const objekK01 = ({mulai, kSelesai}: RepoGitHubProps): {nama: string; frame: number; peran: string}[] => [
  {nama: `${REPO.owner}/${REPO.name}`, frame: mulai, peran: 'transisi-dunia'},
  ...REPO.rows.map((row, index) => ({nama: row.name, frame: rowStart(mulai, index), peran: 'objek-mendarat'})),
  {nama: `Commit ${REPO.commits[0].hash} selesai`, frame: kSelesai, peran: 'terverifikasi'},
];

const Avatar: React.FC<{size?: number}> = ({size = 38}) => <div style={{...flex, justifyContent: 'center', width: size, height: size, borderRadius: '50%', background: '#E4E8EC', color: C.ink, fontSize: size * 0.36, fontWeight: 600, flexShrink: 0}}>SI</div>;

const CommitStatus: React.FC<{frame: number; kSelesai: number}> = ({frame, kSelesai}) => {
  const change = move(frame, kSelesai - 1, 1, 'whip');
  const ring = move(frame, kSelesai, 10, 'land');
  const scale = 0.72 + 0.31 * move(frame, kSelesai, 7, 'land') - 0.03 * move(frame, kSelesai + 7, 7, 'heavy');
  return <div data-k01="commit-status" style={{position: 'relative', width: 34, height: 34, flexShrink: 0}}>
    <div style={{position: 'absolute', inset: 4, border: `2px solid ${C.muted}`, borderRadius: '50%', opacity: 1 - change}} />
    <div data-k01="status-ring" style={{position: 'absolute', inset: 0, border: `2px solid ${C.green}`, borderRadius: '50%', opacity: change * (1 - ring), transform: `scale(${1 + 1.2 * ring})`}} />
    <div style={{...flex, justifyContent: 'center', position: 'absolute', inset: 0, background: C.green, color: '#FFFFFF', borderRadius: '50%', opacity: change, transform: `scale(${scale})`}}><Icon name="check" size={26}/></div>
  </div>;
};

const RepoGitHubScene: React.FC<RepoGitHubProps & {eventFrame: number}> = ({mulai, kSelesai, eventFrame}) => {
  const frame = useCurrentFrame();
  const entrance = move(frame, mulai, 16, 'land');
  const camera = cameraK01(frame, mulai, kSelesai);
  const done = move(eventFrame, kSelesai - 1, 1, 'whip');
  const highlight = move(eventFrame, kSelesai + 10, 22, 'leave');
  const latest = REPO.commits[0];
  const visibility: string | null = REPO.visibility;
  const tabs: {label: string; icon?: IconName}[] = [
    {label: 'Code', icon: 'code'}, {label: 'Issues', icon: 'issue'}, {label: 'Pull requests', icon: 'pull'},
    {label: 'Actions', icon: 'clock'}, {label: 'Projects'}, {label: 'Security'}, {label: 'Insights'},
  ];

  return <AbsoluteFill style={{background: '#FFFFFF', color: C.ink, fontFamily: 'K01Inter', overflow: 'hidden'}}>
    <AbsoluteFill data-k01="camera" style={{transformOrigin: '0 0', transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.scale})`}}>
      <div style={{position: 'absolute', inset: '0 0 auto', height: 260, background: C.soft, borderBottom: `1px solid ${C.line}`}}>
        <div style={{...flex, height: 90, padding: '0 46px', gap: 28}}>
          <div style={{...button, width: 48, padding: 0, justifyContent: 'center'}}><Icon name="menu"/></div>
          <Icon name="github" size={42}/>
          <span style={{fontSize: 22}}>{REPO.owner}</span><span style={{color: C.muted, fontSize: 26}}>/</span><strong style={{fontSize: 22}}>{REPO.name}</strong>
          <div style={{...flex, marginLeft: 'auto', gap: 14, height: 44, width: 370, border: `1px solid ${C.line}`, padding: '0 16px', borderRadius: 7, color: C.muted, fontSize: 20}}><Icon name="search" size={21}/>Type / to search</div>
          <Avatar size={42}/>
        </div>
        <div data-k01="repo-header" style={{...flex, height: 92, padding: '0 96px', gap: 14, transform: `translateY(${16 * (1 - entrance)}px)`, opacity: entrance}}>
          <Icon name="repo" size={28} color={C.muted}/>
          <span style={{fontSize: 32, color: C.blue}}>{REPO.owner}<span style={{color: C.muted, padding: '0 13px'}}>/</span><strong>{REPO.name}</strong></span>
          {visibility && <span style={{fontSize: 19, border: `1px solid ${C.line}`, borderRadius: 20, padding: '3px 12px', color: C.muted}}>{visibility}</span>}
        </div>
        <div style={{...flex, height: 78, padding: '0 84px', gap: 14}}>{tabs.map(({label, icon}, index) => <div key={label} style={{...flex, position: 'relative', height: '100%', padding: '0 16px', gap: 12, fontSize: 23, fontWeight: index === 0 ? 600 : 400}}>
          {icon && <Icon name={icon} color={C.muted} size={23}/>}<span>{label}</span>
          {index === 0 && <div style={{position: 'absolute', bottom: 0, height: 4, left: 0, right: 0, background: '#FD8C73', borderRadius: 4}}/>}
        </div>)}</div>
      </div>

      <div data-k01="file-panel" style={{position: 'absolute', left: 96, top: 282, width: 1278}}>
        <div style={{...flex, justifyContent: 'space-between', marginBottom: 20}}>
          <div style={{...flex, gap: 25}}><div style={button}><Icon name="branch" size={24}/>{REPO.branch}<Icon name="chevron" size={20}/></div><span style={{...flex, gap: 9, color: C.muted, fontSize: 21}}><Icon name="branch" size={22}/>Branches</span><span style={{fontSize: 21, color: C.muted}}>Tags</span></div>
          <div style={{...flex, gap: 14}}><div style={{...button, background: '#FFFFFF', fontWeight: 400}}>Go to file</div><div style={button}>Add file<Icon name="chevron" size={19}/></div><div style={{...button, background: C.green, borderColor: '#176B30', color: '#FFFFFF'}}><Icon name="code" size={23}/>Code<Icon name="chevron" size={20}/></div></div>
        </div>
        <div style={{border: `1px solid ${C.line}`, borderRadius: 8, overflow: 'hidden'}}>
          <div data-k01="latest-commit" style={{...flex, gap: 14, height: 76, padding: '0 21px', background: interpolateColors(done * (1 - highlight * 0.64), [0, 1], [C.soft, '#DAFBE1']), borderBottom: `1px solid ${C.line}`}}>
            <Avatar/><strong style={{fontSize: 21}}>{REPO.owner}</strong>
            <span style={{...ellipsis, fontSize: 21, flex: 1}}>{latest.subject}</span>
            <span style={{fontSize: 20, color: C.muted}}>{latest.hash}</span>
            <CommitStatus frame={eventFrame} kSelesai={kSelesai}/>
            <span style={{...flex, gap: 8, fontSize: 20, whiteSpace: 'nowrap'}}><Icon name="clock" size={24}/><strong>{REPO.commitCount}</strong> commits</span>
          </div>
          {REPO.rows.map((row, index) => {
            const landed = move(frame, rowStart(mulai, index), 14, 'land');
            const blur = 1 - move(frame, rowStart(mulai, index), 3, 'leave');
            return <div key={row.name} data-k01={`row-${row.name}`} style={{...flex, height: 36, padding: '0 22px', gap: 14, borderBottom: index === REPO.rows.length - 1 ? undefined : '1px solid #E8EBEF', opacity: landed, transform: `translateY(${24 * (1 - landed)}px) scale(${0.92 + 0.08 * landed})`, transformOrigin: 'left center', filter: `blur(${1.1 * blur}px)`}}>
              <Icon name={row.kind === 'folder' ? 'folder' : 'file'} color={row.kind === 'folder' ? '#54AEFF' : C.muted} size={24}/>
              <span style={{width: 254, flexShrink: 0, fontSize: 22, color: C.blue}}>{row.name}</span>
              <span style={{...ellipsis, flex: 1, fontSize: 21, color: C.muted}}>{row.subject}</span>
              <span style={{width: 167, textAlign: 'right', flexShrink: 0, fontSize: 20, color: C.muted}}>{row.relative}</span>
            </div>;
          })}
        </div>
        <div data-k01="readme" style={{marginTop: 20, border: `1px solid ${C.line}`, borderRadius: 8, background: '#FFFFFF'}}>
          <div style={{...flex, height: 46, gap: 12, padding: '0 24px', borderBottom: `1px solid ${C.line}`, fontSize: 20, fontWeight: 600}}><Icon name="file" size={21}/>README</div>
          <div style={{fontSize: 33, fontWeight: 600, padding: '22px 35px 32px'}}>{REPO.name}</div>
        </div>
      </div>

      <aside data-k01="history" style={{position: 'absolute', left: 1458, top: 307, width: 344}}>
        <div style={{fontSize: 25, fontWeight: 600, paddingBottom: 20, borderBottom: `1px solid ${C.line}`}}>Commits</div>
        {REPO.commits.slice(1).map((commit, index) => <div key={commit.hash} style={{padding: '8px 0', borderBottom: index < 3 ? '1px solid #E8EBEF' : undefined}}>
          <div style={{...flex, justifyContent: 'space-between', gap: 8, fontSize: 19, marginBottom: 5}}><span style={{color: C.blue, fontWeight: 600}}>{commit.hash}</span><span style={{color: C.muted}}>{commit.relative}</span></div>
          <div style={{...ellipsis, fontSize: 20}}>{commit.subject}</div>
        </div>)}
      </aside>
    </AbsoluteFill>
  </AbsoluteFill>;
};

export const RepoGitHub: React.FC<RepoGitHubProps> = (props) => {
  const frame = useCurrentFrame();
  const [fontHandle] = useState(() => delayRender('K01 Inter lokal'));
  useEffect(() => {
    Promise.all([document.fonts.load('400 24px K01Inter'), document.fonts.load('600 24px K01Inter')])
      .then((fonts) => {
        if (fonts.some((faces) => faces.length === 0)) throw new Error('K01: Inter lokal tidak termuat');
        continueRender(fontHandle);
      }).catch(cancelRender);
  }, [fontHandle]);
  const heavy = frame > props.kSelesai - 20 && frame < props.kSelesai;
  return <AbsoluteFill style={{background: '#FFFFFF'}}>
    <style>{fontCss}</style>
    <AbsoluteFill data-k01="viewport" style={{isolation: 'isolate', clipPath: 'polygon(0 0, 100% 0, 100% 61.111111%, 78.125% 61.111111%, 78.125% 100%, 0 100%)'}}>
      {heavy ? Array.from({length: 16}, (_, sample) => <AbsoluteFill key={sample} style={{mixBlendMode: 'plus-lighter', opacity: 1 / 16}}>
        {/* Shutter 180°, 16 sampel subframe terpusat tanpa jejak lintas frame. */}
        <Freeze frame={frame + (sample / 15 - 0.5) * 0.5}><RepoGitHubScene {...props} eventFrame={frame}/></Freeze>
      </AbsoluteFill>) : <RepoGitHubScene {...props} eventFrame={frame}/>}
    </AbsoluteFill>
  </AbsoluteFill>;
};

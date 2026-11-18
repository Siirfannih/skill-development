import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {move, react} from '../lib/curves';
import {BARIS, KEPALA} from '../komponen/K06-TabelKeputusan';
import {PanelChatGPT, PanelClaude} from './Panel';
import {FONT_CSS as PANEL_FONTS} from '../komponen/K13/fonts';
import {Character2D, Character3D} from './Karakter';
import {box, C, Canvas07, Check, Fonts, Plate, shadow, Slab} from './kit';

export const PANELS = ['B1b', 'B2', 'B3-A', 'B3-C', 'B4', 'B5', 'B6'] as const;
export type PanelID = typeof PANELS[number];
const poppins: React.CSSProperties = {fontFamily: 'PapanPoppins', fontWeight: 700};
const inter: React.CSSProperties = {fontFamily: 'PapanInter'};

const Ring: React.FC = () => {
  const f = useCurrentFrame();
  return <svg width="1920" height="1080" style={box(0,0)}>
    <defs><path id="head-ring" d="M410 610 C355 80 1355 -30 1515 575"/></defs>
    {['workflow','model','decision'].map((word,i) => <text key={word} fill={i===2 ? '#FFDDB4' : C.paper} fontSize="53" fontFamily="PapanPoppins" fontWeight="700"
      style={{textShadow:'0 4px 13px rgba(0,0,0,.7)',opacity:move(f, 3+react(i,30),12,'reveal')}}>
      <textPath href="#head-ring" startOffset={`${6 + [0,35,62][i]}%`}>{word}</textPath>
    </text>)}
  </svg>;
};

const B1b: React.FC = () => <AbsoluteFill>
  <Plate name="B1b"/>
  <Ring/>
  <Character3D model="chatgpt" x={1240} y={310} size={340} start={8}/>
  <Plate name="B1b" matte/>
  <Character3D model="claude" x={245} y={490} size={440} start={0}/>
  <Character3D model="gemini" x={1430} y={600} size={300} start={14}/>
</AbsoluteFill>;

const BrokenTimeline: React.FC = () => {
  const f = useCurrentFrame();
  const landed = move(f, 13, 23, 'heavy');
  return <div style={{...box(135,680,890,320), transform:`perspective(1400px) translateY(${260*(1-landed)}px) rotateY(12deg) rotateZ(5deg)`, transformOrigin:'50% 50%', opacity:landed}}>
    <div style={{position:'absolute',inset:0,background:'#A9A9AE',borderRadius:25,transform:'translate(5px,12px)'}}/>
    <div style={{position:'absolute',inset:0,background:'#F9F9F6',borderRadius:25,padding:27,boxShadow:shadow}}>
      <div style={{display:'flex',gap:9,alignItems:'center',height:24}}>{[1,2,3].map(i=><span key={i} style={{width:12,height:12,borderRadius:'50%',background:'#B6B9C1'}}/>)}</div>
      <svg width="835" height="230" viewBox="0 0 835 230">
        {Array.from({length:19},(_,i)=><path key={i} d={`M${i*46} 23v${i%3===0?17:9}`} stroke="#B0B5C1" strokeWidth="2"/>)}
        <path d="M10 85H810 M10 167H810" stroke="#E3E4EA" strokeWidth="2"/>
        <rect x="13" y="64" width="270" height="83" rx="10" fill={C.coral}/>
        <path d="M310 65L333 85 316 108 338 128 326 147H530V65Z" fill={C.coral}/>
        <path d="M580 65H810V147H581L595 127 574 107 594 85Z" fill="#DB625E"/>
        <rect x="13" y="164" width="345" height="37" rx="7" fill="#D5DBE8"/>
        <rect x="411" y="164" width="400" height="37" rx="7" fill="#D5DBE8"/>
        <path d="M37 183l8-8 8 17 8-13 8 7 8-12 8 17 8-9 8 4 8-11 8 16 8-11 8 8 8-13 8 14 8-7" fill="none" stroke="#8A96AC" strokeWidth="2"/>
        <path d="M558 40V215" stroke="#E54342" strokeWidth="3"/><path d="M547 39h22l-11 14Z" fill="#E54342"/>
        <text x="47" y="124" fill="#542226" fontFamily="PapanPoppins" fontWeight="800" fontSize="57">putus</text>
        <text x="353" y="124" fill="#542226" fontFamily="PapanPoppins" fontWeight="800" fontSize="57">putus</text>
      </svg>
    </div>
  </div>;
};

const B2: React.FC = () => <AbsoluteFill>
  <Plate name="B2" dim={.84} zoom={1.07}/>
  <Slab text="AI SLOP" x={120} y={55} width={1680} size={560} color={C.coral} angle={-2}/>
  <Plate name="B2" matte zoom={1.07}/>
  <BrokenTimeline/>
</AbsoluteFill>;

const Tag: React.FC<{text: string; x: number; y: number; rotate: number; size: number; climax?: boolean; strike?: boolean; start: number}> = ({text,x,y,rotate,size,climax=false,strike=false,start}) => {
  const f=useCurrentFrame();const a=move(f,start,17,'land');
  const strikeProgress=move(f,60,16,'whip');
  return <div style={{...box(x,y),padding:climax?'17px 35px':'13px 24px',...poppins,fontWeight:climax?800:700,fontSize:size,color:climax?'#59351A':C.paper,whiteSpace:'nowrap',lineHeight:1.25,
    background:climax?'linear-gradient(160deg,#FFF0B3,#FFD54A 48%,#E6A43D)':'rgba(20,22,26,.60)',backdropFilter:'blur(12px)',borderRadius:climax?29:19,
    boxShadow:climax?'inset 0 3px 2px rgba(255,255,255,.9), inset 0 -8px 5px rgba(125,70,20,.25), 0 16px 22px rgba(0,0,0,.27)':undefined,
    transform:`translateX(${-180*(1-a)}px) rotate(${rotate-8*(1-a)}deg) scale(${.85+.15*a})`,opacity:a}}>
    {text}
    {strike&&<svg style={{position:'absolute',inset:0,width:'100%',height:'100%',overflow:'visible'}} viewBox="0 0 650 140" preserveAspectRatio="none"><path d="M-12 101L665 27" fill="none" stroke={C.coral} strokeWidth="13" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-strikeProgress}/></svg>}
  </div>;
};

const B3A: React.FC = () => <AbsoluteFill>
  <Plate name="B3" zoom={1.24} shift={165}/>
  <Tag text="Apple style" x={165} y={190} rotate={-7} size={70} start={0}/>
  <Tag text="cinematic" x={230} y={355} rotate={3} size={70} start={8}/>
  <Tag text="storytelling" x={295} y={510} rotate={-4} size={70} start={15}/>
  <Tag text="template" x={330} y={725} rotate={6} size={103} climax strike start={26}/>
</AbsoluteFill>;

const DecisionWindow: React.FC = () => <div style={{...box(450,245,1265,462),background:'white',borderRadius:28,boxShadow:shadow,overflow:'hidden',transform:'perspective(1500px) rotateY(-8deg) rotateZ(3deg)',...inter,color:C.ink}}>
  <div style={{height:66,background:'#F3F3F0',display:'flex',alignItems:'center',padding:'0 32px',fontSize:25,fontWeight:600,gap:12}}><span style={{width:15,height:15,borderRadius:4,background:C.blue}}/>typography.md · §8a</div>
  <div style={{display:'grid',gridTemplateColumns:'230px 80px 365px 1fr',background:'#F8F8F5',height:54,padding:'0 25px',alignItems:'center',fontSize:21,fontWeight:600}}>{KEPALA.slice(0,4).map(t=><span key={t}>{t}</span>)}</div>
  {BARIS.slice(0,3).map((row,i)=><div key={i} style={{display:'grid',gridTemplateColumns:'230px 80px 365px 1fr',padding:'17px 25px',minHeight:103,boxSizing:'border-box',gap:0,alignItems:'center',fontSize:22,lineHeight:1.4,background:i===1?'#DCE5FF':'white',boxShadow:i===1?'inset 8px 0 #2E5BFF':undefined}}>{row.slice(0,4).map((s,j)=><span key={j} style={{paddingRight:20,fontWeight:i===1?600:400}}>{s}</span>)}</div>)}
</div>;

const PhaseIcon: React.FC<{index: number; color: string}> = ({index,color}) => <svg width="96" height="85" viewBox="0 0 100 88" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
  {index===0?<><path d="M22 10H63L81 28V78H22Z"/><path d="M63 10V30H81M35 44H65M35 59H58"/></>:index===1?<><path d="M12 24H88V66H12Z"/><path d="M30 35L43 45 30 56M53 56H69"/></>:index===2?<><rect x="12" y="15" width="76" height="60" rx="8"/><path d="M19 64L39 44 53 55 72 32 85 45"/></>:index===3?<><path d="M13 44H22L30 19 43 73 54 10 66 65 76 33 85 44H93"/></>:<><circle cx="50" cy="44" r="33"/><path d="M32 44L45 57 69 31"/></>}
</svg>;

const B3C: React.FC = () => {
  const f=useCurrentFrame();
  return <Canvas07>
    <div style={{...box(160,72),...poppins,fontWeight:800,fontSize:169,color:'white',letterSpacing:-8,lineHeight:1}}>workflow</div>
    <DecisionWindow/>
    {['Pra-produksi','Spine suara','Visual','Audio','Finishing'].map((label,i)=>{
      const a=move(f,24+react(i,30),22,'heavy');
      return <div key={label} style={{...box(145+i*333,728-(i%2)*12,300,235),background:i===2?C.yellow:'#FDFDFA',borderRadius:28,boxShadow:shadow,transform:`translateY(${310*(1-a)}px) rotate(${[-5,-2,2,-2,5][i]}deg)`,opacity:a,color:C.ink,padding:28,boxSizing:'border-box'}}>
        <PhaseIcon index={i} color={i===2?'#6E4C11':C.blue}/>
        <div style={{...poppins,fontSize:27,marginTop:18,whiteSpace:'nowrap'}}>{label}</div>
      </div>;
    })}
  </Canvas07>;
};

const PackageCard: React.FC<{x: number; y: number; claude?: boolean; start: number}> = ({x,y,claude=false,start}) => {
  const f=useCurrentFrame();const a=move(f,start,24,'heavy');
  return <div style={{...box(x,y,405,375),transform:`perspective(1400px) translateY(${370*(1-a)}px) rotateY(${claude?-10:13}deg) rotateZ(${claude?6:-7}deg)`,opacity:a}}>
    <div style={{position:'absolute',inset:0,borderRadius:30,background:claude?'#DFBAA6':'#C7D0D8',transform:'translate(7px,13px)'}}/>
    <div style={{position:'absolute',inset:0,borderRadius:30,background:claude?'#FFF3E9':'#FBFBF8',boxShadow:shadow,padding:'36px 34px',color:C.ink,...inter}}>
      <div style={{display:'flex',alignItems:'center',gap:17,height:57}}><Character2D id={claude?'pkg-cl':'pkg-cg'} model={claude?'claude':'chatgpt'} size={60}/><span style={{fontSize:35,fontWeight:700}}>{claude?'Claude Max':'ChatGPT Pro'}</span></div>
      <div style={{fontSize:168,fontWeight:700,lineHeight:1.2,letterSpacing:-9,marginTop:22,color:claude?'#9A412C':'#1F2328'}}>{claude?'5':'20'}<span style={{fontSize:110,letterSpacing:-4}}>×</span></div>
    </div>
  </div>;
};

const B4: React.FC = () => <AbsoluteFill>
  <Plate name="B4" dim={.86} zoom={1.08} shift={50}/>
  <Slab text="BALIK MODAL" x={110} y={103} width={1690} size={465}/>
  <Plate name="B4" matte zoom={1.08} shift={50}/>
  <PackageCard x={145} y={465} start={15}/><PackageCard x={420} y={635} claude start={30}/>
</AbsoluteFill>;

const AgentWindow: React.FC<{claude?: boolean}> = ({claude=false}) => <div style={{...box(claude?140:985,claude?277:233,805,550),background:'#FFFFFF',borderRadius:26,boxShadow:'0 35px 70px rgba(15,35,115,.35), 0 8px 0 rgba(163,184,255,.9)',overflow:'hidden',transform:`perspective(1800px) rotateY(${claude?9:-10}deg) rotateZ(${claude?-4:4}deg)`}}>
  <div style={{height:70,display:'flex',alignItems:'center',padding:'0 28px',gap:13,background:'#F7F7F4',...inter,color:C.ink,fontWeight:600,fontSize:28}}>
    <Character2D model={claude?'claude':'chatgpt'} size={40} id={claude?'wc':'wg'}/>{claude?'Claude Code':'ChatGPT'}
  </div>
  <div style={{position:'absolute',left:0,top:70,width:805,height:420}}>
    {claude?<PanelClaude/>:<PanelChatGPT/>}
  </div>
</div>;

const B5: React.FC = () => {
  const f=useCurrentFrame();const travel=move(f,50,50,'heavy');
  const hop=move(f,45,11,'land')-move(f,56,18,'heavy');
  return <Canvas07>
    <style>{PANEL_FONTS}</style>
    <svg width="1920" height="1080" style={box(0,0)}>
      <path d="M365 680C-80 470 15 200 500 245C900 235 1210 240 1450 245C2020 190 2070 490 1660 815C1450 1030 670 1110 370 845" fill="none" stroke="#B5C8FF" strokeWidth="15"/>
      <path d="M365 680L337 600 420 626" fill="none" stroke="#B5C8FF" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <div style={{...box(490,65),...poppins,fontSize:143,fontWeight:800,color:'white',letterSpacing:-6}}>koordinasi</div>
    <AgentWindow claude/><AgentWindow/>
    <div style={{...box(285,700,375,340),transform:`translateY(${-25*hop}px) rotate(-4deg) scaleY(${1-.05*hop})`,filter:'drop-shadow(15px 20px 0 rgba(16,36,135,.20))'}}><Character2D model="claude" size={330} id="relay-claude"/></div>
    <div style={{...box(1270,700,355,350),transform:`rotate(6deg) scale(${.98+.02*move(f,25,75,'drift')})`,filter:'drop-shadow(12px 19px 0 rgba(16,36,135,.20))'}}><Character2D model="chatgpt" size={325} id="relay-chatgpt"/></div>
    <div style={{...box(660+travel*400,820-110*(move(f,50,24,'land')-move(f,74,26,'heavy')),155,110),transform:`rotate(${-13+26*travel}deg)`,filter:'drop-shadow(0 15px 15px rgba(20,40,120,.3))'}}>
      <svg width="155" height="110" viewBox="0 0 155 110"><rect x="2" y="2" width="151" height="106" rx="18" fill="#FFFFFF"/><path d="M8 12L77 65 147 12M7 100L53 60M148 100L102 60" fill="none" stroke="#D0DAF5" strokeWidth="5"/></svg>
    </div>
    <div style={{...box(827,879,270,110),background:'#FFFFFF',borderRadius:28,boxShadow:shadow,display:'flex',alignItems:'center',justifyContent:'center',gap:20,color:C.ink,...inter,fontSize:28,fontWeight:600,transform:`scale(${.85+.15*move(f,70,22,'heavy')})`}}><Check size={72}/>loop</div>
  </Canvas07>;
};

const B6: React.FC = () => <AbsoluteFill>
  <Plate name="B6" dim={.86}/>
  <Slab text="100% FULL AI" x={110} y={110} width={1700} size={463}/>
  <Plate name="B6" matte/>
  <Tag text="profesional?" x={153} y={657} rotate={-6} size={64} climax start={20}/>
  <Tag text="masih kerasa AI?" x={1190} y={706} rotate={6} size={50} start={32}/>
</AbsoluteFill>;

const SCENES: Record<PanelID, React.FC> = {'B1b':B1b,'B2':B2,'B3-A':B3A,'B3-C':B3C,'B4':B4,'B5':B5,'B6':B6};
export const Papan: React.FC<{panel: PanelID}> = ({panel}) => {
  const Scene=SCENES[panel];
  return <AbsoluteFill style={{background:C.paper,overflow:'hidden'}}><Fonts/><Scene/></AbsoluteFill>;
};

# Segmen 1 · peta objek ↔ SFX (dari kode)

| adegan | penanda SFX (peran · id) | teks anchor | teks narasumber | media |
|---|---|---|---|---|
| S00_ColdOpen | cut · 00a:cut:${i}<br>snap · 00a:photo:${i}<br>whoosh · 00b:shrink:0<br>sub_impact · 00a:anchor:biggest<br>scifi_whoosh · 00a:anchor:launched<br>sub_impact · 00a:anchor:billion<br>scifi_whoosh · 00b:anchor:fast |  | AI is the BIGGEST technical thing ever in my lifetime 16 year old LAUNCHED a new AI company raised over a BILLION dollars this time progress was so FAST | 3 |
| S01_Perlombaan | cut · 01a:cut:horizon<br>land · 01b:tiles:land<br>cut · 01b:cut:race<br>whoosh · 01b:salip:1<br>whoosh · 01b:cam:snapwide<br>draw · 01b:paint:berlomba<br>whoosh · 01b:salip:2<br>riser · 01b:zoomthru:hit<br>cut · 01c:cut:room<br>toggle · 01c:cone:open<br>draw · 01c:wire:draw<br>whoosh · 01c:text:out<br>whoosh · 01d:cam:pan<br>whoosh · 01d:cam:snapwide<br>sub_impact · 01c:anchor:pengganti<br>sub_impact · 01d:anchor:cepat | SADAR PENGGANTI LEBIH CEPAT |  | 1 |
| S02a_Wikipedia | riser · 01d:fill:riser<br>cut · 02a:cut:babak<br>pop · 02a:photo:${i}<br>pop · 02a:card:wiki<br>cut · 02a:cut:zoom<br>click · 02a:select:start<br>whoosh · 02a:cam:snapwide<br>whoosh · 02a:wipe:x09 |  |  | 1 |
| S02b_JanjiSederhana | draw · 02b:axis:draw<br>draw · 02b:line:draw<br>pop · 02b:dot:goal | JANJI SEDERHANA |  | 0 |
| S02c_TugasKeTrash | click · 02c:grab:${i}<br>whoosh · 02c:drag:${i}<br>trash · 02c:trash:${i}<br>whoosh · 02c:return:${i}<br>whoosh · 02c:return:${i} |  |  | 2 |
| S02d_Kreatif | cut · 02d:cut:x07<br>toggle · 02d:beam:on<br>whoosh · 02d:cam:reveal<br>scifi_whoosh · 02d:anchor:kreatif | KREATIF |  | 0 |
| S02e_JanjiDitepati | riser · 02d:bloom:hit<br>ui_tap · 02e:tick:${i}<br>glass_ping · 02e:cal:block:${CAL_EVENTS[i].replace(/\s+/g, <br>low_whoosh · 02e:time:compress<br>sub_impact · 02e:cal:compressed<br>whoosh · 02f:cam:snapwide | DITEPATI |  | 0 |
| S03a_AgentKerja | cut · 03a:cut:in<br>key · 03a:key:${m.w.replace(/[^\w]/g, <br>whoosh · 03a:cam:snapwide<br>click · 03a:send:click<br>pop · 03a:agent:${i}<br>whoosh · 03a:cam:tiltup<br>pop · 03b:cursor:${i}<br>click · 03b:sendceo:click<br>whoosh · 03b:ceo:dash<br>cut · 03b:cutzoom<br>key · 03b:key:stream:0<br>whoosh · 03b:cam:snapwide<br>pop · 03b:reply:card<br>click · 03b:bar:${i + 1}<br>whoosh · 03b:cam:center<br>riser · 03b:zoomthrough |  |  | 0 |
| S03c_MeniruDiri | hit · 03c:land<br>toggle · 03c:scan:on<br>toggle · 03c:scan:off<br>whoosh · 03c:cam:snapwide<br>step · 03d:step:${n}<br>hit · 03d:boom<br>whoosh · 03d:x13:shrink<br>cut · 03e:clip:in<br>cut · 03e:cutzoom<br>sub_impact · 03e:anchor:somebody | PERLAHAN TEMPAT KITA | not gonna lose a JOB SOMEBODY who uses AI | 2 |
| S04a_GaPeduli | riser · 04a:cut:in<br>whoosh · 04a:cam:tiltdown<br>sub_impact · 04a:anchor:peduli | NGGAK PEDULI |  | 0 |
| S04b_Rilis | whoosh · 04b:cam:truck<br>pop · 04b:card:${i}<br>whoosh · 04b:cam:snapwide<br>whoosh · 04b:x01:collapse |  |  | 0 |
| S04c_ArahJanji | cut · 04c:cut:in<br>whoosh · 04c:dots:fly<br>land · 04c:dots:land<br>draw · 04c:line:solid<br>cut · 04c:cutzoom<br>draw · 04c:line:bend<br>whoosh · 04c:cam:revealout<br>whoosh · 04c:x13:shrink<br>scifi_whoosh · 04c:anchor:arahnya | ARAHNYA JANJINYA |  | 0 |
| S04d_AltmanOrbit | cut · 04d:clip:in |  |  | 1 |
| S05a_SatuCerita | cut · 05a:in:cut<br>pop · 05a:photo:${idx}<br>land · 05a:bluecard:land<br>whoosh · 05a:cam:snapwide<br>whoosh · 05a:altman:shrink | SATU SUKSES |  | 2 |
| S05b_RibuanKartu | cut · 05b:in:cut<br>whoosh · 05b:cam:revealout<br>pop · 05b:grey:spread<br>pop · 05b:grey:vanish |  |  | 1 |
| S05c_SameTools | cut · 05c:in:cut<br>snap · 05c:photo:${kk - kFirst}<br>pop · 05c:icon:${i}<br>whoosh · 05c:icons:merge<br>whoosh · 05c:cam:exitpush<br>sub_impact · 05c:anchor:sama | SEMUA SAMA |  | 3 |
| S05d_SamePrompt | cut · 05d:in:cut<br>cut · 05d:cut:hp<br>cut · 05d:cut:tablet<br>click · 05d:${DEV[d]}:send |  |  | 1 |
| S05e_SameChance | cut · 05e:in:cut<br>whoosh · 05e:orbit:bloom<br>glass_ping · 05e:orbit:ping:${k}<br>whoosh · 05e:cam:whip |  |  | 0 |
| S05f_FoundersOvernight | cut · 05f:in:cut<br>snap · 05f:photo:${kk - k0}<br>whoosh · 05f:cam:breakwide<br>sub_impact · 05f:anchor:semalam | FOUNDER CEO SEMALAM |  | 1 |
| S05g_BuildingEasy | cut · 05g:in:cut<br>land · 05g:card:${i}:${APPS[i % APPS.length].name.split(<br>whoosh · 05g:cam:snap:${j} |  |  | 0 |
| S05h_UsersWalkPast | whoosh · 05h:wipe:silhouette<br>toggle · 05h:light:on:${i}<br>toggle · 05h:light:off:${i}<br>step · 05h:user:step:${n}<br>whoosh · 05h:cam:pushin<br>whoosh · 05h:cam:snapwide | SUSAH |  | 0 |
| S06a_Sibuk | cut · 06a:cut:in<br>cut · 06a:cutzoom:1<br>whoosh · 06b:reveal:1<br>toggle · 06b:row:hero<br>toggle · 06b:row:top<br>scifi_whoosh · 06a:anchor:merencanakan | MEMBANGUN MERENCANAKAN |  | 0 |
| S06c_Serahkan | riser · 06b:push:1<br>hit · 06c:land:1<br>whoosh · 06c:head:fly<br>hit · 06c:head:absorb<br>scifi_whoosh · 06c:anchor:ai | AI |  | 0 |
| S06d_Prompt | pop · 06d:bloom:1<br>cut · 06d:cutzoom:1<br>toggle · 06d:relay:off | SENDIRI |  | 0 |
| S06e_Tertinggal | cut · 06e:cut:in<br>whoosh · 06e:snapwide:1<br>sub_impact · 06e:anchor:tertinggal | TERTINGGAL |  | 0 |
| S06f_Kerumunan | cut · 06f:cut:in<br>pop · 06f:glyph:all<br>cut · 06f:cutzoom:1<br>pop · 06f:pulse:1<br>whoosh · 06f:crane:1 |  |  | 0 |
| S06g_Peran | cut · 06g:cut:in<br>toggle · 06g:plane:${i + 1}<br>whoosh · 06g:punch:in<br>hit · 06g:boom:1 | PERAN KAMU |  | 0 |

## Bendera

| jenis | lokasi | catatan |
|---|---|---|
| RAWTXT | S00_ColdOpen:80 | fontSize 300 di luar AnchorWord/SpeakerLine — cek: teks UI asli (boleh) atau overlay (pindah ke komponen) |
| RAWTXT | S01_Perlombaan:192 | fontSize 150 di luar AnchorWord/SpeakerLine — cek: teks UI asli (boleh) atau overlay (pindah ke komponen) |
| RAWTXT | S02a_Wikipedia:86 | fontSize 64 di luar AnchorWord/SpeakerLine — cek: teks UI asli (boleh) atau overlay (pindah ke komponen) |
| SAFE? | S02d_Kreatif | AnchorWord «KREATIF» y=112 |
| SAFE? | S05h_UsersWalkPast | AnchorWord «SUSAH» y=866 |
| SAFE? | S06c_Serahkan | AnchorWord «AI» y=205 |
| SAFE? | S06e_Tertinggal | AnchorWord «TERTINGGAL» y=962 |

PERLU TINJAU · 7 bendera

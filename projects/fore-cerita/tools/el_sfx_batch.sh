#!/bin/zsh
# Generate SFX via ElevenLabs API (key dari Keychain, tidak dicetak). Output: ~/Proyek/fore-cerita/sfx/
K=$(security find-generic-password -s elevenlabs-api-key -w) || exit 1
OUT=~/Proyek/fore-cerita/sfx; mkdir -p $OUT
gen() { # name duration influence prompt
  [ -s "$OUT/$1.mp3" ] && { echo "skip $1"; return; }
  code=$(curl -sS -m 120 -o "$OUT/$1.mp3" -w "%{http_code}" https://api.elevenlabs.io/v1/sound-generation \
    -H "xi-api-key: $K" -H "content-type: application/json" \
    -d "$(python3 -c 'import json,sys;print(json.dumps({"text":sys.argv[4],"duration_seconds":float(sys.argv[2]),"prompt_influence":float(sys.argv[3])}))' x "$2" "$3" "$4")")
  echo "$1 $code"; [ "$code" = 200 ] || rm -f "$OUT/$1.mp3"
}
gen amb_cafe 15 0.4 "quiet coffee shop at night ambience, distant soft murmur of people talking, faint cups and spoons, warm and cozy, steady, no music"
gen amb_room 12 0.4 "quiet small bedroom in the morning, soft room tone, faint distant birds and a far away motorbike, airy and calm, no music"
gen amb_dream 12 0.35 "soft dreamy airy ambient pad texture, warm low hum, gentle wind, nostalgic, no melody, no high hiss"
gen blanket 2.5 0.5 "a blanket being smoothed and shaken softly on a bed, gentle fabric rustle, warm close mic"
gen paper 1.2 0.5 "a single paper calendar page tearing off and fluttering through the air, soft and warm, no harsh hiss"
gen buzz 1.2 0.6 "a smartphone vibrating once on a wooden table, short muted low buzz"
gen door 2 0.5 "a wooden door latch clicking and the door opening softly, warm and low"
gen steps 2.5 0.5 "soft sneaker footsteps on a concrete alley, four slow steps, gentle and warm"
gen cupdown 1 0.6 "a plastic iced coffee cup set down on a wooden table, soft thock with a little ice rattle"
gen spill 2 0.5 "a plastic cup of iced coffee knocked over on a wooden table, ice cubes clatter and liquid splashes onto paper, short, warm"
gen tissue 2 0.5 "tissue paper pulled and wiping a wet table, soft rustle, close"
gen pen 0.8 0.6 "a ballpoint pen striking one quick line across paper, close and soft"
gen writing 2.5 0.5 "a pen writing a short handwritten sentence on paper, soft gentle scratching, close"
gen chairs_laugh 4 0.4 "chairs pulled softly on a wooden floor and a small group of friends laughing warmly together in a cozy cafe"
gen bubble_form 1.6 0.5 "a soft airy dreamy bubble slowly swelling and glowing, warm low tones, gentle, no high sparkle or chimes"
gen bubble_pop 0.8 0.6 "a deep soft bubble pop, muffled and warm, low frequency, single"
gen whispers 6 0.4 "low indistinct whispering voices murmuring in the dark, many people, distant and muffled, no clear words, unsettling but soft"
gen phone_tap 0.5 0.6 "a soft muted finger tap on a smartphone glass screen, single, close, warm"
gen gasp 1 0.5 "a young woman's short surprised soft gasp, apologetic, close"
gen bag_down 1.2 0.5 "a backpack dropped softly onto a chair, fabric thump, warm"
curl -sS -m 20 https://api.elevenlabs.io/v1/user/subscription -H "xi-api-key: $K" | python3 -c "import json,sys;d=json.load(sys.stdin);print('used',d['character_count'],'/',d['character_limit'])"

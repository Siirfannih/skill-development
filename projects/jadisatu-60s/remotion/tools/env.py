import librosa,numpy as np,sys
for n in sys.argv[1:]:
    y,sr=librosa.load(n,sr=22050); h=sr//4
    r=[20*np.log10(np.sqrt(np.mean(y[i:i+h]**2))+1e-9) for i in range(0,len(y)-h,h)]
    print(f'{n[:14]:14}', ' '.join(f'{int(-x):02d}' for x in r))

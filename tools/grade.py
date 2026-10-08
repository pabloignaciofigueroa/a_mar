import sys, glob, numpy as np
from PIL import Image
RAW='/home/claude/a_mar/assets/raw/ig/'
def load(k): return Image.open(glob.glob(RAW+'amar_ig_%s_*.jpg'%k)[0]).convert('RGB')
def grade(im, wb=0.35, sat=0.90, warm=(1.025,1.0,0.965), black=10, white=246, s=0.12, grain=0.0, seed=1):
    a=np.asarray(im,dtype=np.float32)/255.
    # 1) partial white-balance normalize (gray world on midtones)
    m=a.reshape(-1,3); lum=m.mean(1); mid=m[(lum>0.2)&(lum<0.85)]
    g=mid.mean(0); tgt=g.mean()
    gain=1+wb*(tgt/g-1); a=a*gain
    # 2) warmth
    a=a*np.array(warm,dtype=np.float32)
    # 3) S-curve (smoothstep blend)
    a=np.clip(a,0,1); sc=a*a*(3-2*a); a=a*(1-s)+sc*s
    # 4) saturation
    L=(a*[0.2126,0.7152,0.0722]).sum(2,keepdims=True); a=L+(a-L)*sat
    # 5) matte: black lift + highlight roll-off
    a=np.clip(a,0,1); a=black/255.+a*(white-black)/255.
    if grain>0:
        rng=np.random.default_rng(seed); n=rng.normal(0,grain,a.shape[:2])[...,None]; a=a+n
    return Image.fromarray((np.clip(a,0,1)*255+0.5).astype(np.uint8))
def crop(im, ratio, fx, fy, zoom=1.0):
    W,H=im.size; rw,rh=ratio
    if W/H>rw/rh: ch=H/zoom; cw=ch*rw/rh
    else: cw=W/zoom; ch=cw*rh/rw
    cx=fx*W; cy=fy*H
    x0=min(max(cx-cw/2,0),W-cw); y0=min(max(cy-ch/2,0),H-ch)
    return im.crop((round(x0),round(y0),round(x0+cw),round(y0+ch)))

def rgb2hsv(a):
    r,g,b=a[...,0],a[...,1],a[...,2]; mx=a.max(-1); mn=a.min(-1); d=mx-mn+1e-6
    h=np.where(mx==r,((g-b)/d)%6,np.where(mx==g,(b-r)/d+2,(r-g)/d+4))*60
    s=np.where(mx>0,(mx-mn)/(mx+1e-6),0); return h,s,mx
def hsv2rgb(h,s,v):
    c=v*s; x=c*(1-np.abs((h/60)%2-1)); m=v-c; z=np.zeros_like(h); i=(h//60).astype(int)%6
    r=np.select([i==0,i==1,i==2,i==3,i==4,i==5],[c,x,z,z,x,c]); g=np.select([i==0,i==1,i==2,i==3,i==4,i==5],[x,c,c,x,z,z]); b=np.select([i==0,i==1,i==2,i==3,i==4,i==5],[z,z,x,c,c,x])
    return np.stack([r+m,g+m,b+m],-1)
def band(h,c,w): d=np.abs(((h-c)+180)%360-180); return np.clip(1-d/w,0,1)
def amar(im, black=14, white=242, s=0.25, sat=0.95, cyan=0.45, lime=0.35, split=0.035, warm=1.02, grain=0.0, vig=0.12, seed=3):
    a=np.asarray(im,dtype=np.float32)/255.
    a=a*np.array([warm,1.0,1/warm])
    a=np.clip(a,0,1); sc=a*a*(3-2*a); a=a*(1-s)+sc*s
    h,sv,v=rgb2hsv(a)
    k=1-cyan*band(h,195,35)-lime*band(h,85,30)
    sv=np.clip(sv*k*sat,0,1)
    a=hsv2rgb(h,sv,v)
    L=(a*[0.2126,0.7152,0.0722]).sum(-1,keepdims=True)
    sh=np.clip(1-L*2,0,1); hi=np.clip(L*2-1,0,1)
    a=a+split*(sh*np.array([-0.6,0.1,0.8])+hi*np.array([0.7,0.25,-0.6]))
    a=np.clip(a,0,1); a=black/255.+a*(white-black)/255.
    if vig>0:
        H,W=a.shape[:2]; y,x=np.ogrid[:H,:W]; r=np.sqrt(((x-W/2)/(W/2))**2+((y-H/2)/(H/2))**2)/1.414
        a=a*(1-vig*np.clip((r-0.4)/0.6,0,1)**1.5)[...,None]
    if grain>0:
        rng=np.random.default_rng(seed); a=a+rng.normal(0,grain,a.shape[:2])[...,None]
    return Image.fromarray((np.clip(a,0,1)*255+0.5).astype(np.uint8))

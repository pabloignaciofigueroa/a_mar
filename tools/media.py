"""F07 — WebP 800 y 1800 (sin agrandar) + LQIP base64 en assets/img/meta.json."""
import glob, json, base64, io, pathlib
from PIL import Image, ImageFilter
R='assets/raw/ig/'
IDS={'calas':'00','cocina':'01','salon':'03','manos':'04','ostras':'05','sorrentinos':'06','erizos':'07','pulpo-chapa':'08',
     'rosas':'09','pulpo-gallega':'10','mesa':'11','fachada':'12','textil':'13','murta':'14','espumante':'15','espejo':'16',
     'barra':'17','individual':'18'}
out=pathlib.Path('assets/img'); out.mkdir(parents=True,exist_ok=True)
meta={}
for k,n in IDS.items():
    f=glob.glob(R+f'amar_ig_{n}_*.jpg')[0]
    im=Image.open(f).convert('RGB'); W,H=im.size
    src={}
    for target,q in ((800,80),(1800,82)):
        w=min(target,W); h=round(H*w/W)
        p=out/f'{k}-{target}.webp'
        im.resize((w,h),Image.LANCZOS).save(p,'WEBP',quality=q,method=6)
        src[str(target)]={'path':p.as_posix(),'w':w,'h':h}
    t=im.resize((24,round(24*H/W)),Image.LANCZOS).filter(ImageFilter.GaussianBlur(1.2))
    b=io.BytesIO(); t.save(b,'WEBP',quality=40)
    meta[k]={'ig':'IG-'+n,'w':W,'h':H,'src':src,'lqip':'data:image/webp;base64,'+base64.b64encode(b.getvalue()).decode()}
json.dump(meta,open(out/'meta.json','w'),indent=1)
print(len(meta),'imágenes', sum(p.stat().st_size for p in out.glob('*.webp'))//1024,'KB')

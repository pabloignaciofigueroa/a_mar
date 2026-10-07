import sys,glob
from PIL import Image
pref=sys.argv[1]; out=sys.argv[2]; cols=int(sys.argv[3]) if len(sys.argv)>3 else 3; w=int(sys.argv[4]) if len(sys.argv)>4 else 600
fs=sorted(glob.glob(f'_qa/shots/{pref}[0-9][0-9].jpg'))
ims=[Image.open(f) for f in fs]; h=int(w*ims[0].height/ims[0].width)
S=Image.new('RGB',(cols*w,((len(ims)+cols-1)//cols)*h),'white')
for i,im in enumerate(ims): S.paste(im.resize((w,h)),((i%cols)*w,(i//cols)*h))
S.save(out,quality=70)

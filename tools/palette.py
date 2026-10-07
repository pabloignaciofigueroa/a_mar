"""F04 — paleta por k-means (k=7) por grupo de fotos y sobre las piezas."""
import sys, json, glob, numpy as np
from PIL import Image
from sklearn.cluster import KMeans
R='assets/raw/ig/'
groups={
 'interior':['03','11','16','17','01','12'],
 'platos':['05','06','07','08','10'],
 'piezas':['04','13','19','02'],
 'textil':['13','18'],
}
out={}
for g,ids in groups.items():
    px=[]
    for i in ids:
        f=glob.glob(R+f'amar_ig_{i}_*.jpg')[0]
        im=Image.open(f).convert('RGB').resize((160,160))
        px.append(np.asarray(im).reshape(-1,3))
    X=np.concatenate(px).astype(float)
    km=KMeans(7,n_init=4,random_state=1).fit(X)
    cnt=np.bincount(km.labels_)
    order=np.argsort(-cnt)
    out[g]=[('#%02x%02x%02x'%tuple(int(v) for v in km.cluster_centers_[k]),round(cnt[k]/len(X),3)) for k in order]
print(json.dumps(out,indent=1))

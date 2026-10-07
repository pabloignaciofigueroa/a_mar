"""Contraste WCAG de los tokens de la marca (F04)."""
T={'noche':'#0d0e10','ola':'#42c0ef','espuma':'#f4efe7','terrazo':'#e4dccd','mimbre':'#b7956c','azulejo':'#4a6a7b','petroleo':'#2c3e4a','cobre':'#9a5418','tinta':'#1b1c1e'}
def L(h):
    c=[int(h[i:i+2],16)/255 for i in (1,3,5)]
    c=[x/12.92 if x<=0.03928 else ((x+0.055)/1.055)**2.4 for x in c]
    return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2]
def cr(a,b):
    la,lb=sorted([L(T[a]),L(T[b])],reverse=True); return (la+0.05)/(lb+0.05)
pairs=[('espuma','noche'),('noche','espuma'),('ola','noche'),('mimbre','noche'),('espuma','petroleo'),('espuma','azulejo'),('noche','terrazo'),('cobre','espuma'),('azulejo','espuma'),('tinta','espuma'),('noche','ola'),('mimbre','petroleo'),('ola','petroleo')]
if __name__=='__main__':
    for a,b in pairs: print(f'{a:9} sobre {b:9} {cr(a,b):5.2f}')

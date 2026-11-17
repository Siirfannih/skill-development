"""Procedural B10a set. Default invocation saves a .blend and renders three stills only."""
import bpy, math, random, json, sys, time
from pathlib import Path
from mathutils import Vector
random.seed(10)
OUT=Path('/mnt/storage-projects/skill-dev-journey/b10a'); T=json.loads((OUT/'timing.json').read_text()); FPS=T['fps']; N=T['frames']; ON=T['onset_frame']
bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete(use_global=False)
s=bpy.context.scene
if hasattr(s.render,"compositor_device"):s.render.compositor_device="CPU"
if hasattr(s.render,"compositor_denoise_device"):s.render.compositor_denoise_device="CPU"
bpy.context.preferences.filepaths.file_preview_type="NONE"
s.render.resolution_x=1920; s.render.resolution_y=1080; s.render.resolution_percentage=100
s.render.fps=30; s.render.fps_base=1.001; s.frame_start=1; s.frame_end=N
s.world.color=(.008,.008,.008)
s.world.use_nodes=True; s.world.node_tree.nodes['Background'].inputs['Color'].default_value=(.035,.047,.068,1); s.world.node_tree.nodes['Background'].inputs['Strength'].default_value=.12
s.view_settings.view_transform='AgX'; s.view_settings.look='AgX - Medium High Contrast'; s.view_settings.exposure=-.15

def rgb(h):
 v=[int(h[i:i+2],16)/255 for i in (0,2,4)];return tuple(x/12.92 if x<.04045 else ((x+.055)/1.055)**2.4 for x in v)+(1,)
def mat(name,h,rough=.6,metal=0):
 m=bpy.data.materials.new(name);m.diffuse_color=rgb(h);m.use_nodes=True;p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=rgb(h);p.inputs['Roughness'].default_value=rough;p.inputs['Metallic'].default_value=metal;return m
clays=[mat('Terracotta ceramic '+str(i),h) for i,h in enumerate(['B4532F','BD5A34','C9653F','BA5631','C16039'])]
for m in clays:m.node_tree.nodes['Principled BSDF'].inputs['Subsurface Weight'].default_value=.055
black=mat('Eye dark obsidian','181514',.48); graphite=mat('Graphite anodised aluminium','25272A',.36,.65); keymat=mat('Warm dark keycaps','363434',.48); brass=mat('Lamp brushed brass','A08253',.33,.72)
wood=mat('Dark walnut, procedural grain','372218',.38)
n=wood.node_tree.nodes;l=wood.node_tree.links;p=n['Principled BSDF']; tex=n.new('ShaderNodeTexNoise');tex.inputs['Scale'].default_value=4;tex.inputs['Detail'].default_value=3;coords=n.new('ShaderNodeTexCoord');mapping=n.new('ShaderNodeVectorMath');mapping.operation='MULTIPLY';mapping.inputs[1].default_value=(2,150,180);l.new(coords.outputs['Generated'],mapping.inputs[0]);l.new(mapping.outputs[0],tex.inputs['Vector']);r=n.new('ShaderNodeValToRGB');r.color_ramp.elements[0].color=rgb('21130D');r.color_ramp.elements[1].color=rgb('633F29');l.new(tex.outputs['Fac'],r.inputs[0]);l.new(r.outputs[0],p.inputs['Base Color']);b=n.new('ShaderNodeBump');b.inputs['Strength'].default_value=.18;b.inputs['Distance'].default_value=.00025;l.new(tex.outputs['Fac'],b.inputs['Height']);l.new(b.outputs[0],p.inputs['Normal'])

def cube(name,loc,size,material,bev=.001,parent=None):
 bpy.ops.mesh.primitive_cube_add(size=1,location=loc);o=bpy.context.object;o.name=name;o.dimensions=size;bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
 if material:o.data.materials.append(material)
 if bev:
  mod=o.modifiers.new('Manufactured softened edges','BEVEL');mod.width=bev;mod.segments=3
  mod=o.modifiers.new('Weighted normals','WEIGHTED_NORMAL')
 if parent:o.parent=parent
 return o

def empty(name,loc):
 o=bpy.data.objects.new(name,None);s.collection.objects.link(o);o.location=loc;return o

def cylinder(name,loc,r,depth,material):
 bpy.ops.mesh.primitive_cylinder_add(vertices=64,radius=r,depth=depth,location=loc);o=bpy.context.object;o.name=name;o.data.materials.append(material);m=o.modifiers.new('Soft rim','BEVEL');m.width=.001;m.segments=3
 for f in o.data.polygons:f.use_smooth=True
 return o

def rod(name,a,b,r,material):
 a=Vector(a);b=Vector(b);o=cylinder(name,(a+b)/2,r,(b-a).length,material);o.rotation_euler=(b-a).to_track_quat('Z','Y').to_euler();return o

def aim(o,pt):o.rotation_euler=(Vector(pt)-o.location).to_track_quat('-Z','Y').to_euler()
def area(name,loc,target,color,power,size):
 d=bpy.data.lights.new(name,'AREA');d.energy=power;d.color=color;d.shape='DISK';d.size=size;o=bpy.data.objects.new(name,d);s.collection.objects.link(o);o.location=loc;aim(o,target);return o

def key(o,path,frame):o.keyframe_insert(data_path=path,frame=frame)

def action_curves(a):
 if hasattr(a,'fcurves'):return list(a.fcurves)
 return [f for layer in a.layers for strip in layer.strips for bag in strip.channelbags for f in bag.fcurves]

def smooth(o):
 if not o.animation_data or not o.animation_data.action:return
 for fc in action_curves(o.animation_data.action):
  for k in fc.keyframe_points:k.interpolation='BEZIER';k.handle_left_type='AUTO_CLAMPED';k.handle_right_type='AUTO_CLAMPED'

cube('Solid walnut desktop',(0,0,-.022),(1.4,.85,.044),wood,.008)
# A real keyboard provides scale; Claude stands across its left side.
cube('Keyboard metal case',(-.025,-.07,.012),(.34,.12,.019),graphite,.006)
for row in range(5):
 for col in range(16):
  if row==0 and 4<=col<=10:continue
  cube('Keycap',(-.176+col*.02,-.119+row*.022,.025),(.0177,.0187,.010),keymat,.0015)
cube('Spacebar',(-.026,-.119,.025),(.138,.0187,.010),keymat,.0015)
# Shared voxel mesh keeps the high-detail toy light in memory.
voxel=cube('Voxel master',(0,0,-2),(.0096,.0096,.0096),None,.00065)
bpy.context.view_layer.objects.active=voxel;voxel.select_set(True)
for mod in list(voxel.modifiers):bpy.ops.object.modifier_apply(modifier=mod.name)
mesh=voxel.data;bpy.data.objects.remove(voxel,do_unlink=True)
for m in clays:mesh.materials.append(m)
def vox(name,pos,parent,material=None):
 o=bpy.data.objects.new(name,mesh);s.collection.objects.link(o);o.location=pos;o.parent=parent
 if material:
  o.data=mesh.copy();o.data.materials.clear();o.data.materials.append(material)
 else:
  # Per-object material slot avoids duplicating the geometry.
  for sl in o.material_slots:sl.link='OBJECT';sl.material=random.choice(clays)
 return o
body=empty('Claude body turn and nod',(-.105,-.065,.065))
body['body_width_height_ratio']=1.9
body['reference']='sumber/ref/maskot-acuan-pixel-crab.png'
for x in range(19):
 for y in range(5):
  for z in range(10):
   # Solid toy built as many small bevelled clay cubes.
   vox('Claude body voxel',((x-9)*.01,(y-2)*.01,z*.01),body)
for x in [-8,-3,3,8]:
 for dx in [-.5,.5]:
  for y in [-1,0,1]:
   for z in range(3):vox('Four short legs',((x+dx)*.01,y*.01,-.01-z*.01),body)
for x in [-5,5]:
 for z in [6,7]:
  for j in [0,1]:vox('Square dark eye',((x+j-.5)*.01,-.0252,z*.01),body,black)
arms=[]
for sign in [-1,1]:
 a=empty('Claude tapping arm', (sign*.103,0,.043));a.parent=body
 for x in range(3):
  for y in range(3):
   for z in range(3):vox('Arm voxel',(sign*x*.01,(y-1)*.01,z*.01),a)
 a.rotation_euler[1]=0;arms.append(a)
for f,ang,nod in [(1,28,0),(ON-16,28,0),(ON-6,112,0),(ON+3,125,0),(ON+13,72,0),(ON+21,28,0),(ON+25,28,9),(ON+29,28,-3),(N,28,0)]:
 body.rotation_euler=(math.radians(nod),0,math.radians(ang));key(body,'rotation_euler',f)
smooth(body)
for j,a in enumerate(arms):
 for f,ang in [(1,-18),(12+j*3,-28),(16+j*3,6),(20+j*3,-18),(ON-8,-25),(ON,8),(ON+5,-18),(N,-18)]:
  a.rotation_euler[0]=math.radians(ang);key(a,'rotation_euler',f)
 smooth(a)
# Monitor plane is the generated project timeline movie, facing towards the camera.
mx=.075; my=.135; mz=.170; sw=.27; sh=sw*720/1280
cube('Monitor thin bezel',(mx,my,mz),(sw+.012,.012,sh+.012),graphite,.004)
rod('Monitor neck',(mx,my+.01,.016),(mx,my+.01,.13),.009,graphite)
cube('Monitor foot',(mx,my-.01,.008),(.13,.09,.012),graphite,.004)
verts=[(mx-sw/2,my-.0064,mz-sh/2),(mx+sw/2,my-.0064,mz-sh/2),(mx+sw/2,my-.0064,mz+sh/2),(mx-sw/2,my-.0064,mz+sh/2)]
me=bpy.data.meshes.new('Screen mesh');me.from_pydata(verts,[],[(0,1,2,3)]);me.uv_layers.new()
for uv,co in zip(me.uv_layers.active.data,[(0,0),(1,0),(1,1),(0,1)]):uv.uv=co
screen=bpy.data.objects.new('Monitor project footage and editor',me);s.collection.objects.link(screen)
m=bpy.data.materials.new('Live project editor image sequence');m.use_nodes=True;n=m.node_tree.nodes;n.clear();out=n.new('ShaderNodeOutputMaterial');em=n.new('ShaderNodeEmission');em.inputs['Strength'].default_value=.65;im=n.new('ShaderNodeTexImage');im.image=bpy.data.images.load(str(OUT/'textures/editor-001.png'));im.image.source='SEQUENCE';im.image_user.frame_duration=N;im.image_user.frame_start=1;im.image_user.use_auto_refresh=True;m.node_tree.links.new(im.outputs['Color'],em.inputs[0]);m.node_tree.links.new(em.outputs[0],out.inputs['Surface']);screen.data.materials.append(m)
# The practical lamp motivates the amber key and a restrained pool on the wood.
cylinder('Lamp base',(-.31,.09,.008),.05,.014,brass)
rod('Lamp lower arm',(-.31,.09,.012),(-.32,.13,.23),.005,brass)
rod('Lamp upper arm',(-.32,.13,.23),(-.225,.06,.32),.004,brass)
bpy.ops.mesh.primitive_cone_add(vertices=64,radius1=.055,radius2=.021,depth=.05,location=(-.225,.06,.30));shade=bpy.context.object;shade.name='Warm lamp shade';shade.data.materials.append(mat('Shade enamel','524537',.35,.3))
lightmat=mat('Lamp diffuser','FFF0C9',.5);p=lightmat.node_tree.nodes['Principled BSDF'];p.inputs['Emission Color'].default_value=rgb('FFE1A1');p.inputs['Emission Strength'].default_value=3
cylinder('Glowing diffuser',(-.225,.06,.274),.047,.002,lightmat)
area('3000K practical key',(-.225,.045,.27),(-.09,-.06,.055),(1,.58,.29),9,.105)
area('Warm silhouette rim',(-.055,.095,.30),(-.105,-.065,.115),(1,.49,.22),2.7,.09)
area('Weak monitor blue fill',(.10,.09,.19),(-.10,-.08,.09),(.56,.69,1),.65,.23)
area('Soft warm room bounce',(.24,-.24,.39),(-.08,-.02,.08),(1,.77,.53),1.4,.34)
# Peripheral props remain unlabelled and deliberately subdued.
ceramic=mat('Mug charcoal glaze','222321',.25)
cylinder('Mug body',(-.285,-.13,.042),.031,.078,ceramic)
cylinder('Dark coffee',(-.285,-.13,.0815),.027,.001,black)
bpy.ops.mesh.primitive_torus_add(major_radius=.022,minor_radius=.004,major_segments=40,minor_segments=12,location=(-.321,-.13,.047),rotation=(math.pi/2,0,0));bpy.context.object.data.materials.append(ceramic)
wall=mat('Night room wall','1E2425',.92);cube('Room back wall',(0,.45,.32),(2,.035,.8),wall,.002)
for j in range(16):cube('Venetian blind',(-.36,.421,.08+j*.025),(.28,.02,.009),graphite,.001)
for j,h in enumerate([.18,.15,.20,.17]):
 book=mat('Unlabelled book '+str(j),['383632','594337','283A36','514C44'][j],.85)
 cube('Book',(.34+j*.025,.34,h/2),(.020,.10,h),book,.001)
# Cable follows a physical curve back from the keyboard.
cu=bpy.data.curves.new('Keyboard cord','CURVE');cu.dimensions='3D';cu.bevel_depth=.0018;cu.bevel_resolution=3;sp=cu.splines.new('BEZIER');sp.bezier_points.add(3)
for p,co in zip(sp.bezier_points,[(-.19,-.025,.012),(-.24,.012,.006),(-.19,.08,.005),(-.11,.14,.005)]):p.co=co;p.handle_left_type=p.handle_right_type='AUTO'
o=bpy.data.objects.new('Keyboard cable',cu);s.collection.objects.link(o);o.data.materials.append(graphite)
# Camera advances towards the action, then transfers attention to the new text block.
bpy.ops.object.camera_add();cam=bpy.context.object;s.camera=cam;cam.name='Macro push with rack focus';cam.data.lens=46;cam.data.sensor_width=36;cam.data.clip_start=.01;cam.data.clip_end=10;cam.data.dof.use_dof=True;cam.data.dof.aperture_fstop=2.0;cam.data.dof.aperture_blades=9
focus=empty('Rack focus subject',(-.105,-.065,.115));cam.data.dof.focus_object=focus
# The macro composition stays on Claude during the focus handoff.
for f,pos in [(1,(-.105,-.73,.23)),(N,(-.105,-.70,.225))]:
 cam.location=Vector((-.105,-.065,.115))+.90*(Vector(pos)-Vector((-.105,-.065,.115)));aim(cam,(-.030,-.040,.113));key(cam,'location',f);key(cam,'rotation_euler',f)
# Half a second into the monitor, then back to the toy within 0.7 s.
for f,fp in [(1,(-.105,-.065,.115)),(ON-15,(-.105,-.065,.115)),
             (ON-1,(mx,my-.0064,.122)),(ON+6,(mx,my-.0064,.122)),
             (ON+21,(-.105,-.065,.115)),(N,(-.105,-.065,.115))]:
 focus.location=fp;key(focus,'location',f)
smooth(cam);smooth(focus)
# Optical bloom in scene; grain and vignette are applied by finish.py to review copies.
if bpy.app.version >= (5,0,0):
 nt=bpy.data.node_groups.new('B10a optical finish','CompositorNodeTree');s.compositing_node_group=nt;nt.interface.new_socket(name='Image',in_out='OUTPUT',socket_type='NodeSocketColor');n=nt.nodes;comp=n.new('NodeGroupOutput')
else:
 s.use_nodes=True;nt=s.node_tree;n=nt.nodes;n.clear();comp=n.new('CompositorNodeComposite')
rl=n.new('CompositorNodeRLayers');gl=n.new('CompositorNodeGlare')
if bpy.app.version >= (5,0,0):
 gl.inputs['Type'].default_value='Fog Glow';gl.inputs['Quality'].default_value='High';gl.inputs['Threshold'].default_value=1.25;gl.inputs['Strength'].default_value=.08
else:
 gl.glare_type='FOG_GLOW';gl.quality='HIGH';gl.threshold=1.25;gl.mix=-.92
nt.links.new(rl.outputs['Image'],gl.inputs['Image']);nt.links.new(gl.outputs['Image'],comp.inputs['Image'])
# HIP is attempted first. Eevee is the portable animation engine if HIP is unavailable.
engine='BLENDER_EEVEE' if bpy.app.version >= (5,0,0) else 'BLENDER_EEVEE_NEXT';hip=[]
try:
 prefs=bpy.context.preferences.addons['cycles'].preferences;prefs.compute_device_type='HIP';prefs.get_devices();hip=[d for d in prefs.devices if d.type=='HIP']
 if hip:
  for d in prefs.devices:d.use=d.type=='HIP'
  engine='CYCLES';s.cycles.device='GPU'
except Exception as e:print('HIP unavailable:',str(e))
s.render.engine=engine
if engine=='CYCLES':s.cycles.samples=64;s.cycles.use_denoising=True
elif hasattr(s.eevee,'taa_render_samples'):s.eevee.taa_render_samples=64
s.render.image_settings.file_format='PNG';s.render.image_settings.color_mode='RGB';s.render.film_transparent=False
s['timing_source']='edit/words.json';s['shot_start']=T['start'];s['shot_end']=T['end'];s['text_onset']=T['onset'];s['engine_decision']='Cycles HIP when available, otherwise Eevee Next';s['finish_script']='lego/blender/finish.py'
s.frame_set(1);bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'b10a.blend'))
# CPU stills avoid the unavailable HIP device and the Eevee context failure.
s.render.engine='CYCLES';s.cycles.device='CPU';s.cycles.samples=48;s.cycles.use_denoising=True
measure=json.loads((OUT/'render-times.json').read_text()) if '--resume-after-awal' in sys.argv and (OUT/'render-times.json').exists() else []
for label,f in ([] if '--build-only' in sys.argv else [('awal',1),('onset',ON),('akhir',N)]):
 if '--resume-after-awal' in sys.argv and label=='awal':continue
 s.frame_set(f);s.render.filepath=str(OUT/f'b10a-{label}.png');t=time.perf_counter();bpy.ops.render.render(write_still=True);measure.append(dict(label=label,frame=f,engine='Cycles CPU (still)',blender=bpy.app.version_string,seconds=round(time.perf_counter()-t,2)));(OUT/'render-times.json').write_text(json.dumps(measure,indent=2))
s.render.engine=engine;s.frame_set(1);bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'b10a.blend'))
print('STILLS_ONLY_COMPLETE',json.dumps(measure))

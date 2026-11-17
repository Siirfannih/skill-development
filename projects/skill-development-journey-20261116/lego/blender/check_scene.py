"""Check handoff invariants in the saved Blender file without rendering."""
import bpy,json,math
from bpy_extras.object_utils import world_to_camera_view
from mathutils import Vector
from pathlib import Path
s=bpy.context.scene;out=Path('/mnt/storage-projects/skill-dev-journey/b10a');t=json.loads((out/'timing.json').read_text())
assert (s.render.resolution_x,s.render.resolution_y)==(1920,1080)
assert abs(s.render.fps/s.render.fps_base-30000/1001)<1e-5
assert (s.frame_start,s.frame_end)==(1,t['frames'])
def action_curves(a):
 if hasattr(a,'fcurves'):return list(a.fcurves)
 return [f for layer in a.layers for strip in layer.strips for bag in strip.channelbags for f in bag.fcurves]

curves=[]
for a in bpy.data.actions:
 for f in action_curves(a):
  for k in f.keyframe_points:
   assert k.interpolation=='BEZIER',(a.name,k.interpolation)
   curves.append(k.interpolation)
assert s.camera.data.dof.use_dof and 1.8<=s.camera.data.dof.aperture_fstop<=2.2
result=dict(blender=bpy.app.version_string,resolution=[1920,1080],fps=s.render.fps/s.render.fps_base,frames=s.frame_end,animation_engine=s.render.engine,still_engine='Cycles CPU',bezier_keyframes=len(curves),body_voxels=sum(o.name.startswith('Claude body voxel') for o in s.objects),short_leg_voxels=sum(o.name.startswith('Four short legs') for o in s.objects),eyes=sum(o.name.startswith('Square dark eye') for o in s.objects),onset_frame=t['onset_frame'],timing=t,face_preview='original edit/wajah.mp4 in animated monitor texture',full_shot_rendered=False)


body=bpy.data.objects['Claude body turn and nod']
toy=[o for o in s.objects if o.type=='MESH' and (o.parent==body or o.parent in body.children)]
screen=bpy.data.objects['Monitor project footage and editor']
def bounds(objects):
 points=[world_to_camera_view(s,s.camera,o.matrix_world@Vector(v)) for o in objects for v in o.bound_box]
 return [min(p.x for p in points),min(p.y for p in points),max(p.x for p in points),max(p.y for p in points)]
frames=[]
for frame in range(1,t['frames']+1):
 s.frame_set(frame);bpy.context.view_layer.update()
 b=bounds(toy);monitor=bounds([screen])
 frames.append(dict(frame=frame,toy_bounds=b,height=b[3]-b[1],center_x=(b[0]+b[2])/2,monitor_bounds=monitor,body_yaw=math.degrees(body.rotation_euler.z),focus=list(s.camera.data.dof.focus_object.location)))
result['round']=2;result['frame_geometry']=frames
result['toy_height_range']=[min(f['height'] for f in frames),max(f['height'] for f in frames)]
result['toy_min_margin']=min(min(f['toy_bounds'][0],f['toy_bounds'][1],1-f['toy_bounds'][2],1-f['toy_bounds'][3]) for f in frames)
result['monitor_min_margin']=min(min(f['monitor_bounds'][0],f['monitor_bounds'][1],1-f['monitor_bounds'][2],1-f['monitor_bounds'][3]) for f in frames)
body_voxels=[o for o in toy if o.name.startswith('Claude body voxel')]
width=max(o.location.x for o in body_voxels)-min(o.location.x for o in body_voxels)+.0096
height=max(o.location.z for o in body_voxels)-min(o.location.z for o in body_voxels)+.0096
result['body_width_height_ratio']=width/height
result['fstop']=s.camera.data.dof.aperture_fstop
result['focus_return_frame']=t['onset_frame']+21
result['roughness']=[m.node_tree.nodes['Principled BSDF'].inputs['Roughness'].default_value for m in bpy.data.materials if m.name.startswith('Terracotta')]
print('ROUND2_GEOMETRY',json.dumps({k:result[k] for k in ['toy_height_range','toy_min_margin','monitor_min_margin','body_width_height_ratio','fstop']}))
assert all(.45<=f['height']<=.68 for f in frames),result['toy_height_range']
assert 1.85<=result['body_width_height_ratio']<=1.95
assert len([o for o in body.children if o.name.startswith('Claude tapping arm')])==2
assert result['body_voxels']==950 and result['short_leg_voxels']==72 and result['eyes']==8
assert result['toy_min_margin']>=.05,result['toy_min_margin']
assert result['monitor_min_margin']>=.015,result['monitor_min_margin']
assert all(.55<=r<=.7 for r in result['roughness'])
toy_focus=Vector((-.105,-.065,.115));monitor_focus=Vector((.075,.1286,.122))
for f in frames:
 position=Vector(f['focus'])
 if f['frame']<=t['onset_frame']-15 or f['frame']>=t['onset_frame']+21:
  assert (position-toy_focus).length<1e-5
 if t['onset_frame']-1<=f['frame']<=t['onset_frame']+6:
  assert (position-monitor_focus).length<1e-5
result['checks_passed']=True
(out/'scene-check.json').write_text(json.dumps(result,indent=2))
s.frame_set(1)

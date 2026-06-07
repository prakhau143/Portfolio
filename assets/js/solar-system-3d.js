/* ================================================================
   INTERACTIVE UNIVERSE  –  Prakhar Portfolio
   Three.js r128 | All features self-contained
   Features: Career Timeline · Jarvis AI · Recruiter Mode ·
             Constellations · Dynamic Sun · Stats Planet ·
             Black Hole · Explorer Badge · Hologram UI ·
             Shooting Stars · Spaceships · Story Mode
   ================================================================ */
(function () {
'use strict';
if (typeof THREE === 'undefined') return;

/* ── PLANET DATA ─────────────────────────────────────────── */
var orbitRings = []; // track orbit rings for focus mode

var PLANETS = [
  { id:'mercury', label:'🌐 HTML/CSS',    color:0xb2b2b2, em:0x1a1a1a, size:0.30, orbitR:8,  spd:1.80, a:0.0,  moons:[] },
  { id:'venus',   label:'⚡ JavaScript',  color:0xd4a830, em:0x2c1800, size:0.50, orbitR:13, spd:1.10, a:1.2,  moons:[] },
  { id:'earth',   label:'🌍 Experience', color:0x1e5a96, em:0x000c1e, size:0.56, orbitR:18, spd:0.68, a:2.5,
    moons:[
      {name:'Kwikster',        sub:'Python Django Developer', period:'Aug 2025 – Present', color:0x00c8ff, oR:1.5, spd:1.1},
      {name:'KreativeTimeBox', sub:'Python Developer',        period:'May – Aug 2025',     color:0x00ffaa, oR:2.2, spd:0.65},
      {name:'SixPhrase',       sub:'DSA Trainer & Dev',       period:'Jan – Apr 2025',     color:0xff8a7a, oR:3.0, spd:0.38}
    ]
  },
  { id:'mars',    label:'🔴 Projects',   color:0xc2380c, em:0x2e0c00, size:0.46, orbitR:25, spd:0.48, a:0.8,
    moons:[
      {name:'AI KwikHire',    sub:'AI assessment & auto-eval',  period:'Django + AI',       color:0xff6b6b, oR:1.4, spd:1.05, link:'https://github.com/prakhau143/aptitude-project.git'},
      {name:'AI Auto Dialer', sub:'Smart voice calling',        period:'Lead routing',      color:0xffa07a, oR:2.0, spd:0.65, link:'https://github.com/prakhau143/auto-dialer.git'},
      {name:'EMS',            sub:'Employee management + HR',   period:'Full Stack',        color:0xff9900, oR:2.8, spd:0.42, link:'https://github.com/kwikster285/ems.git'},
      {name:'Food YumYum',    sub:'Food delivery platform',     period:'React + Django',    color:0xff4444, oR:3.6, spd:0.27, link:'https://github.com/prakhau143/food-yum-yum'},
      {name:'WhatsApp Bot',   sub:'Bulk messaging automation',  period:'Python + Selenium', color:0x25d366, oR:4.5, spd:0.18, link:'https://github.com/prakhau143/whatsapp-message-bot.git'}
    ]
  },
  { id:'jupiter', label:'🏆 Certificates', color:0xc8843a, em:0x200e00, size:1.02, orbitR:35, spd:0.26, a:3.8,
    moons:[
      {name:'AWS CCP',      sub:'Cloud Practitioner',     period:'Amazon Web Services · Mar 2024',    color:0xff9900, oR:2.0, spd:0.88, link:'https://drive.google.com/file/d/1VabzlHpogAJ9_PF8g5Sfr3trikE7ufBO/view'},
      {name:'NPTEL Cloud',  sub:'Elite Certification',    period:'IIT Kharagpur · Apr 2024',           color:0x0080ff, oR:2.9, spd:0.56, link:'https://drive.google.com/file/d/13Krgcxh6amf09RGio-ndIu0evz3_lzHd/view'},
      {name:'ML Python',    sub:'Applied Machine Learning',period:'Univ. of Michigan · Coursera',      color:0x4bc0c0, oR:3.8, spd:0.37, link:'https://drive.google.com/file/d/1YECBws1NRuRKC-PEUBVI4GSZJCh7N0YP/view'},
      {name:'MERN Stack',   sub:'Full Stack · 100+ hrs',  period:'Ethnus · Aug–Nov 2023',              color:0x61dafb, oR:4.8, spd:0.24, link:'https://drive.google.com/file/d/1BhOS4X1JKX1rwJAdB6f3h0pecUVNK6n9/view'},
      {name:'Robothon 2nd', sub:'Excellence Award',       period:'VIT Bhopal Robotics Club',           color:0xffd700, oR:5.9, spd:0.16, link:'https://drive.google.com/file/d/1-99_hzKRaNISBJUcbLuFSGtSWEG8Kzln/view'}
    ]
  },
  { id:'saturn',  label:'🪐 Tech Stack', color:0xe2d09a, em:0x1c1400, size:0.86, orbitR:45, spd:0.17, a:1.5, hasRings:true, ringColor:0xc8a840,
    moons:[
      {name:'React.js', sub:'Frontend framework',     period:'88% proficiency',   color:0x61dafb, oR:2.0, spd:0.78},
      {name:'Node.js',  sub:'Backend runtime',        period:'REST · Express',    color:0x5fa04e, oR:2.8, spd:0.50},
      {name:'Django',   sub:'Python web framework',   period:'Production systems', color:0x1ba074, oR:3.7, spd:0.32},
      {name:'Docker',   sub:'Containerisation',       period:'CI/CD pipelines',   color:0x1d63ed, oR:4.6, spd:0.20}
    ]
  },
  { id:'uranus',  label:'🤖 AI & Data', color:0x72d8e8, em:0x001418, size:0.64, orbitR:54, spd:0.11, a:4.2,
    moons:[
      {name:'TensorFlow', sub:'Deep Learning', period:'78% proficiency', color:0xff6f00, oR:1.7, spd:0.72},
      {name:'Pandas',     sub:'Data Analysis', period:'85% proficiency', color:0x150458, oR:2.5, spd:0.44}
    ]
  },
  { id:'neptune', label:'☕ Java/DSA',  color:0x4060e0, em:0x000820, size:0.60, orbitR:63, spd:0.08, a:2.1, moons:[] }
];

var TIMELINE = [
  {year:'2021', title:'Mission Initiated',    desc:'B.Tech CSE · VIT Bhopal · First code written', color:0xffd700},
  {year:'2022', title:'Algorithm Training',   desc:'DSA mastery · C · C++ · Java fundamentals',    color:0xff9900},
  {year:'2023', title:'Web Dev Mission',      desc:'MERN Full Stack · React · Node · Express',     color:0x00c8ff},
  {year:'2024', title:'Cloud Certified',      desc:'AWS CCP · NPTEL Elite · ML Python · Coursera', color:0x00ffaa},
  {year:'2025', title:'AI & Automation',      desc:'Django AI · Auto Dialer · EMS · KwikHire',     color:0xff6b6b},
  {year:'2026', title:'Present Mission',      desc:'Seeking next frontier...  Hire me →',           color:0xcc88ff}
];

var ACHIEVEMENTS = [
  { stars:[[-80,15,-60],[- 72,22,-55],[-65,12,-65],[-75, 8,-50]], title:'AWS Certified', desc:'Cloud Practitioner · Mar 2024', color:0xff9900 },
  { stars:[[70, 20, 40],[78, 28, 35],[65, 30, 45],[82,15,50]],   title:'NPTEL Elite',   desc:'IIT Kharagpur · 69%',           color:0x00c8ff },
  { stars:[[-40,-18,90],[-30,-10,85],[-50,-8,95],[-35,-22,88]],  title:'Robothon 2nd',  desc:'VIT Bhopal Robotics Club',      color:0xffd700 }
];

var KEYWORDS = {
  project:3, projects:3, build:3, portfolio:3, work:3, made:3, app:3,
  experience:2, intern:2, job:2, company:2, employed:2,
  certificate:4, cert:4, award:4, qualification:4,
  tech:5, stack:5, skill:5, tool:5,
  ai:6, data:6, machine:6, learn:6, tensorflow:6,
  java:7, dsa:7, algorithm:7, data_structure:7
};

/* ── STATE ───────────────────────────────────────────────── */
var scene, camera, renderer, sunLight;
var sunMesh, sunGlow, sunHalo, coronaPoints, coronaVel=[], flares=[];
var timelineRing, timelineLbls=[];
var planetMeshes=[], labelEls=[];
var statsPlanet, blackHole;
var activeMoonGrp=null, activeMoonLbls=[];
var constellations=[];

var isZoomed=false, selPData=null, animLock=false;
var isDrag=false, prevX=0, prevY=0, dragMoved=false;
var camT=0.25, camP=0.52, camR=85;
var lookAt=new THREE.Vector3(0,0,0);
var lookAtCur=new THREE.Vector3(0,0,0);
var raycaster, mousePt;
var tick=0;

var shootStars=[], ships=[];
var exploredPlanets=new Set();
var badgeShown=false;
var storyDone=false;

/* ── INIT ────────────────────────────────────────────────── */
function init(){
  var wrap=document.getElementById('ss3d-wrap');
  if(!wrap) return;
  var W=wrap.clientWidth||window.innerWidth;
  var H=wrap.clientHeight||window.innerHeight;

  scene=new THREE.Scene();
  scene.fog=new THREE.FogExp2(0x000004,0.0014);

  camera=new THREE.PerspectiveCamera(52,W/H,0.1,2000);
  setCam();

  renderer=new THREE.WebGLRenderer({antialias:true,alpha:false});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(W,H);
  renderer.setClearColor(0x000005,1);
  wrap.appendChild(renderer.domElement);

  raycaster=new THREE.Raycaster();
  mousePt=new THREE.Vector2();

  var amb=new THREE.AmbientLight(0x0a0a20,2.2);
  scene.add(amb);
  sunLight=new THREE.PointLight(0xfff5e0,3.5,350,1.1);
  scene.add(sunLight);

  buildStars();
  buildNebula();
  buildSun();
  buildPlanets();
  buildTimelineRing();
  buildConstellations();
  buildStatsPlanet();
  buildBlackHole();
  buildShootPool();
  buildShips();
  injectCSS();
  buildUI(wrap);

  renderer.domElement.addEventListener('pointerdown', onPD);
  renderer.domElement.addEventListener('pointermove', onPM);
  renderer.domElement.addEventListener('pointerup',   onPU);
  renderer.domElement.addEventListener('click',       onClick);
  renderer.domElement.addEventListener('wheel',       onWheel,{passive:true});
  window.addEventListener('resize', onResize);

  scene.scale.set(0.01,0.01,0.01);
  loop();

  // Trigger story after short delay
  setTimeout(runStoryMode, 1200);
}

/* ── STARS ───────────────────────────────────────────────── */
function buildStars(){
  function layer(n,spread,sz,col){
    var geo=new THREE.BufferGeometry();
    var pos=new Float32Array(n*3);
    for(var i=0;i<n;i++){pos[i*3]=(Math.random()-.5)*spread;pos[i*3+1]=(Math.random()-.5)*spread*.55;pos[i*3+2]=(Math.random()-.5)*spread;}
    geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
    scene.add(new THREE.Points(geo,new THREE.PointsMaterial({color:col,size:sz,sizeAttenuation:true})));
  }
  layer(3500,700,0.55,0xffffff);
  layer(6500,1600,0.28,0xaaddff);
}

/* ── NEBULA ──────────────────────────────────────────────── */
function buildNebula(){
  [[0x050020,.07],[0x200008,.05],[0x001520,.06]].forEach(function(d,i){
    var m=new THREE.Mesh(new THREE.SphereGeometry(100+i*55,8,8),
      new THREE.MeshBasicMaterial({color:d[0],transparent:true,opacity:d[1],side:THREE.BackSide}));
    m.position.set((i-1)*70,(i%2-.5)*40,-(i*25+60));
    scene.add(m);
  });
}

/* ── SUN (AI CORE REACTOR) ───────────────────────────────── */
function buildSun(){
  var SZ=3.5;
  sunMesh=new THREE.Mesh(new THREE.SphereGeometry(SZ,32,32),
    new THREE.MeshStandardMaterial({color:0xfff5a0,emissive:0xffaa00,emissiveIntensity:1.6,roughness:.55}));
  scene.add(sunMesh);

  sunGlow=new THREE.Mesh(new THREE.SphereGeometry(SZ*1.65,16,16),
    new THREE.MeshBasicMaterial({color:0xff8800,transparent:true,opacity:.13}));
  scene.add(sunGlow);

  sunHalo=new THREE.Mesh(new THREE.SphereGeometry(SZ*2.9,12,12),
    new THREE.MeshBasicMaterial({color:0xff4400,transparent:true,opacity:.05}));
  scene.add(sunHalo);

  // Corona particles
  var pCount=280, pos=new Float32Array(pCount*3);
  for(var i=0;i<pCount;i++){
    var phi=Math.random()*Math.PI*2, theta=Math.random()*Math.PI;
    var r=SZ+.2+Math.random()*1.4;
    pos[i*3]=Math.sin(theta)*Math.cos(phi)*r;
    pos[i*3+1]=Math.cos(theta)*r;
    pos[i*3+2]=Math.sin(theta)*Math.sin(phi)*r;
    coronaVel.push({phi,theta,r:SZ+.2+Math.random()*1.4,speed:.008+Math.random()*.012,rSpd:.005+Math.random()*.008});
  }
  var pGeo=new THREE.BufferGeometry();
  pGeo.setAttribute('position',new THREE.BufferAttribute(pos,3));
  coronaPoints=new THREE.Points(pGeo,new THREE.PointsMaterial({color:0xff8800,size:.12,transparent:true,opacity:.72,sizeAttenuation:true}));
  scene.add(coronaPoints);

  // Flare spikes (thin elongated geometry)
  for(var j=0;j<6;j++){
    var fGeo=new THREE.CylinderGeometry(.04,.01,SZ*(.8+Math.random()*.6),4);
    var fMat=new THREE.MeshBasicMaterial({color:0xffdd00,transparent:true,opacity:.55});
    var fMesh=new THREE.Mesh(fGeo,fMat);
    var fa=Math.random()*Math.PI*2;
    fMesh.position.set(Math.cos(fa)*SZ*.9,Math.sin(fa)*SZ*.9,0);
    fMesh.rotation.z=fa+Math.PI/2;
    scene.add(fMesh);
    flares.push({mesh:fMesh,baseAngle:fa,speed:.008+Math.random()*.01,phase:Math.random()*Math.PI*2});
  }
}

/* ── PLANETS ─────────────────────────────────────────────── */
function buildPlanets(){
  var lblLayer=document.getElementById('ss3d-labels');
  PLANETS.forEach(function(pd,i){
    var orb=new THREE.Mesh(new THREE.RingGeometry(pd.orbitR-.06,pd.orbitR+.06,120),
      new THREE.MeshBasicMaterial({color:0x1a2e44,side:THREE.DoubleSide,transparent:true,opacity:.35}));
    orb.rotation.x=Math.PI/2; scene.add(orb);
    orbitRings.push(orb);

    var mat=new THREE.MeshStandardMaterial({color:pd.color,emissive:pd.em,emissiveIntensity:.35,roughness:.75,metalness:.1});

    // Earth: add subtle blue-green surface variation
    if(pd.id==='earth') mat.color.setHex(0x2060a0);

    var mesh=new THREE.Mesh(new THREE.SphereGeometry(pd.size,24,24),mat);
    mesh.userData={idx:i,pData:pd};
    mesh.position.x=Math.cos(pd.a)*pd.orbitR;
    mesh.position.z=Math.sin(pd.a)*pd.orbitR;
    scene.add(mesh);
    planetMeshes.push(mesh);

    // Saturn rings
    if(pd.hasRings){
      var rMesh=new THREE.Mesh(new THREE.RingGeometry(pd.size*1.45,pd.size*2.45,72),
        new THREE.MeshBasicMaterial({color:pd.ringColor||0xc8a840,side:THREE.DoubleSide,transparent:true,opacity:.62}));
      rMesh.rotation.x=1.12; mesh.add(rMesh);
    }

    // HTML label
    if(lblLayer){
      var lbl=document.createElement('div');
      lbl.className='ss-plabel'; lbl.textContent=pd.label; lbl.dataset.i=i;
      lblLayer.appendChild(lbl); labelEls.push(lbl);
    }
  });
}

/* ── CAREER TIMELINE RING ────────────────────────────────── */
function buildTimelineRing(){
  var R=11; // just outside sun halo
  // Ring
  var rMesh=new THREE.Mesh(new THREE.RingGeometry(R-.06,R+.06,128),
    new THREE.MeshBasicMaterial({color:0x00c8ff,side:THREE.DoubleSide,transparent:true,opacity:.55}));
  rMesh.rotation.x=Math.PI/2;
  scene.add(rMesh);
  timelineRing=rMesh;

  var lblLayer=document.getElementById('ss3d-labels');
  TIMELINE.forEach(function(t,i){
    var a=(i/TIMELINE.length)*Math.PI*2-Math.PI/2;
    var x=Math.cos(a)*R, z=Math.sin(a)*R;

    // Marker
    var mMesh=new THREE.Mesh(new THREE.SphereGeometry(.18,8,8),
      new THREE.MeshBasicMaterial({color:t.color,transparent:true,opacity:.9}));
    mMesh.position.set(x,0,z);
    mMesh.userData={timelineData:t};
    scene.add(mMesh);

    // Glow
    var gMesh=new THREE.Mesh(new THREE.SphereGeometry(.30,8,8),
      new THREE.MeshBasicMaterial({color:t.color,transparent:true,opacity:.2}));
    mMesh.add(gMesh);

    if(lblLayer){
      var lbl=document.createElement('div');
      lbl.className='ss-year-label';
      lbl.textContent=t.year;
      lbl.style.color='#'+t.color.toString(16).padStart(6,'0');
      lbl.dataset.wx=x; lbl.dataset.wz=z;
      lbl.title=t.title+': '+t.desc;
      // Click shows timeline popup
      lbl.addEventListener('click',function(e){
        e.stopPropagation();
        showTimelinePanel(t);
      });
      lbl.style.pointerEvents='all';
      lbl.style.cursor='pointer';
      lblLayer.appendChild(lbl);
      timelineLbls.push({lbl,x,z,t});
    }
  });
}

/* ── ACHIEVEMENT CONSTELLATIONS ──────────────────────────── */
function buildConstellations(){
  var lblLayer=document.getElementById('ss3d-labels');
  ACHIEVEMENTS.forEach(function(ach,ai){
    var starMeshes=[];
    var col=ach.color;

    ach.stars.forEach(function(s,si){
      var m=new THREE.Mesh(new THREE.SphereGeometry(.22,8,8),
        new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.85}));
      m.position.set(s[0],s[1],s[2]);
      scene.add(m);
      starMeshes.push(m);

      // Glow
      var g=new THREE.Mesh(new THREE.SphereGeometry(.38,6,6),
        new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.15}));
      m.add(g);
    });

    // Connect stars with lines
    var pts=ach.stars.map(function(s){return new THREE.Vector3(s[0],s[1],s[2]);});
    var lineGeo=new THREE.BufferGeometry().setFromPoints(pts);
    var lineMat=new THREE.LineBasicMaterial({color:col,transparent:true,opacity:.3});
    scene.add(new THREE.Line(lineGeo,lineMat));

    // Label at centroid
    var cx=ach.stars.reduce(function(s,p){return s+p[0];},0)/ach.stars.length;
    var cy=ach.stars.reduce(function(s,p){return s+p[1];},0)/ach.stars.length;
    var cz=ach.stars.reduce(function(s,p){return s+p[2];},0)/ach.stars.length;

    if(lblLayer){
      var lbl=document.createElement('div');
      lbl.className='ss-const-label';
      lbl.innerHTML='<span>★</span> '+ach.title;
      lbl.dataset.wx=cx; lbl.dataset.wy=cy; lbl.dataset.wz=cz;
      lbl.title=ach.desc;
      lbl.style.pointerEvents='all';
      lbl.style.cursor='pointer';
      lbl.addEventListener('click',function(e){
        e.stopPropagation();
        showAchPanel(ach);
      });
      lblLayer.appendChild(lbl);
      constellations.push({lbl,x:cx,y:cy,z:cz,stars:starMeshes});
    }
  });
}

/* ── STATS DWARF PLANET ──────────────────────────────────── */
function buildStatsPlanet(){
  var orb=new THREE.Mesh(new THREE.RingGeometry(74,74.06,96),
    new THREE.MeshBasicMaterial({color:0x334466,side:THREE.DoubleSide,transparent:true,opacity:.25}));
  orb.rotation.x=Math.PI/2; scene.add(orb);

  statsPlanet=new THREE.Mesh(new THREE.SphereGeometry(.45,16,16),
    new THREE.MeshStandardMaterial({color:0x8060a0,emissive:0x200030,emissiveIntensity:.5,roughness:.7}));
  statsPlanet.userData.isStats=true;
  statsPlanet.userData.statsAngle=Math.PI*0.7;
  scene.add(statsPlanet);
}

/* ── BLACK HOLE ──────────────────────────────────────────── */
function buildBlackHole(){
  // Accretion disk ring
  var disk=new THREE.Mesh(new THREE.RingGeometry(1.8,3.5,64),
    new THREE.MeshBasicMaterial({color:0xff6600,side:THREE.DoubleSide,transparent:true,opacity:.4}));
  disk.rotation.x=Math.PI/3;

  blackHole=new THREE.Mesh(new THREE.SphereGeometry(1.5,16,16),
    new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:.92}));
  blackHole.position.set(-95,-12,78);
  blackHole.add(disk);
  blackHole.userData.isBlackHole=true;
  scene.add(blackHole);

  // Label
  var lblLayer=document.getElementById('ss3d-labels');
  if(lblLayer){
    var lbl=document.createElement('div');
    lbl.id='ss-bh-label';
    lbl.className='ss-bh-label';
    lbl.textContent='⬛';
    lbl.title='Classified...';
    lbl.style.pointerEvents='all';
    lbl.style.cursor='pointer';
    lbl.addEventListener('click',function(e){e.stopPropagation();showBlackHolePanel();});
    lblLayer.appendChild(lbl);
  }
}

/* ── SHOOTING STARS ──────────────────────────────────────── */
function buildShootPool(){
  for(var i=0;i<7;i++){
    var pts=[]; for(var j=0;j<22;j++) pts.push(new THREE.Vector3());
    var geo=new THREE.BufferGeometry().setFromPoints(pts);
    var mat=new THREE.LineBasicMaterial({color:0xffffff,transparent:true,opacity:0});
    scene.add(new THREE.Line(geo,mat));
    shootStars.push({line:null,geo,mat,active:false,life:0,maxLife:0,dir:new THREE.Vector3(),pos:new THREE.Vector3(),spd:0});
    shootStars[i].line=scene.children[scene.children.length-1];
  }
}
function launchStar(){
  var s=shootStars.find(function(x){return !x.active;}); if(!s) return;
  var side=Math.random()>.5?1:-1;
  s.pos.set(side*(140+Math.random()*40),(Math.random()-.5)*55,(Math.random()-.5)*90);
  s.dir.set(-side*(.88+Math.random()*.2),(Math.random()-.5)*.14,(Math.random()-.5)*.08).normalize();
  s.spd=1.6+Math.random()*2.4; s.active=true; s.life=0; s.maxLife=80+Math.random()*40;
  s.mat.color.setHex(Math.random()>.3?0xffffff:0x88ccff);
}
function tickStars(){
  if(Math.random()<.009) launchStar();
  shootStars.forEach(function(s){
    if(!s.active) return;
    s.life++;
    if(s.life>s.maxLife){s.active=false;s.mat.opacity=0;return;}
    var p=s.life/s.maxLife;
    s.mat.opacity=(p<.1?p/.1:p>.8?(1-p)/.2:1)*.88;
    s.pos.addScaledVector(s.dir,s.spd);
    var pa=s.geo.attributes.position.array;
    for(var i=0;i<22;i++){pa[i*3]=s.pos.x-s.dir.x*s.spd*i*1.6;pa[i*3+1]=s.pos.y-s.dir.y*s.spd*i*1.6;pa[i*3+2]=s.pos.z-s.dir.z*s.spd*i*1.6;}
    s.geo.attributes.position.needsUpdate=true;
  });
}

/* ── SPACESHIPS ──────────────────────────────────────────── */
function buildShips(){
  for(var i=0;i<4;i++){var g=makeShip();scene.add(g);resetShip(g,true);ships.push(g);}
}
function makeShip(){
  var g=new THREE.Group();
  var b=new THREE.Mesh(new THREE.ConeGeometry(.14,.75,6),
    new THREE.MeshStandardMaterial({color:0x6688aa,metalness:.85,roughness:.2,emissive:0x224466,emissiveIntensity:.4}));
  b.rotation.z=-Math.PI/2; g.add(b);
  var e=new THREE.Mesh(new THREE.SphereGeometry(.09,8,8),
    new THREE.MeshBasicMaterial({color:0x00aaff,transparent:true,opacity:.8}));
  e.position.x=-.46; g.add(e); g.userData.eng=e;
  var pts=[]; for(var k=0;k<14;k++) pts.push(new THREE.Vector3(-.46-k*.44,0,0));
  var t=new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),
    new THREE.LineBasicMaterial({color:0x00aaff,transparent:true,opacity:.45}));
  g.add(t); return g;
}
function resetShip(g,imm){
  var side=Math.random()>.5?1:-1;
  g.position.set(side*(155+Math.random()*30),(Math.random()-.5)*48,(Math.random()-.5)*75);
  g.userData.dir=new THREE.Vector3(-side,0,(Math.random()-.5)*.09).normalize();
  g.userData.spd=.28+Math.random()*.38;
  g.userData.delay=imm?Math.random()*480:0;
  g.userData.active=!imm; g.visible=!imm;
  g.rotation.y=side>0?Math.PI:0;
}
function tickShips(){
  ships.forEach(function(g){
    if(g.userData.delay>0){g.userData.delay--;return;}
    if(!g.userData.active){g.userData.active=true;g.visible=true;}
    g.position.addScaledVector(g.userData.dir,g.userData.spd);
    g.position.y+=Math.sin(tick*.018+g.userData.delay)*.008;
    if(g.userData.eng) g.userData.eng.material.opacity=.5+Math.sin(tick*.28)*.28;
    if(Math.abs(g.position.x)>175||Math.abs(g.position.z)>175) resetShip(g,false);
  });
}

/* ── CAMERA ──────────────────────────────────────────────── */
function setCam(){
  camera.position.x=camR*Math.sin(camP)*Math.sin(camT);
  camera.position.y=camR*Math.cos(camP);
  camera.position.z=camR*Math.sin(camP)*Math.cos(camT);
  camera.lookAt(lookAtCur);
}
function lerpCam(dst,look,dur,cb){
  animLock=true;
  var p0=camera.position.clone(), l0=lookAtCur.clone(), t=0;
  (function step(){
    t+=1/dur;
    var e=t<.5?2*t*t:-1+(4-2*t)*t, c=Math.min(e,1);
    camera.position.lerpVectors(p0,dst,c);
    lookAtCur.lerpVectors(l0,look,c);
    camera.lookAt(lookAtCur);
    if(t<1) requestAnimationFrame(step);
    else{animLock=false;if(cb)cb();}
  })();
}
function focusPlanet(selIdx) {
  planetMeshes.forEach(function(m, i) {
    var isSelected = (i === selIdx);
    m.material.transparent = true;
    m.material.opacity = isSelected ? 1 : 0.05;
    if(isSelected) m.scale.set(1.45, 1.45, 1.45);
    else m.scale.set(1, 1, 1);
  });
  orbitRings.forEach(function(r, i) {
    r.material.opacity = (i === selIdx) ? 0.55 : 0.03;
  });
  // Hide timeline ring and constellations for clean view
  if(timelineRing) timelineRing.visible = false;
  if(statsPlanet) statsPlanet.visible = false;
}

function unfocusPlanets() {
  planetMeshes.forEach(function(m) {
    m.material.transparent = false;
    m.material.opacity = 1;
    m.scale.set(1, 1, 1);
  });
  orbitRings.forEach(function(r) { r.material.opacity = 0.35; });
  if(timelineRing) timelineRing.visible = true;
  if(statsPlanet) statsPlanet.visible = true;
}

function zoomToPlanet(pMesh){
  if(animLock) return;
  var pd=pMesh.userData.pData;
  isZoomed=true; selPData=pd;
  exploredPlanets.add(pd.id);
  checkExplorerBadge();
  focusPlanet(pMesh.userData.idx);
  var tgt=pMesh.position.clone();
  var off=tgt.clone().normalize().multiplyScalar(pd.size*5.5+7);
  var dst=tgt.clone().add(new THREE.Vector3(off.x,pd.size*2.5+3.5,off.z));
  lerpCam(dst,tgt,55,function(){ spawnMoons(pd,pMesh.position.clone()); });
  setBackBtn(true);
  var te=document.getElementById('ss3d-ptitle');
  if(te){te.style.display='block';te.innerHTML='<div class="ss-ptlabel">'+pd.label+'</div><div class="ss-ptsub">Click a moon · Press ← to return</div>';}
}
function zoomOut(){
  if(!isZoomed||animLock) return;
  removeMoons(); isZoomed=false; selPData=null;
  unfocusPlanets();
  var fp=new THREE.Vector3(camR*Math.sin(camP)*Math.sin(camT),camR*Math.cos(camP),camR*Math.sin(camP)*Math.cos(camT));
  lerpCam(fp,new THREE.Vector3(0,0,0),52);
  setBackBtn(false);
  var te=document.getElementById('ss3d-ptitle'); if(te) te.style.display='none';
  hidePanels();
}

/* ── MOONS ───────────────────────────────────────────────── */
function spawnMoons(pd,parentPos){
  activeMoonGrp=new THREE.Group();
  activeMoonGrp.position.copy(parentPos);
  if(!pd.moons||!pd.moons.length){scene.add(activeMoonGrp);return;}
  var lblLayer=document.getElementById('ss3d-labels');
  pd.moons.forEach(function(md,mi){
    var orb=new THREE.Mesh(new THREE.RingGeometry(md.oR-.03,md.oR+.03,72),
      new THREE.MeshBasicMaterial({color:md.color,side:THREE.DoubleSide,transparent:true,opacity:.18}));
    activeMoonGrp.add(orb);
    var mm=new THREE.Mesh(new THREE.SphereGeometry(.18,12,12),
      new THREE.MeshStandardMaterial({color:md.color,emissive:md.color,emissiveIntensity:.55,roughness:.55}));
    mm.userData={moonData:md,moonIdx:mi,mOrbitR:md.oR,mSpd:md.spd,mAngle:(mi/pd.moons.length)*Math.PI*2};
    mm.add(new THREE.Mesh(new THREE.SphereGeometry(.30,8,8),new THREE.MeshBasicMaterial({color:md.color,transparent:true,opacity:.18})));
    activeMoonGrp.add(mm);
    if(lblLayer){
      var lbl=document.createElement('div');
      lbl.className='ss-mlabel'; lbl.textContent=md.name; lbl.style.pointerEvents='all'; lbl.style.cursor='pointer';
      lbl.addEventListener('click',function(e){e.stopPropagation();showMoonPanel(md);});
      lblLayer.appendChild(lbl); activeMoonLbls[mi]=lbl;
    }
  });
  scene.add(activeMoonGrp);
}
function removeMoons(){
  if(!activeMoonGrp) return;
  scene.remove(activeMoonGrp); activeMoonGrp=null;
  activeMoonLbls.forEach(function(l){if(l&&l.parentNode)l.parentNode.removeChild(l);});
  activeMoonLbls=[];
}

/* ── INFO PANELS ─────────────────────────────────────────── */
function showMoonPanel(md){
  var p=document.getElementById('ss3d-panel'); if(!p) return;
  var col='#'+((md.color||0x00c8ff).toString(16).padStart(6,'0'));
  var lk=md.link?'<a href="'+md.link+'" target="_blank" class="ss-panel-link">Open Project →</a>':'';
  p.innerHTML='<button class="ss-panel-close" onclick="document.getElementById(\'ss3d-panel\').style.display=\'none\'">✕</button>'
    +'<div class="ss-holo-bar"></div>'
    +'<div class="ss-panel-dot" style="background:'+col+';box-shadow:0 0 12px '+col+'"></div>'
    +'<div class="ss-panel-name">'+md.name+'</div>'
    +'<div class="ss-panel-sub">'+md.sub+'</div>'
    +'<div class="ss-panel-per">'+md.period+'</div>'
    +lk
    +'<div class="ss-scan-lines"></div>';
  p.style.display='block';
  p.style.animation='ss_holo_in .33s ease forwards';
}
function showTimelinePanel(t){
  var p=document.getElementById('ss3d-panel'); if(!p) return;
  var col='#'+t.color.toString(16).padStart(6,'0');
  p.innerHTML='<button class="ss-panel-close" onclick="document.getElementById(\'ss3d-panel\').style.display=\'none\'">✕</button>'
    +'<div class="ss-holo-bar"></div>'
    +'<div class="ss-panel-dot" style="background:'+col+';box-shadow:0 0 14px '+col+'"></div>'
    +'<div class="ss-year-big">'+t.year+'</div>'
    +'<div class="ss-panel-name">'+t.title+'</div>'
    +'<div class="ss-panel-per">'+t.desc+'</div>'
    +'<div class="ss-scan-lines"></div>';
  p.style.display='block';
  p.style.animation='ss_holo_in .33s ease forwards';
}
function showAchPanel(ach){
  var p=document.getElementById('ss3d-panel'); if(!p) return;
  var col='#'+ach.color.toString(16).padStart(6,'0');
  p.innerHTML='<button class="ss-panel-close" onclick="document.getElementById(\'ss3d-panel\').style.display=\'none\'">✕</button>'
    +'<div class="ss-holo-bar"></div>'
    +'<div class="ss-panel-dot" style="background:'+col+';box-shadow:0 0 12px '+col+'"></div>'
    +'<div class="ss-panel-name">★ '+ach.title+'</div>'
    +'<div class="ss-panel-per">'+ach.desc+'</div>'
    +'<div class="ss-scan-lines"></div>';
  p.style.display='block';
  p.style.animation='ss_holo_in .33s ease forwards';
}
function showBlackHolePanel(){
  var p=document.getElementById('ss3d-panel'); if(!p) return;
  p.innerHTML='<button class="ss-panel-close" onclick="document.getElementById(\'ss3d-panel\').style.display=\'none\'">✕</button>'
    +'<div class="ss-holo-bar"></div>'
    +'<div class="ss-year-big" style="color:#aa00ff">⬛</div>'
    +'<div class="ss-panel-name">Hidden Lab</div>'
    +'<div class="ss-panel-per">Experimental projects · AI research · Future ideas</div>'
    +'<div class="ss-panel-sub">🔬 AI Auto-Responder (prototype)</div>'
    +'<div class="ss-panel-sub">🧬 NLP Resume Parser (WIP)</div>'
    +'<div class="ss-panel-sub">🌐 AR Portfolio Viewer (concept)</div>'
    +'<div class="ss-scan-lines"></div>';
  p.style.display='block';
  p.style.animation='ss_holo_in .33s ease forwards';
  // Easter egg: flash
  document.getElementById('ss3d-wrap').style.animation='ss_flash .35s ease';
  setTimeout(function(){document.getElementById('ss3d-wrap').style.animation='';},400);
}
function showStatsPanel(){
  var p=document.getElementById('ss3d-panel'); if(!p) return;
  p.innerHTML='<button class="ss-panel-close" onclick="document.getElementById(\'ss3d-panel\').style.display=\'none\'">✕</button>'
    +'<div class="ss-holo-bar"></div>'
    +'<div class="ss-panel-name">📊 Career Stats</div>'
    +'<div class="ss-stat-row"><span>Projects Built</span><span class="ss-stat-val" data-val="16">0</span></div>'
    +'<div class="ss-stat-row"><span>Certificates</span><span class="ss-stat-val" data-val="5">0</span></div>'
    +'<div class="ss-stat-row"><span>Internships</span><span class="ss-stat-val" data-val="3">0</span></div>'
    +'<div class="ss-stat-row"><span>Skills Mastered</span><span class="ss-stat-val" data-val="20">0</span></div>'
    +'<div class="ss-stat-row"><span>Years Experience</span><span class="ss-stat-val" data-val="4">0</span></div>'
    +'<div class="ss-scan-lines"></div>';
  p.style.display='block';
  p.style.animation='ss_holo_in .33s ease forwards';
  // Animate counters
  document.querySelectorAll('.ss-stat-val').forEach(function(el){
    var target=parseInt(el.dataset.val);
    var n=0, interval=setInterval(function(){
      n=Math.min(n+Math.ceil(target/20),target);
      el.textContent=n;
      if(n>=target) clearInterval(interval);
    },50);
  });
}
function hidePanels(){
  var p=document.getElementById('ss3d-panel'); if(p) p.style.display='none';
}

/* ── JARVIS AI ASSISTANT ─────────────────────────────────── */
function initJarvis(){
  var form=document.getElementById('ss-jarvis-form');
  var input=document.getElementById('ss-jarvis-input');
  if(!form||!input) return;
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var q=input.value.toLowerCase();
    input.value='';
    var planetIdx=-1;
    Object.keys(KEYWORDS).forEach(function(kw){
      if(q.includes(kw)) planetIdx=KEYWORDS[kw];
    });
    if(planetIdx>=0&&planetIdx<planetMeshes.length&&!isZoomed&&!animLock){
      var resp=document.getElementById('ss-jarvis-resp');
      if(resp) resp.textContent='🚀 Navigating to '+PLANETS[planetIdx].label+'...';
      setTimeout(function(){ if(resp) resp.textContent=''; }, 2500);
      zoomToPlanet(planetMeshes[planetIdx]);
    } else if(q.includes('back')||q.includes('return')||q.includes('home')){
      if(isZoomed) zoomOut();
    } else if(q.includes('stat')||q.includes('number')||q.includes('how many')){
      showStatsPanel();
    } else {
      var resp=document.getElementById('ss-jarvis-resp');
      if(resp){ resp.textContent='Try: "show projects", "experience", "certificates"'; setTimeout(function(){resp.textContent='';},3000); }
    }
  });
}

/* ── RECRUITER FAST MODE ─────────────────────────────────── */
function toggleRecruiterMode(){
  var panel=document.getElementById('ss-recruiter-panel');
  if(!panel) return;
  panel.classList.toggle('ss-recruiter-open');
}

/* ── EXPLORER BADGE ──────────────────────────────────────── */
function checkExplorerBadge(){
  if(badgeShown) return;
  var mainPlanets=['earth','mars','jupiter','saturn','uranus'];
  var visited=mainPlanets.filter(function(p){return exploredPlanets.has(p);});
  var badge=document.getElementById('ss-badge');
  if(badge){
    var pct=Math.round((visited.length/mainPlanets.length)*100);
    badge.textContent='🔭 Explorer '+pct+'%';
    badge.style.opacity='1';
  }
  if(visited.length===mainPlanets.length&&!badgeShown){
    badgeShown=true;
    var overlay=document.getElementById('ss-badge-unlocked');
    if(overlay){overlay.style.display='flex';setTimeout(function(){overlay.style.opacity='0';setTimeout(function(){overlay.style.display='none';},700);},3000);}
    if(badge) badge.textContent='🏆 Universe Explorer!';
  }
}

/* ── UNIVERSE STORY MODE ─────────────────────────────────── */
function runStoryMode(){
  if(storyDone) return;
  storyDone=true;
  var overlay=document.getElementById('ss-story-overlay');
  if(!overlay) return;
  var seq=[
    {yr:'2021', txt:'MISSION INITIATED', sub:'B.Tech CSE — VIT Bhopal', dur:2200},
    {yr:'2023', txt:'FRONTEND DEVELOPMENT', sub:'React · Node · MERN Stack launched', dur:2000},
    {yr:'2024', txt:'CLOUD CERTIFIED', sub:'AWS · NPTEL Elite · ML Python', dur:1900},
    {yr:'2025', txt:'AI & AUTOMATION', sub:'Django AI · Auto Dialer · KwikHire deployed', dur:2000},
    {yr:'2026', txt:'PRESENT MISSION', sub:'Seeking next frontier...', dur:1800}
  ];
  overlay.style.display='flex';
  var i=0;
  function next(){
    if(i>=seq.length){overlay.style.opacity='0';setTimeout(function(){overlay.style.display='none';overlay.style.opacity='1';},800);return;}
    var s=seq[i];
    overlay.innerHTML='<div class="ss-story-yr">'+s.yr+'</div><div class="ss-story-txt">'+s.txt+'</div><div class="ss-story-sub">'+s.sub+'</div>';
    i++;
    setTimeout(next,s.dur);
  }
  next();
}

/* ── CLICK / MOUSE ───────────────────────────────────────── */
function onPD(e){isDrag=false;dragMoved=false;prevX=e.clientX;prevY=e.clientY;}
function onPM(e){
  var dx=e.clientX-prevX, dy=e.clientY-prevY;
  if(isDrag||Math.abs(dx)>4||Math.abs(dy)>4){
    isDrag=true;dragMoved=true;
    if(!isZoomed&&!animLock){camT-=dx*.0038;camP=Math.max(.12,Math.min(Math.PI/2.1,camP+dy*.0038));setCam();}
    prevX=e.clientX;prevY=e.clientY;
  }
  if(!isDrag&&!isZoomed){
    var rect=renderer.domElement.getBoundingClientRect();
    mousePt.x=((e.clientX-rect.left)/rect.width)*2-1;
    mousePt.y=-((e.clientY-rect.top)/rect.height)*2+1;
    raycaster.setFromCamera(mousePt,camera);
    renderer.domElement.style.cursor=raycaster.intersectObjects(planetMeshes).length?'pointer':'grab';
  }
}
function onPU(){setTimeout(function(){isDrag=false;},8);}
function onWheel(e){if(!isZoomed&&!animLock){camR=Math.max(22,Math.min(135,camR+e.deltaY*.04));setCam();}}

function onClick(e){
  if(dragMoved||animLock) return;
  var rect=renderer.domElement.getBoundingClientRect();
  mousePt.x=((e.clientX-rect.left)/rect.width)*2-1;
  mousePt.y=-((e.clientY-rect.top)/rect.height)*2+1;
  raycaster.setFromCamera(mousePt,camera);

  if(!isZoomed){
    // Check planets
    var hits=raycaster.intersectObjects(planetMeshes);
    if(hits.length){zoomToPlanet(hits[0].object);return;}
    // Stats planet
    if(statsPlanet){var sh=raycaster.intersectObject(statsPlanet);if(sh.length){showStatsPanel();return;}}
    // Black hole
    if(blackHole){var bh=raycaster.intersectObject(blackHole);if(bh.length){showBlackHolePanel();return;}}
    // Timeline markers
    var tlMeshes=[];
    scene.traverse(function(o){if(o.isMesh&&o.userData.timelineData) tlMeshes.push(o);});
    var th=raycaster.intersectObjects(tlMeshes);
    if(th.length){showTimelinePanel(th[0].object.userData.timelineData);return;}
    // Constellation stars
    var achMeshes=[];
    constellations.forEach(function(c){c.stars.forEach(function(s){achMeshes.push(s);});});
    var ah=raycaster.intersectObjects(achMeshes);
    if(ah.length){
      var idx=achMeshes.indexOf(ah[0].object);
      var ci=constellations.findIndex(function(c){return c.stars.indexOf(ah[0].object)>=0;});
      if(ci>=0) showAchPanel(ACHIEVEMENTS[ci]);
      return;
    }
  } else if(activeMoonGrp){
    var mMeshes=[];
    activeMoonGrp.traverse(function(o){if(o.isMesh) mMeshes.push(o);});
    var mh=raycaster.intersectObjects(mMeshes);
    if(mh.length){
      var obj=mh[0].object;
      while(obj&&!obj.userData.moonData) obj=obj.parent;
      if(obj&&obj.userData.moonData) showMoonPanel(obj.userData.moonData);
    }
  }
}

/* ── LABELS UPDATE ───────────────────────────────────────── */
function updateLabels(){
  var W=renderer.domElement.clientWidth||1;
  var H=renderer.domElement.clientHeight||1;

  // Planet labels
  planetMeshes.forEach(function(pm,i){
    var lbl=labelEls[i]; if(!lbl) return;
    if(isZoomed){lbl.style.opacity='0';return;}
    var v=pm.position.clone().project(camera);
    if(v.z>1){lbl.style.opacity='0';return;}
    lbl.style.opacity='1';
    lbl.style.left=(v.x*.5+.5)*W+'px';
    lbl.style.top=(-v.y*.5+.5)*H-22+'px';
  });

  // Timeline labels
  timelineLbls.forEach(function(tl){
    if(isZoomed){tl.lbl.style.opacity='0';return;}
    var v=new THREE.Vector3(tl.x,0,tl.z).project(camera);
    if(v.z>1){tl.lbl.style.opacity='0';return;}
    tl.lbl.style.opacity='1';
    tl.lbl.style.left=(v.x*.5+.5)*W+'px';
    tl.lbl.style.top=(-v.y*.5+.5)*H-22+'px';
  });

  // Constellation labels
  constellations.forEach(function(c){
    if(isZoomed){c.lbl.style.opacity='0';return;}
    var v=new THREE.Vector3(c.x,c.y,c.z).project(camera);
    if(v.z>1){c.lbl.style.opacity='0';return;}
    c.lbl.style.opacity='.75';
    c.lbl.style.left=(v.x*.5+.5)*W+'px';
    c.lbl.style.top=(-v.y*.5+.5)*H-18+'px';
  });

  // Black hole label
  if(blackHole){
    var bhLbl=document.getElementById('ss-bh-label');
    if(bhLbl){
      if(isZoomed){bhLbl.style.opacity='0';}
      else{
        var v=blackHole.position.clone().project(camera);
        if(v.z>1){bhLbl.style.opacity='0';}
        else{bhLbl.style.opacity='.35';bhLbl.style.left=(v.x*.5+.5)*W+'px';bhLbl.style.top=(-v.y*.5+.5)*H+'px';}
      }
    }
  }

  // Moon labels
  if(activeMoonGrp&&isZoomed){
    activeMoonGrp.children.forEach(function(obj){
      if(!obj.isMesh||!obj.userData.moonData) return;
      var mi=obj.userData.moonIdx, lbl=activeMoonLbls[mi]; if(!lbl) return;
      var wp=new THREE.Vector3(); obj.getWorldPosition(wp);
      var v=wp.project(camera);
      if(v.z>1){lbl.style.opacity='0';return;}
      lbl.style.opacity='1';
      lbl.style.left=(v.x*.5+.5)*W+'px';
      lbl.style.top=(-v.y*.5+.5)*H+16+'px';
    });
  }
}

/* ── MAIN LOOP ───────────────────────────────────────────── */
function loop(){
  requestAnimationFrame(loop); tick++;

  // Cinematic intro scale
  if(scene.scale.x<1){var ns=Math.min(1,scene.scale.x+.006);scene.scale.set(ns,ns,ns);}

  // Sun animation
  if(sunMesh) sunMesh.rotation.y+=.003;
  if(sunGlow) sunGlow.material.opacity=.11+Math.sin(tick*.038)*.045;
  if(sunHalo) sunHalo.material.opacity=.04+Math.sin(tick*.022)*.022;

  // Corona particles
  if(coronaPoints&&coronaPoints.geometry.attributes.position){
    var pa=coronaPoints.geometry.attributes.position.array;
    coronaVel.forEach(function(v,i){
      v.phi+=v.speed;
      v.r=3.5+.2+(.4+.8*((Math.sin(tick*.015+i)*.5+.5)));
      pa[i*3]=Math.sin(v.theta)*Math.cos(v.phi)*v.r;
      pa[i*3+1]=Math.cos(v.theta)*v.r*.6;
      pa[i*3+2]=Math.sin(v.theta)*Math.sin(v.phi)*v.r;
    });
    coronaPoints.geometry.attributes.position.needsUpdate=true;
  }

  // Flares
  flares.forEach(function(f){
    f.phase+=f.speed;
    f.mesh.material.opacity=.35+Math.sin(f.phase)*.25;
    f.mesh.scale.y=.8+Math.sin(f.phase*.7)*.4;
  });

  // Orbit planets
  if(!isZoomed&&!animLock){
    PLANETS.forEach(function(pd,i){
      pd.a+=pd.spd*.0048;
      planetMeshes[i].position.x=Math.cos(pd.a)*pd.orbitR;
      planetMeshes[i].position.z=Math.sin(pd.a)*pd.orbitR;
      planetMeshes[i].rotation.y+=.009;
    });
  }

  // Stats dwarf planet
  if(statsPlanet){
    statsPlanet.userData.statsAngle+=.006;
    statsPlanet.position.x=Math.cos(statsPlanet.userData.statsAngle)*74;
    statsPlanet.position.z=Math.sin(statsPlanet.userData.statsAngle)*74;
    statsPlanet.rotation.y+=.012;
  }

  // Black hole slow pulse
  if(blackHole) blackHole.rotation.y+=.002;

  // Timeline ring pulse
  if(timelineRing) timelineRing.material.opacity=.45+Math.sin(tick*.025)*.15;

  // Constellation star twinkle
  constellations.forEach(function(c){
    c.stars.forEach(function(s,si){
      s.material.opacity=.75+Math.sin(tick*.04+si*1.3)*.2;
    });
  });

  // Moon orbits
  if(activeMoonGrp&&isZoomed){
    if(selPData){
      var pi=PLANETS.indexOf(selPData);
      if(pi>=0) activeMoonGrp.position.copy(planetMeshes[pi].position);
    }
    activeMoonGrp.children.forEach(function(obj){
      if(!obj.isMesh||!obj.userData.moonData) return;
      obj.userData.mAngle+=obj.userData.mSpd*.012;
      obj.position.x=Math.cos(obj.userData.mAngle)*obj.userData.mOrbitR;
      obj.position.z=Math.sin(obj.userData.mAngle)*obj.userData.mOrbitR;
      obj.rotation.y+=.02;
    });
  }

  tickStars();
  tickShips();
  updateLabels();
  renderer.render(scene,camera);
}

/* ── HELPERS ─────────────────────────────────────────────── */
function setBackBtn(show){
  var b=document.getElementById('ss3d-back'); if(b) b.style.display=show?'flex':'none';
}
function onResize(){
  var w=document.getElementById('ss3d-wrap'); if(!w) return;
  var W=w.clientWidth||window.innerWidth, H=w.clientHeight||window.innerHeight;
  camera.aspect=W/H; camera.updateProjectionMatrix(); renderer.setSize(W,H);
}

/* ── UI BUILD ────────────────────────────────────────────── */
function buildUI(wrap){
  function mk(tag,id,cls,html){
    var el=document.createElement(tag);
    if(id) el.id=id; if(cls) el.className=cls; if(html) el.innerHTML=html;
    wrap.appendChild(el); return el;
  }

  mk('div','ss3d-labels','ss-labels-layer');
  mk('div','ss3d-title','ss-top-title',
    '<h2 style="margin:0;color:#fff;font-size:clamp(1.3rem,2.8vw,2rem);text-shadow:0 0 18px rgba(0,200,255,.35)">'
    +'<span style="color:#ff6b6b">My</span> Universe</h2>'
    +'<p style="margin:3px 0 0;color:rgba(190,225,255,.5);font-family:monospace;font-size:.75rem">8 planets · Click to explore · Drag to orbit</p>');

  // Back button
  var bb=mk('button','ss3d-back','ss-back-btn','← Back to Universe');
  bb.style.display='none'; bb.addEventListener('click',zoomOut);

  // Planet title
  mk('div','ss3d-ptitle','ss-ptitle-overlay').style.display='none';

  // Info panel (hologram)
  mk('div','ss3d-panel','ss-info-panel').style.display='none';

  // Hint
  var hint=mk('div',null,'ss-hint','Drag to rotate · Scroll to zoom · Click planet · Click year ring · Find the black hole ◼');
  setTimeout(function(){hint.style.opacity='0';},6000);

  // Explorer badge
  mk('div','ss-badge','ss-badge','🔭 Explorer 0%');

  // Badge unlocked overlay
  var bu=mk('div','ss-badge-unlocked','ss-badge-unlocked-overlay',
    '<div style="text-align:center">'
    +'<div style="font-size:3rem">🏆</div>'
    +'<div style="font-size:1.4rem;font-weight:700;color:#ffd700">Universe Explorer!</div>'
    +'<div style="color:rgba(255,255,255,.7);font-size:.9rem;margin-top:8px">You\'ve explored every planet!</div>'
    +'</div>');
  bu.style.display='none';

  // Recruiter Fast Mode button
  var rb=mk('button',null,'ss-recruiter-btn','⚡ Quick Resume',);
  rb.addEventListener('click',toggleRecruiterMode);

  // Recruiter panel
  mk('div','ss-recruiter-panel','ss-recruiter-panel',
    '<div class="ss-rec-close" onclick="document.getElementById(\'ss-recruiter-panel\').classList.remove(\'ss-recruiter-open\')">✕</div>'
    +'<h3 style="color:#fff;margin:0 0 16px;font-size:1.1rem">⚡ Prakhar Mittal</h3>'
    +'<div class="ss-rec-sect">📌 Now: Python Django Dev @ Kwikster</div>'
    +'<div class="ss-rec-sect">🎓 B.Tech CSE · VIT Bhopal · 2021–2025</div>'
    +'<hr style="border-color:rgba(255,255,255,.1);margin:12px 0">'
    +'<div class="ss-rec-sect"><strong>Skills</strong><br>Python · Django · React · AWS · Docker · Node.js</div>'
    +'<div class="ss-rec-sect"><strong>Projects</strong><br>AI Auto Dialer · KwikHire · EMS · WhatsApp Bot · 12+ more</div>'
    +'<div class="ss-rec-sect"><strong>Certs</strong><br>AWS CCP · NPTEL Cloud Elite · ML Python · MERN</div>'
    +'<hr style="border-color:rgba(255,255,255,.1);margin:12px 0">'
    +'<a href="https://drive.google.com/file/d/1tPOkux79gDPGOhhVVQeGY3wZRTFC-iyx/view" target="_blank" class="ss-rec-resume">📄 Download Resume</a>'
    +'<a href="https://www.linkedin.com/in/its-prakhar-mittal" target="_blank" class="ss-rec-resume" style="background:rgba(0,100,255,.2);margin-top:8px">💼 LinkedIn</a>'
  );

  // Jarvis AI
  mk('div','ss-jarvis','ss-jarvis-wrap',
    '<div class="ss-jarvis-orb" title="Ask JARVIS">🤖</div>'
    +'<div class="ss-jarvis-panel" id="ss-jarvis-panel">'
    +'<div style="font-size:.78rem;color:rgba(200,230,255,.6);margin-bottom:8px">JARVIS — Ask me anything</div>'
    +'<form id="ss-jarvis-form"><input id="ss-jarvis-input" class="ss-jarvis-input" placeholder="show projects, experience..." autocomplete="off"></form>'
    +'<div id="ss-jarvis-resp" class="ss-jarvis-resp"></div>'
    +'</div>'
  );
  // Toggle Jarvis panel
  wrap.querySelector('.ss-jarvis-orb').addEventListener('click',function(){
    var jp=document.getElementById('ss-jarvis-panel');
    jp.style.display=jp.style.display==='block'?'none':'block';
  });

  // Story overlay
  mk('div','ss-story-overlay','ss-story-overlay','').style.display='none';

  // Badge unlocked (hidden)
  initJarvis();
}

/* ── CSS INJECTION ───────────────────────────────────────── */
function injectCSS(){
  if(document.getElementById('ss3d-style')) return;
  var s=document.createElement('style'); s.id='ss3d-style';
  s.textContent=[
    '#ss3d-wrap{position:relative;width:100%;height:100vh;overflow:hidden;background:#000005;}',
    '#ss3d-wrap canvas{display:block;width:100%!important;height:100%!important;}',
    '.ss-labels-layer{position:absolute;inset:0;pointer-events:none;overflow:hidden;}',

    /* planet/moon labels */
    '.ss-plabel{position:absolute;transform:translateX(-50%);color:rgba(200,230,255,.82);font-size:10px;font-weight:700;font-family:monospace;white-space:nowrap;text-shadow:0 0 8px rgba(0,200,255,.6);letter-spacing:.05em;pointer-events:none;transition:opacity .2s;}',
    '.ss-mlabel{position:absolute;transform:translateX(-50%);color:rgba(180,220,255,.78);font-size:10px;font-weight:600;font-family:monospace;white-space:nowrap;pointer-events:all;transition:opacity .2s,color .2s;cursor:pointer;}',
    '.ss-mlabel:hover{color:#0ff;}',
    '.ss-year-label{position:absolute;transform:translateX(-50%);font-size:10px;font-weight:700;font-family:monospace;white-space:nowrap;pointer-events:all;cursor:pointer;text-shadow:0 0 8px currentColor;transition:opacity .2s;}',
    '.ss-const-label{position:absolute;transform:translateX(-50%);font-size:9px;font-weight:600;font-family:monospace;color:rgba(255,220,80,.72);white-space:nowrap;pointer-events:all;cursor:pointer;letter-spacing:.05em;text-shadow:0 0 6px rgba(255,200,50,.4);transition:opacity .2s;}',
    '.ss-bh-label{position:absolute;transform:translateX(-50%);font-size:18px;pointer-events:all;cursor:pointer;filter:drop-shadow(0 0 6px #aa00ff);transition:opacity .3s;}',

    /* back + title */
    '.ss-back-btn{position:absolute;top:18px;left:22px;z-index:120;display:flex;align-items:center;gap:7px;background:rgba(0,200,255,.1);border:1px solid rgba(0,200,255,.3);color:rgba(0,220,255,.9);padding:9px 20px;border-radius:50px;font:600 12px monospace;cursor:pointer;backdrop-filter:blur(10px);transition:all .25s;}',
    '.ss-back-btn:hover{background:rgba(0,200,255,.2);transform:translateX(-2px);}',
    '.ss-ptitle-overlay{position:absolute;top:18px;left:50%;transform:translateX(-50%);z-index:110;text-align:center;pointer-events:none;}',
    '.ss-ptlabel{font-size:1.3rem;font-weight:700;color:#fff;text-shadow:0 0 18px rgba(0,200,255,.45);}',
    '.ss-ptsub{font-size:.75rem;color:rgba(200,230,255,.55);font-family:monospace;margin-top:3px;}',

    /* hologram info panel */
    '.ss-info-panel{position:absolute;right:22px;top:50%;transform:translateY(-50%);z-index:120;background:rgba(2,8,22,.92);backdrop-filter:blur(20px);border:1px solid rgba(0,200,255,.22);border-radius:16px;padding:24px 20px;min-width:220px;max-width:275px;box-shadow:0 0 40px rgba(0,180,255,.12),inset 0 1px 0 rgba(255,255,255,.04);overflow:hidden;}',
    '.ss-holo-bar{height:2px;background:linear-gradient(90deg,transparent,#00c8ff,transparent);margin-bottom:16px;animation:ss_scan 2.5s linear infinite;}',
    '@keyframes ss_scan{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}',
    '.ss-scan-lines{position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,200,255,.025) 3px,rgba(0,200,255,.025) 4px);pointer-events:none;border-radius:16px;}',
    '.ss-panel-close{position:absolute;top:10px;right:12px;background:none;border:none;color:rgba(200,230,255,.55);font-size:13px;cursor:pointer;padding:4px 8px;border-radius:50%;transition:color .2s;}',
    '.ss-panel-close:hover{color:#fff;}',
    '.ss-panel-dot{width:11px;height:11px;border-radius:50%;margin-bottom:12px;}',
    '.ss-panel-name{font-size:1.0rem;font-weight:700;color:#fff;margin-bottom:5px;}',
    '.ss-panel-sub{font-size:.83rem;color:rgba(200,230,255,.8);font-family:monospace;margin-bottom:3px;}',
    '.ss-panel-per{font-size:.78rem;color:rgba(150,200,255,.55);font-style:italic;margin-bottom:14px;}',
    '.ss-panel-link{display:inline-block;color:#00c8ff;font-size:.83rem;font-weight:600;text-decoration:none;border:1px solid rgba(0,200,255,.3);padding:5px 14px;border-radius:20px;transition:all .2s;}',
    '.ss-panel-link:hover{background:rgba(0,200,255,.14);}',
    '.ss-year-big{font-size:2.2rem;font-weight:900;color:#fff;font-family:monospace;margin-bottom:8px;text-shadow:0 0 20px rgba(0,200,255,.4);}',
    '.ss-stat-row{display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.06);font-size:.82rem;color:rgba(200,230,255,.78);}',
    '.ss-stat-val{font-weight:700;color:#00eeff;font-family:monospace;font-size:1.1rem;}',
    '@keyframes ss_holo_in{from{opacity:0;transform:translateY(-50%) scale(.92)}to{opacity:1;transform:translateY(-50%) scale(1)}}',

    /* Top title */
    '.ss-top-title{position:absolute;top:18px;left:50%;transform:translateX(-50%);z-index:50;text-align:center;pointer-events:none;white-space:nowrap;}',

    /* Hint */
    '.ss-hint{position:absolute;bottom:22px;left:50%;transform:translateX(-50%);color:rgba(200,230,255,.35);font:11px monospace;pointer-events:none;z-index:100;white-space:nowrap;transition:opacity 1.8s ease;}',

    /* Explorer badge */
    '.ss-badge{position:absolute;bottom:18px;right:22px;z-index:110;color:rgba(200,230,255,.55);font:700 11px monospace;background:rgba(255,255,255,.05);padding:6px 14px;border-radius:50px;border:1px solid rgba(255,255,255,.1);transition:opacity .4s,color .4s;}',
    '.ss-badge-unlocked-overlay{position:absolute;inset:0;background:rgba(0,0,0,.75);backdrop-filter:blur(8px);z-index:200;display:flex;align-items:center;justify-content:center;transition:opacity .7s;}',

    /* Recruiter mode */
    '.ss-recruiter-btn{position:absolute;top:18px;right:22px;z-index:120;background:rgba(255,170,0,.12);border:1px solid rgba(255,170,0,.35);color:rgba(255,200,50,.9);padding:9px 18px;border-radius:50px;font:700 12px monospace;cursor:pointer;backdrop-filter:blur(10px);transition:all .25s;letter-spacing:.04em;}',
    '.ss-recruiter-btn:hover{background:rgba(255,170,0,.22);}',
    '.ss-recruiter-panel{position:absolute;top:60px;right:22px;z-index:130;background:rgba(3,8,24,.93);backdrop-filter:blur(20px);border:1px solid rgba(255,170,0,.25);border-radius:16px;padding:22px 18px;width:260px;box-shadow:0 0 30px rgba(255,150,0,.12);transform:translateX(300px);transition:transform .4s cubic-bezier(.2,.8,.3,1);}',
    '.ss-recruiter-panel.ss-recruiter-open{transform:translateX(0);}',
    '.ss-rec-close{position:absolute;top:10px;right:14px;background:none;border:none;color:rgba(200,230,255,.5);cursor:pointer;font-size:13px;}',
    '.ss-rec-sect{font-size:.8rem;color:rgba(200,228,255,.75);margin-bottom:8px;line-height:1.4;}',
    '.ss-rec-resume{display:block;background:rgba(0,200,255,.12);border:1px solid rgba(0,200,255,.28);color:rgba(0,220,255,.9)!important;text-decoration:none!important;padding:9px 14px;border-radius:12px;font-size:.8rem;font-weight:600;text-align:center;transition:all .25s;}',
    '.ss-rec-resume:hover{background:rgba(0,200,255,.22);}',

    /* Jarvis */
    '.ss-jarvis-wrap{position:absolute;bottom:60px;right:22px;z-index:120;}',
    '.ss-jarvis-orb{width:44px;height:44px;background:radial-gradient(circle,#00c8ff,#0044aa);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.3rem;cursor:pointer;box-shadow:0 0 18px rgba(0,180,255,.5);transition:box-shadow .25s;animation:ss_orb_pulse 2.5s ease-in-out infinite;}',
    '@keyframes ss_orb_pulse{0%,100%{box-shadow:0 0 18px rgba(0,180,255,.5)}50%{box-shadow:0 0 30px rgba(0,200,255,.8)}}',
    '.ss-jarvis-panel{display:none;position:absolute;bottom:54px;right:0;background:rgba(2,8,24,.92);backdrop-filter:blur(16px);border:1px solid rgba(0,200,255,.22);border-radius:14px;padding:14px 16px;width:240px;box-shadow:0 0 24px rgba(0,180,255,.1);}',
    '.ss-jarvis-input{width:100%;background:rgba(255,255,255,.06);border:1px solid rgba(0,200,255,.25);border-radius:10px;color:#fff;padding:7px 12px;font-size:.82rem;font-family:monospace;outline:none;transition:border-color .2s;}',
    '.ss-jarvis-input:focus{border-color:rgba(0,200,255,.5);}',
    '.ss-jarvis-input::placeholder{color:rgba(200,230,255,.35);}',
    '.ss-jarvis-resp{font-size:.75rem;color:rgba(0,220,255,.8);margin-top:7px;font-family:monospace;min-height:16px;}',

    /* Story mode */
    '.ss-story-overlay{position:absolute;inset:0;background:rgba(0,0,0,.85);backdrop-filter:blur(6px);z-index:200;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;transition:opacity .8s ease;}',
    '.ss-story-yr{font-size:clamp(3rem,8vw,6rem);font-weight:900;color:#fff;font-family:monospace;text-shadow:0 0 40px rgba(0,200,255,.6);letter-spacing:.1em;}',
    '.ss-story-txt{font-size:clamp(1rem,2.5vw,1.6rem);font-weight:700;color:rgba(0,220,255,.9);font-family:monospace;letter-spacing:.15em;margin:8px 0;}',
    '.ss-story-sub{font-size:clamp(.75rem,1.5vw,1rem);color:rgba(200,230,255,.55);font-family:monospace;letter-spacing:.05em;}',

    /* Flash */
    '@keyframes ss_flash{0%{filter:brightness(1)}50%{filter:brightness(3) invert(1)}100%{filter:brightness(1)}}',

    /* Responsive */
    '@media(max-width:768px){.ss-info-panel{right:50%;transform:translate(50%,-50%);min-width:200px;}.ss-recruiter-panel{width:240px;}.ss-back-btn{font-size:11px;padding:8px 14px;}.ss-recruiter-btn{font-size:11px;padding:8px 14px;}}',
  ].join('');
  document.head.appendChild(s);
}

/* ── BOOT ────────────────────────────────────────────────── */
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',function(){setTimeout(init,80);});
} else { setTimeout(init,80); }

})();

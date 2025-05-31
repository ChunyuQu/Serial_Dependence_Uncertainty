/**************************** 
 * Serial_Dependence_U *
 ****************************/

import { core, data, sound, util, visual, hardware } from './lib/psychojs-2023.2.3.js';
const { PsychoJS } = core;
const { TrialHandler, MultiStairHandler } = data;
const { Scheduler } = util;
//some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;


// store info about the experiment session:
let expName = 'Serial_Dependence_U';  // from the Builder filename that created this script
let expInfo = {
    'participant': `${util.pad(Number.parseFloat(util.randint(0, 999999)).toFixed(0), 6)}`,
    'session': '001',
    'sex': '',
    'age': '',
};

// Start code blocks for 'Before Experiment'
// Run 'Before Experiment' code from code_2
console.log("🔍 当前 x_scale =", x_scale);  // ✅ 输出 x_scale 的值
class Dot {
  constructor(x, y, radius, speed, direction) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.mode = "noise";  // 默认值

    //const blend = 0.1;  // 插值权重，越小越平滑
    //this.theta = (1 - blend) * this.theta + blend * this.fixedDir;
      
   // const noiseScale = 0.3;
    //this.theta += (Math.random() - 0.5) * noiseScale;
    this.theta = Math.random() * 2 * Math.PI;
    this.fixedDir = direction;  // coherent motion direction
    this.noiseBias = (Math.random() - 0.5) * Math.PI;  // ±90° 偏置
    //this.maxLife = 180+ Math.floor(Math.random() *20);  // 30–90 帧寿命
    this.life = Math.floor(Math.random() * this.maxLife);  // 随机 phase
  }

updateDirection(dt) {
  if (this.mode === "coherent") {
    this.move(this.fixedDir, dt);
  } else {
   this.theta = Math.random() * 2 * Math.PI;
this.move(this.theta, dt);

  }
}


  move(theta, dt) {
    this.x += this.speed * dt * Math.cos(theta);
    this.y += this.speed * dt * Math.sin(theta);

    // ⭕ Wrap：点超出边界则从对侧重新进入
    const dx = this.x - fieldCenterX;
    const dy = this.y - fieldCenterY;
    if (dx * dx + dy * dy > fieldRadius * fieldRadius) {
      const angle = Math.atan2(dy, dx) + Math.PI;
      const r = fieldRadius * Math.sqrt(Math.random());
      this.x = fieldCenterX + r * Math.cos(angle);
      this.y = fieldCenterY + r * Math.sin(angle);
      this.theta = Math.random() * 2 * Math.PI;
    }

    // 🧬 Dot life 机制：过期后自动重生
    this.life -= 1;
    if (this.life <= 0) {
      const angle = Math.random() * 2 * Math.PI;
      const r = fieldRadius * Math.sqrt(Math.random());
      this.x = fieldCenterX + r * Math.cos(angle);
      this.y = fieldCenterY + r * Math.sin(angle);
      this.theta = Math.random() * 2 * Math.PI;
      this.life = this.maxLife;
      this.noiseBias = (Math.random() - 0.5) * Math.PI;  // 重新随机化个体偏置
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
  }
}

class RampEnvelope {
  constructor(start = 0.0, peak = 0.7, pre = 200, rampUp = 60, plateau = 800, rampDown = 60, post = 200) {
    this.start = start;
    this.peak = peak;
    this.t1 = pre;
    this.t2 = this.t1 + rampUp;
    this.t3 = this.t2 + plateau;
    this.t4 = this.t3 + rampDown;
    this.t5 = this.t4 + post;
  }

  getCoherence(t) {
    if (t < this.t1) return this.start;
    if (t < this.t2) return this.start + (this.peak - this.start) * ((t - this.t1) / (this.t2 - this.t1));
    if (t < this.t3) return this.peak;
    if (t < this.t4) return this.peak - (this.peak - this.start) * ((t - this.t3) / (this.t4 - this.t3));
    return this.start;
  }
   getSpeedFactor(t) {
  const coh = this.getCoherence(t);  // 利用已有函数
  // 假设 plateau 区间用 full speed = 1.0
  // ramp 阶段逐渐从 0.6 ~ 1.0
  if (coh <= 0.1) return 1;
  return 0.8 + 0.2 * (coh / this.peak) ;  // [0.6 ~ 1.0]0.8 + 0.2 * (coh / this.peak)
}

  isFinished(t) {
    return t >= this.t5;
  }
}


function getPerceptualSpeed(baseSpeed, coherence) {
  const scale = 1   ;  // 0.3 → 1.04, 0.7 → 0.96
  return baseSpeed * scale;
} 

function assignDotModes(dots, coherence) {
  const nSignal = Math.round(dots.length * coherence);
  const indices = [...Array(dots.length).keys()];
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const signalIndices = indices.slice(0, nSignal);

  for (let i = 0; i < dots.length; i++) {
    dots[i].mode = signalIndices.includes(i) ? "coherent" : "noise";
  }
}


function perceptualSpeedCompensation(baseSpeed, coherence) {
  const k = 0.7;  // 补偿因子
  if (coherence <= 0.1) {
    return baseSpeed;  // coherence 太低，不补偿
  } else {
    return baseSpeed * (1 + k * (0.7 - coherence));
    // coherence=0.7 → 无补偿，coherence=0.3 → 有补偿
  }
}

window.keyDuration_global = 9999;

function ensureCanvasReady() {
  if (!window.rdkCanvas) {
    const canvas = document.createElement("canvas");
    canvas.id = "canvas";
    canvas.width = psychoJS.window.size[0];
    canvas.height = psychoJS.window.size[1];
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "10";
    canvas.style.backgroundColor = "transparent";
    document.getElementById("root").appendChild(canvas);
    window.rdkCanvas = canvas;
  }
}

// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: true,
  color: new util.Color([0,0,0]),
  units: 'height',
  waitBlanking: true,
  backgroundImage: '',
  backgroundFit: 'none',
});
// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
  dictionary: expInfo,
  title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
flowScheduler.add(Scale_setupRoutineBegin());
flowScheduler.add(Scale_setupRoutineEachFrame());
flowScheduler.add(Scale_setupRoutineEnd());
const trials_2LoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(trials_2LoopBegin(trials_2LoopScheduler));
flowScheduler.add(trials_2LoopScheduler);
flowScheduler.add(trials_2LoopEnd);



flowScheduler.add(IntroRoutineBegin());
flowScheduler.add(IntroRoutineEachFrame());
flowScheduler.add(IntroRoutineEnd());
const trialsLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(trialsLoopBegin(trialsLoopScheduler));
flowScheduler.add(trialsLoopScheduler);
flowScheduler.add(trialsLoopEnd);










flowScheduler.add(exit_routineRoutineBegin());
flowScheduler.add(exit_routineRoutineEachFrame());
flowScheduler.add(exit_routineRoutineEnd());
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    // resources:
    {'name': 'condition.csv', 'path': 'condition.csv'},
    {'name': 'bank-1300155_640.png', 'path': 'bank-1300155_640.png'},
    {'name': 'instr.png', 'path': 'instr.png'},
    {'name': 'dots.js', 'path': 'dots.js'},
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.EXP);


var currentLoop;
var frameDur;
async function updateInfo() {
  currentLoop = psychoJS.experiment;  // right now there are no loops
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2023.2.3';
  expInfo['OS'] = window.navigator.platform;


  // store frame rate of monitor if we can measure it successfully
  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  

  
  psychoJS.experiment.dataFileName = (("." + "/") + `data/${expInfo["participant"]}_${expName}_${expInfo["date"]}`);
  psychoJS.experiment.field_separator = '\t';


  return Scheduler.Event.NEXT;
}


var Scale_setupClock;
var show_keys;
var show_touch;
var oldt;
var x_size;
var y_size;
var screen_height;
var x_scale;
var y_scale;
var dbase;
var unittext;
var vsize;
var screen_scale_keysClock;
var text_top;
var text_bottom;
var ccimage;
var rectangel_keysClock;
var rectangle_text_keys;
var polygon_keys;
var key_resp_keys;
var IntroClock;
var BKG;
var Ins_image_2;
var key_resp_2;
var blockClock;
var Block_t_2;
var Block_resp_2;
var ITIClock;
var BKG_9;
var Mask_2Clock;
var BKG_6;
var encodingClock;
var BKG_3;
var CueClock;
var BKG_8;
var text;
var ResponseClock;
var BKG_4;
var Feedback_TimeClock;
var BKG_7;
var PresentDur;
var color_1;
var color_2;
var color_3;
var color_4;
var color_5;
var feedback_1_T;
var feedback_2_T;
var feedback_3_T;
var feedback_4_T;
var feedback_5_T;
var exit_routineClock;
var text_3;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "Scale_setup"
  Scale_setupClock = new util.Clock();
  // Run 'Begin Experiment' code from code
  psychoJS.window.mouseVisible = false;
  document.body.style.cursor = "none";
  
  show_keys = 0;
  show_touch = 0;
  if ((expInfo["device type"] === "Touch screen")) {
      show_touch = 1;
  } else {
      show_keys = 1;
  }
  oldt = 0;
  x_size = 8.56;
  y_size = 5.398;
  screen_height = 0;
  if ((psychoJS.window.units === "norm")) {
      x_scale = 0.05;
      y_scale = 0.1;
      dbase = 0.0001;
      unittext = " norm units";
      vsize = 2;
  } else {
      if ((psychoJS.window.units === "pix")) {
          x_scale = 60;
          y_scale = 40;
          dbase = 0.1;
          unittext = " pixels";
          vsize = psychoJS.window.size[1];
      } else {
          x_scale = 0.05;
          y_scale = 0.05;
          dbase = 0.0001;
          unittext = " height units";
          vsize = 1;
      }
  }
  
  // Initialize components for Routine "screen_scale_keys"
  screen_scale_keysClock = new util.Clock();
  text_top = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_top',
    text: 'Resize this image to match the size of a credit card\nUp arrow for taller\nDown arrow for shorter\nLeft arrow for narrower\nRight arrow for wider',
    font: 'Arial',
    units: 'norm', 
    pos: [0, 0.7], height: 0.1,  wrapWidth: 1.5, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  text_bottom = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_bottom',
    text: 'Press the space bar when done',
    font: 'Arial',
    units: 'norm', 
    pos: [0, (- 0.6)], height: 0.1,  wrapWidth: 1.5, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1,
    depth: -2.0 
  });
  
  ccimage = new visual.ImageStim({
    win : psychoJS.window,
    name : 'ccimage', units : undefined, 
    image : 'bank-1300155_640.png', mask : undefined,
    anchor : 'center',
    ori : 0, pos : [0, 0], size : [(x_size * x_scale), (y_size * y_scale)],
    color : new util.Color([1, 1, 1]), opacity : 1,
    flipHoriz : false, flipVert : false,
    texRes : 128, interpolate : true, depth : -3.0 
  });
  // Initialize components for Routine "rectangel_keys"
  rectangel_keysClock = new util.Clock();
  rectangle_text_keys = new visual.TextStim({
    win: psychoJS.window,
    name: 'rectangle_text_keys',
    text: 'This shape should be a 10 cm square.\nComponent size  (10*x_scale, 10*y_scale) set every repeat.\nPress space to continue.',
    font: 'Arial',
    units: 'norm', 
    pos: [0, (- 0.8)], height: 0.1,  wrapWidth: 1.5, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  polygon_keys = new visual.Rect ({
    win: psychoJS.window, name: 'polygon_keys', 
    width: [1.0, 1.0][0], height: [1.0, 1.0][1],
    ori: 0, pos: [0, 0],
    anchor: 'center',
    lineWidth: 1, 
    colorSpace: 'rgb',
    lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([1, 1, 1]),
    opacity: 1, depth: -1, interpolate: true,
  });
  
  key_resp_keys = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "Intro"
  IntroClock = new util.Clock();
  BKG = new visual.Polygon ({
    win: psychoJS.window, name: 'BKG', units : 'pix', 
    edges: 360, size:[15, 15],
    ori: 0, pos: [0, 0],
    anchor: 'center',
    lineWidth: 5, 
    colorSpace: 'rgb',
    lineColor: new util.Color([(- 0.25), (- 0.25), (- 0.25)]),
    fillColor: new util.Color([(- 0.25), (- 0.25), (- 0.25)]),
    opacity: 1, depth: 0, interpolate: true,
  });
  
  Ins_image_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'Ins_image_2', units : 'norm', 
    image : 'instr.png', mask : undefined,
    anchor : 'center',
    ori : 0, pos : [0, 0], size : 1.0,
    color : new util.Color([1, 1, 1]), opacity : 1,
    flipHoriz : false, flipVert : false,
    texRes : 512, interpolate : true, depth : -1.0 
  });
  key_resp_2 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "block"
  blockClock = new util.Clock();
  // Run 'Begin Experiment' code from Block_code_2
  psychoJS.window.mouseVisible = false;
  // 替代 Block_trial 的定义
  
  Block_t_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'Block_t_2',
    text: '',
    font: 'Arial',
    units: 'norm', 
    pos: [0, 0], height: 1.0,  wrapWidth: 1600, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: 1,
    depth: -1.0 
  });
  
  Block_resp_2 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "ITI"
  ITIClock = new util.Clock();
  BKG_9 = new visual.Polygon ({
    win: psychoJS.window, name: 'BKG_9', 
    edges: 360, size:[15, 15],
    ori: 0, pos: [0, 0],
    anchor: 'center',
    lineWidth: 5, 
    colorSpace: 'rgb',
    lineColor: new util.Color([(- 0.25), (- 0.25), (- 0.25)]),
    fillColor: new util.Color([(- 0.25), (- 0.25), (- 0.25)]),
    opacity: 1, depth: 0, interpolate: true,
  });
  
  // Initialize components for Routine "Mask_2"
  Mask_2Clock = new util.Clock();
  BKG_6 = new visual.Polygon ({
    win: psychoJS.window, name: 'BKG_6', 
    edges: 360, size:[15, 15],
    ori: 0, pos: [0, 0],
    anchor: 'center',
    lineWidth: 5, 
    colorSpace: 'rgb',
    lineColor: new util.Color([(- 0.25), (- 0.25), (- 0.25)]),
    fillColor: new util.Color([(- 0.25), (- 0.25), (- 0.25)]),
    opacity: 1, depth: 0, interpolate: true,
  });
  
  // Initialize components for Routine "encoding"
  encodingClock = new util.Clock();
  BKG_3 = new visual.Polygon ({
    win: psychoJS.window, name: 'BKG_3', 
    edges: 360, size:[15, 15],
    ori: 0, pos: [0, 0],
    anchor: 'center',
    lineWidth: 5, 
    colorSpace: 'rgb',
    lineColor: new util.Color([(- 0.25), (- 0.25), (- 0.25)]),
    fillColor: new util.Color([(- 0.25), (- 0.25), (- 0.25)]),
    opacity: 1, depth: 0, interpolate: true,
  });
  
  // Initialize components for Routine "Cue"
  CueClock = new util.Clock();
  BKG_8 = new visual.Polygon ({
    win: psychoJS.window, name: 'BKG_8', 
    edges: 360, size:[15, 15],
    ori: 0, pos: [0, 0],
    anchor: 'center',
    lineWidth: 5, 
    colorSpace: 'rgb',
    lineColor: new util.Color([(- 0.25), (- 0.25), (- 0.25)]),
    fillColor: new util.Color([(- 0.25), (- 0.25), (- 0.25)]),
    opacity: 1, depth: 0, interpolate: true,
  });
  
  text = new visual.TextStim({
    win: psychoJS.window,
    name: 'text',
    text: 'T',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  // Initialize components for Routine "Response"
  ResponseClock = new util.Clock();
  BKG_4 = new visual.Polygon ({
    win: psychoJS.window, name: 'BKG_4', 
    edges: 360, size:[15, 15],
    ori: 0, pos: [0, 0],
    anchor: 'center',
    lineWidth: 5, 
    colorSpace: 'rgb',
    lineColor: new util.Color([(- 0.25), (- 0.25), (- 0.25)]),
    fillColor: new util.Color([(- 0.25), (- 0.25), (- 0.25)]),
    opacity: 1, depth: 0, interpolate: true,
  });
  
  // Initialize components for Routine "Feedback_Time"
  Feedback_TimeClock = new util.Clock();
  BKG_7 = new visual.Polygon ({
    win: psychoJS.window, name: 'BKG_7', 
    edges: 360, size:[15, 15],
    ori: 0, pos: [0, 0],
    anchor: 'center',
    lineWidth: 5, 
    colorSpace: 'rgb',
    lineColor: new util.Color([(- 0.25), (- 0.25), (- 0.25)]),
    fillColor: new util.Color([(- 0.25), (- 0.25), (- 0.25)]),
    opacity: 1, depth: 0, interpolate: true,
  });
  
  // Run 'Begin Experiment' code from Feedback_code_5
  // === 初始化 ===
  PresentDur = 0.5;
  psychoJS.window.mouseVisible = false;
  
  // 初始化所有圆为白色
  color_1 = [1, 1, 1];
  color_2 = [1, 1, 1];
  color_3 = [1, 1, 1];
  color_4 = [1, 1, 1];
  color_5 = [1, 1, 1];
  
  feedback_1_T = new visual.Polygon ({
    win: psychoJS.window, name: 'feedback_1_T', 
    edges: 3600, size:[(2 * x_scale), (2 * x_scale)],
    ori: 0, pos: [((- 8) * x_scale), 0],
    anchor: 'center',
    lineWidth: 0.5, 
    colorSpace: 'rgb',
    lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: 1, depth: -3, interpolate: true,
  });
  
  feedback_2_T = new visual.Polygon ({
    win: psychoJS.window, name: 'feedback_2_T', 
    edges: 3600, size:[(2 * x_scale), (2 * x_scale)],
    ori: 0, pos: [((- 4) * x_scale), 0],
    anchor: 'center',
    lineWidth: 0.5, 
    colorSpace: 'rgb',
    lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: 1, depth: -4, interpolate: true,
  });
  
  feedback_3_T = new visual.Polygon ({
    win: psychoJS.window, name: 'feedback_3_T', 
    edges: 3600, size:[(2 * x_scale), (2 * x_scale)],
    ori: 0, pos: [0, 0],
    anchor: 'center',
    lineWidth: 0.5, 
    colorSpace: 'rgb',
    lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: 1, depth: -5, interpolate: true,
  });
  
  feedback_4_T = new visual.Polygon ({
    win: psychoJS.window, name: 'feedback_4_T', 
    edges: 3600, size:[(2 * x_scale), (2 * x_scale)],
    ori: 0, pos: [(4 * x_scale), 0],
    anchor: 'center',
    lineWidth: 0.5, 
    colorSpace: 'rgb',
    lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: 1, depth: -6, interpolate: true,
  });
  
  feedback_5_T = new visual.Polygon ({
    win: psychoJS.window, name: 'feedback_5_T', 
    edges: 3600, size:[(2 * x_scale), (2 * x_scale)],
    ori: 0, pos: [(8 * x_scale), 0],
    anchor: 'center',
    lineWidth: 0.5, 
    colorSpace: 'rgb',
    lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: 1, depth: -7, interpolate: true,
  });
  
  // Initialize components for Routine "exit_routine"
  exit_routineClock = new util.Clock();
  text_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_3',
    text: 'Please wait while we save your results...',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var Scale_setupComponents;
function Scale_setupRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Scale_setup' ---
    t = 0;
    Scale_setupClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    psychoJS.experiment.addData('Scale_setup.started', globalClock.getTime());
    // keep track of which components have finished
    Scale_setupComponents = [];
    
    for (const thisComponent of Scale_setupComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function Scale_setupRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Scale_setup' ---
    // get current time
    t = Scale_setupClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of Scale_setupComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function Scale_setupRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Scale_setup' ---
    for (const thisComponent of Scale_setupComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('Scale_setup.stopped', globalClock.getTime());
    // the Routine "Scale_setup" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var trials_2;
function trials_2LoopBegin(trials_2LoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    trials_2 = new TrialHandler({
      psychoJS: psychoJS,
      nReps: show_keys, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'trials_2'
    });
    psychoJS.experiment.addLoop(trials_2); // add the loop to the experiment
    currentLoop = trials_2;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisTrial_2 of trials_2) {
      snapshot = trials_2.getSnapshot();
      trials_2LoopScheduler.add(importConditions(snapshot));
      trials_2LoopScheduler.add(screen_scale_keysRoutineBegin(snapshot));
      trials_2LoopScheduler.add(screen_scale_keysRoutineEachFrame());
      trials_2LoopScheduler.add(screen_scale_keysRoutineEnd(snapshot));
      trials_2LoopScheduler.add(rectangel_keysRoutineBegin(snapshot));
      trials_2LoopScheduler.add(rectangel_keysRoutineEachFrame());
      trials_2LoopScheduler.add(rectangel_keysRoutineEnd(snapshot));
      trials_2LoopScheduler.add(trials_2LoopEndIteration(trials_2LoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function trials_2LoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(trials_2);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function trials_2LoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var trials;
function trialsLoopBegin(trialsLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    trials = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 9, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: 'condition.csv',
      seed: undefined, name: 'trials'
    });
    psychoJS.experiment.addLoop(trials); // add the loop to the experiment
    currentLoop = trials;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisTrial of trials) {
      snapshot = trials.getSnapshot();
      trialsLoopScheduler.add(importConditions(snapshot));
      trialsLoopScheduler.add(blockRoutineBegin(snapshot));
      trialsLoopScheduler.add(blockRoutineEachFrame());
      trialsLoopScheduler.add(blockRoutineEnd(snapshot));
      trialsLoopScheduler.add(ITIRoutineBegin(snapshot));
      trialsLoopScheduler.add(ITIRoutineEachFrame());
      trialsLoopScheduler.add(ITIRoutineEnd(snapshot));
      trialsLoopScheduler.add(Mask_2RoutineBegin(snapshot));
      trialsLoopScheduler.add(Mask_2RoutineEachFrame());
      trialsLoopScheduler.add(Mask_2RoutineEnd(snapshot));
      trialsLoopScheduler.add(encodingRoutineBegin(snapshot));
      trialsLoopScheduler.add(encodingRoutineEachFrame());
      trialsLoopScheduler.add(encodingRoutineEnd(snapshot));
      trialsLoopScheduler.add(Mask_2RoutineBegin(snapshot));
      trialsLoopScheduler.add(Mask_2RoutineEachFrame());
      trialsLoopScheduler.add(Mask_2RoutineEnd(snapshot));
      trialsLoopScheduler.add(ITIRoutineBegin(snapshot));
      trialsLoopScheduler.add(ITIRoutineEachFrame());
      trialsLoopScheduler.add(ITIRoutineEnd(snapshot));
      trialsLoopScheduler.add(CueRoutineBegin(snapshot));
      trialsLoopScheduler.add(CueRoutineEachFrame());
      trialsLoopScheduler.add(CueRoutineEnd(snapshot));
      trialsLoopScheduler.add(ResponseRoutineBegin(snapshot));
      trialsLoopScheduler.add(ResponseRoutineEachFrame());
      trialsLoopScheduler.add(ResponseRoutineEnd(snapshot));
      trialsLoopScheduler.add(Feedback_TimeRoutineBegin(snapshot));
      trialsLoopScheduler.add(Feedback_TimeRoutineEachFrame());
      trialsLoopScheduler.add(Feedback_TimeRoutineEnd(snapshot));
      trialsLoopScheduler.add(trialsLoopEndIteration(trialsLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function trialsLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(trials);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function trialsLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var screen_scale_keysComponents;
function screen_scale_keysRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'screen_scale_keys' ---
    t = 0;
    screen_scale_keysClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from code_scale
    psychoJS.window.mouseVisible = false;
    console.log("key start");
    psychoJS.eventManager.clearEvents();
    
    // keep track of which components have finished
    screen_scale_keysComponents = [];
    screen_scale_keysComponents.push(text_top);
    screen_scale_keysComponents.push(text_bottom);
    screen_scale_keysComponents.push(ccimage);
    
    for (const thisComponent of screen_scale_keysComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var _pj;
var keys;
var dscale;
function screen_scale_keysRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'screen_scale_keys' ---
    // get current time
    t = screen_scale_keysClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // Run 'Each Frame' code from code_scale
    var _pj;
    function _pj_snippets(container) {
        function in_es6(left, right) {
            if (((right instanceof Array) || ((typeof right) === "string"))) {
                return (right.indexOf(left) > (- 1));
            } else {
                if (((right instanceof Map) || (right instanceof Set) || (right instanceof WeakMap) || (right instanceof WeakSet))) {
                    return right.has(left);
                } else {
                    return (left in right);
                }
            }
        }
        container["in_es6"] = in_es6;
        return container;
    }
    _pj = {};
    _pj_snippets(_pj);
    keys = psychoJS.eventManager.getKeys();
    if (keys.length) {
        if (((t - oldt) < 0.5)) {
            dscale = (5 * dbase);
            oldt = t;
        } else {
            dscale = dbase;
            oldt = t;
        }
        if ((_pj.in_es6("space", keys) && (t > 1))) {
            continueRoutine = false;
        } else {
            if (_pj.in_es6("up", keys)) {
                y_scale = (util.round(((y_scale + dscale) * 10000)) / 10000);
            } else {
                if (_pj.in_es6("down", keys)) {
                    y_scale = (util.round(((y_scale - dscale) * 10000)) / 10000);
                } else {
                    if (_pj.in_es6("left", keys)) {
                        x_scale = (util.round(((x_scale - dscale) * 10000)) / 10000);
                    } else {
                        if (_pj.in_es6("right", keys)) {
                            x_scale = (util.round(((x_scale + dscale) * 10000)) / 10000);
                        }
                    }
                }
            }
        }
        screen_height = (util.round(((vsize * 10) / y_scale)) / 10);
        text_bottom.text = (((((((("X Scale = " + x_scale.toString()) + unittext) + " per cm, Y Scale = ") + y_scale.toString()) + unittext) + " per cm\nScreen height = ") + screen_height.toString()) + " cm\n\nPress the space bar when done");
        ccimage.size = [(x_size * x_scale), (y_size * y_scale)];
    }
    
    
    // *text_top* updates
    if (t >= 0.0 && text_top.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_top.tStart = t;  // (not accounting for frame time here)
      text_top.frameNStart = frameN;  // exact frame index
      
      text_top.setAutoDraw(true);
    }
    
    
    // *text_bottom* updates
    if (t >= 0.0 && text_bottom.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_bottom.tStart = t;  // (not accounting for frame time here)
      text_bottom.frameNStart = frameN;  // exact frame index
      
      text_bottom.setAutoDraw(true);
    }
    
    
    // *ccimage* updates
    if (t >= 0.0 && ccimage.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      ccimage.tStart = t;  // (not accounting for frame time here)
      ccimage.frameNStart = frameN;  // exact frame index
      
      ccimage.setAutoDraw(true);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of screen_scale_keysComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function screen_scale_keysRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'screen_scale_keys' ---
    for (const thisComponent of screen_scale_keysComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // Run 'End Routine' code from code_scale
    /* Syntax Error: Fix Python code */
    // the Routine "screen_scale_keys" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _key_resp_keys_allKeys;
var rectangel_keysComponents;
function rectangel_keysRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'rectangel_keys' ---
    t = 0;
    rectangel_keysClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    polygon_keys.setSize([(10 * x_scale), (10 * y_scale)]);
    key_resp_keys.keys = undefined;
    key_resp_keys.rt = undefined;
    _key_resp_keys_allKeys = [];
    // keep track of which components have finished
    rectangel_keysComponents = [];
    rectangel_keysComponents.push(rectangle_text_keys);
    rectangel_keysComponents.push(polygon_keys);
    rectangel_keysComponents.push(key_resp_keys);
    
    for (const thisComponent of rectangel_keysComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function rectangel_keysRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'rectangel_keys' ---
    // get current time
    t = rectangel_keysClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *rectangle_text_keys* updates
    if (t >= 0.0 && rectangle_text_keys.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      rectangle_text_keys.tStart = t;  // (not accounting for frame time here)
      rectangle_text_keys.frameNStart = frameN;  // exact frame index
      
      rectangle_text_keys.setAutoDraw(true);
    }
    
    
    // *polygon_keys* updates
    if (t >= 0.0 && polygon_keys.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      polygon_keys.tStart = t;  // (not accounting for frame time here)
      polygon_keys.frameNStart = frameN;  // exact frame index
      
      polygon_keys.setAutoDraw(true);
    }
    
    
    // *key_resp_keys* updates
    if (t >= 0.0 && key_resp_keys.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_keys.tStart = t;  // (not accounting for frame time here)
      key_resp_keys.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_keys.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_keys.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_keys.clearEvents(); });
    }
    
    if (key_resp_keys.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_keys.getKeys({keyList: ['space'], waitRelease: false});
      _key_resp_keys_allKeys = _key_resp_keys_allKeys.concat(theseKeys);
      if (_key_resp_keys_allKeys.length > 0) {
        key_resp_keys.keys = _key_resp_keys_allKeys[_key_resp_keys_allKeys.length - 1].name;  // just the last key pressed
        key_resp_keys.rt = _key_resp_keys_allKeys[_key_resp_keys_allKeys.length - 1].rt;
        key_resp_keys.duration = _key_resp_keys_allKeys[_key_resp_keys_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of rectangel_keysComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function rectangel_keysRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'rectangel_keys' ---
    for (const thisComponent of rectangel_keysComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    key_resp_keys.stop();
    // the Routine "rectangel_keys" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _key_resp_2_allKeys;
var IntroComponents;
function IntroRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Intro' ---
    t = 0;
    IntroClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    psychoJS.experiment.addData('Intro.started', globalClock.getTime());
    Ins_image_2.setPos([0, 0]);
    Ins_image_2.setSize([1.5, 2]);
    key_resp_2.keys = undefined;
    key_resp_2.rt = undefined;
    _key_resp_2_allKeys = [];
    // keep track of which components have finished
    IntroComponents = [];
    IntroComponents.push(BKG);
    IntroComponents.push(Ins_image_2);
    IntroComponents.push(key_resp_2);
    
    for (const thisComponent of IntroComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var frameRemains;
function IntroRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Intro' ---
    // get current time
    t = IntroClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *BKG* updates
    if (t >= 0.0 && BKG.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      BKG.tStart = t;  // (not accounting for frame time here)
      BKG.frameNStart = frameN;  // exact frame index
      
      BKG.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 999 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (BKG.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      BKG.setAutoDraw(false);
    }
    
    // *Ins_image_2* updates
    if (t >= 0.0 && Ins_image_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Ins_image_2.tStart = t;  // (not accounting for frame time here)
      Ins_image_2.frameNStart = frameN;  // exact frame index
      
      Ins_image_2.setAutoDraw(true);
    }
    
    
    // *key_resp_2* updates
    if (t >= 0.0 && key_resp_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_2.tStart = t;  // (not accounting for frame time here)
      key_resp_2.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_2.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_2.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_2.clearEvents(); });
    }
    
    if (key_resp_2.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_2.getKeys({keyList: ['space'], waitRelease: false});
      _key_resp_2_allKeys = _key_resp_2_allKeys.concat(theseKeys);
      if (_key_resp_2_allKeys.length > 0) {
        key_resp_2.keys = _key_resp_2_allKeys[_key_resp_2_allKeys.length - 1].name;  // just the last key pressed
        key_resp_2.rt = _key_resp_2_allKeys[_key_resp_2_allKeys.length - 1].rt;
        key_resp_2.duration = _key_resp_2_allKeys[_key_resp_2_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of IntroComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function IntroRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Intro' ---
    for (const thisComponent of IntroComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('Intro.stopped', globalClock.getTime());
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_resp_2.corr, level);
    }
    psychoJS.experiment.addData('key_resp_2.keys', key_resp_2.keys);
    if (typeof key_resp_2.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_2.rt', key_resp_2.rt);
        psychoJS.experiment.addData('key_resp_2.duration', key_resp_2.duration);
        routineTimer.reset();
        }
    
    key_resp_2.stop();
    // the Routine "Intro" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var Block_text;
var _Block_resp_2_allKeys;
var blockComponents;
function blockRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'block' ---
    t = 0;
    blockClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    psychoJS.experiment.addData('block.started', globalClock.getTime());
    // Run 'Begin Routine' code from Block_code_2
    psychoJS.window.mouseVisible = false;
    
    let direction = Math.floor(Math.random() * 360);  // 或者读取条件生成的方向
    window.trial_direction = direction;               // ✔️ 保存到 window 对象上
    psychoJS.experiment.addData("direction", direction);
    
    // 参数设定
    const blockSize = 30;
    const Practice_num = 1;
    const Block_num = Math.ceil(trials.nTotal / blockSize);
    
    
    // 当前全局 trial 编号
    let trialNumber = trials.thisN;  // ✅ 是当前 loop 中真实的执行顺序
    
    
    // 当前 block ID（从 0 开始），当前 block 内的 trial index
    let Block_id = Math.floor(trialNumber / blockSize);
    let trial_in_block = trialNumber % blockSize;
    window.Block_id = Block_id;
    window.Practice_num = Practice_num;
    window.feedbackID = feedbackID;
    
    // === 强制记录 Block_id，每轮 trial 都记录 ===
    psychoJS.experiment.addData("Block_id", Block_id);
    console.log(`📋 当前 trialNumber: ${trialNumber}, Block_id: ${Block_id}, trial_in_block: ${trial_in_block}`);
    
    // === 仅 block 起始 trial 设置提示语，否则跳过 block routine ===
    if (trial_in_block === 0) {
        if (Block_id < Practice_num) {
            Block_text = " Practice will start. Please press 'S' to continue.";
        } else {
            Block_text = `Block (${Block_id - Practice_num + 1} / ${Block_num - Practice_num}) will start. Please press 'S' to continue.`;
        }
    
        console.log("✅ BlockStart 提示语触发！");
        console.log("📝 Block_text =", Block_text);
    } else {
        Block_text = "false";  // 清空文字
        continueRoutine = false;  // ⛔ 跳过这个 block routine
    }
    
    Block_t_2.setPos([0, 0]);
    Block_t_2.setText(Block_text);
    Block_t_2.setHeight(0.08);
    Block_resp_2.keys = undefined;
    Block_resp_2.rt = undefined;
    _Block_resp_2_allKeys = [];
    // keep track of which components have finished
    blockComponents = [];
    blockComponents.push(Block_t_2);
    blockComponents.push(Block_resp_2);
    
    for (const thisComponent of blockComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function blockRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'block' ---
    // get current time
    t = blockClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *Block_t_2* updates
    if (t >= 0.0 && Block_t_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Block_t_2.tStart = t;  // (not accounting for frame time here)
      Block_t_2.frameNStart = frameN;  // exact frame index
      
      Block_t_2.setAutoDraw(true);
    }
    
    
    // *Block_resp_2* updates
    if (t >= 0 && Block_resp_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Block_resp_2.tStart = t;  // (not accounting for frame time here)
      Block_resp_2.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { Block_resp_2.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { Block_resp_2.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { Block_resp_2.clearEvents(); });
    }
    
    if (Block_resp_2.status === PsychoJS.Status.STARTED) {
      let theseKeys = Block_resp_2.getKeys({keyList: ['s'], waitRelease: false});
      _Block_resp_2_allKeys = _Block_resp_2_allKeys.concat(theseKeys);
      if (_Block_resp_2_allKeys.length > 0) {
        Block_resp_2.keys = _Block_resp_2_allKeys[_Block_resp_2_allKeys.length - 1].name;  // just the last key pressed
        Block_resp_2.rt = _Block_resp_2_allKeys[_Block_resp_2_allKeys.length - 1].rt;
        Block_resp_2.duration = _Block_resp_2_allKeys[_Block_resp_2_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of blockComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function blockRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'block' ---
    for (const thisComponent of blockComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('block.stopped', globalClock.getTime());
    psychoJS.experiment.addData('trial_direction', window.trial_direction);
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(Block_resp_2.corr, level);
    }
    psychoJS.experiment.addData('Block_resp_2.keys', Block_resp_2.keys);
    if (typeof Block_resp_2.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('Block_resp_2.rt', Block_resp_2.rt);
        psychoJS.experiment.addData('Block_resp_2.duration', Block_resp_2.duration);
        routineTimer.reset();
        }
    
    Block_resp_2.stop();
    // the Routine "block" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var ITIComponents;
function ITIRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'ITI' ---
    t = 0;
    ITIClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(0.500000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('ITI.started', globalClock.getTime());
    // keep track of which components have finished
    ITIComponents = [];
    ITIComponents.push(BKG_9);
    
    for (const thisComponent of ITIComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function ITIRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'ITI' ---
    // get current time
    t = ITIClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // is it time to end the Routine? (based on local clock)
    if (t > 0.5) {
        continueRoutine = false
    }
    
    // *BKG_9* updates
    if (t >= 0.0 && BKG_9.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      BKG_9.tStart = t;  // (not accounting for frame time here)
      BKG_9.frameNStart = frameN;  // exact frame index
      
      BKG_9.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 0.5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (BKG_9.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      BKG_9.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of ITIComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function ITIRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'ITI' ---
    for (const thisComponent of ITIComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('ITI.stopped', globalClock.getTime());
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var Mask_2Components;
function Mask_2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Mask_2' ---
    t = 0;
    Mask_2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    psychoJS.experiment.addData('Mask_2.started', globalClock.getTime());
    // Run 'Begin Routine' code from Direction_3
    // ========== 参数定义 ==========
    const fps = 60;
    let cm_to_px_x = psychoJS.window.size[0] * x_scale;
    let cm_to_px_y = psychoJS.window.size[1] * y_scale;
    let speed = (1.75 * cm_to_px_x) / fps;
    let direction = window.trial_direction  
    console.log(`📏 帧率=${fps} Hz，速度=${speed.toFixed(2)} px/frame`);
    console.log("🔍 当前 x_scale =", x_scale); 
    
    // ========== 创建 Canvas ==========
    if (!window.rdkCanvas) {
      const root = document.getElementById("root");
      const canvas = document.createElement("canvas");
      canvas.id = "canvas";
      canvas.width = psychoJS.window.size[0];
      canvas.height = psychoJS.window.size[1];
      canvas.style.position = "absolute";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.zIndex = "10";
      canvas.style.backgroundColor = "transparent";
      root.appendChild(canvas);
      window.rdkCanvas = canvas;
    }
    
    // ========== 初始化纯噪声 RDK ==========
    window.rdk = new RDK({
      canvasId: "canvas",
      type: "mask",               // 遮罩类型（非按键模式）
      noiseMode: "walk",          // 每帧都换方向
      direction: 0,               // 无效方向（因为 coherence = 0）
      coherence: 0,               // ✅ 纯噪声
      nDots: 360,
      speed: speed,
      dotSize: 0.03 * cm_to_px_x,
      fieldRadius: 3.5 * cm_to_px_x,
      dotColor: "white"
    });
    
    // ========== 启动标志 ==========
    window.rdkStart = performance.now();
    window.rdkDuration = 500;  // 0.6 秒
    window.rdkRunning = true;
    
    console.log("✅ RDK mask：纯噪声，持续 0.5 秒");
    
    // keep track of which components have finished
    Mask_2Components = [];
    Mask_2Components.push(BKG_6);
    
    for (const thisComponent of Mask_2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function Mask_2RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Mask_2' ---
    // get current time
    t = Mask_2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *BKG_6* updates
    if (t >= 0.0 && BKG_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      BKG_6.tStart = t;  // (not accounting for frame time here)
      BKG_6.frameNStart = frameN;  // exact frame index
      
      BKG_6.setAutoDraw(true);
    }
    
    
    if (window.rdkRunning && window.rdk) {
      // 每帧更新 RDK
      window.rdk.updateAndDraw();
    
      // 检查是否达到 TimeDur 秒
      const elapsed = performance.now() - window.rdkStart;
      if (elapsed >= window.rdkDuration) {
        window.rdkRunning = false;
        continueRoutine = false;
        console.log(`⏱ TimeDur 达成，本轮停止，已运行 ${(elapsed / 1000).toFixed(3)} 秒`);
      }
    } else {
      // fallback: 若 RDK 没有初始化成功
      console.warn("⚠️ RDK 尚未初始化或已停止运行！");
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of Mask_2Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function Mask_2RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Mask_2' ---
    for (const thisComponent of Mask_2Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('Mask_2.stopped', globalClock.getTime());
    if (window.rdkCanvas) {
      window.rdkCanvas.remove();
      window.rdkCanvas = null;
      window.rdk = null;
    }
    
    // the Routine "Mask_2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var fieldRadius;
var fieldCenterX;
var fieldCenterY;
var dotRadius;
var dotSpeed;
var direction;
var numDots;
var dots;
var globalEnvelope;
var canvas;
var ctx;
var startTime;
var encodingComponents;
function encodingRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'encoding' ---
    t = 0;
    encodingClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(999.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('encoding.started', globalClock.getTime());
    let cm_to_px_x = psychoJS.window.size[0] * x_scale;
    fieldRadius = 3.5 * cm_to_px_x;
    fieldCenterX = window.innerWidth / 2;
    fieldCenterY = window.innerHeight / 2;
    dotRadius = 0.03 * cm_to_px_x;
    dotSpeed = 2 * cm_to_px_x;
    direction = trial_direction * Math.PI / 180;
    numDots = 360;
    let coh =parseFloat(Coherence1);// 
    
    let rampDur = (coh === 0.3) ? 60 : (coh === 0.7 ? 30 : 45);
    let timeDur = parseFloat(TimeDur) * 1000 - rampDur;
    // 创建 dot 阵列
    dots = [];
    for (let i = 0; i < numDots; i++) {
      const r = Math.sqrt(Math.random()) * fieldRadius;
      const a = Math.random() * 2 * Math.PI;
      const x = fieldCenterX + r * Math.cos(a);
      const y = fieldCenterY + r * Math.sin(a);
      dots.push(new Dot(x, y, dotRadius, dotSpeed, direction));
    }
    
    // coherence 包络结构
    globalEnvelope = new RampEnvelope(0, coh, 500, rampDur, timeDur, rampDur, 500);
    
    // Canvas 初始化（仅一次）
    if (!window.rdkCanvas) {
      const canvas = document.createElement("canvas");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.position = "absolute";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.zIndex = "1000";
      document.body.appendChild(canvas);
      window.rdkCanvas = canvas;
      window.ctx = canvas.getContext("2d");
    }
    canvas = window.rdkCanvas;
    ctx = window.ctx;
    
    // 启动计时器
    startTime = performance.now();
    
    // keep track of which components have finished
    encodingComponents = [];
    encodingComponents.push(BKG_3);
    
    for (const thisComponent of encodingComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function encodingRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'encoding' ---
    // get current time
    t = encodingClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *BKG_3* updates
    if (t >= 0.0 && BKG_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      BKG_3.tStart = t;  // (not accounting for frame time here)
      BKG_3.frameNStart = frameN;  // exact frame index
      
      BKG_3.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 999 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (BKG_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      BKG_3.setAutoDraw(false);
    }
    const now = performance.now();
    const elapsed = now - startTime;
    const dt = 1 / 60;
    let coh = parseFloat(Coherence1);
    const coherence = globalEnvelope.getCoherence(elapsed);
    const speedFactor = globalEnvelope.getSpeedFactor(elapsed);
    const adjustedSpeed = dotSpeed * speedFactor;
    
    // ⬇️ 每帧统一分配 coherent / noise 点（避免每个点独立随机）
    assignDotModes(dots, coherence);
    
    // 清空画布（透明）
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let totalSpeed = 0;
    let validDots = 0;
    
    for (let i = 0; i < dots.length; i++) {
      const prevX = dots[i].x;
      const prevY = dots[i].y;
     //dots[i].speed = dotSpeed;  // 所有点速度一致 dots[i].speed = adjustedSpeed;
     const compensatedSpeed = perceptualSpeedCompensation(dotSpeed, coherence);
     dots[i].speed = compensatedSpeed;
    
     
      dots[i].updateDirection(dt);  // ✅ 只用 dot 自带的 this.mode 属性
      dots[i].draw(ctx);
    
      const dx = dots[i].x - prevX;
      const dy = dots[i].y - prevY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < fieldRadius * 0.5) {
        totalSpeed += dist / dt;
        validDots += 1;
      }
    }
    
    const avgSpeed = validDots > 0 ? totalSpeed / validDots : 0;
    
    console.log(`t=${elapsed.toFixed(0)}ms | coh=${coherence.toFixed(2)} | avgSpeed=${avgSpeed.toFixed(2)} px/s`);
    
    if (globalEnvelope.isFinished(elapsed)) {
      continueRoutine = false;
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of encodingComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function encodingRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'encoding' ---
    for (const thisComponent of encodingComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('encoding.stopped', globalClock.getTime());
    if (window.rdkCanvas) {
      window.rdkCanvas.remove();
      window.rdkCanvas = null;
      window.rdk = null;
    }
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var CueComponents;
function CueRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Cue' ---
    t = 0;
    CueClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(0.500000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('Cue.started', globalClock.getTime());
    // keep track of which components have finished
    CueComponents = [];
    CueComponents.push(BKG_8);
    CueComponents.push(text);
    
    for (const thisComponent of CueComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function CueRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Cue' ---
    // get current time
    t = CueClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // is it time to end the Routine? (based on local clock)
    if (t > 0.5) {
        continueRoutine = false
    }
    
    // *BKG_8* updates
    if (t >= 0.0 && BKG_8.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      BKG_8.tStart = t;  // (not accounting for frame time here)
      BKG_8.frameNStart = frameN;  // exact frame index
      
      BKG_8.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 0.5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (BKG_8.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      BKG_8.setAutoDraw(false);
    }
    
    // *text* updates
    if (t >= 0.0 && text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text.tStart = t;  // (not accounting for frame time here)
      text.frameNStart = frameN;  // exact frame index
      
      text.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 0.5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of CueComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function CueRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Cue' ---
    for (const thisComponent of CueComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('Cue.stopped', globalClock.getTime());
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var ResponseComponents;
function ResponseRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Response' ---
    t = 0;
    ResponseClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(999.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('Response.started', globalClock.getTime());
    // ========== 1. 初始化关键参数 ==========
    let cm_to_px_x = psychoJS.window.size[0] * x_scale;
    let fieldRadius = 3.5 * cm_to_px_x;
    let fieldCenterX = window.innerWidth / 2;
    let fieldCenterY = window.innerHeight / 2;
    let dotRadius = 0.03 * cm_to_px_x;
    let dotSpeed = 1.75 * cm_to_px_x;
    let direction = trial_direction * Math.PI / 180;
    let coh = 0;
    let numDots = 360;
    
    // 保存给其他阶段用
    window.fieldRadius = fieldRadius;
    window.fieldCenterX = fieldCenterX;
    window.fieldCenterY = fieldCenterY;
    window.dotSpeed = dotSpeed;
    
    // ========== 2. 创建 dot 阵列（reproduction 专用） ==========
    window.reproDots = [];
    for (let i = 0; i < numDots; i++) {
      const r = Math.sqrt(Math.random()) * fieldRadius;
      const a = Math.random() * 2 * Math.PI;
      const x = fieldCenterX + r * Math.cos(a);
      const y = fieldCenterY + r * Math.sin(a);
      const dot = new Dot(x, y, dotRadius, 0, direction);  // 初始速度为0
      window.reproDots.push(dot);
    }
    window.keyPressed = false;
    window.keyReleased = false;
    window.pressStart = null;
    window.releaseTime = null;
    window.reproducedDuration = null;
    
    window.addEventListener("keydown", function (event) {
      if (event.key === "ArrowDown" && !window.keyPressed) {
        window.keyPressed = true;
        window.pressStart = performance.now();
    
        // 启动所有 dot 的速度
        for (let dot of window.reproDots) {
          dot.speed = window.dotSpeed;
        }
    
        console.log("⬇️ 再现开始");
      }
    });
    
    window.addEventListener("keyup", function (event) {
      if (event.key === "ArrowDown" && window.keyPressed && !window.keyReleased) {
        window.keyReleased = true;
        window.releaseTime = performance.now();
        window.reproducedDuration = window.releaseTime - window.pressStart;
    
        // 停止 dot
        for (let dot of window.reproDots) {
          dot.speed = 0;
        }
    
        console.log("🔴 再现结束，时长 =", window.reproducedDuration.toFixed(0), "ms");
        continueRoutine = false;
      }
    });
    
    // keep track of which components have finished
    ResponseComponents = [];
    ResponseComponents.push(BKG_4);
    
    for (const thisComponent of ResponseComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function ResponseRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Response' ---
    // get current time
    t = ResponseClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *BKG_4* updates
    if (t >= 0.0 && BKG_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      BKG_4.tStart = t;  // (not accounting for frame time here)
      BKG_4.frameNStart = frameN;  // exact frame index
      
      BKG_4.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 999 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (BKG_4.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      BKG_4.setAutoDraw(false);
    }
    ensureCanvasReady();
    const now = performance.now();
    const elapsed = now - startTime;
    let coh = 0;//parseFloat(Coherence1)
    const ctx = window.rdkCanvas.getContext("2d");
    
    ctx.clearRect(0, 0, window.rdkCanvas.width, window.rdkCanvas.height);
    
    const dt = 1 / 60;
    for (let dot of window.reproDots) {
      const mode = (Math.random() < coh) ? "coherent" : "random";
      dot.updateDirection(dt, mode, coh);  // 你原有的 dot 方法
      dot.draw(ctx);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of ResponseComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function ResponseRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Response' ---
    for (const thisComponent of ResponseComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('Response.stopped', globalClock.getTime());
    psychoJS.experiment.addData("keyDuration",  window.reproducedDuration.toFixed(0));
    window.keyDuration = window.reproducedDuration.toFixed(0);
    // 清除画布
    if (window.rdkCanvas) {
      const ctx = window.rdkCanvas.getContext("2d");
      ctx.clearRect(0, 0, window.rdkCanvas.width, window.rdkCanvas.height);
    }
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var feedbackID;
var Feedback_TimeComponents;
function Feedback_TimeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Feedback_Time' ---
    t = 0;
    Feedback_TimeClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    psychoJS.experiment.addData('Feedback_Time.started', globalClock.getTime());
    // Run 'Begin Routine' code from Feedback_code_5
    // 获取响应时间（ms）与目标时间（s）
    let timeResp = window.keyDuration;
    let timeTarget = parseFloat(TimeDur);
    
    let feedbackID = 0;
    // 如果是实验阶段，则跳过整个反馈 routine
    if (typeof window.Block_id !== 'undefined' && window.Block_id >= window.Practice_num) {
        continueRoutine = false;
        console.log("⏭️ 实验阶段跳过反馈：Block_id = " + window.Block_id);
    } else {
        console.log("✅ 练习阶段显示反馈：Block_id = " + window.Block_id);
    }
    
    if (TrialType === "Time" && timeResp !== 9999) {
        let timeRespSec = timeResp / 1000;
        let diff = timeRespSec - timeTarget;
        let relErr = Math.abs(diff) / timeTarget;
    
        if (relErr <= 0.05) {
            feedbackID = 3; color_3 = [0, 0.9, 0.3];    // ✅ 正确 ±5%
        } else if (-diff / timeTarget >= 0.3) {
            feedbackID = 1; color_1 = [1, 0, 0];        // ❌ 过早 ≥30%
        } else if (diff / timeTarget >= 0.3) {
            feedbackID = 5; color_5 = [1, 0, 0];        // ❌ 过晚 ≥30%
        } else if (diff / timeTarget >= 0.05) {
            feedbackID = 4; color_4 = [1, 0.3, 0.4];    // ⚠ 稍晚
        } else if (-diff / timeTarget >= 0.05) {
            feedbackID = 2; color_2 = [1, 0.3, 0.4];    // ⚠ 稍早
        }
    
        console.log(`🧠 Feedback 判定: Resp=${timeRespSec.toFixed(2)}s | Target=${timeTarget}s | relErr=${relErr.toFixed(3)} | ID=${feedbackID}`);
    } else {
        feedbackID = 0;  // 没有松键
        console.log("⚠️ 未松键，反馈 ID = 0");
    }
    
    // 写入 feedbackID
    psychoJS.experiment.addData("FeedbackID_T", feedbackID);
    feedback_1_T.setFillColor(new util.Color(color_1));
    feedback_1_T.setLineColor(new util.Color(color_1));
    feedback_2_T.setFillColor(new util.Color(color_2));
    feedback_2_T.setLineColor(new util.Color(color_2));
    feedback_3_T.setFillColor(new util.Color(color_3));
    feedback_3_T.setLineColor(new util.Color(color_3));
    feedback_4_T.setFillColor(new util.Color(color_4));
    feedback_4_T.setLineColor(new util.Color(color_4));
    feedback_5_T.setFillColor(new util.Color(color_5));
    feedback_5_T.setLineColor(new util.Color(color_5));
    // keep track of which components have finished
    Feedback_TimeComponents = [];
    Feedback_TimeComponents.push(BKG_7);
    Feedback_TimeComponents.push(feedback_1_T);
    Feedback_TimeComponents.push(feedback_2_T);
    Feedback_TimeComponents.push(feedback_3_T);
    Feedback_TimeComponents.push(feedback_4_T);
    Feedback_TimeComponents.push(feedback_5_T);
    
    for (const thisComponent of Feedback_TimeComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function Feedback_TimeRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Feedback_Time' ---
    // get current time
    t = Feedback_TimeClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *BKG_7* updates
    if (t >= 0.0 && BKG_7.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      BKG_7.tStart = t;  // (not accounting for frame time here)
      BKG_7.frameNStart = frameN;  // exact frame index
      
      BKG_7.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 1 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (BKG_7.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      BKG_7.setAutoDraw(false);
    }
    
    // *feedback_1_T* updates
    if (t >= 0.3 && feedback_1_T.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      feedback_1_T.tStart = t;  // (not accounting for frame time here)
      feedback_1_T.frameNStart = frameN;  // exact frame index
      
      feedback_1_T.setAutoDraw(true);
    }
    
    frameRemains = 0.3 + PresentDur - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (feedback_1_T.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      feedback_1_T.setAutoDraw(false);
    }
    
    // *feedback_2_T* updates
    if (t >= 0.3 && feedback_2_T.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      feedback_2_T.tStart = t;  // (not accounting for frame time here)
      feedback_2_T.frameNStart = frameN;  // exact frame index
      
      feedback_2_T.setAutoDraw(true);
    }
    
    frameRemains = 0.3 + PresentDur - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (feedback_2_T.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      feedback_2_T.setAutoDraw(false);
    }
    
    // *feedback_3_T* updates
    if (t >= 0.3 && feedback_3_T.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      feedback_3_T.tStart = t;  // (not accounting for frame time here)
      feedback_3_T.frameNStart = frameN;  // exact frame index
      
      feedback_3_T.setAutoDraw(true);
    }
    
    frameRemains = 0.3 + PresentDur - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (feedback_3_T.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      feedback_3_T.setAutoDraw(false);
    }
    
    // *feedback_4_T* updates
    if (t >= 0.3 && feedback_4_T.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      feedback_4_T.tStart = t;  // (not accounting for frame time here)
      feedback_4_T.frameNStart = frameN;  // exact frame index
      
      feedback_4_T.setAutoDraw(true);
    }
    
    frameRemains = 0.3 + PresentDur - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (feedback_4_T.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      feedback_4_T.setAutoDraw(false);
    }
    
    // *feedback_5_T* updates
    if (t >= 0.3 && feedback_5_T.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      feedback_5_T.tStart = t;  // (not accounting for frame time here)
      feedback_5_T.frameNStart = frameN;  // exact frame index
      
      feedback_5_T.setAutoDraw(true);
    }
    
    frameRemains = 0.3 + PresentDur - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (feedback_5_T.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      feedback_5_T.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of Feedback_TimeComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var keyDuration;
var Key_pressed;
var Key_release;
function Feedback_TimeRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Feedback_Time' ---
    for (const thisComponent of Feedback_TimeComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('Feedback_Time.stopped', globalClock.getTime());
    // Run 'End Routine' code from Feedback_code_5
    keyDuration = 10;
    Key_pressed = false;
    Key_release = false;
    color_1 = [1, 1, 1];
    color_2 = [1, 1, 1];
    color_3 = [1, 1, 1];
    color_4 = [1, 1, 1];
    color_5 = [1, 1, 1];
    
    psychoJS.eventManager.clearEvents({"eventType": "keyboard"});
    
    // the Routine "Feedback_Time" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var exit_routineComponents;
function exit_routineRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'exit_routine' ---
    t = 0;
    exit_routineClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    psychoJS.experiment.addData('exit_routine.started', globalClock.getTime());
    // 显示鼠标
    document.body.style.cursor = "default";
    psychoJS._saveResults = false;
    let participant = expInfo['participant'];  // 从 info dialog 获取参与者编号
    let now = new Date();
    let today = new Date();
    let dateStr = today.toISOString().split('T')[0];
    let timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');  // '14-52-30'
    let filename = `${participant}_${dateStr}_${timeStr}.csv`;
    
    
    // 提取数据
    let trialsData = psychoJS._experiment._trialsData;
    
    
    if (!trialsData || trialsData.length === 0) {
      console.warn("No trial data found.");
    } else {
      const headers = [...new Set(trialsData.flatMap(t => Object.keys(t)))];
    
      function csvSafe(val) {
        if (val === undefined || val === null) return '';
        const str = val.toString();
        if (/["\n,]/.test(str)) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      }
    
      const csvContent = [
        headers.join(','),
        ...trialsData.map(row =>
          headers.map(h => csvSafe(row[h])).join(',')
        )
      ].join('\n');
    
      console.log('Saving data...');
      uploadToOSF(filename, csvContent);
    }
    
    // 将上传封装为单独函数
    function uploadToOSF(filename, csvData) {
      fetch('https://pipe.jspsych.org/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
        body: JSON.stringify({
          experimentID: "gsfL5F6Yysoa",
          filename: filename,
          data: csvData,
        })
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log("上传成功:", data);
        quitPsychoJS();
      })
      .catch(function(err) {
        console.error("上传失败:", err);
        quitPsychoJS();
      });
    }
    
    // keep track of which components have finished
    exit_routineComponents = [];
    exit_routineComponents.push(text_3);
    
    for (const thisComponent of exit_routineComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function exit_routineRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'exit_routine' ---
    // get current time
    t = exit_routineClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_3* updates
    if (t >= 0.0 && text_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_3.tStart = t;  // (not accounting for frame time here)
      text_3.frameNStart = frameN;  // exact frame index
      
      text_3.setAutoDraw(true);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of exit_routineComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function exit_routineRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'exit_routine' ---
    for (const thisComponent of exit_routineComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('exit_routine.stopped', globalClock.getTime());
    document.body.style.cursor = "none";
    
    // the Routine "exit_routine" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


function importConditions(currentLoop) {
  return async function () {
    psychoJS.importAttributes(currentLoop.getCurrentTrial());
    return Scheduler.Event.NEXT;
    };
}


async function quitPsychoJS(message, isCompleted) {
  // Check for and save orphaned data
  if (psychoJS.experiment.isEntryEmpty()) {
    psychoJS.experiment.nextEntry();
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});
  
  return Scheduler.Event.QUIT;
}

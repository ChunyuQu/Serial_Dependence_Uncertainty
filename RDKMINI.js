/**************** 
 * Rdkmini *
 ****************/

import { core, data, sound, util, visual, hardware } from './lib/psychojs-2023.2.3.js';
const { PsychoJS } = core;
const { TrialHandler, MultiStairHandler } = data;
const { Scheduler } = util;
//some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;


// store info about the experiment session:
let expName = 'RDKMINI';  // from the Builder filename that created this script
let expInfo = {
    'participant': `${util.pad(Number.parseFloat(util.randint(0, 999999)).toFixed(0), 6)}`,
    'session': '001',
    'sex': '',
    'age': '',
};

// Start code blocks for 'Before Experiment'
// Run 'Before Experiment' code from code_2
console.log("🔍 当前 x_scale =", x_scale);  // ✅ 输出 x_scale 的值
window.keyDuration_global = 9999;

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










flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    // resources:
    {'name': 'sub1.csv', 'path': 'sub1.csv'},
    {'name': 'bank-1300155_640.png', 'path': 'bank-1300155_640.png'},
    {'name': 'ins.jpg', 'path': 'ins.jpg'},
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
var Block_text;
var Block_id;
var Block_num;
var Block_trial;
var Practice_num;
var Block_t_2;
var Block_resp_2;
var ITIClock;
var BKG_9;
var Mask_2Clock;
var BKG_6;
var Fixation_4;
var M2Clock;
var BKG_3;
var Fixation_3;
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
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "Scale_setup"
  Scale_setupClock = new util.Clock();
  // Run 'Begin Experiment' code from code
  psychoJS.window.mouseVisible = false;
  
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
    image : 'ins.jpg', mask : undefined,
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
  Block_text = " ";
  Block_id = 0;
  Block_num = 1;
  Block_trial = 40;
  Practice_num = (40 - 1);
  
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
  
  Fixation_4 = new visual.Polygon ({
    win: psychoJS.window, name: 'Fixation_4', 
    edges: 360, size:[0.01, 0.01],
    ori: 0, pos: [0, 0],
    anchor: 'center',
    lineWidth: 1, 
    colorSpace: 'rgb',
    lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([1, 1, 1]),
    opacity: 1, depth: -1, interpolate: true,
  });
  
  // Initialize components for Routine "M2"
  M2Clock = new util.Clock();
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
  
  Fixation_3 = new visual.Polygon ({
    win: psychoJS.window, name: 'Fixation_3', 
    edges: 360, size:[0.01, 0.01],
    ori: 0, pos: [0, 0],
    anchor: 'center',
    lineWidth: 1, 
    colorSpace: 'rgb',
    lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([1, 1, 1]),
    opacity: 1, depth: -1, interpolate: true,
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
    opacity: 1, depth: -1, interpolate: true,
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
      nReps: 1, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: 'sub1.csv',
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
      trialsLoopScheduler.add(M2RoutineBegin(snapshot));
      trialsLoopScheduler.add(M2RoutineEachFrame());
      trialsLoopScheduler.add(M2RoutineEnd(snapshot));
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
    psychoJS.experiment.addData('screen_scale_keys.started', globalClock.getTime());
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
    psychoJS.experiment.addData('screen_scale_keys.stopped', globalClock.getTime());
    // Run 'End Routine' code from code_scale
    psychoJS.experiment.addData("X Scale", x_scale);
    psychoJS.experiment.addData("Y Scale", y_scale);
    
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
    psychoJS.experiment.addData('rectangel_keys.started', globalClock.getTime());
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
    psychoJS.experiment.addData('rectangel_keys.stopped', globalClock.getTime());
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
    Ins_image_2.setSize([1.5, 1.5]);
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
    if ((trials.thisTrialN === 0)) {
        Block_text = ("Practice will start. " + " Please press s key to continue.");
        psychoJS.experiment.addData("Block_exp", Block_id);
    } else {
        if (((trials.thisTrialN !== Practice_num) && (trials.thisTrialN !== ((Block_trial * Block_id) + Practice_num)))) {
            psychoJS.experiment.addData("Block_exp", Block_id);
            continueRoutine = false;
        } else {
            if ((Block_id === Block_num)) {
                psychoJS.experiment.addData("Block_exp", Block_id);
                continueRoutine = false;
            } else {
                psychoJS.experiment.addData("Block_exp", Block_id);
                Block_id = (Block_id + 1);
                Block_text = (((((("Block (" + Block_id.toString()) + " / ") + Block_num.toString()) + ") ") + " will start. ") + " Please press s key to continue.");
            }
        }
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
    console.log("🔍 当前 x_scale =", x_scale);  // ✅ 输出 x_scale 的值
      // 初始化 RDK
      // 你原来的 x_scale 是 cm → norm单位的比例，现在要转为 cm → 像素
    let cm_to_px_x = psychoJS.window.size[0] * x_scale;  // 每 cm 多少 px
    let cm_to_px_y = psychoJS.window.size[1] * y_scale;
    
     window.rdk = new RDK({
      canvasId: "canvas",
      type: "mask",
      noiseMode: "walk",
      direction: 0,
      coherence: 0,
      nDots: 360,
      speed: 1.5,
      dotSize: 0.03 * cm_to_px_x ,      // ✅ 点大小（单位像素）
      fieldRadius: 3.5 * cm_to_px_x ,  // ✅ 圆半径（15cm直径的一半）
      dotColor: "white"
    });
    
    }
    // 记录开始时间和持续时长
    window.rdkStart = performance.now();
    window.rdkDuration = parseFloat(0.5) * 1000;  // 转成毫秒
    window.rdkRunning = true;
    
    console.log("✅ M1阶段 RDK 初始化完成，TimeDur =", TimeDur, "秒");
    
    
    // keep track of which components have finished
    Mask_2Components = [];
    Mask_2Components.push(BKG_6);
    Mask_2Components.push(Fixation_4);
    
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
    
    
    // *Fixation_4* updates
    if (t >= 0.0 && Fixation_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Fixation_4.tStart = t;  // (not accounting for frame time here)
      Fixation_4.frameNStart = frameN;  // exact frame index
      
      Fixation_4.setAutoDraw(true);
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


var M2Components;
function M2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'M2' ---
    t = 0;
    M2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(999.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('M2.started', globalClock.getTime());
    // Run 'Begin Routine' code from Direction
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
      // 你原来的 x_scale 是 cm → norm单位的比例，现在要转为 cm → 像素
    let cm_to_px_x = psychoJS.window.size[0] * x_scale;  // 每 cm 多少 px
    let cm_to_px_y = psychoJS.window.size[1] * y_scale;
    
      // 初始化 RDK
      window.rdk = new RDK({
        canvasId: "canvas",
        type: "keypress", 
        direction: parseFloat(DirectionAngle),  // 可替换为变量
        coherence: parseFloat(Coherence1), // 可替换为变量
        dotColor: "rgb(7, 193, 7)",  
        nDots: 360,
        speed: 1.8,
        dotSize: 0.03 * cm_to_px_x ,      // ✅ 点大小（单位像素）
      fieldRadius: 3.5 * cm_to_px_x ,  // ✅ 圆半径（15cm直径的一半）
        noiseMode: "inertial"
      });
    }
    // 记录开始时间和持续时长
    window.rdkStart = performance.now();
    window.rdkDuration = parseFloat(TimeDur) * 1000;  // 转成毫秒
    window.rdkRunning = true;
    
    console.log("✅ M2阶段 RDK 初始化完成，TimeDur =", TimeDur, "秒");
    
    
    // keep track of which components have finished
    M2Components = [];
    M2Components.push(BKG_3);
    M2Components.push(Fixation_3);
    
    for (const thisComponent of M2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function M2RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'M2' ---
    // get current time
    t = M2Clock.getTime();
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
    
    // *Fixation_3* updates
    if (t >= 0.0 && Fixation_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Fixation_3.tStart = t;  // (not accounting for frame time here)
      Fixation_3.frameNStart = frameN;  // exact frame index
      
      Fixation_3.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 999 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (Fixation_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      Fixation_3.setAutoDraw(false);
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
    for (const thisComponent of M2Components)
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


function M2RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'M2' ---
    for (const thisComponent of M2Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('M2.stopped', globalClock.getTime());
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


var Key_pressed;
var Key_release;
var pressStart;
var releaseTime;
var keyDuration;
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
    // Run 'Begin Routine' code from Direction_2
    // ========== 初始化按键变量 ==========
    Key_pressed = false;
    Key_release = false;
    pressStart = null;
    releaseTime = null;
    keyDuration = 9999;
    
    // ========== 清除默认事件，聚焦 ==========
    if (typeof psychoJS !== 'undefined') {
      psychoJS.eventManager.clearEvents();
    }
    window.focus();
    console.log("✅ 获取键盘焦点");
    
    // ========== 计算屏幕像素密度 ==========
    let cm_to_px_x = psychoJS.window.size[0] * x_scale;
    let cm_to_px_y = psychoJS.window.size[1] * y_scale;
    
    // ========== 创建 canvas 并初始化 RDK（初始绿色） ==========
    const root = document.getElementById("root") || document.body;
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
      root.appendChild(canvas);
      window.rdkCanvas = canvas;
    
      window.rdk = new RDK({
        canvasId: "canvas",
        type: "keypress",
        noiseMode: "inertial",
        direction: parseFloat(DirectionAngle),
        coherence: parseFloat(Coherence1),
        nDots: 360,
        speed: 0, // 初始不动
        dotSize: 0.03 * cm_to_px_x,
        fieldRadius: 3.5 * cm_to_px_x,
        dotColor: "white"  // ✅ 白色
      });
      console.log("🎬 初始白色 RDK 初始化完成");
    }
    
    window.rdkStart = performance.now();
    window.rdkDuration = 6000;
    window.rdkRunning = true;
    
    // ========== 按键事件监听 ==========
    window.keyDownHandler = function(event) {
      if (event.key === "ArrowDown" && !Key_pressed) {
        Key_pressed = true;
        pressStart = performance.now();
    
        // ✅ 按下后重新初始化为白色 RDK
        window.rdk = new RDK({
          canvasId: "canvas",
          type: "keypress",
          noiseMode: "inertial",
          direction: parseFloat(DirectionAngle),
          coherence: parseFloat(Coherence1),
          nDots: 360,
          speed: 1.8,
          dotSize: 0.03 * cm_to_px_x,
          fieldRadius: 3.5 * cm_to_px_x,
          dotColor: "rgb(7, 193, 7)"
        });
    
        console.log("⬇️ 按下 ↓ 键，RDK 切换为绿色并开始运动");
      }
    };
    
    window.keyUpHandler = function(event) {
      if (event.key === "ArrowDown" && Key_pressed && !Key_release) {
        Key_release = true;
        releaseTime = performance.now();
        keyDuration = releaseTime - pressStart;
        if (window.rdk) window.rdk.speed = 0;
        console.log("🔴 松开 ↓ 键，keyDuration =", keyDuration.toFixed(2));
      }
    };
    
    window.addEventListener("keydown", window.keyDownHandler);
    window.addEventListener("keyup", window.keyUpHandler);
    console.log("📥 监听器绑定完成");
    
    // ========== 每帧更新 ==========
    if (window.rdk && window.rdkRunning) {
      window.rdk.updateAndDraw(true);
    
      const elapsed = performance.now() - window.rdkStart;
    
      if (Key_release) {
        continueRoutine = false;
      }
    
      if (elapsed >= window.rdkDuration && !Key_release) {
        keyDuration = 9999;
        if (window.rdk) window.rdk.speed = 0;
        console.log("⏱ 超时未松开，keyDuration = 9999");
        continueRoutine = false;
      }
    }
    
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
    // 每帧更新 RDK
    if (window.rdk && window.rdkRunning) {
      window.rdk.updateAndDraw(true);
    
      const elapsed = performance.now() - window.rdkStart;
    
      if (Key_release) {
        continueRoutine = false;
      }
    
      if (elapsed >= window.rdkDuration && !Key_release) {
        keyDuration = 9999;
        console.log("⏱ 超时未松开，keyDuration = 9999");
        if (window.rdk) window.rdk.speed = 0;
        continueRoutine = false;
      }
    }
    
    
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
    // 清除监听器
    window.removeEventListener("keydown", window.keyDownHandler);
    window.removeEventListener("keyup", window.keyUpHandler);
    
    // 移除 canvas
    if (window.rdkCanvas) {
      window.rdkCanvas.remove();
      window.rdkCanvas = null;
    }
    window.rdk = null;
    
    // 保存数据
    psychoJS.experiment.addData("keyDuration", keyDuration);
    console.log("🧼 Response routine 完成，记录 keyDuration =", keyDuration);
    window.keyDuration_global = keyDuration;
    
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
    let timeResp = window.keyDuration_global;
    let timeTarget = parseFloat(TimeDur);
    
    let feedbackID = 0;
    
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
    (Key_release === 0);
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

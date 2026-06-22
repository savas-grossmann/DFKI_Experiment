/********************************* 
 * Master Thesis Experiment *
 *********************************/


// store info about the experiment session:
let expName = 'Master Thesis Experiment';  // from the Builder filename that created this script
let expInfo = {
    'participant': `${util.pad(Number.parseFloat(util.randint(0, 999999)).toFixed(0), 6)}`,
    'Age': '',
};
let PILOTING = util.getUrlParameters().has('__pilotToken');

// Start code blocks for 'Before Experiment'
// Run 'Before Experiment' code from snap_pictures

function distanceCalc(pos1, pos2) {
    return Math.sqrt(
        Math.pow(pos1[0] - pos2[0], 2) +
        Math.pow(pos1[1] - pos2[1], 2)
    );
}


function movePicked(picked, mouse, grabbed) {
    if (grabbed !== null && grabbed !== undefined) {
        grabbed.pos = mouse.getPos();
        return grabbed;
    }
    for (var i = 0; i < picked.length; i++) {
        if (mouse.isPressedIn(picked[i])) {
            return picked[i];
        }
    }
    return null;
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
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); },flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
flowScheduler.add(InstructionsRoutineBegin());
flowScheduler.add(InstructionsRoutineEachFrame());
flowScheduler.add(InstructionsRoutineEnd());
const Scene_LoopLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(Scene_LoopLoopBegin(Scene_LoopLoopScheduler));
flowScheduler.add(Scene_LoopLoopScheduler);
flowScheduler.add(Scene_LoopLoopEnd);







flowScheduler.add(ExitRoutineBegin());
flowScheduler.add(ExitRoutineEachFrame());
flowScheduler.add(ExitRoutineEnd());
flowScheduler.add(quitPsychoJS, 'Thank you for your patience.', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, 'Thank you for your patience.', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    // resources:
    {'name': 'Pictures/mann geht aus supermarkt.png', 'path': 'Pictures/mann geht aus supermarkt.png'},
    {'name': 'Pictures/trials/female 1/arab1.jpg', 'path': 'Pictures/trials/female 1/arab1.jpg'},
    {'name': 'Pictures/trials/female 1/arab2.jpg', 'path': 'Pictures/trials/female 1/arab2.jpg'},
    {'name': 'Pictures/trials/female 1/asian1.jpg', 'path': 'Pictures/trials/female 1/asian1.jpg'},
    {'name': 'Pictures/trials/female 1/black1.jpg', 'path': 'Pictures/trials/female 1/black1.jpg'},
    {'name': 'Pictures/trials/female 1/cocasian1.jpg', 'path': 'Pictures/trials/female 1/cocasian1.jpg'},
    {'name': 'Pictures/trials/female 1/cocasian2.jpg', 'path': 'Pictures/trials/female 1/cocasian2.jpg'},
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.INFO);


var currentLoop;
var frameDur;
async function updateInfo() {
  currentLoop = psychoJS.experiment;  // right now there are no loops
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2026.1.3';
  expInfo['OS'] = window.navigator.platform;


  // store frame rate of monitor if we can measure it successfully
  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  

  
  psychoJS.experiment.dataFileName = (("." + "/") + `data//${expInfo["participant"]}_${expName}_${expInfo["date"]}`);
  psychoJS.experiment.field_separator = '\t';


  return Scheduler.Event.NEXT;
}


var InstructionsClock;
var instruction_text;
var key_resp;
var Scene_PresentationClock;
var scene_description;
var scene_image;
var key_resp_scene;
var Scene_DescriptionClock;
var task_description;
var response_box;
var button_description_continue;
var Face_RankingClock;
var ranking_bar_left;
var ranking_bar_right;
var image_1;
var image_2;
var image_3;
var image_4;
var image_5;
var image_6;
var pos_1;
var pos_2;
var pos_3;
var pos_4;
var pos_5;
var pos_6;
var mouse;
var timer_text;
var finish_ranking_key;
var finish_ranking_text;
var Save_Interim_ResultsClock;
var ExitClock;
var exit_message;
var key_resp_2;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "Instructions"
  InstructionsClock = new util.Clock();
  instruction_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'instruction_text',
    text: 'Welcome to the experiment.\n\nIn this study, you will complete a series of trials consisting of three phases.\n\nPhase 1 – Scene Presentation\n\nYou will first see a short scene description together with an image.\n\nPhase 2 – Face Description\n\nAfter viewing the scene, you will be asked to briefly describe the face of the person shown in the scene using your own words.\n\nPhase 3 – Face Ranking\n\nNext, you will see a collage containing six faces. Your task is to rank the faces according to how likely they match the previously shown scene.\n\nPlace the face you think matches the scene best closer to “Most likely” and the face you think matches the scene least closer to “Least likely”.\n\nThere are no correct or incorrect answers.\n\nPress SPACE to begin.',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], draggable: false, height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  key_resp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "Scene_Presentation"
  Scene_PresentationClock = new util.Clock();
  scene_description = new visual.TextStim({
    win: psychoJS.window,
    name: 'scene_description',
    text: 'This text describes the scene with a context (crime or neutral). You see a man going out of the shop, later a police officer stops you and asks you to describe that man. How did he look like?',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.3], draggable: false, height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  scene_image = new visual.ImageStim({
    win : psychoJS.window,
    name : 'scene_image', units : undefined, 
    image : 'Pictures/mann geht aus supermarkt.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, 
    pos : [0, (- 0.1)], 
    draggable: false,
    size : [1, 0.5],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  key_resp_scene = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "Scene_Description"
  Scene_DescriptionClock = new util.Clock();
  task_description = new visual.TextStim({
    win: psychoJS.window,
    name: 'task_description',
    text: 'Describe the face of the person you saw in the previous scene.',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.3], draggable: false, height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  response_box = new visual.TextBox({
    win: psychoJS.window,
    name: 'response_box',
    text: '',
    placeholder: 'Enter the description of the Person..',
    font: 'Arial',
    pos: [0, 0], 
    draggable: false,
    letterHeight: 0.03,
    lineSpacing: 1.0,
    size: [1, 0.5],  units: undefined, 
    ori: 0.0,
    color: 'black', colorSpace: 'rgb',
    fillColor: [0.6549, 0.6549, 0.6549], borderColor: 'black',
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'top-left',
    overflow: 'visible',
    editable: true,
    multiline: true,
    anchor: 'center',
    depth: -1.0 
  });
  
  button_description_continue = new visual.ButtonStim({
    win: psychoJS.window,
    name: 'button_description_continue',
    text: 'Continue',
    font: 'Arvo',
    pos: [0, (- 0.4)],
    size: [0.3, 0.1],
    padding: null,
    anchor: 'center',
    ori: 0.0,
    units: psychoJS.window.units,
    color: 'white',
    fillColor: 'darkgrey',
    borderColor: [-1.0000, -1.0000, -1.0000],
    colorSpace: 'rgb',
    borderWidth: 0.25,
    opacity: null,
    depth: -2,
    letterHeight: 0.05,
    bold: true,
    italic: false,
  });
  button_description_continue.clock = new util.Clock();
  
  // Initialize components for Routine "Face_Ranking"
  Face_RankingClock = new util.Clock();
  ranking_bar_left = new visual.TextStim({
    win: psychoJS.window,
    name: 'ranking_bar_left',
    text: '◄ Most likely',
    font: 'Arial',
    units: undefined, 
    pos: [(- 0.7), 0], draggable: false, height: 0.04,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  ranking_bar_right = new visual.TextStim({
    win: psychoJS.window,
    name: 'ranking_bar_right',
    text: 'Least likely ►',
    font: 'Arial',
    units: undefined, 
    pos: [0.7, 0], draggable: false, height: 0.04,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  image_1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'image_1', units : undefined, 
    image : 'Pictures/trials/female 1/arab1.jpg', mask : undefined,
    anchor : 'center',
    ori : 0.0, 
    pos : [(- 0.75), (- 0.25)], 
    draggable: true,
    size : 0.25,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  image_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'image_2', units : undefined, 
    image : 'Pictures/trials/female 1/arab2.jpg', mask : undefined,
    anchor : 'center',
    ori : 0.0, 
    pos : [(- 0.45), (- 0.25)], 
    draggable: true,
    size : 0.25,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  image_3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'image_3', units : undefined, 
    image : 'Pictures/trials/female 1/asian1.jpg', mask : undefined,
    anchor : 'center',
    ori : 0.0, 
    pos : [(- 0.15), (- 0.25)], 
    draggable: true,
    size : 0.25,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
  });
  image_4 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'image_4', units : undefined, 
    image : 'Pictures/trials/female 1/black1.jpg', mask : undefined,
    anchor : 'center',
    ori : 0.0, 
    pos : [0.15, (- 0.25)], 
    draggable: true,
    size : 0.25,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -5.0 
  });
  image_5 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'image_5', units : undefined, 
    image : 'Pictures/trials/female 1/cocasian1.jpg', mask : undefined,
    anchor : 'center',
    ori : 0.0, 
    pos : [0.45, (- 0.25)], 
    draggable: true,
    size : 0.25,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -6.0 
  });
  image_6 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'image_6', units : undefined, 
    image : 'Pictures/trials/female 1/cocasian2.jpg', mask : undefined,
    anchor : 'center',
    ori : 0.0, 
    pos : [0.75, (- 0.25)], 
    draggable: true,
    size : 0.25,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -7.0 
  });
  pos_1 = new visual.Rect ({
    win: psychoJS.window, name: 'pos_1', 
    width: [0.25, 0.25][0], height: [0.25, 0.25][1],
    ori: 0.0, 
    pos: [(- 0.75), 0.25], 
    draggable: false, 
    anchor: 'center', 
    lineWidth: 5.0, 
    lineColor: new util.Color('black'), 
    fillColor: undefined, 
    colorSpace: 'rgb', 
    opacity: undefined, 
    depth: -8, 
    interpolate: true, 
  });
  
  pos_2 = new visual.Rect ({
    win: psychoJS.window, name: 'pos_2', 
    width: [0.25, 0.25][0], height: [0.25, 0.25][1],
    ori: 0.0, 
    pos: [(- 0.45), 0.25], 
    draggable: false, 
    anchor: 'center', 
    lineWidth: 5.0, 
    lineColor: new util.Color('black'), 
    fillColor: undefined, 
    colorSpace: 'rgb', 
    opacity: undefined, 
    depth: -9, 
    interpolate: true, 
  });
  
  pos_3 = new visual.Rect ({
    win: psychoJS.window, name: 'pos_3', 
    width: [0.25, 0.25][0], height: [0.25, 0.25][1],
    ori: 0.0, 
    pos: [(- 0.15), 0.25], 
    draggable: false, 
    anchor: 'center', 
    lineWidth: 5.0, 
    lineColor: new util.Color('black'), 
    fillColor: undefined, 
    colorSpace: 'rgb', 
    opacity: undefined, 
    depth: -10, 
    interpolate: true, 
  });
  
  pos_4 = new visual.Rect ({
    win: psychoJS.window, name: 'pos_4', 
    width: [0.25, 0.25][0], height: [0.25, 0.25][1],
    ori: 0.0, 
    pos: [0.15, 0.25], 
    draggable: false, 
    anchor: 'center', 
    lineWidth: 5.0, 
    lineColor: new util.Color('black'), 
    fillColor: undefined, 
    colorSpace: 'rgb', 
    opacity: undefined, 
    depth: -11, 
    interpolate: true, 
  });
  
  pos_5 = new visual.Rect ({
    win: psychoJS.window, name: 'pos_5', 
    width: [0.25, 0.25][0], height: [0.25, 0.25][1],
    ori: 0.0, 
    pos: [0.45, 0.25], 
    draggable: false, 
    anchor: 'center', 
    lineWidth: 5.0, 
    lineColor: new util.Color('black'), 
    fillColor: undefined, 
    colorSpace: 'rgb', 
    opacity: undefined, 
    depth: -12, 
    interpolate: true, 
  });
  
  pos_6 = new visual.Rect ({
    win: psychoJS.window, name: 'pos_6', 
    width: [0.25, 0.25][0], height: [0.25, 0.25][1],
    ori: 0.0, 
    pos: [0.75, 0.25], 
    draggable: false, 
    anchor: 'center', 
    lineWidth: 5.0, 
    lineColor: new util.Color('black'), 
    fillColor: undefined, 
    colorSpace: 'rgb', 
    opacity: undefined, 
    depth: -13, 
    interpolate: true, 
  });
  
  mouse = new core.Mouse({
    win: psychoJS.window,
  });
  mouse.mouseClock = new util.Clock();
  timer_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'timer_text',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0.85, 0.45], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -17.0 
  });
  
  finish_ranking_key = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  finish_ranking_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'finish_ranking_text',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [(- 0.1), (- 0.45)], draggable: false, height: 0.025,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -20.0 
  });
  
  // Initialize components for Routine "Save_Interim_Results"
  Save_Interim_ResultsClock = new util.Clock();
  // Initialize components for Routine "Exit"
  ExitClock = new util.Clock();
  exit_message = new visual.TextStim({
    win: psychoJS.window,
    name: 'exit_message',
    text: 'Thank you for taking part in this experiment!\n\nPress SPACE to exit.',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  key_resp_2 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var routineForceEnded;
var InstructionsMaxDurationReached;
var _key_resp_allKeys;
var InstructionsMaxDuration;
var InstructionsComponents;
function InstructionsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Instructions' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // keep track of whether this Routine was forcibly ended
    routineForceEnded = false;
    InstructionsClock.reset();
    routineTimer.reset();
    InstructionsMaxDurationReached = false;
    // update component parameters for each repeat
    key_resp.keys = undefined;
    key_resp.rt = undefined;
    _key_resp_allKeys = [];
    psychoJS.experiment.addData('Instructions.started', globalClock.getTime());
    InstructionsMaxDuration = null
    // keep track of which components have finished
    InstructionsComponents = [];
    InstructionsComponents.push(instruction_text);
    InstructionsComponents.push(key_resp);
    
    InstructionsComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function InstructionsRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Instructions' ---
    // get current time
    t = InstructionsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *instruction_text* updates
    if (t >= 0.0 && instruction_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instruction_text.tStart = t;  // (not accounting for frame time here)
      instruction_text.frameNStart = frameN;  // exact frame index
      
      instruction_text.setAutoDraw(true);
    }
    
    
    // if instruction_text is active this frame...
    if (instruction_text.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *key_resp* updates
    if (t >= 0.0 && key_resp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp.tStart = t;  // (not accounting for frame time here)
      key_resp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp.clearEvents(); });
    }
    
    // if key_resp is active this frame...
    if (key_resp.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp.getKeys({
        keyList: typeof 'space' === 'string' ? ['space'] : 'space', 
        waitRelease: false
      });
      _key_resp_allKeys = _key_resp_allKeys.concat(theseKeys);
      if (_key_resp_allKeys.length > 0) {
        key_resp.keys = _key_resp_allKeys[_key_resp_allKeys.length - 1].name;  // just the last key pressed
        key_resp.rt = _key_resp_allKeys[_key_resp_allKeys.length - 1].rt;
        key_resp.duration = _key_resp_allKeys[_key_resp_allKeys.length - 1].duration;
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
      routineForceEnded = true;
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    InstructionsComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function InstructionsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Instructions' ---
    InstructionsComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('Instructions.stopped', globalClock.getTime());
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_resp.corr, level);
    }
    psychoJS.experiment.addData('key_resp.keys', key_resp.keys);
    if (typeof key_resp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp.rt', key_resp.rt);
        psychoJS.experiment.addData('key_resp.duration', key_resp.duration);
        routineTimer.reset();
        }
    
    key_resp.stop();
    // the Routine "Instructions" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var Scene_Loop;
function Scene_LoopLoopBegin(Scene_LoopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    Scene_Loop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 20, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'Scene_Loop'
    });
    psychoJS.experiment.addLoop(Scene_Loop); // add the loop to the experiment
    currentLoop = Scene_Loop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    Scene_Loop.forEach(function() {
      snapshot = Scene_Loop.getSnapshot();
    
      Scene_LoopLoopScheduler.add(importConditions(snapshot));
      Scene_LoopLoopScheduler.add(Scene_PresentationRoutineBegin(snapshot));
      Scene_LoopLoopScheduler.add(Scene_PresentationRoutineEachFrame());
      Scene_LoopLoopScheduler.add(Scene_PresentationRoutineEnd(snapshot));
      Scene_LoopLoopScheduler.add(Scene_DescriptionRoutineBegin(snapshot));
      Scene_LoopLoopScheduler.add(Scene_DescriptionRoutineEachFrame());
      Scene_LoopLoopScheduler.add(Scene_DescriptionRoutineEnd(snapshot));
      const Face_Ranking_LoopLoopScheduler = new Scheduler(psychoJS);
      Scene_LoopLoopScheduler.add(Face_Ranking_LoopLoopBegin(Face_Ranking_LoopLoopScheduler, snapshot));
      Scene_LoopLoopScheduler.add(Face_Ranking_LoopLoopScheduler);
      Scene_LoopLoopScheduler.add(Face_Ranking_LoopLoopEnd);
      Scene_LoopLoopScheduler.add(Save_Interim_ResultsRoutineBegin(snapshot));
      Scene_LoopLoopScheduler.add(Save_Interim_ResultsRoutineEachFrame());
      Scene_LoopLoopScheduler.add(Save_Interim_ResultsRoutineEnd(snapshot));
      Scene_LoopLoopScheduler.add(Scene_LoopLoopEndIteration(Scene_LoopLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


var Face_Ranking_Loop;
function Face_Ranking_LoopLoopBegin(Face_Ranking_LoopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    Face_Ranking_Loop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 8, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'Face_Ranking_Loop'
    });
    psychoJS.experiment.addLoop(Face_Ranking_Loop); // add the loop to the experiment
    currentLoop = Face_Ranking_Loop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    Face_Ranking_Loop.forEach(function() {
      snapshot = Face_Ranking_Loop.getSnapshot();
    
      Face_Ranking_LoopLoopScheduler.add(importConditions(snapshot));
      Face_Ranking_LoopLoopScheduler.add(Face_RankingRoutineBegin(snapshot));
      Face_Ranking_LoopLoopScheduler.add(Face_RankingRoutineEachFrame());
      Face_Ranking_LoopLoopScheduler.add(Face_RankingRoutineEnd(snapshot));
      Face_Ranking_LoopLoopScheduler.add(Face_Ranking_LoopLoopEndIteration(Face_Ranking_LoopLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function Face_Ranking_LoopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(Face_Ranking_Loop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function Face_Ranking_LoopLoopEndIteration(scheduler, snapshot) {
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


async function Scene_LoopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(Scene_Loop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function Scene_LoopLoopEndIteration(scheduler, snapshot) {
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


var Scene_PresentationMaxDurationReached;
var _key_resp_scene_allKeys;
var Scene_PresentationMaxDuration;
var Scene_PresentationComponents;
function Scene_PresentationRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Scene_Presentation' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // keep track of whether this Routine was forcibly ended
    routineForceEnded = false;
    Scene_PresentationClock.reset();
    routineTimer.reset();
    Scene_PresentationMaxDurationReached = false;
    // update component parameters for each repeat
    key_resp_scene.keys = undefined;
    key_resp_scene.rt = undefined;
    _key_resp_scene_allKeys = [];
    psychoJS.experiment.addData('Scene_Presentation.started', globalClock.getTime());
    Scene_PresentationMaxDuration = null
    // keep track of which components have finished
    Scene_PresentationComponents = [];
    Scene_PresentationComponents.push(scene_description);
    Scene_PresentationComponents.push(scene_image);
    Scene_PresentationComponents.push(key_resp_scene);
    
    Scene_PresentationComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function Scene_PresentationRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Scene_Presentation' ---
    // get current time
    t = Scene_PresentationClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *scene_description* updates
    if (t >= 0.0 && scene_description.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      scene_description.tStart = t;  // (not accounting for frame time here)
      scene_description.frameNStart = frameN;  // exact frame index
      
      scene_description.setAutoDraw(true);
    }
    
    
    // if scene_description is active this frame...
    if (scene_description.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *scene_image* updates
    if (t >= 0.0 && scene_image.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      scene_image.tStart = t;  // (not accounting for frame time here)
      scene_image.frameNStart = frameN;  // exact frame index
      
      scene_image.setAutoDraw(true);
    }
    
    
    // if scene_image is active this frame...
    if (scene_image.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *key_resp_scene* updates
    if (t >= 0.0 && key_resp_scene.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_scene.tStart = t;  // (not accounting for frame time here)
      key_resp_scene.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_scene.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_scene.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_scene.clearEvents(); });
    }
    
    // if key_resp_scene is active this frame...
    if (key_resp_scene.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_scene.getKeys({
        keyList: typeof 'space' === 'string' ? ['space'] : 'space', 
        waitRelease: false
      });
      _key_resp_scene_allKeys = _key_resp_scene_allKeys.concat(theseKeys);
      if (_key_resp_scene_allKeys.length > 0) {
        key_resp_scene.keys = _key_resp_scene_allKeys[_key_resp_scene_allKeys.length - 1].name;  // just the last key pressed
        key_resp_scene.rt = _key_resp_scene_allKeys[_key_resp_scene_allKeys.length - 1].rt;
        key_resp_scene.duration = _key_resp_scene_allKeys[_key_resp_scene_allKeys.length - 1].duration;
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
      routineForceEnded = true;
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    Scene_PresentationComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function Scene_PresentationRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Scene_Presentation' ---
    Scene_PresentationComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('Scene_Presentation.stopped', globalClock.getTime());
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_resp_scene.corr, level);
    }
    psychoJS.experiment.addData('key_resp_scene.keys', key_resp_scene.keys);
    if (typeof key_resp_scene.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_scene.rt', key_resp_scene.rt);
        psychoJS.experiment.addData('key_resp_scene.duration', key_resp_scene.duration);
        routineTimer.reset();
        }
    
    key_resp_scene.stop();
    // the Routine "Scene_Presentation" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var Scene_DescriptionMaxDurationReached;
var Scene_DescriptionMaxDuration;
var Scene_DescriptionComponents;
function Scene_DescriptionRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Scene_Description' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // keep track of whether this Routine was forcibly ended
    routineForceEnded = false;
    Scene_DescriptionClock.reset();
    routineTimer.reset();
    Scene_DescriptionMaxDurationReached = false;
    // update component parameters for each repeat
    response_box.setText('');
    response_box.refresh();
    // reset button_description_continue to account for continued clicks & clear times on/off
    button_description_continue.reset()
    psychoJS.experiment.addData('Scene_Description.started', globalClock.getTime());
    Scene_DescriptionMaxDuration = null
    // keep track of which components have finished
    Scene_DescriptionComponents = [];
    Scene_DescriptionComponents.push(task_description);
    Scene_DescriptionComponents.push(response_box);
    Scene_DescriptionComponents.push(button_description_continue);
    
    Scene_DescriptionComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function Scene_DescriptionRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Scene_Description' ---
    // get current time
    t = Scene_DescriptionClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *task_description* updates
    if (t >= 0.0 && task_description.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      task_description.tStart = t;  // (not accounting for frame time here)
      task_description.frameNStart = frameN;  // exact frame index
      
      task_description.setAutoDraw(true);
    }
    
    
    // if task_description is active this frame...
    if (task_description.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *response_box* updates
    if (t >= 0.0 && response_box.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      response_box.tStart = t;  // (not accounting for frame time here)
      response_box.frameNStart = frameN;  // exact frame index
      
      response_box.setAutoDraw(true);
    }
    
    
    // if response_box is active this frame...
    if (response_box.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *button_description_continue* updates
    if (t >= 0 && button_description_continue.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      button_description_continue.tStart = t;  // (not accounting for frame time here)
      button_description_continue.frameNStart = frameN;  // exact frame index
      
      button_description_continue.setAutoDraw(true);
    }
    
    
    // if button_description_continue is active this frame...
    if (button_description_continue.status === PsychoJS.Status.STARTED) {
    }
    
    if (button_description_continue.status === PsychoJS.Status.STARTED) {
      // check whether button_description_continue has been pressed
      if (button_description_continue.isClicked) {
        if (!button_description_continue.wasClicked) {
          // store time of first click
          button_description_continue.timesOn.push(button_description_continue.clock.getTime());
          // store time clicked until
          button_description_continue.timesOff.push(button_description_continue.clock.getTime());
        } else {
          // update time clicked until;
          button_description_continue.timesOff[button_description_continue.timesOff.length - 1] = button_description_continue.clock.getTime();
        }
        if (!button_description_continue.wasClicked) {
          // end routine when button_description_continue is clicked
          continueRoutine = false;
          
        }
        // if button_description_continue is still clicked next frame, it is not a new click
        button_description_continue.wasClicked = true;
      } else {
        // if button_description_continue is clicked next frame, it is a new click
        button_description_continue.wasClicked = false;
      }
    } else {
      // keep clock at 0 if button_description_continue hasn't started / has finished
      button_description_continue.clock.reset();
      // if button_description_continue is clicked next frame, it is a new click
      button_description_continue.wasClicked = false;
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      routineForceEnded = true;
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    Scene_DescriptionComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function Scene_DescriptionRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Scene_Description' ---
    Scene_DescriptionComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('Scene_Description.stopped', globalClock.getTime());
    psychoJS.experiment.addData('response_box.text',response_box.text)
    psychoJS.experiment.addData('button_description_continue.numClicks', button_description_continue.numClicks);
    psychoJS.experiment.addData('button_description_continue.timesOn', button_description_continue.timesOn);
    psychoJS.experiment.addData('button_description_continue.timesOff', button_description_continue.timesOff);
    // the Routine "Scene_Description" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var Face_RankingMaxDurationReached;
var picked;
var originalPositions;
var locations;
var slotNames;
var occupiedSlots;
var movingPiece;
var snapThresh;
var mouseReleased;
var submit_allowed;
var gotValidClick;
var task_timer_start;
var task_timer_duration;
var _finish_ranking_key_allKeys;
var Face_RankingMaxDuration;
var Face_RankingComponents;
function Face_RankingRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Face_Ranking' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // keep track of whether this Routine was forcibly ended
    routineForceEnded = false;
    Face_RankingClock.reset();
    routineTimer.reset();
    Face_RankingMaxDurationReached = false;
    // update component parameters for each repeat
    // Run 'Begin Routine' code from snap_pictures
    picked = [image_1, image_2, image_3, image_4, image_5, image_6];
    
    // original positions
    originalPositions = {
        "image_1": [-0.75, -0.25],
        "image_2": [-0.45, -0.25],
        "image_3": [-0.15, -0.25],
        "image_4": [ 0.15, -0.25],
        "image_5": [ 0.45, -0.25],
        "image_6": [ 0.75, -0.25]
    };
    
    // ranking slots
    locations = [
        [-0.75, 0.25],
        [-0.45, 0.25],
        [-0.15, 0.25],
        [ 0.15, 0.25],
        [ 0.45, 0.25],
        [ 0.75, 0.25]
    ];
    
    slotNames = [
        "slot1",
        "slot2",
        "slot3",
        "slot4",
        "slot5",
        "slot6"
    ];
    
    // place all images at their start positions
    for (var p = 0; p < picked.length; p++) {
        picked[p].setPos(
            originalPositions[picked[p].name]
        );
    }
    
    occupiedSlots = {};
    
    movingPiece = null;
    
    snapThresh = 0.10;
    
    mouseReleased = true;
    
    submit_allowed = false;
    // setup some python lists for storing info about the mouse
    gotValidClick = false; // until a click is received
    // Run 'Begin Routine' code from timer
    task_timer_start = globalClock.getTime();
    task_timer_duration = 20;
    finish_ranking_key.keys = undefined;
    finish_ranking_key.rt = undefined;
    _finish_ranking_key_allKeys = [];
    psychoJS.experiment.addData('Face_Ranking.started', globalClock.getTime());
    Face_RankingMaxDuration = 20
    // keep track of which components have finished
    Face_RankingComponents = [];
    Face_RankingComponents.push(ranking_bar_left);
    Face_RankingComponents.push(ranking_bar_right);
    Face_RankingComponents.push(image_1);
    Face_RankingComponents.push(image_2);
    Face_RankingComponents.push(image_3);
    Face_RankingComponents.push(image_4);
    Face_RankingComponents.push(image_5);
    Face_RankingComponents.push(image_6);
    Face_RankingComponents.push(pos_1);
    Face_RankingComponents.push(pos_2);
    Face_RankingComponents.push(pos_3);
    Face_RankingComponents.push(pos_4);
    Face_RankingComponents.push(pos_5);
    Face_RankingComponents.push(pos_6);
    Face_RankingComponents.push(mouse);
    Face_RankingComponents.push(timer_text);
    Face_RankingComponents.push(finish_ranking_key);
    Face_RankingComponents.push(finish_ranking_text);
    
    Face_RankingComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


var time_left;
var seconds;
function Face_RankingRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Face_Ranking' ---
    // get current time
    t = Face_RankingClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // is it time to end the Routine? (based on local clock)
    if (t > Face_RankingMaxDuration) {
        Face_RankingMaxDurationReached = true
        continueRoutine = false
    }
    
    // *ranking_bar_left* updates
    if (t >= 0.0 && ranking_bar_left.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      ranking_bar_left.tStart = t;  // (not accounting for frame time here)
      ranking_bar_left.frameNStart = frameN;  // exact frame index
      
      ranking_bar_left.setAutoDraw(true);
    }
    
    
    // if ranking_bar_left is active this frame...
    if (ranking_bar_left.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *ranking_bar_right* updates
    if (t >= 0.0 && ranking_bar_right.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      ranking_bar_right.tStart = t;  // (not accounting for frame time here)
      ranking_bar_right.frameNStart = frameN;  // exact frame index
      
      ranking_bar_right.setAutoDraw(true);
    }
    
    
    // if ranking_bar_right is active this frame...
    if (ranking_bar_right.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *image_1* updates
    if (t >= 0.0 && image_1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      image_1.tStart = t;  // (not accounting for frame time here)
      image_1.frameNStart = frameN;  // exact frame index
      
      image_1.setAutoDraw(true);
    }
    
    
    // if image_1 is active this frame...
    if (image_1.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *image_2* updates
    if (t >= 0.0 && image_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      image_2.tStart = t;  // (not accounting for frame time here)
      image_2.frameNStart = frameN;  // exact frame index
      
      image_2.setAutoDraw(true);
    }
    
    
    // if image_2 is active this frame...
    if (image_2.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *image_3* updates
    if (t >= 0.0 && image_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      image_3.tStart = t;  // (not accounting for frame time here)
      image_3.frameNStart = frameN;  // exact frame index
      
      image_3.setAutoDraw(true);
    }
    
    
    // if image_3 is active this frame...
    if (image_3.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *image_4* updates
    if (t >= 0.0 && image_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      image_4.tStart = t;  // (not accounting for frame time here)
      image_4.frameNStart = frameN;  // exact frame index
      
      image_4.setAutoDraw(true);
    }
    
    
    // if image_4 is active this frame...
    if (image_4.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *image_5* updates
    if (t >= 0.0 && image_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      image_5.tStart = t;  // (not accounting for frame time here)
      image_5.frameNStart = frameN;  // exact frame index
      
      image_5.setAutoDraw(true);
    }
    
    
    // if image_5 is active this frame...
    if (image_5.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *image_6* updates
    if (t >= 0.0 && image_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      image_6.tStart = t;  // (not accounting for frame time here)
      image_6.frameNStart = frameN;  // exact frame index
      
      image_6.setAutoDraw(true);
    }
    
    
    // if image_6 is active this frame...
    if (image_6.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *pos_1* updates
    if (t >= 0.0 && pos_1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pos_1.tStart = t;  // (not accounting for frame time here)
      pos_1.frameNStart = frameN;  // exact frame index
      
      pos_1.setAutoDraw(true);
    }
    
    
    // if pos_1 is active this frame...
    if (pos_1.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *pos_2* updates
    if (t >= 0.0 && pos_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pos_2.tStart = t;  // (not accounting for frame time here)
      pos_2.frameNStart = frameN;  // exact frame index
      
      pos_2.setAutoDraw(true);
    }
    
    
    // if pos_2 is active this frame...
    if (pos_2.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *pos_3* updates
    if (t >= 0.0 && pos_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pos_3.tStart = t;  // (not accounting for frame time here)
      pos_3.frameNStart = frameN;  // exact frame index
      
      pos_3.setAutoDraw(true);
    }
    
    
    // if pos_3 is active this frame...
    if (pos_3.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *pos_4* updates
    if (t >= 0.0 && pos_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pos_4.tStart = t;  // (not accounting for frame time here)
      pos_4.frameNStart = frameN;  // exact frame index
      
      pos_4.setAutoDraw(true);
    }
    
    
    // if pos_4 is active this frame...
    if (pos_4.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *pos_5* updates
    if (t >= 0.0 && pos_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pos_5.tStart = t;  // (not accounting for frame time here)
      pos_5.frameNStart = frameN;  // exact frame index
      
      pos_5.setAutoDraw(true);
    }
    
    
    // if pos_5 is active this frame...
    if (pos_5.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *pos_6* updates
    if (t >= 0.0 && pos_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pos_6.tStart = t;  // (not accounting for frame time here)
      pos_6.frameNStart = frameN;  // exact frame index
      
      pos_6.setAutoDraw(true);
    }
    
    
    // if pos_6 is active this frame...
    if (pos_6.status === PsychoJS.Status.STARTED) {
    }
    
    // Run 'Each Frame' code from snap_pictures
    // ---------------------------------
    // DRAGGING
    // ---------------------------------
    if (mouse.getPressed()[0]) {
    
        if (mouseReleased) {
    
            movingPiece = movePicked(
                picked,
                mouse,
                movingPiece
            );
    
            // bring selected image to front
            if (movingPiece !== null) {
    
                var idx = picked.indexOf(movingPiece);
    
                if (idx !== -1) {
                    picked.splice(idx, 1);
                }
    
                picked.push(movingPiece);
            }
    
            // free occupied slot if image was already placed
            if (movingPiece !== null) {
    
                var slotsToFree = [];
    
                for (var slot in occupiedSlots) {
    
                    if (occupiedSlots[slot] === movingPiece) {
                        slotsToFree.push(slot);
                    }
                }
    
                for (var i = 0; i < slotsToFree.length; i++) {
                    delete occupiedSlots[slotsToFree[i]];
                }
            }
    
            mouseReleased = false;
        }
    
        // move image with mouse
        if (movingPiece !== null) {
            movingPiece.pos = mouse.getPos();
        }
    
    }
    
    // ---------------------------------
    // RELEASE
    // ---------------------------------
    else {
    
        if (!mouseReleased) {
    
            if (movingPiece !== null) {
    
                var closestLocation = null;
                var closestSlot = null;
                var closestDistance = 999;
    
                // find nearest slot
                for (var l = 0; l < locations.length; l++) {
    
                    var dist = distanceCalc(
                        movingPiece.pos,
                        locations[l]
                    );
    
                    if (dist < closestDistance) {
    
                        closestDistance = dist;
                        closestLocation = locations[l];
                        closestSlot = slotNames[l];
                    }
                }
    
                // valid drop
                if (closestDistance < snapThresh) {
    
                    // slot occupied -> send old image home
                    if (occupiedSlots[closestSlot] !== undefined) {
    
                        var replacedPiece =
                            occupiedSlots[closestSlot];
    
                        replacedPiece.setPos(
                            originalPositions[
                                replacedPiece.name
                            ]
                        );
                    }
    
                    // place new image
                    movingPiece.setPos(
                        closestLocation
                    );
    
                    occupiedSlots[closestSlot] =
                        movingPiece;
    
                }
    
                // invalid drop -> return home
                else {
    
                    movingPiece.setPos(
                        originalPositions[
                            movingPiece.name
                        ]
                    );
                }
            }
    
            movingPiece = null;
        }
    
        mouseReleased = true;
    }
    
    // draw all images
    for (var p = 0; p < picked.length; p++) {
        picked[p].draw();
    }
    
    // allow Continue button
    
    var all_placed = Object.keys(occupiedSlots).length === picked.length;
    
    if (all_placed) {
        finish_ranking_text.setAutoDraw(true);
        submit_allowed = true;
    } else {
        finish_ranking_text.setAutoDraw(false);
        submit_allowed = false;
    }
    // Run 'Each Frame' code from timer
    time_left = task_timer_duration - (
        globalClock.getTime() - task_timer_start
    );
    
    seconds = Math.max(0, Math.floor(time_left));
    
    timer_text.setText(String(seconds));
    
    if (time_left <= 0) {
        continueRoutine = false;
    }
    
    // *timer_text* updates
    if (t >= 0.0 && timer_text.status === PsychoJS.Status.NOT_STARTED) {
      // update params
      timer_text.setText(`${seconds}`, false);
      // keep track of start time/frame for later
      timer_text.tStart = t;  // (not accounting for frame time here)
      timer_text.frameNStart = frameN;  // exact frame index
      
      timer_text.setAutoDraw(true);
    }
    
    
    // if timer_text is active this frame...
    if (timer_text.status === PsychoJS.Status.STARTED) {
      // update params
      timer_text.setText(`${seconds}`, false);
    }
    
    
    // *finish_ranking_key* updates
    if (t >= 0.0 && finish_ranking_key.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      finish_ranking_key.tStart = t;  // (not accounting for frame time here)
      finish_ranking_key.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { finish_ranking_key.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { finish_ranking_key.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { finish_ranking_key.clearEvents(); });
    }
    
    // if finish_ranking_key is active this frame...
    if (finish_ranking_key.status === PsychoJS.Status.STARTED) {
      let theseKeys = finish_ranking_key.getKeys({
        keyList: typeof 'space' === 'string' ? ['space'] : 'space', 
        waitRelease: false
      });
      _finish_ranking_key_allKeys = _finish_ranking_key_allKeys.concat(theseKeys);
      if (_finish_ranking_key_allKeys.length > 0) {
        finish_ranking_key.keys = _finish_ranking_key_allKeys[_finish_ranking_key_allKeys.length - 1].name;  // just the last key pressed
        finish_ranking_key.rt = _finish_ranking_key_allKeys[_finish_ranking_key_allKeys.length - 1].rt;
        finish_ranking_key.duration = _finish_ranking_key_allKeys[_finish_ranking_key_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // Run 'Each Frame' code from gate_finish_ranking
    if (finish_ranking_key.keys === 'space' && !submit_allowed) {
        finish_ranking_key.keys = [];
        _finish_ranking_key_allKeys = [];
        continueRoutine = true;
    }
    
    // *finish_ranking_text* updates
    if (t >= 999 && finish_ranking_text.status === PsychoJS.Status.NOT_STARTED) {
      // update params
      finish_ranking_text.setText('Press SPACE to finish the ranking', false);
      // keep track of start time/frame for later
      finish_ranking_text.tStart = t;  // (not accounting for frame time here)
      finish_ranking_text.frameNStart = frameN;  // exact frame index
      
      finish_ranking_text.setAutoDraw(true);
    }
    
    
    // if finish_ranking_text is active this frame...
    if (finish_ranking_text.status === PsychoJS.Status.STARTED) {
      // update params
      finish_ranking_text.setText('Press SPACE to finish the ranking', false);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      routineForceEnded = true;
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    Face_RankingComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function Face_RankingRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Face_Ranking' ---
    Face_RankingComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('Face_Ranking.stopped', globalClock.getTime());
    // Run 'End Routine' code from snap_pictures
    for (var i = 0; i < slotNames.length; i++) {
    
        var slotName = slotNames[i];
    
        if (occupiedSlots[slotName] !== undefined) {
    
            psychoJS.experiment.addData(
                "rank_" + (i + 1),
                occupiedSlots[slotName].name
            );
    
        } else {
    
            psychoJS.experiment.addData(
                "rank_" + (i + 1),
                ""
            );
        }
    }
    
    psychoJS.experiment.nextEntry();
    // store data for psychoJS.experiment (ExperimentHandler)
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(finish_ranking_key.corr, level);
    }
    psychoJS.experiment.addData('finish_ranking_key.keys', finish_ranking_key.keys);
    if (typeof finish_ranking_key.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('finish_ranking_key.rt', finish_ranking_key.rt);
        psychoJS.experiment.addData('finish_ranking_key.duration', finish_ranking_key.duration);
        routineTimer.reset();
        }
    
    finish_ranking_key.stop();
    // the Routine "Face_Ranking" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var Save_Interim_ResultsMaxDurationReached;
var Save_Interim_ResultsMaxDuration;
var Save_Interim_ResultsComponents;
function Save_Interim_ResultsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Save_Interim_Results' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // keep track of whether this Routine was forcibly ended
    routineForceEnded = false;
    Save_Interim_ResultsClock.reset();
    routineTimer.reset();
    Save_Interim_ResultsMaxDurationReached = false;
    // update component parameters for each repeat
    psychoJS.experiment.addData('Save_Interim_Results.started', globalClock.getTime());
    Save_Interim_ResultsMaxDuration = null
    // keep track of which components have finished
    Save_Interim_ResultsComponents = [];
    
    Save_Interim_ResultsComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function Save_Interim_ResultsRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Save_Interim_Results' ---
    // get current time
    t = Save_Interim_ResultsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      routineForceEnded = true;
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    Save_Interim_ResultsComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function Save_Interim_ResultsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Save_Interim_Results' ---
    Save_Interim_ResultsComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('Save_Interim_Results.stopped', globalClock.getTime());
    // Run 'End Routine' code from save_interim_results
    var trials = psychoJS.experiment.getAllEntries
        ? psychoJS.experiment.getAllEntries()
        : psychoJS.experiment._trialsData;
    
    function convertToCSV(dataArray) {
        if (!dataArray || dataArray.length === 0) { return ""; }
        var headers = Object.keys(dataArray[0]);
        var rows = [headers.join(",")];
        for (var i = 0; i < dataArray.length; i++) {
            var row = dataArray[i];
            var values = headers.map(function(h) {
                var val = (row[h] !== undefined && row[h] !== null) ? String(row[h]) : "";
                if (val.indexOf(",") !== -1 || val.indexOf("\n") !== -1) {
                    val = '"' + val.replace(/"/g, '""') + '"';
                }
                return val;
            });
            rows.push(values.join(","));
        }
        return rows.join("\n");
    }
    
    var participantID = expInfo["participant"] || "unknown";
    var sceneNum = (Scene_Loop.thisN !== undefined ? Scene_Loop.thisN : 0) + 1;
    var filename = "participant_" + participantID + "_" + expName.replace(/ /g, "_") + "_scene_" + sceneNum + ".csv";
    
    fetch("https://pipe.jspsych.org/api/data/", {
        method: "POST",
        headers: {"Content-Type": "application/json", "Accept": "*/*"},
        body: JSON.stringify({
            experimentID: "H2YyJU9MbEIU",
            filename: filename,
            data: convertToCSV(trials)
        })
    }).then(function(r) { return r.json(); })
      .then(function(result) { console.log("DataPipe OK (scene " + sceneNum + "):", JSON.stringify(result)); })
      .catch(function(e) { console.error("DataPipe failed (scene " + sceneNum + "):", e); });
    // the Routine "Save_Interim_Results" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var ExitMaxDurationReached;
var _key_resp_2_allKeys;
var ExitMaxDuration;
var ExitComponents;
function ExitRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Exit' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // keep track of whether this Routine was forcibly ended
    routineForceEnded = false;
    ExitClock.reset();
    routineTimer.reset();
    ExitMaxDurationReached = false;
    // update component parameters for each repeat
    key_resp_2.keys = undefined;
    key_resp_2.rt = undefined;
    _key_resp_2_allKeys = [];
    psychoJS.experiment.addData('Exit.started', globalClock.getTime());
    ExitMaxDuration = null
    // keep track of which components have finished
    ExitComponents = [];
    ExitComponents.push(exit_message);
    ExitComponents.push(key_resp_2);
    
    ExitComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function ExitRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Exit' ---
    // get current time
    t = ExitClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *exit_message* updates
    if (t >= 0.0 && exit_message.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      exit_message.tStart = t;  // (not accounting for frame time here)
      exit_message.frameNStart = frameN;  // exact frame index
      
      exit_message.setAutoDraw(true);
    }
    
    
    // if exit_message is active this frame...
    if (exit_message.status === PsychoJS.Status.STARTED) {
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
    
    // if key_resp_2 is active this frame...
    if (key_resp_2.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_2.getKeys({
        keyList: typeof 'space' === 'string' ? ['space'] : 'space', 
        waitRelease: false
      });
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
      routineForceEnded = true;
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    ExitComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var csv;
function ExitRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Exit' ---
    ExitComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('Exit.stopped', globalClock.getTime());
    psychoJS._saveResults = 0;
    
    let csv = psychoJS.experiment._trialsData
        .map(row => Object.values(row).join(","))
        .join("\n");
    
    // header (important if you want readable CSV)
    let headers = Object.keys(psychoJS.experiment._trialsData[0] || {});
    csv = headers.join(",") + "\n" + csv;
    
    // filename must be unique
    let filename =
        psychoJS.experiment.extraInfo.participant +
        "_" +
        Date.now() +
        ".csv";
        
    fetch("https://pipe.jspsych.org/api/data/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "*/*"
        },
        body: JSON.stringify({
            experimentID: "H2YyJU9MbEIU",
            filename: filename,
            data: csv
        })
    });
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
    // the Routine "Exit" was not non-slip safe, so reset the non-slip timer
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

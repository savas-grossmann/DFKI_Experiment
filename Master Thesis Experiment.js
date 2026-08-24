/********************************* 
 * Master Thesis Experiment *
 *********************************/

import { core, data, sound, util, visual, hardware } from './lib/psychojs-2026.1.3.js';
const { PsychoJS } = core;
const { TrialHandler, MultiStairHandler } = data;
const { Scheduler } = util;
//some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;


// store info about the experiment session:
let expName = 'Master Thesis Experiment';  // from the Builder filename that created this script
let expInfo = {
    'Initials': '',
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
  units: 'norm',
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
flowScheduler.add(Download_ConsentRoutineBegin());
flowScheduler.add(Download_ConsentRoutineEachFrame());
flowScheduler.add(Download_ConsentRoutineEnd());
flowScheduler.add(InstructionsRoutineBegin());
flowScheduler.add(InstructionsRoutineEachFrame());
flowScheduler.add(InstructionsRoutineEnd());
flowScheduler.add(Condition_LoadingRoutineBegin());
flowScheduler.add(Condition_LoadingRoutineEachFrame());
flowScheduler.add(Condition_LoadingRoutineEnd());
const Scene_LoopLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(Scene_LoopLoopBegin(Scene_LoopLoopScheduler));
flowScheduler.add(Scene_LoopLoopScheduler);
flowScheduler.add(Scene_LoopLoopEnd);








const IAT_instruction_pagesLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(IAT_instruction_pagesLoopBegin(IAT_instruction_pagesLoopScheduler));
flowScheduler.add(IAT_instruction_pagesLoopScheduler);
flowScheduler.add(IAT_instruction_pagesLoopEnd);


const IAT_blocksLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(IAT_blocksLoopBegin(IAT_blocksLoopScheduler));
flowScheduler.add(IAT_blocksLoopScheduler);
flowScheduler.add(IAT_blocksLoopEnd);






flowScheduler.add(QuestionnaireRoutineBegin());
flowScheduler.add(QuestionnaireRoutineEachFrame());
flowScheduler.add(QuestionnaireRoutineEnd());
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
    {'name': 'resources/iat/instructs.xlsx', 'path': 'resources/iat/instructs.xlsx'},
    {'name': 'resources/iat/blocks_order.xlsx', 'path': 'resources/iat/blocks_order.xlsx'},
    {'name': 'resources/iat/pos_neg_train.xlsx', 'path': 'resources/iat/pos_neg_train.xlsx'},
    {'name': 'resources/iat/stimuli/blank.png', 'path': 'resources/iat/stimuli/blank.png'},
    {'name': 'resources/iat/cong_train.xlsx', 'path': 'resources/iat/cong_train.xlsx'},
    {'name': 'resources/iat/cong_test.xlsx', 'path': 'resources/iat/cong_test.xlsx'},
    {'name': 'resources/iat/incong_train.xlsx', 'path': 'resources/iat/incong_train.xlsx'},
    {'name': 'resources/iat/incong_test.xlsx', 'path': 'resources/iat/incong_test.xlsx'},
    {'name': 'default.png', 'path': 'https://pavlovia.org/assets/default/default.png'},
    {'name': 'resources/documents/consent_form.pdf', 'path': 'resources/documents/consent_form.pdf'},
    {'name': 'resources/scenes/male/Auto_M.jpg', 'path': 'resources/scenes/male/Auto_M.jpg'},
    {'name': 'resources/scenes/male/Bankautomat_M.jpg', 'path': 'resources/scenes/male/Bankautomat_M.jpg'},
    {'name': 'resources/scenes/male/Baseballschlaeger_M.jpg', 'path': 'resources/scenes/male/Baseballschlaeger_M.jpg'},
    {'name': 'resources/scenes/male/Briefkasten_M.jpg', 'path': 'resources/scenes/male/Briefkasten_M.jpg'},
    {'name': 'resources/scenes/male/Diebstahl_M.jpg', 'path': 'resources/scenes/male/Diebstahl_M.jpg'},
    {'name': 'resources/scenes/male/Einbruch_M.jpg', 'path': 'resources/scenes/male/Einbruch_M.jpg'},
    {'name': 'resources/scenes/male/Fahrrad_M.jpg', 'path': 'resources/scenes/male/Fahrrad_M.jpg'},
    {'name': 'resources/scenes/male/Gasse_M.jpg', 'path': 'resources/scenes/male/Gasse_M.jpg'},
    {'name': 'resources/scenes/male/Juwelier_M.jpg', 'path': 'resources/scenes/male/Juwelier_M.jpg'},
    {'name': 'resources/scenes/male/Ladenverlassen_M.jpg', 'path': 'resources/scenes/male/Ladenverlassen_M.jpg'},
    {'name': 'resources/scenes/male/Lebensmittelladen_M.jpg', 'path': 'resources/scenes/male/Lebensmittelladen_M.jpg'},
    {'name': 'resources/scenes/male/Loesegeld_M.jpg', 'path': 'resources/scenes/male/Loesegeld_M.jpg'},
    {'name': 'resources/scenes/male/Motorrad_M.jpg', 'path': 'resources/scenes/male/Motorrad_M.jpg'},
    {'name': 'resources/scenes/male/Park_M.jpg', 'path': 'resources/scenes/male/Park_M.jpg'},
    {'name': 'resources/scenes/male/Party_M.jpg', 'path': 'resources/scenes/male/Party_M.jpg'},
    {'name': 'resources/scenes/male/Reifen_M.jpg', 'path': 'resources/scenes/male/Reifen_M.jpg'},
    {'name': 'resources/scenes/male/Terasse_M.jpg', 'path': 'resources/scenes/male/Terasse_M.jpg'},
    {'name': 'resources/scenes/male/Vandalismus_M.jpg', 'path': 'resources/scenes/male/Vandalismus_M.jpg'},
    {'name': 'resources/scenes/male/Wohnung_M.jpg', 'path': 'resources/scenes/male/Wohnung_M.jpg'},
    {'name': 'resources/scenes/male/Zug_M.jpg', 'path': 'resources/scenes/male/Zug_M.jpg'},
    {'name': 'resources/scenes/female/Auto_F.jpg', 'path': 'resources/scenes/female/Auto_F.jpg'},
    {'name': 'resources/scenes/female/Bankautomat_F.jpg', 'path': 'resources/scenes/female/Bankautomat_F.jpg'},
    {'name': 'resources/scenes/female/Baseballschlaeger_F.jpg', 'path': 'resources/scenes/female/Baseballschlaeger_F.jpg'},
    {'name': 'resources/scenes/female/Briefkasten_F.jpg', 'path': 'resources/scenes/female/Briefkasten_F.jpg'},
    {'name': 'resources/scenes/female/Diebstahl_F.jpg', 'path': 'resources/scenes/female/Diebstahl_F.jpg'},
    {'name': 'resources/scenes/female/Einbruch_F.jpg', 'path': 'resources/scenes/female/Einbruch_F.jpg'},
    {'name': 'resources/scenes/female/Fahrrad_F.jpg', 'path': 'resources/scenes/female/Fahrrad_F.jpg'},
    {'name': 'resources/scenes/female/Gasse_F.jpg', 'path': 'resources/scenes/female/Gasse_F.jpg'},
    {'name': 'resources/scenes/female/Juwelier_F.jpg', 'path': 'resources/scenes/female/Juwelier_F.jpg'},
    {'name': 'resources/scenes/female/Ladenverlassen_F.jpg', 'path': 'resources/scenes/female/Ladenverlassen_F.jpg'},
    {'name': 'resources/scenes/female/Lebensmittelladen_F.jpg', 'path': 'resources/scenes/female/Lebensmittelladen_F.jpg'},
    {'name': 'resources/scenes/female/Loesegeld_F.jpg', 'path': 'resources/scenes/female/Loesegeld_F.jpg'},
    {'name': 'resources/scenes/female/Motorrad_F.jpg', 'path': 'resources/scenes/female/Motorrad_F.jpg'},
    {'name': 'resources/scenes/female/Park_F.jpg', 'path': 'resources/scenes/female/Park_F.jpg'},
    {'name': 'resources/scenes/female/Party_F.jpg', 'path': 'resources/scenes/female/Party_F.jpg'},
    {'name': 'resources/scenes/female/Reifen_F.jpg', 'path': 'resources/scenes/female/Reifen_F.jpg'},
    {'name': 'resources/scenes/female/Terasse_F.jpg', 'path': 'resources/scenes/female/Terasse_F.jpg'},
    {'name': 'resources/scenes/female/Vandalismus_F.jpg', 'path': 'resources/scenes/female/Vandalismus_F.jpg'},
    {'name': 'resources/scenes/female/Wohnung_F.jpg', 'path': 'resources/scenes/female/Wohnung_F.jpg'},
    {'name': 'resources/scenes/female/Zug_F.jpg', 'path': 'resources/scenes/female/Zug_F.jpg'},
    {'name': 'resources/scenes/male/Auto_M.jpg', 'path': 'resources/scenes/male/Auto_M.jpg'},
    {'name': 'resources/iat/stimuli/blank.png', 'path': 'resources/iat/stimuli/blank.png'},
    {'name': 'resources/iat/blocks_order.xlsx', 'path': 'resources/iat/blocks_order.xlsx'},
    {'name': 'resources/iat/cong_test.xlsx', 'path': 'resources/iat/cong_test.xlsx'},
    {'name': 'resources/iat/cong_train.xlsx', 'path': 'resources/iat/cong_train.xlsx'},
    {'name': 'resources/iat/incong_test.xlsx', 'path': 'resources/iat/incong_test.xlsx'},
    {'name': 'resources/iat/incong_train.xlsx', 'path': 'resources/iat/incong_train.xlsx'},
    {'name': 'resources/iat/instructs.xlsx', 'path': 'resources/iat/instructs.xlsx'},
    {'name': 'resources/iat/pos_neg_train.xlsx', 'path': 'resources/iat/pos_neg_train.xlsx'},
    {'name': 'resources/conditions/condition_0.xlsx', 'path': 'resources/conditions/condition_0.xlsx'},
    {'name': 'resources/conditions/condition_1.xlsx', 'path': 'resources/conditions/condition_1.xlsx'},
    {'name': 'resources/conditions/condition_2.xlsx', 'path': 'resources/conditions/condition_2.xlsx'},
    {'name': 'resources/conditions/condition_3.xlsx', 'path': 'resources/conditions/condition_3.xlsx'},
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
  

  
  psychoJS.experiment.dataFileName = (("." + "/") + `data//${expInfo["Initials"]}_${expName}_${expInfo["date"]}`);
  psychoJS.experiment.field_separator = '\t';


  return Scheduler.Event.NEXT;
}


var Download_ConsentClock;
var InstructionsClock;
var instruction_text;
var key_resp;
var Condition_LoadingClock;
var wait_text;
var Scene_PresentationClock;
var scene_description;
var scene_image;
var key_resp_scene;
var Scene_DescriptionClock;
var task_description;
var response_box;
var key_resp_description;
var hint_text;
var load_scene_facesClock;
var wait_text_2;
var facesReady;
var currentSceneFaceResources;
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
var IAT_instructionsClock;
var instructs_text;
var instruct_done;
var instr_done_button;
var instr_done_label;
var instr_done_touch;
var IAT_readyClock;
var main_ready_msg;
var button_L;
var ready_label_L;
var button_R;
var ready_label_R;
var ready_done_mouse;
var ready_done;
var IAT_trialClock;
var fixation;
var text_stim;
var key_resp_3;
var touch_resp;
var button_left;
var trial_label_left;
var button_right;
var trial_label_right;
var IAT_feedbackClock;
var feedback_msg;
var QuestionnaireClock;
var ExitClock;
var exit_message;
var key_resp_2;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "Download_Consent"
  Download_ConsentClock = new util.Clock();
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
  
  // Initialize components for Routine "Condition_Loading"
  Condition_LoadingClock = new util.Clock();
  wait_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'wait_text',
    text: 'Please wait a moment while the experiment is being prepared. You will be forwarded automatically.',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], draggable: false, height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  // Initialize components for Routine "Scene_Presentation"
  Scene_PresentationClock = new util.Clock();
  scene_description = new visual.TextStim({
    win: psychoJS.window,
    name: 'scene_description',
    text: '',
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
    image : 'default.png', mask : undefined,
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
  
  key_resp_description = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  hint_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'hint_text',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, (- 0.35)], draggable: false, height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -3.0 
  });
  
  // Initialize components for Routine "load_scene_faces"
  load_scene_facesClock = new util.Clock();
  wait_text_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'wait_text_2',
    text: 'Loading Faces...',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], draggable: false, height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  facesReady = false;
  currentSceneFaceResources = [];
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
    depth: -1.0 
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
    depth: -2.0 
  });
  
  image_1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'image_1', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, 
    pos : [(- 0.75), (- 0.25)], 
    draggable: true,
    size : 0.25,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  image_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'image_2', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, 
    pos : [(- 0.45), (- 0.25)], 
    draggable: true,
    size : 0.25,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
  });
  image_3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'image_3', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, 
    pos : [(- 0.15), (- 0.25)], 
    draggable: true,
    size : 0.25,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -5.0 
  });
  image_4 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'image_4', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, 
    pos : [0.15, (- 0.25)], 
    draggable: true,
    size : 0.25,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -6.0 
  });
  image_5 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'image_5', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, 
    pos : [0.45, (- 0.25)], 
    draggable: true,
    size : 0.25,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -7.0 
  });
  image_6 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'image_6', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, 
    pos : [0.75, (- 0.25)], 
    draggable: true,
    size : 0.25,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -8.0 
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
    depth: -9, 
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
    depth: -10, 
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
    depth: -11, 
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
    depth: -12, 
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
    depth: -13, 
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
    depth: -14, 
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
    depth: -18.0 
  });
  
  finish_ranking_key = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  finish_ranking_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'finish_ranking_text',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [(- 0.1), (- 0.35)], draggable: false, height: 0.025,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -21.0 
  });
  
  // Initialize components for Routine "Save_Interim_Results"
  Save_Interim_ResultsClock = new util.Clock();
  // Initialize components for Routine "IAT_instructions"
  IAT_instructionsClock = new util.Clock();
  instructs_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'instructs_text',
    text: '',
    font: 'Arial',
    units: 'height', 
    pos: [0, 0], draggable: false, height: 0.03,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  instruct_done = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  instr_done_button = new visual.Rect ({
    win: psychoJS.window, name: 'instr_done_button', units : 'height', 
    width: [0.4, 0.1][0], height: [0.4, 0.1][1],
    ori: 0, 
    pos: [0, (- 0.4)], 
    draggable: false, 
    anchor: 'center', 
    lineWidth: 1, 
    lineColor: new util.Color('darkgreen'), 
    fillColor: new util.Color('lightgreen'), 
    colorSpace: 'rgb', 
    opacity: 1, 
    depth: -2, 
    interpolate: true, 
  });
  
  instr_done_label = new visual.TextStim({
    win: psychoJS.window,
    name: 'instr_done_label',
    text: 'Next...',
    font: 'Arial',
    units: 'height', 
    pos: [0, (- 0.4)], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color('darkgreen'),  opacity: 1,
    depth: -3.0 
  });
  
  instr_done_touch = new core.Mouse({
    win: psychoJS.window,
  });
  instr_done_touch.mouseClock = new util.Clock();
  // Initialize components for Routine "IAT_ready"
  IAT_readyClock = new util.Clock();
  main_ready_msg = new visual.TextStim({
    win: psychoJS.window,
    name: 'main_ready_msg',
    text: 'Take note of the categories below\n \nPosition your index fingers \n \nPress the space bar (or one of the green buttons) to begin',
    font: 'Arial',
    units: 'height', 
    pos: [0, 0], draggable: false, height: 0.03,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  button_L = new visual.Rect ({
    win: psychoJS.window, name: 'button_L', units : 'height', 
    width: [0.4, 0.2][0], height: [0.4, 0.2][1],
    ori: 0, 
    pos: [(- 0.4), (- 0.3)], 
    draggable: false, 
    anchor: 'center', 
    lineWidth: 1, 
    lineColor: new util.Color('darkgreen'), 
    fillColor: new util.Color('lightgreen'), 
    colorSpace: 'rgb', 
    opacity: 1, 
    depth: -1, 
    interpolate: true, 
  });
  
  ready_label_L = new visual.TextStim({
    win: psychoJS.window,
    name: 'ready_label_L',
    text: '',
    font: 'Arial',
    units: 'height', 
    pos: [(- 0.4), (- 0.3)], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color('darkgreen'),  opacity: 1,
    depth: -2.0 
  });
  
  button_R = new visual.Rect ({
    win: psychoJS.window, name: 'button_R', units : 'height', 
    width: [0.4, 0.2][0], height: [0.4, 0.2][1],
    ori: 0, 
    pos: [0.4, (- 0.3)], 
    draggable: false, 
    anchor: 'center', 
    lineWidth: 1, 
    lineColor: new util.Color('darkgreen'), 
    fillColor: new util.Color('lightgreen'), 
    colorSpace: 'rgb', 
    opacity: 1, 
    depth: -3, 
    interpolate: true, 
  });
  
  ready_label_R = new visual.TextStim({
    win: psychoJS.window,
    name: 'ready_label_R',
    text: '',
    font: 'Arial',
    units: 'height', 
    pos: [0.4, (- 0.3)], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color('darkgreen'),  opacity: 1,
    depth: -4.0 
  });
  
  ready_done_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  ready_done_mouse.mouseClock = new util.Clock();
  ready_done = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "IAT_trial"
  IAT_trialClock = new util.Clock();
  fixation = new visual.TextStim({
    win: psychoJS.window,
    name: 'fixation',
    text: '+',
    font: 'Arial',
    units: 'height', 
    pos: [0, 0], draggable: false, height: 0.1,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  text_stim = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_stim',
    text: '',
    font: 'Arial',
    units: 'height', 
    pos: [0, 0], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  key_resp_3 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  touch_resp = new core.Mouse({
    win: psychoJS.window,
  });
  touch_resp.mouseClock = new util.Clock();
  button_left = new visual.Rect ({
    win: psychoJS.window, name: 'button_left', units : 'height', 
    width: [0.4, 0.2][0], height: [0.4, 0.2][1],
    ori: 0, 
    pos: [(- 0.4), (- 0.3)], 
    draggable: false, 
    anchor: 'center', 
    lineWidth: 1, 
    lineColor: new util.Color('darkgreen'), 
    fillColor: new util.Color('lightgreen'), 
    colorSpace: 'rgb', 
    opacity: 1, 
    depth: -5, 
    interpolate: true, 
  });
  
  trial_label_left = new visual.TextStim({
    win: psychoJS.window,
    name: 'trial_label_left',
    text: '',
    font: 'Arial',
    units: 'height', 
    pos: [(- 0.4), (- 0.3)], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color('darkgreen'),  opacity: 1,
    depth: -6.0 
  });
  
  button_right = new visual.Rect ({
    win: psychoJS.window, name: 'button_right', units : 'height', 
    width: [0.4, 0.2][0], height: [0.4, 0.2][1],
    ori: 0, 
    pos: [0.4, (- 0.3)], 
    draggable: false, 
    anchor: 'center', 
    lineWidth: 1, 
    lineColor: new util.Color('darkgreen'), 
    fillColor: new util.Color('lightgreen'), 
    colorSpace: 'rgb', 
    opacity: 1, 
    depth: -7, 
    interpolate: true, 
  });
  
  trial_label_right = new visual.TextStim({
    win: psychoJS.window,
    name: 'trial_label_right',
    text: '',
    font: 'Arial',
    units: 'height', 
    pos: [0.4, (- 0.3)], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color('darkgreen'),  opacity: 1,
    depth: -8.0 
  });
  
  // Initialize components for Routine "IAT_feedback"
  IAT_feedbackClock = new util.Clock();
  feedback_msg = new visual.TextStim({
    win: psychoJS.window,
    name: 'feedback_msg',
    text: '',
    font: 'Arial',
    units: 'height', 
    pos: [0, 0], draggable: false, height: 0.1,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  // Initialize components for Routine "Questionnaire"
  QuestionnaireClock = new util.Clock();
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
var Download_ConsentMaxDurationReached;
var consentDone;
var consentDownloadClicked;
var Download_ConsentMaxDuration;
var Download_ConsentComponents;
function Download_ConsentRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Download_Consent' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // keep track of whether this Routine was forcibly ended
    routineForceEnded = false;
    Download_ConsentClock.reset();
    routineTimer.reset();
    Download_ConsentMaxDurationReached = false;
    // update component parameters for each repeat
    psychoJS.window._renderer.view.style.display = 'none';
    
    var overlay = document.createElement('div');
    overlay.id = 'consent-download-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#000;display:flex;align-items:center;justify-content:center;z-index:9999;';
    
    overlay.innerHTML = '\
    <div style="background:#222;padding:40px;border-radius:8px;color:white;font-family:Arial;max-width:500px;text-align:center;">\
      <h2 style="margin-top:0;">Consent Form</h2>\
      <p>Please download the consent form below, sign it, and email the signed copy to email@dfki.com</strong> before continuing.</p>\
      <a id="consent-download-link" href="resources/documents/consent_form.pdf" download="consent_form.pdf" \
         style="display:inline-block;margin:20px 0;padding:12px 24px;background:#4CAF50;color:white;text-decoration:none;border-radius:4px;font-size:16px;">\
         Download Consent Form\
      </a>\
      <br>\
      <button id="consent-continue" style="margin-top:20px;padding:12px 24px;background:darkgrey;color:white;border:none;border-radius:4px;font-size:16px;cursor:pointer;">\
        I have downloaded and will email the form - Continue\
      </button>\
    </div>';
    
    document.body.appendChild(overlay);
    
    consentDone = false;
    consentDownloadClicked = false;
    
    document.getElementById('consent-download-link').addEventListener('click', function () {
        consentDownloadClicked = true;
    });
    
    document.getElementById('consent-continue').addEventListener('click', function () {
        document.body.removeChild(overlay);
        psychoJS.window._renderer.view.style.display = 'block';
        consentDone = true;
    });
    psychoJS.experiment.addData('Download_Consent.started', globalClock.getTime());
    Download_ConsentMaxDuration = null
    // keep track of which components have finished
    Download_ConsentComponents = [];
    
    for (const thisComponent of Download_ConsentComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function Download_ConsentRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Download_Consent' ---
    // get current time
    t = Download_ConsentClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    if (consentDone) {
        continueRoutine = false;
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
    for (const thisComponent of Download_ConsentComponents)
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


function Download_ConsentRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Download_Consent' ---
    for (const thisComponent of Download_ConsentComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('Download_Consent.stopped', globalClock.getTime());
    psychoJS.window._renderer.view.style.display = 'block';
    psychoJS.experiment.addData('consent_download_clicked', true);
    // the Routine "Download_Consent" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


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
    
    for (const thisComponent of InstructionsComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of InstructionsComponents)
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


function InstructionsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Instructions' ---
    for (const thisComponent of InstructionsComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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


var Condition_LoadingMaxDurationReached;
var conditionReady;
var condition;
var conditionsFile;
var Condition_LoadingMaxDuration;
var Condition_LoadingComponents;
function Condition_LoadingRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Condition_Loading' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // keep track of whether this Routine was forcibly ended
    routineForceEnded = false;
    Condition_LoadingClock.reset();
    routineTimer.reset();
    Condition_LoadingMaxDurationReached = false;
    // update component parameters for each repeat
    conditionReady = false;
    condition = null;
    conditionsFile = null;
    
    fetch(
        "https://pipe.jspsych.org/api/condition/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({
                experimentID: "H2YyJU9MbEIU"
            })
        }
    )
    .then(response => response.json())
    .then(data => {
        condition = data.condition;
        conditionsFile = `resources/conditions/condition_${condition}.xlsx`;
    
        console.log("Condition:", condition);
        conditionReady = true;
        console.log("DEBUG condition:", condition, "conditionsFile:", conditionsFile);
    })
    .catch(error => {
        console.error("Condition request failed:", error);
        condition = 1;
        conditionsFile = `resources/conditions/condition_${condition}.xlsx`;
        conditionReady = true;
    });
    psychoJS.experiment.addData('Condition_Loading.started', globalClock.getTime());
    Condition_LoadingMaxDuration = null
    // keep track of which components have finished
    Condition_LoadingComponents = [];
    Condition_LoadingComponents.push(wait_text);
    
    for (const thisComponent of Condition_LoadingComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function Condition_LoadingRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Condition_Loading' ---
    // get current time
    t = Condition_LoadingClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *wait_text* updates
    if (t >= 0.0 && wait_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      wait_text.tStart = t;  // (not accounting for frame time here)
      wait_text.frameNStart = frameN;  // exact frame index
      
      wait_text.setAutoDraw(true);
    }
    
    
    // if wait_text is active this frame...
    if (wait_text.status === PsychoJS.Status.STARTED) {
    }
    
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
        return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    if (conditionReady) {
        return Scheduler.Event.NEXT;
    } else {
        return Scheduler.Event.FLIP_REPEAT;
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
    for (const thisComponent of Condition_LoadingComponents)
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


function Condition_LoadingRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Condition_Loading' ---
    for (const thisComponent of Condition_LoadingComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('Condition_Loading.stopped', globalClock.getTime());
    console.log("Resource cache entry:", psychoJS.serverManager._resources.get(conditionsFile));
    // the Routine "Condition_Loading" was not non-slip safe, so reset the non-slip timer
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
      trialList: conditionsFile,
      seed: undefined, name: 'Scene_Loop'
    });
    psychoJS.experiment.addLoop(Scene_Loop); // add the loop to the experiment
    currentLoop = Scene_Loop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisScene_Loop of Scene_Loop) {
      snapshot = Scene_Loop.getSnapshot();
      Scene_LoopLoopScheduler.add(importConditions(snapshot));
      Scene_LoopLoopScheduler.add(Scene_PresentationRoutineBegin(snapshot));
      Scene_LoopLoopScheduler.add(Scene_PresentationRoutineEachFrame());
      Scene_LoopLoopScheduler.add(Scene_PresentationRoutineEnd(snapshot));
      Scene_LoopLoopScheduler.add(Scene_DescriptionRoutineBegin(snapshot));
      Scene_LoopLoopScheduler.add(Scene_DescriptionRoutineEachFrame());
      Scene_LoopLoopScheduler.add(Scene_DescriptionRoutineEnd(snapshot));
      Scene_LoopLoopScheduler.add(load_scene_facesRoutineBegin(snapshot));
      Scene_LoopLoopScheduler.add(load_scene_facesRoutineEachFrame());
      Scene_LoopLoopScheduler.add(load_scene_facesRoutineEnd(snapshot));
      const Face_Ranking_LoopLoopScheduler = new Scheduler(psychoJS);
      Scene_LoopLoopScheduler.add(Face_Ranking_LoopLoopBegin(Face_Ranking_LoopLoopScheduler, snapshot));
      Scene_LoopLoopScheduler.add(Face_Ranking_LoopLoopScheduler);
      Scene_LoopLoopScheduler.add(Face_Ranking_LoopLoopEnd);
      Scene_LoopLoopScheduler.add(Save_Interim_ResultsRoutineBegin(snapshot));
      Scene_LoopLoopScheduler.add(Save_Interim_ResultsRoutineEachFrame());
      Scene_LoopLoopScheduler.add(Save_Interim_ResultsRoutineEnd(snapshot));
      Scene_LoopLoopScheduler.add(Scene_LoopLoopEndIteration(Scene_LoopLoopScheduler, snapshot));
    }
    
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
    for (const thisFace_Ranking_Loop of Face_Ranking_Loop) {
      snapshot = Face_Ranking_Loop.getSnapshot();
      Face_Ranking_LoopLoopScheduler.add(importConditions(snapshot));
      Face_Ranking_LoopLoopScheduler.add(Face_RankingRoutineBegin(snapshot));
      Face_Ranking_LoopLoopScheduler.add(Face_RankingRoutineEachFrame());
      Face_Ranking_LoopLoopScheduler.add(Face_RankingRoutineEnd(snapshot));
      Face_Ranking_LoopLoopScheduler.add(Face_Ranking_LoopLoopEndIteration(Face_Ranking_LoopLoopScheduler, snapshot));
    }
    
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


var IAT_instruction_pages;
function IAT_instruction_pagesLoopBegin(IAT_instruction_pagesLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    IAT_instruction_pages = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: 'resources/iat/instructs.xlsx',
      seed: undefined, name: 'IAT_instruction_pages'
    });
    psychoJS.experiment.addLoop(IAT_instruction_pages); // add the loop to the experiment
    currentLoop = IAT_instruction_pages;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisIAT_instruction_page of IAT_instruction_pages) {
      snapshot = IAT_instruction_pages.getSnapshot();
      IAT_instruction_pagesLoopScheduler.add(importConditions(snapshot));
      IAT_instruction_pagesLoopScheduler.add(IAT_instructionsRoutineBegin(snapshot));
      IAT_instruction_pagesLoopScheduler.add(IAT_instructionsRoutineEachFrame());
      IAT_instruction_pagesLoopScheduler.add(IAT_instructionsRoutineEnd(snapshot));
      IAT_instruction_pagesLoopScheduler.add(IAT_instruction_pagesLoopEndIteration(IAT_instruction_pagesLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function IAT_instruction_pagesLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(IAT_instruction_pages);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function IAT_instruction_pagesLoopEndIteration(scheduler, snapshot) {
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


var IAT_blocks;
function IAT_blocksLoopBegin(IAT_blocksLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    IAT_blocks = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: 'resources/iat/blocks_order.xlsx',
      seed: undefined, name: 'IAT_blocks'
    });
    psychoJS.experiment.addLoop(IAT_blocks); // add the loop to the experiment
    currentLoop = IAT_blocks;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisIAT_block of IAT_blocks) {
      snapshot = IAT_blocks.getSnapshot();
      IAT_blocksLoopScheduler.add(importConditions(snapshot));
      IAT_blocksLoopScheduler.add(IAT_readyRoutineBegin(snapshot));
      IAT_blocksLoopScheduler.add(IAT_readyRoutineEachFrame());
      IAT_blocksLoopScheduler.add(IAT_readyRoutineEnd(snapshot));
      const IAT_trialsLoopScheduler = new Scheduler(psychoJS);
      IAT_blocksLoopScheduler.add(IAT_trialsLoopBegin(IAT_trialsLoopScheduler, snapshot));
      IAT_blocksLoopScheduler.add(IAT_trialsLoopScheduler);
      IAT_blocksLoopScheduler.add(IAT_trialsLoopEnd);
      IAT_blocksLoopScheduler.add(IAT_blocksLoopEndIteration(IAT_blocksLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


var IAT_trials;
function IAT_trialsLoopBegin(IAT_trialsLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    IAT_trials = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: conds_file,
      seed: undefined, name: 'IAT_trials'
    });
    psychoJS.experiment.addLoop(IAT_trials); // add the loop to the experiment
    currentLoop = IAT_trials;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisIAT_trial of IAT_trials) {
      snapshot = IAT_trials.getSnapshot();
      IAT_trialsLoopScheduler.add(importConditions(snapshot));
      IAT_trialsLoopScheduler.add(IAT_trialRoutineBegin(snapshot));
      IAT_trialsLoopScheduler.add(IAT_trialRoutineEachFrame());
      IAT_trialsLoopScheduler.add(IAT_trialRoutineEnd(snapshot));
      IAT_trialsLoopScheduler.add(IAT_feedbackRoutineBegin(snapshot));
      IAT_trialsLoopScheduler.add(IAT_feedbackRoutineEachFrame());
      IAT_trialsLoopScheduler.add(IAT_feedbackRoutineEnd(snapshot));
      IAT_trialsLoopScheduler.add(IAT_trialsLoopEndIteration(IAT_trialsLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function IAT_trialsLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(IAT_trials);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function IAT_trialsLoopEndIteration(scheduler, snapshot) {
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


async function IAT_blocksLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(IAT_blocks);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function IAT_blocksLoopEndIteration(scheduler, snapshot) {
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
    scene_description.setText(context_text);
    scene_image.setImage(((("resources/scenes/" + gender) + "/") + image_path));
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
    
    for (const thisComponent of Scene_PresentationComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of Scene_PresentationComponents)
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


function Scene_PresentationRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Scene_Presentation' ---
    for (const thisComponent of Scene_PresentationComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    psychoJS.experiment.addData('Scene_Presentation.duration', Scene_PresentationClock.getTime());
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
var _key_resp_description_allKeys;
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
    key_resp_description.keys = undefined;
    key_resp_description.rt = undefined;
    _key_resp_description_allKeys = [];
    psychoJS.experiment.addData('Scene_Description.started', globalClock.getTime());
    Scene_DescriptionMaxDuration = null
    // keep track of which components have finished
    Scene_DescriptionComponents = [];
    Scene_DescriptionComponents.push(task_description);
    Scene_DescriptionComponents.push(response_box);
    Scene_DescriptionComponents.push(key_resp_description);
    Scene_DescriptionComponents.push(hint_text);
    
    for (const thisComponent of Scene_DescriptionComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    
    
    // *key_resp_description* updates
    if (t >= 0.0 && key_resp_description.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_description.tStart = t;  // (not accounting for frame time here)
      key_resp_description.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_description.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_description.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_description.clearEvents(); });
    }
    
    // if key_resp_description is active this frame...
    if (key_resp_description.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_description.getKeys({
        keyList: typeof 'return' === 'string' ? ['return'] : 'return', 
        waitRelease: false
      });
      _key_resp_description_allKeys = _key_resp_description_allKeys.concat(theseKeys);
      if (_key_resp_description_allKeys.length > 0) {
        key_resp_description.keys = _key_resp_description_allKeys[_key_resp_description_allKeys.length - 1].name;  // just the last key pressed
        key_resp_description.rt = _key_resp_description_allKeys[_key_resp_description_allKeys.length - 1].rt;
        key_resp_description.duration = _key_resp_description_allKeys[_key_resp_description_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *hint_text* updates
    if (t >= 0.0 && hint_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      hint_text.tStart = t;  // (not accounting for frame time here)
      hint_text.frameNStart = frameN;  // exact frame index
      
      hint_text.setAutoDraw(true);
    }
    
    
    // if hint_text is active this frame...
    if (hint_text.status === PsychoJS.Status.STARTED) {
    }
    
    // Run 'Each Frame' code from continue_description
    var text_length = (response_box.text) ? response_box.text.length : 0;
    
    if (key_resp_description.keys === 'return' && text_length < 50) {
        key_resp_description.keys = [];
        _key_resp_description_allKeys = [];
        continueRoutine = true;
    }
    
    hint_text.setText('Press ENTER to continue (' + text_length + '/50 characters)');
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
    for (const thisComponent of Scene_DescriptionComponents)
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


function Scene_DescriptionRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Scene_Description' ---
    for (const thisComponent of Scene_DescriptionComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('Scene_Description.stopped', globalClock.getTime());
    psychoJS.experiment.addData('response_box.text',response_box.text)
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_resp_description.corr, level);
    }
    psychoJS.experiment.addData('key_resp_description.keys', key_resp_description.keys);
    if (typeof key_resp_description.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_description.rt', key_resp_description.rt);
        psychoJS.experiment.addData('key_resp_description.duration', key_resp_description.duration);
        routineTimer.reset();
        }
    
    key_resp_description.stop();
    psychoJS.experiment.addData('Scene_Description.duration', Scene_DescriptionClock.getTime());
    // the Routine "Scene_Description" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var load_scene_facesMaxDurationReached;
var load_scene_facesMaxDuration;
var load_scene_facesComponents;
function load_scene_facesRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'load_scene_faces' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // keep track of whether this Routine was forcibly ended
    routineForceEnded = false;
    load_scene_facesClock.reset();
    routineTimer.reset();
    load_scene_facesMaxDurationReached = false;
    // update component parameters for each repeat
    var folders = [face_folder_1, face_folder_2, face_folder_3, face_folder_4,
                    face_folder_5, face_folder_6, face_folder_7, face_folder_8];
    
    currentSceneFaceResources = [];
    for (var f = 0; f < folders.length; f++) {
        for (var i = 1; i <= 6; i++) {
            var path = "resources/faces/" + gender + "/" + folders[f] + "/" + i + ".jpg";
            currentSceneFaceResources.push({ name: path, path: path });
        }
    }
    
    facesReady = false;
    psychoJS.serverManager.prepareResources(currentSceneFaceResources)
        .then(function () { facesReady = true; })
        .catch(function (e) {
            console.error("Face load failed:", e);
            facesReady = true;
        });
    psychoJS.experiment.addData('load_scene_faces.started', globalClock.getTime());
    load_scene_facesMaxDuration = null
    // keep track of which components have finished
    load_scene_facesComponents = [];
    load_scene_facesComponents.push(wait_text_2);
    
    for (const thisComponent of load_scene_facesComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function load_scene_facesRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'load_scene_faces' ---
    // get current time
    t = load_scene_facesClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *wait_text_2* updates
    if (t >= 0.0 && wait_text_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      wait_text_2.tStart = t;  // (not accounting for frame time here)
      wait_text_2.frameNStart = frameN;  // exact frame index
      
      wait_text_2.setAutoDraw(true);
    }
    
    
    // if wait_text_2 is active this frame...
    if (wait_text_2.status === PsychoJS.Status.STARTED) {
    }
    
    if (facesReady) {
        continueRoutine = false;
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
    for (const thisComponent of load_scene_facesComponents)
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


function load_scene_facesRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'load_scene_faces' ---
    for (const thisComponent of load_scene_facesComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('load_scene_faces.stopped', globalClock.getTime());
    // the Routine "load_scene_faces" was not non-slip safe, so reset the non-slip timer
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
    // Get the current repetition of Face_Ranking_Loop.
    // thisN is zero-based: 0, 1, 2, ..., 7.
    var faceNumber = Face_Ranking_Loop.thisN + 1;
    
    // Get the corresponding face-folder column from the condition file.
    var folderName = eval("face_folder_" + faceNumber);
    
    // Build the base directory.
    var faceBasePath = "resources/faces/" + gender + "/" + folderName + "/";
    
    // Build paths for the six faces.
    var face1Path = faceBasePath + "1.jpg";
    var face2Path = faceBasePath + "2.jpg";
    var face3Path = faceBasePath + "3.jpg";
    var face4Path = faceBasePath + "4.jpg";
    var face5Path = faceBasePath + "5.jpg";
    var face6Path = faceBasePath + "6.jpg";
    
    console.log("Face ranking:", faceNumber);
    console.log("Folder:", folderName);
    console.log("Faces:", face1Path, face2Path, face3Path, face4Path, face5Path, face6Path);
    image_1.setImage(face1Path);
    image_2.setImage(face2Path);
    image_3.setImage(face3Path);
    image_4.setImage(face4Path);
    image_5.setImage(face5Path);
    image_6.setImage(face6Path);
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
    
    for (const thisComponent of Face_RankingComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
        keyList: typeof 'return' === 'string' ? ['return'] : 'return', 
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
    if (finish_ranking_key.keys === 'return' && !submit_allowed) {
        finish_ranking_key.keys = [];
        _finish_ranking_key_allKeys = [];
        continueRoutine = true;
    }
    
    // *finish_ranking_text* updates
    if (t >= 999 && finish_ranking_text.status === PsychoJS.Status.NOT_STARTED) {
      // update params
      finish_ranking_text.setText('Press ENTER to finish the ranking', false);
      // keep track of start time/frame for later
      finish_ranking_text.tStart = t;  // (not accounting for frame time here)
      finish_ranking_text.frameNStart = frameN;  // exact frame index
      
      finish_ranking_text.setAutoDraw(true);
    }
    
    
    // if finish_ranking_text is active this frame...
    if (finish_ranking_text.status === PsychoJS.Status.STARTED) {
      // update params
      finish_ranking_text.setText('Press ENTER to finish the ranking', false);
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
    for (const thisComponent of Face_RankingComponents)
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


function Face_RankingRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Face_Ranking' ---
    for (const thisComponent of Face_RankingComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('Face_Ranking.stopped', globalClock.getTime());
    // Run 'End Routine' code from snap_pictures
    for (var i = 0; i < slotNames.length; i++) {
        var slotName = slotNames[i];
        if (occupiedSlots[slotName] !== undefined) {
            var imageNumber = occupiedSlots[slotName].name.replace("image_", "");
            psychoJS.experiment.addData(
                "rank_" + (i + 1),
                imageNumber + ".jpg"
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
    psychoJS.experiment.addData('Face_Ranking.duration', Face_RankingClock.getTime());
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
    
    for (const thisComponent of Save_Interim_ResultsComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of Save_Interim_ResultsComponents)
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


var allRows;
function Save_Interim_ResultsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Save_Interim_Results' ---
    for (const thisComponent of Save_Interim_ResultsComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('Save_Interim_Results.stopped', globalClock.getTime());
    // Run 'End Routine' code from save_interim_results
    // Collect data from ALL loops, not just _trialsData
    var allRows = [];
    
    // Get the experiment's entries including loop data
    var entries = psychoJS.experiment._trialsData;
    
    // Also try to get data from the experiment handler directly
    if (psychoJS.experiment.extraInfo) {
        var baseInfo = {};
        var ei = psychoJS.experiment.extraInfo;
        for (var key in ei) {
            if (ei.hasOwnProperty(key)) {
                baseInfo[key] = ei[key];
            }
        }
    }
    
    // Collect all data entries including loop data
    if (psychoJS.experiment._loops) {
        for (var li = 0; li < psychoJS.experiment._loops.length; li++) {
            var loop = psychoJS.experiment._loops[li];
            if (loop._trialsData) {
                for (var ri = 0; ri < loop._trialsData.length; ri++) {
                    allRows.push(loop._trialsData[ri]);
                }
            }
        }
    }
    
    // Fall back to _trialsData if loop collection yielded nothing
    if (allRows.length === 0 && entries && entries.length > 0) {
        allRows = entries;
    }
    
    // Merge with experiment-level entries
    if (entries && entries.length > 0) {
        for (var ei2 = 0; ei2 < entries.length; ei2++) {
            var found = false;
            for (var ai = 0; ai < allRows.length; ai++) {
                if (allRows[ai] === entries[ei2]) { found = true; break; }
            }
            if (!found) allRows.push(entries[ei2]);
        }
    }
    
    // Build CSV from all collected rows
    function convertToCSV(dataArray) {
        if (!dataArray || dataArray.length === 0) { return ""; }
        var allKeys = {};
        for (var i = 0; i < dataArray.length; i++) {
            var row = dataArray[i];
            for (var k in row) {
                if (row.hasOwnProperty(k)) allKeys[k] = true;
            }
        }
        var headers = Object.keys(allKeys);
        var rows = [headers.map(function(h) {
            return '"' + String(h).replace(/"/g, '""') + '"';
        }).join(',')];
        for (var i = 0; i < dataArray.length; i++) {
            var row = dataArray[i];
            var values = headers.map(function(h) {
                var val = (row[h] !== undefined && row[h] !== null) ? String(row[h]) : '';
                return '"' + val.replace(/"/g, '""') + '"';
            });
            rows.push(values.join(','));
        }
        return rows.join('\n');
    }
    
    var participantID = expInfo["participant"] || "unknown";
    var sceneNum = (Scene_Loop.thisN !== undefined ? Scene_Loop.thisN : 0) + 1;
    var filename = "participant_" + participantID + "_" + expName.replace(/ /g, "_") + "_scene_" + sceneNum + ".csv";
    
    var csvData = convertToCSV(allRows);
    
    fetch("https://pipe.jspsych.org/api/data/", {
        method: "POST",
        headers: {"Content-Type": "application/json", "Accept": "*/*"},
        body: JSON.stringify({
            experimentID: "H2YyJU9MbEIU",
            filename: filename,
            data: csvData
        })
    }).then(function(r) { return r.json(); })
      .then(function(result) {
          console.log("DataPipe OK (scene " + sceneNum + "):", JSON.stringify(result));
      })
      .catch(function(e) {
          console.error("DataPipe failed (scene " + sceneNum + "):", e);
      });
    // the Routine "Save_Interim_Results" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var IAT_instructionsMaxDurationReached;
var _instruct_done_allKeys;
var IAT_instructionsMaxDuration;
var IAT_instructionsComponents;
function IAT_instructionsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'IAT_instructions' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // keep track of whether this Routine was forcibly ended
    routineForceEnded = false;
    IAT_instructionsClock.reset();
    routineTimer.reset();
    IAT_instructionsMaxDurationReached = false;
    // update component parameters for each repeat
    instructs_text.setText(instruct_text);
    instruct_done.keys = undefined;
    instruct_done.rt = undefined;
    _instruct_done_allKeys = [];
    // setup some python lists for storing info about the instr_done_touch
    instr_done_touch.clicked_name = [];
    gotValidClick = false; // until a click is received
    psychoJS.experiment.addData('IAT_instructions.started', globalClock.getTime());
    IAT_instructionsMaxDuration = null
    // keep track of which components have finished
    IAT_instructionsComponents = [];
    IAT_instructionsComponents.push(instructs_text);
    IAT_instructionsComponents.push(instruct_done);
    IAT_instructionsComponents.push(instr_done_button);
    IAT_instructionsComponents.push(instr_done_label);
    IAT_instructionsComponents.push(instr_done_touch);
    
    for (const thisComponent of IAT_instructionsComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var prevButtonState;
var _mouseButtons;
function IAT_instructionsRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'IAT_instructions' ---
    // get current time
    t = IAT_instructionsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *instructs_text* updates
    if (t >= 0.0 && instructs_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instructs_text.tStart = t;  // (not accounting for frame time here)
      instructs_text.frameNStart = frameN;  // exact frame index
      
      instructs_text.setAutoDraw(true);
    }
    
    
    // if instructs_text is active this frame...
    if (instructs_text.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *instruct_done* updates
    if (t >= 0.0 && instruct_done.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instruct_done.tStart = t;  // (not accounting for frame time here)
      instruct_done.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { instruct_done.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { instruct_done.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { instruct_done.clearEvents(); });
    }
    
    // if instruct_done is active this frame...
    if (instruct_done.status === PsychoJS.Status.STARTED) {
      let theseKeys = instruct_done.getKeys({
        keyList: typeof 'space' === 'string' ? ['space'] : 'space', 
        waitRelease: false
      });
      _instruct_done_allKeys = _instruct_done_allKeys.concat(theseKeys);
      if (_instruct_done_allKeys.length > 0) {
        instruct_done.keys = _instruct_done_allKeys[_instruct_done_allKeys.length - 1].name;  // just the last key pressed
        instruct_done.rt = _instruct_done_allKeys[_instruct_done_allKeys.length - 1].rt;
        instruct_done.duration = _instruct_done_allKeys[_instruct_done_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *instr_done_button* updates
    if (t >= 0.0 && instr_done_button.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instr_done_button.tStart = t;  // (not accounting for frame time here)
      instr_done_button.frameNStart = frameN;  // exact frame index
      
      instr_done_button.setAutoDraw(true);
    }
    
    
    // if instr_done_button is active this frame...
    if (instr_done_button.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *instr_done_label* updates
    if (t >= 0.0 && instr_done_label.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instr_done_label.tStart = t;  // (not accounting for frame time here)
      instr_done_label.frameNStart = frameN;  // exact frame index
      
      instr_done_label.setAutoDraw(true);
    }
    
    
    // if instr_done_label is active this frame...
    if (instr_done_label.status === PsychoJS.Status.STARTED) {
    }
    
    // *instr_done_touch* updates
    if (t >= 0.0 && instr_done_touch.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instr_done_touch.tStart = t;  // (not accounting for frame time here)
      instr_done_touch.frameNStart = frameN;  // exact frame index
      
      instr_done_touch.status = PsychoJS.Status.STARTED;
      instr_done_touch.mouseClock.reset();
      prevButtonState = instr_done_touch.getPressed();  // if button is down already this ISN'T a new click
    }
    
    // if instr_done_touch is active this frame...
    if (instr_done_touch.status === PsychoJS.Status.STARTED) {
      _mouseButtons = instr_done_touch.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          instr_done_touch.clickableObjects = eval(instr_done_button)
          ;// make sure the mouse's clickable objects are an array
          if (!Array.isArray(instr_done_touch.clickableObjects)) {
              instr_done_touch.clickableObjects = [instr_done_touch.clickableObjects];
          }
          // iterate through clickable objects and check each
          for (const obj of instr_done_touch.clickableObjects) {
              if (obj.contains(instr_done_touch)) {
                  gotValidClick = true;
                  instr_done_touch.clicked_name.push(obj.name);
              }
          }
          if (!gotValidClick) {
              instr_done_touch.clicked_name.push(null);
          }
          if (gotValidClick === true) { // end routine on response
            continueRoutine = false;
          }
        }
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
    for (const thisComponent of IAT_instructionsComponents)
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


var _mouseXYs;
function IAT_instructionsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'IAT_instructions' ---
    for (const thisComponent of IAT_instructionsComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('IAT_instructions.stopped', globalClock.getTime());
    instruct_done.stop();
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = instr_done_touch.getPos();
    _mouseButtons = instr_done_touch.getPressed();
    psychoJS.experiment.addData('instr_done_touch.x', _mouseXYs[0]);
    psychoJS.experiment.addData('instr_done_touch.y', _mouseXYs[1]);
    psychoJS.experiment.addData('instr_done_touch.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('instr_done_touch.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('instr_done_touch.rightButton', _mouseButtons[2]);
    if (instr_done_touch.clicked_name.length > 0) {
      psychoJS.experiment.addData('instr_done_touch.clicked_name', instr_done_touch.clicked_name[0]);}
    // the Routine "IAT_instructions" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var IAT_readyMaxDurationReached;
var _ready_done_allKeys;
var IAT_readyMaxDuration;
var IAT_readyComponents;
function IAT_readyRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'IAT_ready' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // keep track of whether this Routine was forcibly ended
    routineForceEnded = false;
    IAT_readyClock.reset();
    routineTimer.reset();
    IAT_readyMaxDurationReached = false;
    // update component parameters for each repeat
    ready_label_L.setText(label_left);
    ready_label_R.setText(label_right);
    // setup some python lists for storing info about the ready_done_mouse
    ready_done_mouse.clicked_name = [];
    gotValidClick = false; // until a click is received
    ready_done.keys = undefined;
    ready_done.rt = undefined;
    _ready_done_allKeys = [];
    psychoJS.experiment.addData('IAT_ready.started', globalClock.getTime());
    IAT_readyMaxDuration = null
    // keep track of which components have finished
    IAT_readyComponents = [];
    IAT_readyComponents.push(main_ready_msg);
    IAT_readyComponents.push(button_L);
    IAT_readyComponents.push(ready_label_L);
    IAT_readyComponents.push(button_R);
    IAT_readyComponents.push(ready_label_R);
    IAT_readyComponents.push(ready_done_mouse);
    IAT_readyComponents.push(ready_done);
    
    for (const thisComponent of IAT_readyComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function IAT_readyRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'IAT_ready' ---
    // get current time
    t = IAT_readyClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *main_ready_msg* updates
    if (t >= 0.0 && main_ready_msg.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      main_ready_msg.tStart = t;  // (not accounting for frame time here)
      main_ready_msg.frameNStart = frameN;  // exact frame index
      
      main_ready_msg.setAutoDraw(true);
    }
    
    
    // if main_ready_msg is active this frame...
    if (main_ready_msg.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *button_L* updates
    if (t >= 0.0 && button_L.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      button_L.tStart = t;  // (not accounting for frame time here)
      button_L.frameNStart = frameN;  // exact frame index
      
      button_L.setAutoDraw(true);
    }
    
    
    // if button_L is active this frame...
    if (button_L.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *ready_label_L* updates
    if (t >= 0.0 && ready_label_L.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      ready_label_L.tStart = t;  // (not accounting for frame time here)
      ready_label_L.frameNStart = frameN;  // exact frame index
      
      ready_label_L.setAutoDraw(true);
    }
    
    
    // if ready_label_L is active this frame...
    if (ready_label_L.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *button_R* updates
    if (t >= 0.0 && button_R.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      button_R.tStart = t;  // (not accounting for frame time here)
      button_R.frameNStart = frameN;  // exact frame index
      
      button_R.setAutoDraw(true);
    }
    
    
    // if button_R is active this frame...
    if (button_R.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *ready_label_R* updates
    if (t >= 0.0 && ready_label_R.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      ready_label_R.tStart = t;  // (not accounting for frame time here)
      ready_label_R.frameNStart = frameN;  // exact frame index
      
      ready_label_R.setAutoDraw(true);
    }
    
    
    // if ready_label_R is active this frame...
    if (ready_label_R.status === PsychoJS.Status.STARTED) {
    }
    
    // *ready_done_mouse* updates
    if (t >= 0.0 && ready_done_mouse.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      ready_done_mouse.tStart = t;  // (not accounting for frame time here)
      ready_done_mouse.frameNStart = frameN;  // exact frame index
      
      ready_done_mouse.status = PsychoJS.Status.STARTED;
      ready_done_mouse.mouseClock.reset();
      prevButtonState = ready_done_mouse.getPressed();  // if button is down already this ISN'T a new click
    }
    
    // if ready_done_mouse is active this frame...
    if (ready_done_mouse.status === PsychoJS.Status.STARTED) {
      _mouseButtons = ready_done_mouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          ready_done_mouse.clickableObjects = eval([button_L, button_R])
          ;// make sure the mouse's clickable objects are an array
          if (!Array.isArray(ready_done_mouse.clickableObjects)) {
              ready_done_mouse.clickableObjects = [ready_done_mouse.clickableObjects];
          }
          // iterate through clickable objects and check each
          for (const obj of ready_done_mouse.clickableObjects) {
              if (obj.contains(ready_done_mouse)) {
                  gotValidClick = true;
                  ready_done_mouse.clicked_name.push(obj.name);
              }
          }
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          ready_done_mouse.clickableObjects = eval([button_L, button_R])
          ;// make sure the mouse's clickable objects are an array
          if (!Array.isArray(ready_done_mouse.clickableObjects)) {
              ready_done_mouse.clickableObjects = [ready_done_mouse.clickableObjects];
          }
          // iterate through clickable objects and check each
          for (const obj of ready_done_mouse.clickableObjects) {
              if (obj.contains(ready_done_mouse)) {
                  gotValidClick = true;
                  ready_done_mouse.clicked_name.push(obj.name);
              }
          }
          if (gotValidClick === true) { // end routine on response
            continueRoutine = false;
          }
        }
      }
    }
    
    // *ready_done* updates
    if (t >= 0.0 && ready_done.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      ready_done.tStart = t;  // (not accounting for frame time here)
      ready_done.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { ready_done.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { ready_done.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { ready_done.clearEvents(); });
    }
    
    // if ready_done is active this frame...
    if (ready_done.status === PsychoJS.Status.STARTED) {
      let theseKeys = ready_done.getKeys({
        keyList: typeof 'space' === 'string' ? ['space'] : 'space', 
        waitRelease: false
      });
      _ready_done_allKeys = _ready_done_allKeys.concat(theseKeys);
      if (_ready_done_allKeys.length > 0) {
        ready_done.keys = _ready_done_allKeys[_ready_done_allKeys.length - 1].name;  // just the last key pressed
        ready_done.rt = _ready_done_allKeys[_ready_done_allKeys.length - 1].rt;
        ready_done.duration = _ready_done_allKeys[_ready_done_allKeys.length - 1].duration;
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
    for (const thisComponent of IAT_readyComponents)
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


function IAT_readyRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'IAT_ready' ---
    for (const thisComponent of IAT_readyComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('IAT_ready.stopped', globalClock.getTime());
    // store data for psychoJS.experiment (ExperimentHandler)
    ready_done.stop();
    // the Routine "IAT_ready" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var IAT_trialMaxDurationReached;
var _key_resp_3_allKeys;
var IAT_trialMaxDuration;
var IAT_trialComponents;
function IAT_trialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'IAT_trial' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // keep track of whether this Routine was forcibly ended
    routineForceEnded = false;
    IAT_trialClock.reset();
    routineTimer.reset();
    IAT_trialMaxDurationReached = false;
    // update component parameters for each repeat
    text_stim.setText(stimWord);
    key_resp_3.keys = undefined;
    key_resp_3.rt = undefined;
    _key_resp_3_allKeys = [];
    // setup some python lists for storing info about the touch_resp
    // current position of the mouse:
    touch_resp.x = [];
    touch_resp.y = [];
    touch_resp.leftButton = [];
    touch_resp.midButton = [];
    touch_resp.rightButton = [];
    touch_resp.time = [];
    touch_resp.clicked_name = [];
    gotValidClick = false; // until a click is received
    trial_label_left.setText(label_left);
    trial_label_right.setText(label_right);
    psychoJS.experiment.addData('IAT_trial.started', globalClock.getTime());
    IAT_trialMaxDuration = null
    // keep track of which components have finished
    IAT_trialComponents = [];
    IAT_trialComponents.push(fixation);
    IAT_trialComponents.push(text_stim);
    IAT_trialComponents.push(key_resp_3);
    IAT_trialComponents.push(touch_resp);
    IAT_trialComponents.push(button_left);
    IAT_trialComponents.push(trial_label_left);
    IAT_trialComponents.push(button_right);
    IAT_trialComponents.push(trial_label_right);
    
    for (const thisComponent of IAT_trialComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var frameRemains;
function IAT_trialRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'IAT_trial' ---
    // get current time
    t = IAT_trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *fixation* updates
    if (t >= 0.0 && fixation.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      fixation.tStart = t;  // (not accounting for frame time here)
      fixation.frameNStart = frameN;  // exact frame index
      
      fixation.setAutoDraw(true);
    }
    
    
    // if fixation is active this frame...
    if (fixation.status === PsychoJS.Status.STARTED) {
    }
    
    frameRemains = 0.5 - psychoJS.window.monitorFramePeriod * 0.75;// most of one frame period left
    if ((fixation.status === PsychoJS.Status.STARTED || fixation.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      // keep track of stop time/frame for later
      fixation.tStop = t;  // not accounting for scr refresh
      fixation.frameNStop = frameN;  // exact frame index
      // update status
      fixation.status = PsychoJS.Status.FINISHED;
      fixation.setAutoDraw(false);
    }
    
    
    // *text_stim* updates
    if (t >= 0.5 && text_stim.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_stim.tStart = t;  // (not accounting for frame time here)
      text_stim.frameNStart = frameN;  // exact frame index
      
      text_stim.setAutoDraw(true);
    }
    
    
    // if text_stim is active this frame...
    if (text_stim.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *key_resp_3* updates
    if (t >= 0.5 && key_resp_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_3.tStart = t;  // (not accounting for frame time here)
      key_resp_3.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_3.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_3.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_3.clearEvents(); });
    }
    
    // if key_resp_3 is active this frame...
    if (key_resp_3.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_3.getKeys({
        keyList: typeof ['a','l'] === 'string' ? [['a','l']] : ['a','l'], 
        waitRelease: false
      });
      _key_resp_3_allKeys = _key_resp_3_allKeys.concat(theseKeys);
      if (_key_resp_3_allKeys.length > 0) {
        key_resp_3.keys = _key_resp_3_allKeys[_key_resp_3_allKeys.length - 1].name;  // just the last key pressed
        key_resp_3.rt = _key_resp_3_allKeys[_key_resp_3_allKeys.length - 1].rt;
        key_resp_3.duration = _key_resp_3_allKeys[_key_resp_3_allKeys.length - 1].duration;
        // was this correct?
        if (key_resp_3.keys == CorrAns) {
            key_resp_3.corr = 1;
        } else {
            key_resp_3.corr = 0;
        }
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // *touch_resp* updates
    if (t >= 0.5 && touch_resp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      touch_resp.tStart = t;  // (not accounting for frame time here)
      touch_resp.frameNStart = frameN;  // exact frame index
      
      touch_resp.status = PsychoJS.Status.STARTED;
      touch_resp.mouseClock.reset();
      prevButtonState = touch_resp.getPressed();  // if button is down already this ISN'T a new click
    }
    
    // if touch_resp is active this frame...
    if (touch_resp.status === PsychoJS.Status.STARTED) {
      _mouseButtons = touch_resp.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          touch_resp.clickableObjects = eval([button_left, button_right])
          ;// make sure the mouse's clickable objects are an array
          if (!Array.isArray(touch_resp.clickableObjects)) {
              touch_resp.clickableObjects = [touch_resp.clickableObjects];
          }
          // iterate through clickable objects and check each
          for (const obj of touch_resp.clickableObjects) {
              if (obj.contains(touch_resp)) {
                  gotValidClick = true;
                  touch_resp.clicked_name.push(obj.name);
              }
          }
          if (!gotValidClick) {
              touch_resp.clicked_name.push(null);
          }
          _mouseXYs = touch_resp.getPos();
          touch_resp.x.push(_mouseXYs[0]);
          touch_resp.y.push(_mouseXYs[1]);
          touch_resp.leftButton.push(_mouseButtons[0]);
          touch_resp.midButton.push(_mouseButtons[1]);
          touch_resp.rightButton.push(_mouseButtons[2]);
          touch_resp.time.push(touch_resp.mouseClock.getTime());
          if (gotValidClick === true) { // end routine on response
            continueRoutine = false;
          }
        }
      }
    }
    
    // *button_left* updates
    if (t >= 0.5 && button_left.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      button_left.tStart = t;  // (not accounting for frame time here)
      button_left.frameNStart = frameN;  // exact frame index
      
      button_left.setAutoDraw(true);
    }
    
    
    // if button_left is active this frame...
    if (button_left.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *trial_label_left* updates
    if (t >= 0.5 && trial_label_left.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      trial_label_left.tStart = t;  // (not accounting for frame time here)
      trial_label_left.frameNStart = frameN;  // exact frame index
      
      trial_label_left.setAutoDraw(true);
    }
    
    
    // if trial_label_left is active this frame...
    if (trial_label_left.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *button_right* updates
    if (t >= 0.5 && button_right.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      button_right.tStart = t;  // (not accounting for frame time here)
      button_right.frameNStart = frameN;  // exact frame index
      
      button_right.setAutoDraw(true);
    }
    
    
    // if button_right is active this frame...
    if (button_right.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *trial_label_right* updates
    if (t >= 0.5 && trial_label_right.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      trial_label_right.tStart = t;  // (not accounting for frame time here)
      trial_label_right.frameNStart = frameN;  // exact frame index
      
      trial_label_right.setAutoDraw(true);
    }
    
    
    // if trial_label_right is active this frame...
    if (trial_label_right.status === PsychoJS.Status.STARTED) {
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
    for (const thisComponent of IAT_trialComponents)
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


var corr;
var rt;
function IAT_trialRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'IAT_trial' ---
    for (const thisComponent of IAT_trialComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('IAT_trial.stopped', globalClock.getTime());
    // was no response the correct answer?!
    if (key_resp_3.keys === undefined) {
      if (['None','none',undefined].includes(CorrAns)) {
         key_resp_3.corr = 1;  // correct non-response
      } else {
         key_resp_3.corr = 0;  // failed to respond (incorrectly)
      }
    }
    // store data for current loop
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_resp_3.corr, level);
    }
    psychoJS.experiment.addData('key_resp_3.keys', key_resp_3.keys);
    psychoJS.experiment.addData('key_resp_3.corr', key_resp_3.corr);
    if (typeof key_resp_3.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_3.rt', key_resp_3.rt);
        psychoJS.experiment.addData('key_resp_3.duration', key_resp_3.duration);
        routineTimer.reset();
        }
    
    key_resp_3.stop();
    // store data for psychoJS.experiment (ExperimentHandler)
    psychoJS.experiment.addData('touch_resp.x', touch_resp.x);
    psychoJS.experiment.addData('touch_resp.y', touch_resp.y);
    psychoJS.experiment.addData('touch_resp.leftButton', touch_resp.leftButton);
    psychoJS.experiment.addData('touch_resp.midButton', touch_resp.midButton);
    psychoJS.experiment.addData('touch_resp.rightButton', touch_resp.rightButton);
    psychoJS.experiment.addData('touch_resp.time', touch_resp.time);
    psychoJS.experiment.addData('touch_resp.clicked_name', touch_resp.clicked_name);
    
    // Run 'End Routine' code from check_correct
    // check if correct (either mouse or keyboard)
    if (key_resp_3.keys !== undefined) {
        corr = key_resp_3.corr;
        rt = key_resp_3.rt;
    } else {
        rt = touch_resp.time[0];  // annoyingly mouse is a list of rts
        if ((touch_resp.clicked_name[0].includes('left') && CorrAns=='a') ||
            (touch_resp.clicked_name[0].includes('right') && CorrAns=='l')) {
            corr = 1;
        } else {
            corr = 0;
        }
    }
    
    psychoJS.experiment.addData('rt',  rt);
    psychoJS.experiment.addData('corr', corr);
    // Run 'End Routine' code from save_iat_trial
    psychoJS.experiment.addData("key_left", (label_left || "").replace("\n", " "));
    psychoJS.experiment.addData("key_right", (label_right || "").replace("\n", " "));
    psychoJS.experiment.addData("block_file", conds_file);
    psychoJS.experiment.addData("block_name", (conds_file ? conds_file.split("/").slice((- 1))[0].replace(".xlsx", "") : null));
    
    // the Routine "IAT_trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var IAT_feedbackMaxDurationReached;
var msg;
var IAT_feedbackMaxDuration;
var IAT_feedbackComponents;
function IAT_feedbackRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'IAT_feedback' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // keep track of whether this Routine was forcibly ended
    routineForceEnded = false;
    IAT_feedbackClock.reset(routineTimer.getTime());
    routineTimer.add(1.000000);
    IAT_feedbackMaxDurationReached = false;
    // update component parameters for each repeat
    // Run 'Begin Routine' code from generate_msg
    if ((corr === 0)) {
        msg = "✗";
    } else {
        msg = "✓";
    }
    
    feedback_msg.setText(msg);
    psychoJS.experiment.addData('IAT_feedback.started', globalClock.getTime());
    IAT_feedbackMaxDuration = null
    // keep track of which components have finished
    IAT_feedbackComponents = [];
    IAT_feedbackComponents.push(feedback_msg);
    
    for (const thisComponent of IAT_feedbackComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function IAT_feedbackRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'IAT_feedback' ---
    // get current time
    t = IAT_feedbackClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *feedback_msg* updates
    if (t >= 0.0 && feedback_msg.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      feedback_msg.tStart = t;  // (not accounting for frame time here)
      feedback_msg.frameNStart = frameN;  // exact frame index
      
      feedback_msg.setAutoDraw(true);
    }
    
    
    // if feedback_msg is active this frame...
    if (feedback_msg.status === PsychoJS.Status.STARTED) {
    }
    
    frameRemains = 0.0 + 1 - psychoJS.window.monitorFramePeriod * 0.75;// most of one frame period left
    if (feedback_msg.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      // keep track of stop time/frame for later
      feedback_msg.tStop = t;  // not accounting for scr refresh
      feedback_msg.frameNStop = frameN;  // exact frame index
      // update status
      feedback_msg.status = PsychoJS.Status.FINISHED;
      feedback_msg.setAutoDraw(false);
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
    for (const thisComponent of IAT_feedbackComponents)
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


function IAT_feedbackRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'IAT_feedback' ---
    for (const thisComponent of IAT_feedbackComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('IAT_feedback.stopped', globalClock.getTime());
    if (routineForceEnded) {
        routineTimer.reset();} else if (IAT_feedbackMaxDurationReached) {
        IAT_feedbackClock.add(IAT_feedbackMaxDuration);
    } else {
        IAT_feedbackClock.add(1.000000);
    }
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var QuestionnaireMaxDurationReached;
var demo_gender;
var demo_race;
var demo_done;
var QuestionnaireMaxDuration;
var QuestionnaireComponents;
function QuestionnaireRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Questionnaire' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // keep track of whether this Routine was forcibly ended
    routineForceEnded = false;
    QuestionnaireClock.reset();
    routineTimer.reset();
    QuestionnaireMaxDurationReached = false;
    // update component parameters for each repeat
    // Run 'Begin Routine' code from question_code
    // Hide the PsychoJS canvas temporarily
    psychoJS.window._renderer.view.style.display = 'none';
    
    // Create overlay form
    var overlay = document.createElement('div');
    overlay.id = 'demo-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#000;display:flex;align-items:center;justify-content:center;z-index:9999;';
    demo_gender = '';
    demo_race = '';
    
    overlay.innerHTML = '\
    <div style="background:#222;padding:40px;border-radius:8px;color:white;font-family:Arial;min-width:400px;">\
      <h2 style="margin-top:0;">A few last questions</h2>\
      <div style="margin-bottom:20px;">\
        <label style="display:block;margin-bottom:8px;">Gender</label>\
        <select id="demo-gender" style="width:100%;padding:8px;font-size:16px;border-radius:4px;">\
          <option value="">-- Select --</option>\
          <option value="female">Female</option>\
          <option value="male">Male</option>\
          <option value="non-binary">Non-binary</option>\
          <option value="diverse">Diverse</option>\
          <option value="prefer_not">Prefer not to say</option>\
          <option value="other">Other</option>\
        </select>\
      </div>\
      <div style="margin-bottom:30px;">\
        <label style="display:block;margin-bottom:8px;">Ethnic background</label>\
        <select id="demo-race" style="width:100%;padding:8px;font-size:16px;border-radius:4px;">\
          <option value="">-- Select --</option>\
          <option value="white">White / Caucasian</option>\
          <option value="black">Black / African descent</option>\
          <option value="asian">Asian</option>\
          <option value="hispanic">Hispanic / Latino</option>\
          <option value="middle_eastern">Middle Eastern</option>\
          <option value="mixed">Mixed / Multiple</option>\
          <option value="prefer_not">Prefer not to say</option>\
          <option value="other">Other</option>\
        </select>\
      </div>\
      <button id="demo-submit" style="width:100%;padding:12px;background:darkgrey;color:white;border:none;border-radius:4px;font-size:16px;cursor:pointer;">Continue</button>\
      <p id="demo-error" style="color:red;display:none;margin-top:10px;">Please answer both questions.</p>\
    </div>';
    
    document.body.appendChild(overlay);
    
    // flag to signal routine can end
    demo_done = false;
    demo_gender = '';
    demo_race = '';
    
    document.getElementById('demo-submit').addEventListener('click', function() {
        var gender = document.getElementById('demo-gender').value;
        var race = document.getElementById('demo-race').value;
    
        if (!gender || !race) {
            document.getElementById('demo-error').style.display = 'block';
            return;
        }
    
        // store in global vars, save in RoutineEnd
        demo_gender = gender;
        demo_race = race;
    
        // clean up
        document.body.removeChild(overlay);
        psychoJS.window._renderer.view.style.display = 'block';
        demo_done = true;
    });
    psychoJS.experiment.addData('Questionnaire.started', globalClock.getTime());
    QuestionnaireMaxDuration = null
    // keep track of which components have finished
    QuestionnaireComponents = [];
    
    for (const thisComponent of QuestionnaireComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function QuestionnaireRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Questionnaire' ---
    // get current time
    t = QuestionnaireClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    if (demo_done) {
        continueRoutine = false;
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
    for (const thisComponent of QuestionnaireComponents)
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


function QuestionnaireRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Questionnaire' ---
    for (const thisComponent of QuestionnaireComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('Questionnaire.stopped', globalClock.getTime());
    // ensure canvas is visible again in case something went wrong
    psychoJS.window._renderer.view.style.display = 'block';
    // save questionnaire data
    psychoJS.experiment.addData('gender', demo_gender);
    psychoJS.experiment.addData('ethnic_background', demo_race);
    psychoJS.experiment.nextEntry();
    // the Routine "Questionnaire" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    // the Routine "Questionnaire" was not non-slip safe, so reset the non-slip timer
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
    
    for (const thisComponent of ExitComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of ExitComponents)
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


function ExitRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Exit' ---
    for (const thisComponent of ExitComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('Exit.stopped', globalClock.getTime());
    psychoJS._saveResults = 0;
    
    function buildCSV(trialsData) {
            if (!trialsData || trialsData.length === 0) return '';
            var headers = Object.keys(trialsData[0]);
            var rows = [headers.map(function(h) {
                return '"' + String(h).replace(/"/g, '""') + '"';
            }).join(',')];
            for (var i = 0; i < trialsData.length; i++) {
                var row = trialsData[i];
                var values = headers.map(function(h) {
                    var val = (row[h] !== undefined && row[h] !== null) ? String(row[h]) : '';
                    return '"' + val.replace(/"/g, '""') + '"';
                });
                rows.push(values.join(','));
            }
            return rows.join('\n');
        }
    
        let csv = buildCSV(psychoJS.experiment._trialsData);
    
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

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
let expInfo = {};
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


function aspectCorrectedSize(targetWidth, targetHeight) {
    var winAspect = psychoJS.window.size[0] / psychoJS.window.size[1];
    return [targetWidth / winAspect, targetHeight];
}

var sessionTag = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);


function convertToCSV(dataArray) {
    if (!dataArray || dataArray.length === 0) { return ""; }
    var allKeys = {};
    for (var i = 0; i < dataArray.length; i++) {
        for (var k in dataArray[i]) {
            if (dataArray[i].hasOwnProperty(k)) allKeys[k] = true;
        }
    }
    var headers = Object.keys(allKeys);
    var rows = [headers.map(function(h) { return '"' + String(h).replace(/"/g, '""') + '"'; }).join(',')];
    for (var j = 0; j < dataArray.length; j++) {
        var row = dataArray[j];
        rows.push(headers.map(function(h) {
            var val = (row[h] !== undefined && row[h] !== null) ? String(row[h]) : '';
            return '"' + val.replace(/"/g, '""') + '"';
        }).join(','));
    }
    return rows.join('\n');
}


async function saveToDataPipe(filename, csv) {
    for (var attempt = 0; attempt < 3; attempt++) {
        try {
            var r = await fetch("https://pipe.jspsych.org/api/data/", {
                method: "POST",
                headers: {"Content-Type": "application/json", "Accept": "*/*"},
                body: JSON.stringify({experimentID: "eonAagK4IATa", filename: filename, data: csv})
            });
            var body = {};
            try { body = await r.json(); } catch (e) {}
            if (r.status === 201 || r.status === 202) { return true; }   // 202 = queued, also success
            console.error("DataPipe rejected:", r.status, body.error, body.message);
            if (r.status === 400) { return false; }                      // retrying won't help
        } catch (e) {
            console.error("DataPipe network error:", e);
        }
        await new Promise(function(res) { setTimeout(res, 1500 * (attempt + 1)); });
    }
    return false;
}

var facesPromise = null;


var facesPromise;
function startFacePrefetch() {
    var folders = [face_folder_1, face_folder_2, face_folder_3, face_folder_4,
                   face_folder_5, face_folder_6, face_folder_7, face_folder_8];
    var res = [];
    for (var f = 0; f < folders.length; f++) {
        for (var i = 1; i <= 6; i++) {
            var p = "resources/faces/" + gender + "/" + folders[f] + "/" + i + ".png";
            res.push({ name: p, path: p });
        }
    }
    facesPromise = psychoJS.serverManager.prepareResources(res)
        .catch(function (e) { console.error("Face prefetch failed:", e); });
    return facesPromise;
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
flowScheduler.add(Quick_ModeRoutineBegin());
flowScheduler.add(Quick_ModeRoutineEachFrame());
flowScheduler.add(Quick_ModeRoutineEnd());
flowScheduler.add(Check_ConsentRoutineBegin());
flowScheduler.add(Check_ConsentRoutineEachFrame());
flowScheduler.add(Check_ConsentRoutineEnd());
flowScheduler.add(Participant_CodeRoutineBegin());
flowScheduler.add(Participant_CodeRoutineEachFrame());
flowScheduler.add(Participant_CodeRoutineEnd());
flowScheduler.add(DemographicsRoutineBegin());
flowScheduler.add(DemographicsRoutineEachFrame());
flowScheduler.add(DemographicsRoutineEnd());
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






flowScheduler.add(End_DemographicsRoutineBegin());
flowScheduler.add(End_DemographicsRoutineEachFrame());
flowScheduler.add(End_DemographicsRoutineEnd());
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
    {'name': 'resources/conditions/condition_0.xlsx', 'path': 'resources/conditions/condition_0.xlsx'},
    {'name': 'resources/conditions/condition_1.xlsx', 'path': 'resources/conditions/condition_1.xlsx'},
    {'name': 'resources/conditions/condition_2.xlsx', 'path': 'resources/conditions/condition_2.xlsx'},
    {'name': 'resources/conditions/condition_3.xlsx', 'path': 'resources/conditions/condition_3.xlsx'},
    {'name': 'resources/iat/stimuli/blank.png', 'path': 'resources/iat/stimuli/blank.png'},
    {'name': 'resources/iat/blocks_order.xlsx', 'path': 'resources/iat/blocks_order.xlsx'},
    {'name': 'resources/iat/cong_test.xlsx', 'path': 'resources/iat/cong_test.xlsx'},
    {'name': 'resources/iat/cong_train.xlsx', 'path': 'resources/iat/cong_train.xlsx'},
    {'name': 'resources/iat/incong_test.xlsx', 'path': 'resources/iat/incong_test.xlsx'},
    {'name': 'resources/iat/incong_train.xlsx', 'path': 'resources/iat/incong_train.xlsx'},
    {'name': 'resources/iat/instructs.xlsx', 'path': 'resources/iat/instructs.xlsx'},
    {'name': 'resources/iat/pos_neg_train.xlsx', 'path': 'resources/iat/pos_neg_train.xlsx'},
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
  

  
  psychoJS.experiment.dataFileName = (("." + "/") + sessionTag);
  psychoJS.experiment.field_separator = '\t';


  return Scheduler.Event.NEXT;
}


var Quick_ModeClock;
var text_placeholder5;
var quickMode;
var quickModeChoiceDone;
var sceneLoopNum;
var faceRankingLoopNum;
var participant_code;
var sceneImagesReady;
var Check_ConsentClock;
var text_placeholder2;
var Participant_CodeClock;
var text_placeholder;
var DemographicsClock;
var text_placeholder3;
var InstructionsClock;
var instruction_text;
var key_resp;
var Condition_LoadingClock;
var wait_text;
var load_scene_picturesClock;
var text_placeholder6;
var Scene_Presentation_TripleClock;
var scene_triple;
var face_triple;
var item_triple;
var description_triple;
var text_continue_triple;
var key_resp_5;
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
var End_DemographicsClock;
var text_placeholder4;
var ExitClock;
var exit_message;
var key_resp_2;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "Quick_Mode"
  Quick_ModeClock = new util.Clock();
  text_placeholder5 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_placeholder5',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 0.0,
    depth: 0.0 
  });
  
  // Default to normal mode unless the participant chooses Quick Mode.
  quickMode = false;
  quickModeChoiceDone = false;
  sceneLoopNum = 20;
  faceRankingLoopNum = 8;
  participant_code = 'quickMode_Delete'
  sceneImagesReady = false;
  
  // Hide the PsychoJS canvas while showing the HTML question.
  psychoJS.window._renderer.view.style.display = 'none';
  
  var quickOverlay = document.createElement('div');
  
  quickOverlay.id = 'quick-mode-overlay';
  
  quickOverlay.style.cssText =
      'position:fixed;' +
      'top:0;left:0;width:100%;height:100%;' +
      'background:#000;' +
      'display:flex;' +
      'align-items:center;' +
      'justify-content:center;' +
      'z-index:9999;';
  
  quickOverlay.innerHTML = `
      <div style="
          background:#222;
          padding:40px;
          border-radius:8px;
          color:white;
          font-family:Arial,sans-serif;
          text-align:center;
          max-width:500px;
          margin:20px;
      ">
          <h2>Quick Experiment</h2>
  
          <p style="font-size:18px;line-height:1.5;">
              Do you want to do a quick experiment?
          </p>
  
          <p style="line-height:1.5;">
              The quick version skips the demographics and
              participant code and includes fewer conditions
              and face rankings.
          </p>
  
          <div style="
              display:flex;
              gap:15px;
              margin-top:25px;
          ">
              <button id="quick-mode-yes" style="
                  flex:1;
                  padding:12px;
                  border:0;
                  border-radius:4px;
                  background:#4CAF50;
                  color:white;
                  font-size:16px;
                  cursor:pointer;
              ">Yes</button>
  
              <button id="quick-mode-no" style="
                  flex:1;
                  padding:12px;
                  border:0;
                  border-radius:4px;
                  background:#666;
                  color:white;
                  font-size:16px;
                  cursor:pointer;
              ">No</button>
          </div>
      </div>
  `;
  
  document.body.appendChild(quickOverlay);
  
  // Shared function to finish the selection.
  function finishQuickModeSelection(useQuickMode) {
      quickMode = useQuickMode;
      quickModeChoiceDone = true;
      
      if (useQuickMode) {
          sceneLoopNum = 5;
          faceRankingLoopNum = 3;
      }
  
      if (quickOverlay.parentNode) {
          quickOverlay.parentNode.removeChild(quickOverlay);
      }
  
      psychoJS.window._renderer.view.style.display = 'block';
  }
  
  document.getElementById('quick-mode-yes')
      .addEventListener('click', function () {
          finishQuickModeSelection(true);
      });
  
  document.getElementById('quick-mode-no')
      .addEventListener('click', function () {
          finishQuickModeSelection(false);
      });
  // Initialize components for Routine "Check_Consent"
  Check_ConsentClock = new util.Clock();
  text_placeholder2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_placeholder2',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 0.0,
    depth: 0.0 
  });
  
  // Initialize components for Routine "Participant_Code"
  Participant_CodeClock = new util.Clock();
  text_placeholder = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_placeholder',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  // Initialize components for Routine "Demographics"
  DemographicsClock = new util.Clock();
  text_placeholder3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_placeholder3',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 0.0,
    depth: 0.0 
  });
  
  // Initialize components for Routine "Instructions"
  InstructionsClock = new util.Clock();
  instruction_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'instruction_text',
    text: 'Welcome to the experiment.\n\nIn this study, you will complete a series of trials consisting of three phases.\n\nPhase 1 – Scene Presentation\n\nYou will first see a short scene description together with an image.\n\nPhase 2 – Face Description\n\nAfter viewing the scene, you will be asked to briefly describe the face of the person shown in the scene using your own words.\n\nPhase 3 – Face Ranking\n\nNext, you will see a collage containing six faces. Your task is to rank the faces according to how likely they match the previously shown scene.\n\nPlace the face you think matches the scene best closer to “Most likely” and the face you think matches the scene least closer to “Least likely”.\n\nThere are no correct or incorrect answers.\n\nPress ENTER to begin.',
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
  
  // Initialize components for Routine "load_scene_pictures"
  load_scene_picturesClock = new util.Clock();
  text_placeholder6 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_placeholder6',
    text: 'Loading Scene...',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 0.0,
    depth: -1.0 
  });
  
  // Initialize components for Routine "Scene_Presentation_Triple"
  Scene_Presentation_TripleClock = new util.Clock();
  scene_triple = new visual.ImageStim({
    win : psychoJS.window,
    name : 'scene_triple', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, 
    pos : [0, 0], 
    draggable: false,
    size : [0.5, 0.5],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  face_triple = new visual.ImageStim({
    win : psychoJS.window,
    name : 'face_triple', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, 
    pos : [0, 0], 
    draggable: false,
    size : [0.5, 0.5],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  item_triple = new visual.ImageStim({
    win : psychoJS.window,
    name : 'item_triple', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, 
    pos : [0, 0], 
    draggable: false,
    size : [0.5, 0.5],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  description_triple = new visual.TextBox({
    win: psychoJS.window,
    name: 'description_triple',
    text: '',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0], 
    draggable: false,
    letterHeight: 0.05,
    lineSpacing: 1.0,
    size: [1, 0.5],  units: undefined, 
    ori: 0.0,
    color: 'white', colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -4.0 
  });
  
  text_continue_triple = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_continue_triple',
    text: 'Press RETURN to continue',
    font: 'Arial',
    units: undefined, 
    pos: [0, (- 0.8)], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -5.0 
  });
  
  key_resp_5 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
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
    overflow: 'scroll',
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
    pos : [(- 0.85), (- 0.25)], 
    draggable: true,
    size : 1.0,
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
    pos : [(- 0.51), (- 0.25)], 
    draggable: true,
    size : 1.0,
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
    pos : [(- 0.17), (- 0.25)], 
    draggable: true,
    size : 1.0,
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
    pos : [0.17, (- 0.25)], 
    draggable: true,
    size : 1.0,
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
    pos : [0.51, (- 0.25)], 
    draggable: true,
    size : 1.0,
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
    pos : [0.85, (- 0.25)], 
    draggable: true,
    size : 1.0,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -8.0 
  });
  pos_1 = new visual.Rect ({
    win: psychoJS.window, name: 'pos_1', 
    width: [1.0, 1.0][0], height: [1.0, 1.0][1],
    ori: 0.0, 
    pos: [(- 0.85), 0.25], 
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
    width: [1.0, 1.0][0], height: [1.0, 1.0][1],
    ori: 0.0, 
    pos: [(- 0.51), 0.25], 
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
    width: [1.0, 1.0][0], height: [1.0, 1.0][1],
    ori: 0.0, 
    pos: [(- 0.17), 0.25], 
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
    width: [1.0, 1.0][0], height: [1.0, 1.0][1],
    ori: 0.0, 
    pos: [0.17, 0.25], 
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
    width: [1.0, 1.0][0], height: [1.0, 1.0][1],
    ori: 0.0, 
    pos: [0.51, 0.25], 
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
    width: [1.0, 1.0][0], height: [1.0, 1.0][1],
    ori: 0.0, 
    pos: [0.85, 0.25], 
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
  
  // Initialize components for Routine "End_Demographics"
  End_DemographicsClock = new util.Clock();
  text_placeholder4 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_placeholder4',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
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
var Quick_ModeMaxDurationReached;
var Quick_ModeMaxDuration;
var Quick_ModeComponents;
function Quick_ModeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Quick_Mode' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // keep track of whether this Routine was forcibly ended
    routineForceEnded = false;
    Quick_ModeClock.reset();
    routineTimer.reset();
    Quick_ModeMaxDurationReached = false;
    // update component parameters for each repeat
    psychoJS.experiment.addData('Quick_Mode.started', globalClock.getTime());
    Quick_ModeMaxDuration = null
    // keep track of which components have finished
    Quick_ModeComponents = [];
    Quick_ModeComponents.push(text_placeholder5);
    
    for (const thisComponent of Quick_ModeComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function Quick_ModeRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Quick_Mode' ---
    // get current time
    t = Quick_ModeClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_placeholder5* updates
    if (t >= 0.0 && text_placeholder5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_placeholder5.tStart = t;  // (not accounting for frame time here)
      text_placeholder5.frameNStart = frameN;  // exact frame index
      
      text_placeholder5.setAutoDraw(true);
    }
    
    
    // if text_placeholder5 is active this frame...
    if (text_placeholder5.status === PsychoJS.Status.STARTED) {
    }
    
    if (quickModeChoiceDone) {
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
    for (const thisComponent of Quick_ModeComponents)
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


function Quick_ModeRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Quick_Mode' ---
    for (const thisComponent of Quick_ModeComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('Quick_Mode.stopped', globalClock.getTime());
    psychoJS.window._renderer.view.style.display = 'block';
    
    psychoJS.experiment.addData('quick_mode', quickMode);
    
    console.log('quickMode:', quickMode, '| scenes:', sceneLoopNum, '| faces:', faceRankingLoopNum);
    // the Routine "Quick_Mode" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var Check_ConsentMaxDurationReached;
var consent_done;
var Check_ConsentMaxDuration;
var Check_ConsentComponents;
function Check_ConsentRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Check_Consent' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // keep track of whether this Routine was forcibly ended
    routineForceEnded = false;
    Check_ConsentClock.reset();
    routineTimer.reset();
    Check_ConsentMaxDurationReached = false;
    // update component parameters for each repeat
    if (quickMode) {
        continueRoutine = false;
        consent_done = true;
    } else {
        // Hide the PsychoJS canvas temporarily
        psychoJS.window._renderer.view.style.display = 'none';
    
        var overlay = document.createElement('div');
        overlay.id = 'consent-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#000;display:flex;align-items:center;justify-content:center;z-index:9999;overflow-y:auto;';
    
        // global vars
        consent_given = false;
        consent_declined = false;
        consent_done = false;
    
        overlay.innerHTML = '\
        <div style="background:#222;padding:40px;border-radius:8px;color:white;font-family:Arial;min-width:440px;max-width:600px;max-height:90vh;overflow-y:auto;">\
          <h2 style="margin-top:0;">Informed Consent</h2>\
          <div style="line-height:1.6;font-size:15px;">\
            <p>This study investigates how different contextual information influences the perception and evaluation of faces. Your responses will be anonymized and used for scientific purposes, and may be included in academic publications.</p>\
            <p><strong>What You Will Do:</strong></p>\
            <ul style="margin-top:0;padding-left:20px;">\
              <li>Read this information sheet and provide informed consent</li>\
              <li>Evaluate and rank face images together with contextual information</li>\
              <li>Complete a short demographic questionnaire</li>\
              <li>Complete a brief debriefing questionnaire</li>\
            </ul>\
            <p>This study takes approximately 60 minutes.</p>\
            <p>Participation is voluntary. You may skip individual tasks or withdraw from the study at any time without giving a reason and without any disadvantage.</p>\
            <p>Your data will be processed confidentially and used exclusively for scientific research purposes.</p>\
            <p>Sarah Boidoglou &amp; Savas Gro&szlig;mann (Study Leads) &mdash; sarah.boidoglou@dfki.de, savas.grossmann@dfki.de<br>\
            Mansi Sharma &amp; Philipp Müller (Supervision) &mdash; mansi.sharma@dfki.de, phmueller@is.mpg.de<br>\
            DFKI GmbH, Kesselhaus in der Lanolinfabrik, Salzufer 15/16, 10587 Berlin, Germany</p>\
            <p>By agreeing below, you confirm that you have read and understood this information and voluntarily consent to participate in this study.</p>\
          </div>\
          <div style="display:flex;gap:15px;margin-top:25px;">\
            <button id="consent-decline" style="flex:1;padding:12px;background:darkgrey;color:white;border:none;border-radius:4px;font-size:16px;cursor:pointer;">I do not agree</button>\
            <button id="consent-accept" style="flex:1;padding:12px;background:darkgrey;color:white;border:none;border-radius:4px;font-size:16px;cursor:pointer;">I Accept</button>\
          </div>\
        </div>';
    
        document.body.appendChild(overlay);
    
        document.getElementById('consent-accept').addEventListener('click', function() {
            consent_given = true;
            document.body.removeChild(overlay);
            psychoJS.window._renderer.view.style.display = 'block';
            consent_done = true;
        });
    
        document.getElementById('consent-decline').addEventListener('click', function() {
            consent_declined = true;
            overlay.querySelector('div').innerHTML =
                '<h2 style="margin-top:0;">Thank you</h2>' +
                '<p>You have chosen not to participate. The experiment will now close.</p>';
    
            // NOTE: adjust this if your project has its own quit function
            // (e.g. "quitPsychoJS('', false)") instead of calling psychoJS.quit() directly.
            setTimeout(function() {
                psychoJS.quit({message: 'Participant did not consent.', isCompleted: false});
            }, 3000);
        });
    
        // get screensize
        expInfo['windowWidth'] = window.innerWidth;
        expInfo['windowHeight'] = window.innerHeight;
    }
    psychoJS.experiment.addData('Check_Consent.started', globalClock.getTime());
    Check_ConsentMaxDuration = null
    // keep track of which components have finished
    Check_ConsentComponents = [];
    Check_ConsentComponents.push(text_placeholder2);
    
    for (const thisComponent of Check_ConsentComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function Check_ConsentRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Check_Consent' ---
    // get current time
    t = Check_ConsentClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_placeholder2* updates
    if (t >= 0.0 && text_placeholder2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_placeholder2.tStart = t;  // (not accounting for frame time here)
      text_placeholder2.frameNStart = frameN;  // exact frame index
      
      text_placeholder2.setAutoDraw(true);
    }
    
    
    // if text_placeholder2 is active this frame...
    if (text_placeholder2.status === PsychoJS.Status.STARTED) {
    }
    
    if (consent_done) {
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
    for (const thisComponent of Check_ConsentComponents)
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


function Check_ConsentRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Check_Consent' ---
    for (const thisComponent of Check_ConsentComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('Check_Consent.stopped', globalClock.getTime());
    if (!quickMode) psychoJS.experiment.addData('consent_given', consent_given);
    // the Routine "Check_Consent" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var Participant_CodeMaxDurationReached;
var pcode_done;
var Participant_CodeMaxDuration;
var Participant_CodeComponents;
function Participant_CodeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Participant_Code' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // keep track of whether this Routine was forcibly ended
    routineForceEnded = false;
    Participant_CodeClock.reset();
    routineTimer.reset();
    Participant_CodeMaxDurationReached = false;
    // update component parameters for each repeat
    if (quickMode) {
        continueRoutine = false;
        pcode_done = true;
    } else {
        // Hide the PsychoJS canvas temporarily
        psychoJS.window._renderer.view.style.display = 'none';
    
        // --- random participant code, e.g. K7MP-4RX9 ---
        // Alphabet without look-alikes (no 0/O, 1/I/L): 31 characters, 8 positions
        // -> 31^8 = ~850 billion possible codes, so a duplicate is practically impossible.
        function generateParticipantCode() {
            var alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
            var limit = 256 - (256 % alphabet.length);   // rejection sampling: no modulo bias
            var chars = [];
            while (chars.length < 8) {
                var buf = new Uint8Array(16);
                window.crypto.getRandomValues(buf);
                for (var i = 0; i < buf.length && chars.length < 8; i++) {
                    if (buf[i] < limit) {
                        chars.push(alphabet.charAt(buf[i] % alphabet.length));
                    }
                }
            }
            return chars.slice(0, 4).join('') + '-' + chars.slice(4).join('');
        }
    
        var overlay = document.createElement('div');
        overlay.id = 'pcode-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#000;display:flex;align-items:center;justify-content:center;z-index:9999;overflow-y:auto;';
    
        // global vars
        participant_code = generateParticipantCode();
        pcode_done = false;
    
        overlay.innerHTML = '\
        <div style="background:#222;padding:40px;border-radius:8px;color:white;font-family:Arial;min-width:440px;max-width:520px;max-height:90vh;overflow-y:auto;">\
          <h2 style="margin-top:0;">Your Participant Code</h2>\
          <p style="line-height:1.5;">To keep your data confidential while still allowing you to request its deletion later, you have been assigned a random participant code. Please write it down now or take a screenshot &ndash; you will need it if you ever want your data removed. It cannot be recovered later.</p>\
          <p id="pcode-display" style="font-size:32px;font-weight:bold;letter-spacing:4px;text-align:center;background:#111;padding:20px;border-radius:4px;margin:25px 0 10px 0;"></p>\
          <button id="pcode-copy" style="width:100%;padding:10px;background:#444;color:white;border:none;border-radius:4px;font-size:14px;cursor:pointer;">Copy code</button>\
          <label style="display:flex;align-items:center;gap:8px;margin-top:25px;cursor:pointer;">\
            <input id="pcode-confirm" type="checkbox" style="width:18px;height:18px;">\
            I have saved my participant code\
          </label>\
          <button id="pcode-continue" style="width:100%;padding:12px;margin-top:15px;background:darkgrey;color:white;border:none;border-radius:4px;font-size:16px;cursor:pointer;" disabled>Continue</button>\
        </div>';
    
        document.body.appendChild(overlay);
    
        document.getElementById('pcode-display').textContent = participant_code;
    
        document.getElementById('pcode-copy').addEventListener('click', function() {
            var btn = this;
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(participant_code)
                    .then(function() { btn.textContent = 'Copied!'; })
                    .catch(function() { btn.textContent = 'Copy failed - please write it down'; });
            } else {
                btn.textContent = 'Copy not available - please write it down';
            }
        });
    
        document.getElementById('pcode-confirm').addEventListener('change', function() {
            document.getElementById('pcode-continue').disabled = !this.checked;
        });
    
        document.getElementById('pcode-continue').addEventListener('click', function() {
            document.body.removeChild(overlay);
            psychoJS.window._renderer.view.style.display = 'block';
            pcode_done = true;
        });
    }
    psychoJS.experiment.addData('Participant_Code.started', globalClock.getTime());
    Participant_CodeMaxDuration = null
    // keep track of which components have finished
    Participant_CodeComponents = [];
    Participant_CodeComponents.push(text_placeholder);
    
    for (const thisComponent of Participant_CodeComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function Participant_CodeRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Participant_Code' ---
    // get current time
    t = Participant_CodeClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_placeholder* updates
    if (t >= 0.0 && text_placeholder.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_placeholder.tStart = t;  // (not accounting for frame time here)
      text_placeholder.frameNStart = frameN;  // exact frame index
      
      text_placeholder.setAutoDraw(true);
    }
    
    
    // if text_placeholder is active this frame...
    if (text_placeholder.status === PsychoJS.Status.STARTED) {
    }
    
    if (pcode_done) {
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
    for (const thisComponent of Participant_CodeComponents)
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


function Participant_CodeRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Participant_Code' ---
    for (const thisComponent of Participant_CodeComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('Participant_Code.stopped', globalClock.getTime());
    if (!quickMode) psychoJS.experiment.addData('participant_code', participant_code);
    // the Routine "Participant_Code" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var DemographicsMaxDurationReached;
var demo_done;
var DemographicsMaxDuration;
var DemographicsComponents;
function DemographicsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Demographics' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // keep track of whether this Routine was forcibly ended
    routineForceEnded = false;
    DemographicsClock.reset();
    routineTimer.reset();
    DemographicsMaxDurationReached = false;
    // update component parameters for each repeat
    if (quickMode) {
        continueRoutine = false;
        demo_done = true;
    } else {
        // Hide the PsychoJS canvas temporarily
        psychoJS.window._renderer.view.style.display = 'none';
    
        // Create overlay form
        var overlay = document.createElement('div');
        overlay.id = 'demo-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#000;display:flex;align-items:center;justify-content:center;z-index:9999;overflow-y:auto;';
    
        // global vars
        demo_age = '';
        demo_gender = '';
        demo_gender_self = '';
        demo_native_english = '';
        demo_english_level = '';
        demo_vision = '';
        demo_education = '';
        demo_student = '';
        demo_field_of_study = '';
        demo_done = false;
        demo_screenout = false;
        demo_screenout_reason = '';
    
        overlay.innerHTML = '\
        <div style="background:#222;padding:40px;border-radius:8px;color:white;font-family:Arial;min-width:440px;max-width:520px;max-height:90vh;overflow-y:auto;">\
          <h2 style="margin-top:0;">Demographics</h2>\
        \
          <div style="margin-bottom:20px;">\
            <label style="display:block;margin-bottom:8px;">Age</label>\
            <input id="demo-age" type="number" min="1" max="100" step="1" style="width:100%;padding:8px;font-size:16px;border-radius:4px;box-sizing:border-box;">\
          </div>\
        \
          <div style="margin-bottom:20px;">\
            <label style="display:block;margin-bottom:8px;">Gender</label>\
            <select id="demo-gender" style="width:100%;padding:8px;font-size:16px;border-radius:4px;">\
              <option value="">-- Select --</option>\
              <option value="female">Female</option>\
              <option value="male">Male</option>\
              <option value="non_binary">Non-binary / Third gender</option>\
              <option value="self_describe">Prefer to self-describe</option>\
              <option value="prefer_not">Prefer not to say</option>\
            </select>\
          </div>\
          <div id="demo-gender-self-wrap" style="display:none;margin-bottom:20px;margin-top:-10px;">\
            <label style="display:block;margin-bottom:8px;">Please self-describe</label>\
            <input id="demo-gender-self" type="text" style="width:100%;padding:8px;font-size:16px;border-radius:4px;box-sizing:border-box;">\
          </div>\
        \
          <div style="margin-bottom:20px;">\
            <label style="display:block;margin-bottom:8px;">Is English your first / native language?</label>\
            <select id="demo-native" style="width:100%;padding:8px;font-size:16px;border-radius:4px;">\
              <option value="">-- Select --</option>\
              <option value="yes">Yes</option>\
              <option value="no">No</option>\
            </select>\
          </div>\
          <div id="demo-english-level-wrap" style="display:none;margin-bottom:20px;margin-top:-10px;">\
            <label style="display:block;margin-bottom:8px;">Self-rated English proficiency</label>\
            <select id="demo-english-level" style="width:100%;padding:8px;font-size:16px;border-radius:4px;">\
              <option value="">-- Select --</option>\
              <option value="A1">A1</option>\
              <option value="A2">A2</option>\
              <option value="B1">B1</option>\
              <option value="B2">B2</option>\
              <option value="C1">C1</option>\
              <option value="C2">C2</option>\
              <option value="native_like">Native-like</option>\
            </select>\
          </div>\
        \
          <div style="margin-bottom:20px;">\
            <label style="display:block;margin-bottom:8px;">Do you have normal or corrected-to-normal vision (e.g., wearing glasses/contacts)?</label>\
            <select id="demo-vision" style="width:100%;padding:8px;font-size:16px;border-radius:4px;">\
              <option value="">-- Select --</option>\
              <option value="yes">Yes</option>\
              <option value="no">No</option>\
            </select>\
          </div>\
        \
          <div style="margin-bottom:20px;">\
            <label style="display:block;margin-bottom:8px;">Highest level of education</label>\
            <select id="demo-education" style="width:100%;padding:8px;font-size:16px;border-radius:4px;">\
              <option value="">-- Select --</option>\
              <option value="high_school">High school diploma / Secondary school</option>\
              <option value="some_college">Some college / university</option>\
              <option value="bachelor">Bachelor\'s degree</option>\
              <option value="master">Master\'s degree / Graduate diploma</option>\
              <option value="doctorate">Doctorate (PhD / MD)</option>\
              <option value="other">Other</option>\
            </select>\
          </div>\
        \
          <div style="margin-bottom:20px;">\
            <label style="display:block;margin-bottom:8px;">Are you currently a university student?</label>\
            <select id="demo-student" style="width:100%;padding:8px;font-size:16px;border-radius:4px;">\
              <option value="">-- Select --</option>\
              <option value="yes">Yes</option>\
              <option value="no">No</option>\
            </select>\
          </div>\
          <div id="demo-field-wrap" style="display:none;margin-bottom:30px;margin-top:-10px;">\
            <label style="display:block;margin-bottom:8px;">Field of study</label>\
            <select id="demo-field" style="width:100%;padding:8px;font-size:16px;border-radius:4px;margin-bottom:8px;">\
              <option value="">-- Select --</option>\
              <option value="natural_sciences">Natural Sciences</option>\
              <option value="engineering">Engineering / Technology</option>\
              <option value="computer_science">Computer Science / IT</option>\
              <option value="social_sciences">Social Sciences</option>\
              <option value="psychology">Psychology</option>\
              <option value="humanities">Humanities</option>\
              <option value="medicine_health">Medicine / Health Sciences</option>\
              <option value="business_economics">Business / Economics</option>\
              <option value="law">Law</option>\
              <option value="arts">Arts / Design</option>\
              <option value="education">Education</option>\
              <option value="other">Other</option>\
            </select>\
            <input id="demo-field-other" type="text" placeholder="Please specify" style="width:100%;padding:8px;font-size:16px;border-radius:4px;box-sizing:border-box;display:none;">\
          </div>\
        \
          <button id="demo-submit" style="width:100%;padding:12px;margin-top:10px;background:darkgrey;color:white;border:none;border-radius:4px;font-size:16px;cursor:pointer;">Continue</button>\
          <p id="demo-error" style="color:red;display:none;margin-top:10px;">Please answer all questions.</p>\
        </div>';
    
        document.body.appendChild(overlay);
    
        // --- conditional field toggling ---
        document.getElementById('demo-gender').addEventListener('change', function() {
            document.getElementById('demo-gender-self-wrap').style.display =
                (this.value === 'self_describe') ? 'block' : 'none';
        });
    
        document.getElementById('demo-native').addEventListener('change', function() {
            document.getElementById('demo-english-level-wrap').style.display =
                (this.value === 'no') ? 'block' : 'none';
        });
    
        document.getElementById('demo-student').addEventListener('change', function() {
            document.getElementById('demo-field-wrap').style.display =
                (this.value === 'yes') ? 'block' : 'none';
        });
    
        document.getElementById('demo-field').addEventListener('change', function() {
            document.getElementById('demo-field-other').style.display =
                (this.value === 'other') ? 'block' : 'none';
        });
    
        // --- helper: replace overlay content with a screen-out message and quit ---
        function demoScreenOut(reason) {
            demo_screenout = true;
            demo_screenout_reason = reason;
            overlay.querySelector('div').innerHTML =
                '<h2 style="margin-top:0;">Thank you</h2>' +
                '<p>' + reason + '</p>' +
                '<p>Unfortunately you do not meet the eligibility criteria for this study. The experiment will now close.</p>';
    
            setTimeout(function() {
                psychoJS.quit({message: reason, isCompleted: false});
            }, 4000);
        }
    
        document.getElementById('demo-submit').addEventListener('click', function() {
            var age = document.getElementById('demo-age').value;
            var gender = document.getElementById('demo-gender').value;
            var genderSelf = document.getElementById('demo-gender-self').value;
            var nativeEnglish = document.getElementById('demo-native').value;
            var englishLevel = document.getElementById('demo-english-level').value;
            var vision = document.getElementById('demo-vision').value;
            var education = document.getElementById('demo-education').value;
            var student = document.getElementById('demo-student').value;
            var field = document.getElementById('demo-field').value;
            var fieldOther = document.getElementById('demo-field-other').value;
    
            // --- required-field validation ---
            var missing = !age || !gender || !nativeEnglish || !vision ||
                          !education || !student;
    
            if (gender === 'self_describe' && !genderSelf.trim()) missing = true;
            if (nativeEnglish === 'no' && !englishLevel) missing = true;
            if (student === 'yes' && !field) missing = true;
            if (student === 'yes' && field === 'other' && !fieldOther.trim()) missing = true;
    
            var ageNum = parseInt(age, 10);
            if (!age || isNaN(ageNum) || ageNum < 1 || ageNum > 100) missing = true;
    
            if (missing) {
                document.getElementById('demo-error').style.display = 'block';
                return;
            }
    
            // --- eligibility / screen-out checks ---
            if (ageNum < 18) {
                demoScreenOut('You must be 18 years or older to participate in this study.');
                return;
            }
    
            if (nativeEnglish === 'no') {
                var levelOrder = {A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6, native_like: 7};
                if (levelOrder[englishLevel] < levelOrder['B2']) {
                    demoScreenOut('This study requires an English proficiency of at least B2.');
                    return;
                }
            }
    
            // --- store in global vars, save in RoutineEnd ---
            demo_age = ageNum;
            demo_gender = (gender === 'self_describe') ? genderSelf.trim() : gender;
            demo_native_english = nativeEnglish;
            demo_english_level = (nativeEnglish === 'no') ? englishLevel : 'native';
            demo_vision = vision;
            demo_education = education;
            demo_student = student;
            demo_field_of_study = (student === 'yes') ? ((field === 'other') ? fieldOther.trim() : field) : '';
    
            // clean up
            document.body.removeChild(overlay);
            psychoJS.window._renderer.view.style.display = 'block';
            demo_done = true;
        });
    }
    psychoJS.experiment.addData('Demographics.started', globalClock.getTime());
    DemographicsMaxDuration = null
    // keep track of which components have finished
    DemographicsComponents = [];
    DemographicsComponents.push(text_placeholder3);
    
    for (const thisComponent of DemographicsComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function DemographicsRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Demographics' ---
    // get current time
    t = DemographicsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_placeholder3* updates
    if (t >= 0.0 && text_placeholder3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_placeholder3.tStart = t;  // (not accounting for frame time here)
      text_placeholder3.frameNStart = frameN;  // exact frame index
      
      text_placeholder3.setAutoDraw(true);
    }
    
    
    // if text_placeholder3 is active this frame...
    if (text_placeholder3.status === PsychoJS.Status.STARTED) {
    }
    
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
    for (const thisComponent of DemographicsComponents)
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


function DemographicsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Demographics' ---
    for (const thisComponent of DemographicsComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('Demographics.stopped', globalClock.getTime());
    if (!quickMode) {
        // ensure canvas is visible again in case something went wrong
        psychoJS.window._renderer.view.style.display = 'block';
        // save questionnaire data
        psychoJS.experiment.addData('age', demo_age);
        psychoJS.experiment.addData('gender', demo_gender);
        psychoJS.experiment.addData('native_english', demo_native_english);
        psychoJS.experiment.addData('english_level', demo_english_level);
        psychoJS.experiment.addData('vision', demo_vision);
        psychoJS.experiment.addData('education', demo_education);
        psychoJS.experiment.addData('student', demo_student);
        psychoJS.experiment.addData('field_of_study', demo_field_of_study);
        psychoJS.experiment.nextEntry();
        // the Routine "Questionnaire" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset();
    }
    // the Routine "Demographics" was not non-slip safe, so reset the non-slip timer
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
        keyList: typeof 'return' === 'string' ? ['return'] : 'return', 
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
var conditionFailed;
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
    conditionFailed = false;
    condition = null;
    conditionsFile = null;
    
    fetch("https://pipe.jspsych.org/api/condition/", {
        method: "POST",
        headers: {"Content-Type": "application/json", "Accept": "*/*"},
        body: JSON.stringify({experimentID: "eonAagK4IATa"})
    })
    .then(function(r) {
        return r.json().then(function(d) { return {ok: r.ok, data: d}; });
    })
    .then(function(res) {
        var c = res.data.condition;
        if (!res.ok || res.data.error || !Number.isInteger(c) || c < 0 || c > 3) {
            throw new Error("Bad condition response: " + JSON.stringify(res.data));
        }
        condition = c;
        conditionsFile = "resources/conditions/condition_" + condition + ".xlsx";
        conditionReady = true;
    })
    .catch(function(error) {
        console.error("Condition request failed:", error);
        conditionFailed = true;   // NO fallback condition
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
    
    if (conditionFailed) {
        wait_text.setText('The experiment could not be started. Please close this window and contact the study leads.');
        if (!window._condQuitScheduled) {
            window._condQuitScheduled = true;
            setTimeout(function() { psychoJS.quit({message: 'Condition assignment failed.', isCompleted: false}); }, 8000);
        }
        return Scheduler.Event.FLIP_REPEAT;
    }
    if (conditionReady) {
        return Scheduler.Event.NEXT;
    }
    return Scheduler.Event.FLIP_REPEAT;
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
      nReps: sceneLoopNum, method: TrialHandler.Method.SEQUENTIAL,
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
      Scene_LoopLoopScheduler.add(load_scene_picturesRoutineBegin(snapshot));
      Scene_LoopLoopScheduler.add(load_scene_picturesRoutineEachFrame());
      Scene_LoopLoopScheduler.add(load_scene_picturesRoutineEnd(snapshot));
      Scene_LoopLoopScheduler.add(Scene_Presentation_TripleRoutineBegin(snapshot));
      Scene_LoopLoopScheduler.add(Scene_Presentation_TripleRoutineEachFrame());
      Scene_LoopLoopScheduler.add(Scene_Presentation_TripleRoutineEnd(snapshot));
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
      nReps: faceRankingLoopNum, method: TrialHandler.Method.SEQUENTIAL,
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


var load_scene_picturesMaxDurationReached;
var load_scene_picturesMaxDuration;
var load_scene_picturesComponents;
function load_scene_picturesRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'load_scene_pictures' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // keep track of whether this Routine was forcibly ended
    routineForceEnded = false;
    load_scene_picturesClock.reset();
    routineTimer.reset();
    load_scene_picturesMaxDurationReached = false;
    // update component parameters for each repeat
    facesPromise = null;
    sceneImagesReady = false;
    var sceneRes = [scene_image, face_image, item_image].map(function (p) {
        return { name: p, path: p };
    });
    psychoJS.serverManager.prepareResources(sceneRes)
        .then(function () { sceneImagesReady = true; startFacePrefetch(); })
        .catch(function (e) {
            console.error("Scene image load failed:", sceneRes, e);
            sceneImagesReady = true;
            startFacePrefetch();
        });
    psychoJS.experiment.addData('load_scene_pictures.started', globalClock.getTime());
    load_scene_picturesMaxDuration = null
    // keep track of which components have finished
    load_scene_picturesComponents = [];
    load_scene_picturesComponents.push(text_placeholder6);
    
    for (const thisComponent of load_scene_picturesComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function load_scene_picturesRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'load_scene_pictures' ---
    // get current time
    t = load_scene_picturesClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    if (sceneImagesReady) {
       continueRoutine = false;
    }
    
    // *text_placeholder6* updates
    if (t >= 0.0 && text_placeholder6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_placeholder6.tStart = t;  // (not accounting for frame time here)
      text_placeholder6.frameNStart = frameN;  // exact frame index
      
      text_placeholder6.setAutoDraw(true);
    }
    
    
    // if text_placeholder6 is active this frame...
    if (text_placeholder6.status === PsychoJS.Status.STARTED) {
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
    for (const thisComponent of load_scene_picturesComponents)
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


function load_scene_picturesRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'load_scene_pictures' ---
    for (const thisComponent of load_scene_picturesComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('load_scene_pictures.stopped', globalClock.getTime());
    // the Routine "load_scene_pictures" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var Scene_Presentation_TripleMaxDurationReached;
var scene_position_slot;
var face_position_slot;
var item_position_slot;
var _key_resp_5_allKeys;
var Scene_Presentation_TripleMaxDuration;
var Scene_Presentation_TripleComponents;
function Scene_Presentation_TripleRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Scene_Presentation_Triple' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // keep track of whether this Routine was forcibly ended
    routineForceEnded = false;
    Scene_Presentation_TripleClock.reset();
    routineTimer.reset();
    Scene_Presentation_TripleMaxDurationReached = false;
    // update component parameters for each repeat
    // Jeder Slot hat eine feste Position UND eine feste Größe,
    // damit das Layout immer gleich aussieht, egal welches Bild wo landet.
    var sceneSlots = [
        { pos: [0, 0.5],        size: [0.75, 0.75] },
        { pos: [-0.35, -0.35],  size: [0.5, 0.5] },
        { pos: [0.35, -0.35],   size: [0.5, 0.5] }
    ];
    
    // Kopie mischen (Fisher-Yates Shuffle)
    var shuffledSlots = sceneSlots.slice();
    for (var i = shuffledSlots.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = shuffledSlots[i];
        shuffledSlots[i] = shuffledSlots[j];
        shuffledSlots[j] = temp;
    }
    
    scene_triple.setPos(shuffledSlots[0].pos);
    scene_triple.setSize(shuffledSlots[0].size);
    
    face_triple.setPos(shuffledSlots[1].pos);
    face_triple.setSize(shuffledSlots[1].size);
    
    item_triple.setPos(shuffledSlots[2].pos);
    item_triple.setSize(shuffledSlots[2].size);
    
    // merken, welcher Slot (1 = oben groß, 2 = unten links, 3 = unten rechts) an wen ging
    scene_position_slot = sceneSlots.indexOf(shuffledSlots[0]) + 1;
    face_position_slot = sceneSlots.indexOf(shuffledSlots[1]) + 1;
    item_position_slot = sceneSlots.indexOf(shuffledSlots[2]) + 1;
    scene_triple.setImage(scene_image);
    face_triple.setImage(face_image);
    item_triple.setImage(item_image);
    description_triple.setText(context_text);
    key_resp_5.keys = undefined;
    key_resp_5.rt = undefined;
    _key_resp_5_allKeys = [];
    psychoJS.experiment.addData('Scene_Presentation_Triple.started', globalClock.getTime());
    Scene_Presentation_TripleMaxDuration = null
    // keep track of which components have finished
    Scene_Presentation_TripleComponents = [];
    Scene_Presentation_TripleComponents.push(scene_triple);
    Scene_Presentation_TripleComponents.push(face_triple);
    Scene_Presentation_TripleComponents.push(item_triple);
    Scene_Presentation_TripleComponents.push(description_triple);
    Scene_Presentation_TripleComponents.push(text_continue_triple);
    Scene_Presentation_TripleComponents.push(key_resp_5);
    
    for (const thisComponent of Scene_Presentation_TripleComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function Scene_Presentation_TripleRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Scene_Presentation_Triple' ---
    // get current time
    t = Scene_Presentation_TripleClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *scene_triple* updates
    if (t >= 0.0 && scene_triple.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      scene_triple.tStart = t;  // (not accounting for frame time here)
      scene_triple.frameNStart = frameN;  // exact frame index
      
      scene_triple.setAutoDraw(true);
    }
    
    
    // if scene_triple is active this frame...
    if (scene_triple.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *face_triple* updates
    if (t >= 0.0 && face_triple.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      face_triple.tStart = t;  // (not accounting for frame time here)
      face_triple.frameNStart = frameN;  // exact frame index
      
      face_triple.setAutoDraw(true);
    }
    
    
    // if face_triple is active this frame...
    if (face_triple.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *item_triple* updates
    if (t >= 0.0 && item_triple.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      item_triple.tStart = t;  // (not accounting for frame time here)
      item_triple.frameNStart = frameN;  // exact frame index
      
      item_triple.setAutoDraw(true);
    }
    
    
    // if item_triple is active this frame...
    if (item_triple.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *description_triple* updates
    if (t >= 0.0 && description_triple.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      description_triple.tStart = t;  // (not accounting for frame time here)
      description_triple.frameNStart = frameN;  // exact frame index
      
      description_triple.setAutoDraw(true);
    }
    
    
    // if description_triple is active this frame...
    if (description_triple.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *text_continue_triple* updates
    if (t >= 0.0 && text_continue_triple.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_continue_triple.tStart = t;  // (not accounting for frame time here)
      text_continue_triple.frameNStart = frameN;  // exact frame index
      
      text_continue_triple.setAutoDraw(true);
    }
    
    
    // if text_continue_triple is active this frame...
    if (text_continue_triple.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *key_resp_5* updates
    if (t >= 0.0 && key_resp_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_5.tStart = t;  // (not accounting for frame time here)
      key_resp_5.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_5.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_5.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_5.clearEvents(); });
    }
    
    // if key_resp_5 is active this frame...
    if (key_resp_5.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_5.getKeys({
        keyList: typeof 'return' === 'string' ? ['return'] : 'return', 
        waitRelease: false
      });
      _key_resp_5_allKeys = _key_resp_5_allKeys.concat(theseKeys);
      if (_key_resp_5_allKeys.length > 0) {
        key_resp_5.keys = _key_resp_5_allKeys[_key_resp_5_allKeys.length - 1].name;  // just the last key pressed
        key_resp_5.rt = _key_resp_5_allKeys[_key_resp_5_allKeys.length - 1].rt;
        key_resp_5.duration = _key_resp_5_allKeys[_key_resp_5_allKeys.length - 1].duration;
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
    for (const thisComponent of Scene_Presentation_TripleComponents)
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


function Scene_Presentation_TripleRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Scene_Presentation_Triple' ---
    for (const thisComponent of Scene_Presentation_TripleComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('Scene_Presentation_Triple.stopped', globalClock.getTime());
    psychoJS.experiment.addData('scene_position_slot', scene_position_slot);
    psychoJS.experiment.addData('face_position_slot', face_position_slot);
    psychoJS.experiment.addData('item_position_slot', item_position_slot);
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_resp_5.corr, level);
    }
    psychoJS.experiment.addData('key_resp_5.keys', key_resp_5.keys);
    if (typeof key_resp_5.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_5.rt', key_resp_5.rt);
        psychoJS.experiment.addData('key_resp_5.duration', key_resp_5.duration);
        routineTimer.reset();
        }
    
    key_resp_5.stop();
    // the Routine "Scene_Presentation_Triple" was not non-slip safe, so reset the non-slip timer
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
    var text_length = (response_box.text) ? response_box.text.replace(/\s/g, '').length : 0;
    
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
    psychoJS.experiment.addData('description_char_count', response_box.text ? response_box.text.replace(/\s/g, '').length : 0);
    psychoJS.experiment.addData('description_word_count', response_box.text ? response_box.text.trim().split(/\s+/).filter(Boolean).length : 0);
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
    facesReady = false;
    if (!facesPromise) { startFacePrefetch(); }   // safety net
    facesPromise.then(function () { facesReady = true; });
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
var faceNumber;
var folderName;
var faceBasePath;
var picked;
var originalPositions;
var locations;
var slotNames;
var occupiedSlots;
var movingPiece;
var snapThresh;
var mouseReleased;
var submit_allowed;
var placement_count;
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
    faceNumber = Face_Ranking_Loop.thisN + 1;
    
    // Get the corresponding face-folder column from the condition file.
    folderName = eval("face_folder_" + faceNumber);
    
    // Build the base directory.
    faceBasePath = "resources/faces/" + gender + "/" + folderName + "/";
    
    // Build paths for the six faces.
    var face1Path = faceBasePath + "1.png";
    var face2Path = faceBasePath + "2.png";
    var face3Path = faceBasePath + "3.png";
    var face4Path = faceBasePath + "4.png";
    var face5Path = faceBasePath + "5.png";
    var face6Path = faceBasePath + "6.png";
    
    console.log("Face ranking:", faceNumber);
    console.log("Folder:", folderName);
    console.log("Faces:", face1Path, face2Path, face3Path, face4Path, face5Path, face6Path);
    image_1.setSize(aspectCorrectedSize(0.3, 0.3));
    image_1.setImage(face1Path);
    image_2.setSize(aspectCorrectedSize(0.3, 0.3));
    image_2.setImage(face2Path);
    image_3.setSize(aspectCorrectedSize(0.3, 0.3));
    image_3.setImage(face3Path);
    image_4.setSize(aspectCorrectedSize(0.3, 0.3));
    image_4.setImage(face4Path);
    image_5.setSize(aspectCorrectedSize(0.3, 0.3));
    image_5.setImage(face5Path);
    image_6.setSize(aspectCorrectedSize(0.3, 0.3));
    image_6.setImage(face6Path);
    pos_1.setSize(aspectCorrectedSize(0.32, 0.32));
    pos_2.setSize(aspectCorrectedSize(0.32, 0.32));
    pos_3.setSize(aspectCorrectedSize(0.32, 0.32));
    pos_4.setSize(aspectCorrectedSize(0.32, 0.32));
    pos_5.setSize(aspectCorrectedSize(0.32, 0.32));
    pos_6.setSize(aspectCorrectedSize(0.32, 0.32));
    // Run 'Begin Routine' code from snap_pictures
    picked = [image_1, image_2, image_3, image_4, image_5, image_6];
    
    // original positions
    originalPositions = {
        "image_1": [-0.85, -0.25],
        "image_2": [-0.51, -0.25],
        "image_3": [-0.17, -0.25],
        "image_4": [ 0.17, -0.25],
        "image_5": [ 0.51, -0.25],
        "image_6": [ 0.85, -0.25]
    };
    
    // ranking slots
    locations = [
        [-0.85, 0.25],
        [-0.51, 0.25],
        [-0.17, 0.25],
        [ 0.17, 0.25],
        [ 0.51, 0.25],
        [ 0.85, 0.25]
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
    
    placement_count = 0;
    // setup some python lists for storing info about the mouse
    gotValidClick = false; // until a click is received
    // Run 'Begin Routine' code from timer
    task_timer_start = globalClock.getTime();
    task_timer_duration = 40;
    finish_ranking_key.keys = undefined;
    finish_ranking_key.rt = undefined;
    _finish_ranking_key_allKeys = [];
    psychoJS.experiment.addData('Face_Ranking.started', globalClock.getTime());
    Face_RankingMaxDuration = 40
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
                    placement_count += 1;
    
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
    
    psychoJS.experiment.addData('ranking_timed_out', (Face_RankingMaxDurationReached || time_left <= 0));
    psychoJS.experiment.addData('ranking_completed_all_slots', submit_allowed);
    psychoJS.experiment.addData('ranking_response_time', Face_RankingClock.getTime());
    psychoJS.experiment.addData('face_set_number', faceNumber);
    psychoJS.experiment.addData('face_folder', folderName);
    psychoJS.experiment.addData('ranking_placement_count', placement_count);
    
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
    // Insgesamt gebrauchte Zeit
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
    if (!quickMode) {
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
    
        var participantID = participant_code || "UNKNOWN";
        var sceneNum = (Scene_Loop.thisN !== undefined ? Scene_Loop.thisN : 0) + 1;
        var filename = "participant_" + participantID + "_" + sessionTag + "_scene_" + sceneNum + ".csv";
        saveToDataPipe(filename, convertToCSV(allRows));   // no await: don't block the next scene
    }
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


var End_DemographicsMaxDurationReached;
var End_DemographicsMaxDuration;
var End_DemographicsComponents;
function End_DemographicsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'End_Demographics' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // keep track of whether this Routine was forcibly ended
    routineForceEnded = false;
    End_DemographicsClock.reset();
    routineTimer.reset();
    End_DemographicsMaxDurationReached = false;
    // update component parameters for each repeat
    if (quickMode) {
        continueRoutine = false;
        demo_done = true;
    } else {
        // Hide the PsychoJS canvas temporarily
        psychoJS.window._renderer.view.style.display = 'none';
    
        // Create overlay form
        var overlay = document.createElement('div');
        overlay.id = 'demo-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#000;display:flex;align-items:center;justify-content:center;z-index:9999;overflow-y:auto;';
    
        // global vars
        demo_ethnicity = '';
        demo_country_code = '';
        demo_country_name = '';
        demo_done = false;
    
        overlay.innerHTML = '\
        <div style="background:#222;padding:40px;border-radius:8px;color:white;font-family:Arial;min-width:440px;max-width:520px;max-height:90vh;overflow-y:auto;">\
          <h2 style="margin-top:0;">Demographics</h2>\
        \
          <div style="margin-bottom:20px;">\
            <label style="display:block;margin-bottom:8px;">Ethnic background</label>\
            <select id="demo-race" style="width:100%;padding:8px;font-size:16px;border-radius:4px;">\
              <option value="">-- Select --</option>\
              <option value="white">White / Caucasian</option>\
              <option value="middle_eastern">Middle Eastern / Arab / North African</option>\
              <option value="black">Black / African descent</option>\
              <option value="asian">Asian</option>\
              <option value="hispanic">Hispanic / Latino</option>\
              <option value="multiracial">Multiracial</option>\
              <option value="prefer_not">Prefer not to say</option>\
            </select>\
          </div>\
        \
          <div style="margin-bottom:30px;">\
            <label style="display:block;margin-bottom:8px;">In which country do you currently reside?</label>\
            <select id="demo-country" style="width:100%;padding:8px;font-size:16px;border-radius:4px;">\
              <option value="">-- Select --</option>\
            </select>\
          </div>\
        \
          <button id="demo-submit" style="width:100%;padding:12px;background:darkgrey;color:white;border:none;border-radius:4px;font-size:16px;cursor:pointer;">Continue</button>\
          <p id="demo-error" style="color:red;display:none;margin-top:10px;">Please answer all questions.</p>\
        </div>';
    
        document.body.appendChild(overlay);
    
        // --- build country list (ISO 3166-1 alpha-2 codes) ---
        var countryCodes = ('AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ ' +
            'CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR ' +
            'GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP ' +
            'KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ ' +
            'NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW ' +
            'SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ ' +
            'UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW').split(' ');
    
        // Language of the country names: 'en' -> "Germany", 'de' -> "Deutschland"
        var countryLocale = 'en';
    
        var displayNames = null;
        try {
            displayNames = new Intl.DisplayNames([countryLocale], {type: 'region'});
        } catch (e) {
            displayNames = null;
        }
    
        var countries = [];
        for (var c = 0; c < countryCodes.length; c++) {
            var code = countryCodes[c];
            var name = code;
            try {
                if (displayNames) name = displayNames.of(code) || code;
            } catch (e) {}
            countries.push({code: code, name: name});
        }
    
        countries.sort(function(a, b) {
            return a.name.localeCompare(b.name, countryLocale);
        });
    
        var countrySelect = document.getElementById('demo-country');
        for (var k = 0; k < countries.length; k++) {
            var opt = document.createElement('option');
            opt.value = countries[k].code;
            opt.textContent = countries[k].name;
            countrySelect.appendChild(opt);
        }
    
        // --- submit ---
        document.getElementById('demo-submit').addEventListener('click', function() {
            var race = document.getElementById('demo-race').value;
            var countrySel = document.getElementById('demo-country');
            var countryCode = countrySel.value;
    
            if (!race || !countryCode) {
                document.getElementById('demo-error').style.display = 'block';
                return;
            }
    
            demo_ethnicity = race;
            demo_country_code = countryCode;
            demo_country_name = countrySel.options[countrySel.selectedIndex].text;
    
            // clean up
            document.body.removeChild(overlay);
            psychoJS.window._renderer.view.style.display = 'block';
            demo_done = true;
        });
    }
    psychoJS.experiment.addData('End_Demographics.started', globalClock.getTime());
    End_DemographicsMaxDuration = null
    // keep track of which components have finished
    End_DemographicsComponents = [];
    End_DemographicsComponents.push(text_placeholder4);
    
    for (const thisComponent of End_DemographicsComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function End_DemographicsRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'End_Demographics' ---
    // get current time
    t = End_DemographicsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_placeholder4* updates
    if (t >= 0.0 && text_placeholder4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_placeholder4.tStart = t;  // (not accounting for frame time here)
      text_placeholder4.frameNStart = frameN;  // exact frame index
      
      text_placeholder4.setAutoDraw(true);
    }
    
    
    // if text_placeholder4 is active this frame...
    if (text_placeholder4.status === PsychoJS.Status.STARTED) {
    }
    
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
    for (const thisComponent of End_DemographicsComponents)
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


function End_DemographicsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'End_Demographics' ---
    for (const thisComponent of End_DemographicsComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('End_Demographics.stopped', globalClock.getTime());
    if (!quickMode) {
        // ensure canvas is visible again in case something went wrong
        psychoJS.window._renderer.view.style.display = 'block';
        // save questionnaire data
        psychoJS.experiment.addData('ethnic_background', demo_ethnicity);
        psychoJS.experiment.addData('country_code', demo_country_code);
        psychoJS.experiment.addData('country_name', demo_country_name);
        // the Routine "Questionnaire" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset();
    }
    // the Routine "End_Demographics" was not non-slip safe, so reset the non-slip timer
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
    psychoJS._saveResults = 0;
    
    await saveToDataPipe(
        "participant_" + (participant_code || "UNKNOWN") + "_" + sessionTag + "_final.csv",
        convertToCSV(psychoJS.experiment._trialsData)
    );
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

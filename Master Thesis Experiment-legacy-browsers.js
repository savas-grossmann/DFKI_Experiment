/********************************* 
 * Master Thesis Experiment *
 *********************************/


// store info about the experiment session:
let expName = 'Master Thesis Experiment';  // from the Builder filename that created this script
let expInfo = {};
let PILOTING = util.getUrlParameters().has('__pilotToken');

// Start code blocks for 'Before Experiment'
// Run 'Before Experiment' code from choose_language_code
//language options
var lang = '';
var lang_done = false;
var lang_rt = null;
// ?SONA=TRUE (or 1 / yes) in the study URL turns the Sona parts on. Name and value are case-insensitive.

function urlFlag(name) {
    var found = false;
    var params = new URLSearchParams(window.location.search);
    params.forEach(function(value, key) {
        if (key.toLowerCase() === name.toLowerCase()) {
            var v = value.toLowerCase();
            found = (v === 'true' || v === '1' || v === 'yes');
        }
    });
    return found;
}

var use_sona = urlFlag('sona');
// Consent
var consent_given = false;
var consent_declined = false;
var consent_done = false;
var consent_1 = false;
var consent_2 = false;
var consent_rt = null;

// Participant code
var participant_code = '';
var pcode_done = false;

// Demographics
var demo_age = '';
var demo_gender = '';
var demo_gender_self = '';
var demo_native_english = '';
var demo_english_level = '';
var demo_vision = '';
var demo_education = '';
var demo_student = '';
var demo_field_of_study = '';
var demo_done = false;
var demo_screenout = false;
var demo_screenout_reason = '';

// End demographics
var demo_ethnicity = '';
var demo_country_code = '';
var demo_country_name = '';
var TX = {
    en: {
        // face description routine
        task_description: 'Give a short description of the face of the person that you saw. Write at least 50 characters to proceed.',

        // ranking routine
        ranking_bar_left: '◄ Most likely',
        ranking_bar_right: 'Least likely ►',
        ranking_prompt: 'Rank the faces according to how likely they match the scene.',

        // generic
        continue_hint: 'Press ENTER to continue',
        text_continue_triple: 'Press ENTER to continue',
        finish_ranking_text: 'Press ENTER to continue',        
        desc_hint: 'Press ENTER to continue ({n}/at least 50 characters)'
    },
    de: {
        task_description: 'Beschreiben Sie kurz das Gesicht der Person, die Sie gesehen haben. Schreiben Sie mindestens 50 Zeichen, um fortzufahren.',

        ranking_bar_left: '◄ Am wahrscheinlichsten',
        ranking_bar_right: 'Am unwahrscheinlichsten ►',
        ranking_prompt: 'Bringen Sie die Gesichter in eine Rangfolge, wie wahrscheinlich sie zur Szene passen.',

        continue_hint: 'Drücken Sie ENTER, um fortzufahren',
        text_continue_triple: 'Drücken Sie ENTER, um fortzufahren',
        finish_ranking_text: 'Drücken Sie ENTER, um fortzufahren',
        desc_hint: 'Drücken Sie ENTER, um fortzufahren ({n}/mindestens 50 Zeichen)'
    }
};

// Translate by key, for texts built in code

function tr(key) {
    var l = (typeof lang !== 'undefined' && lang === 'de') ? 'de' : 'en';
    return TX[l][key];
}

// Translate whole components: applyLang(face_prompt, label_most_likely, ...)
// The component's name in Builder is used as the dictionary key.

function applyLang() {
    for (var i = 0; i < arguments.length; i++) {
        var c = arguments[i];
        var key = c.name || c._name;
        var txt = key ? tr(key) : undefined;
        if (txt === undefined) {
            console.warn('No translation for component: ' + key);
            continue;
        }
        c.setText(txt);
    }
}
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


// =============================================
// SUPABASE CONFIGURATION
// =============================================

var SUPABASE_URL = "https://msirntwrwjuzgdbedxvy.supabase.co";
var SUPABASE_ANON_KEY = "sb_publishable_9v_QmPRWGmHqb6SMyeGO6g_uYGPieRj";

// =============================================
// SAVE RESULTS TO SUPABASE
// =============================================



async function saveToSupabase(participantID, rows) {

    if (!participantID || participantID === "UNKNOWN") {
        console.error("Supabase save aborted: missing participant ID");
        return false;
    }

    var payload = {
        session_tag: sessionTag,
        experiment: "bias",
        rows: rows
    };

    var url = SUPABASE_URL +
        "/rest/v1/rpc/save_experiment_result";

    for (var attempt = 1; attempt <= 3; attempt++) {

        try {

            var response = await fetch(url, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "apikey": SUPABASE_ANON_KEY
                },

                body: JSON.stringify({
                    p_participant_id: participantID,
                    p_data: payload
                })
            });

            if (response.ok) {
                console.log(
                    "Supabase save successful:",
                    participantID,
                    "Rows:",
                    rows.length
                );

                return true;
            }

            var errorText = await response.text();

            console.error(
                "Supabase RPC save failed:",
                response.status,
                errorText
            );

        } catch (error) {

            console.error("Supabase network error:", error);

        }

        if (attempt < 3) {
            await new Promise(function(resolve) {
                setTimeout(resolve, 1500 * attempt);
            });
        }
    }

    console.error("Supabase save failed after 3 attempts.");
    return false;
}

window.startFacePrefetch = function() {

    var folders = [
        face_folder_1, face_folder_2, face_folder_3, face_folder_4,
        face_folder_5, face_folder_6, face_folder_7, face_folder_8
    ];

    var facePaths = [];

    for (var f = 0; f < folders.length; f++) {

        for (var i = 1; i <= 6; i++) {

            var p = "faces/" +
                    gender + "/" +
                    folders[f] + "/" +
                    i + ".png";

            facePaths.push(p);
        }
    }

    window.facesPromise = Promise.all(
        facePaths.map(function(path) {
            return window.loadSupabaseImage(path);
        })
    );

    window.facesPromise
        .then(function() {
            console.log("All 48 faces loaded directly from Supabase");
        })
        .catch(function(error) {
            console.error("Face prefetch failed:", error);
        });

    return window.facesPromise;
};
var expl_done = false;
var expl_data = {};
var expl_keys = [];
var expl_order = '';
var expl_rt = null;
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
flowScheduler.add(Choose_LanguageRoutineBegin());
flowScheduler.add(Choose_LanguageRoutineEachFrame());
flowScheduler.add(Choose_LanguageRoutineEnd());
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






flowScheduler.add(explicit_measurementsRoutineBegin());
flowScheduler.add(explicit_measurementsRoutineEachFrame());
flowScheduler.add(explicit_measurementsRoutineEnd());
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
    {'name': 'resources/conditions/condition_quick_0.xlsx', 'path': 'resources/conditions/condition_quick_0.xlsx'},
    {'name': 'resources/conditions/condition_quick_1.xlsx', 'path': 'resources/conditions/condition_quick_1.xlsx'},
    {'name': 'resources/conditions/condition_quick_2.xlsx', 'path': 'resources/conditions/condition_quick_2.xlsx'},
    {'name': 'resources/conditions/condition_quick_3.xlsx', 'path': 'resources/conditions/condition_quick_3.xlsx'},
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
var faceRankingLoopNum;
var participant_code;
var sceneImagesReady;
var Choose_LanguageClock;
var text_placeholder8;
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
var text_continue_triple;
var key_resp_5;
var timer_text_2;
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
var ranking_description;
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
var explicit_measurementsClock;
var text_placeholder7;
var End_DemographicsClock;
var text_placeholder4;
var ExitClock;
var exit_message;
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
  // Initialize components for Routine "Choose_Language"
  Choose_LanguageClock = new util.Clock();
  text_placeholder8 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_placeholder8',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 0.0,
    depth: 0.0 
  });
  
  if (!window.fsGuard) {
      window.fsGuard = {active: true, wasFull: false, exits: 0, outMs: 0, outSince: null, overlay: null};
      var FS = window.fsGuard;
  
      var FS_DE = {
          title: 'Vollbildmodus erforderlich',
          text: 'Dieses Experiment muss im Vollbildmodus durchgeführt werden. Bitte verlassen Sie ihn nicht.',
          back: 'Zum Vollbildmodus zurückkehren',
          leave: 'Experiment verlassen',
          bye: 'Das Experiment wird nun geschlossen.'
      };
      var FS_EN = {
          title: 'Full screen mode required',
          text: 'This experiment must be done in full screen mode. Please do not leave it.',
          back: 'Return to full screen',
          leave: 'Leave experiment',
          bye: 'The experiment will now close.'
      };
  
      // Before a language is chosen, show both languages
      function fsTexts() {
          var l = (typeof lang !== 'undefined') ? lang : '';
          return (l === 'de') ? [FS_DE] : ((l === 'en') ? [FS_EN] : [FS_DE, FS_EN]);
      }
      function fsJoin(field, sep) {
          var t = fsTexts(), out = [];
          for (var i = 0; i < t.length; i++) { out.push(t[i][field]); }
          return out.join(sep);
      }
  
      function fsBlockKey(e) {
          e.stopImmediatePropagation();
          e.preventDefault();
      }
  
      function fsShow() {
          if (FS.overlay) { return; }
          FS.outSince = performance.now();
  
          var ov = document.createElement('div');
          ov.id = 'fs-overlay';
          ov.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.92);display:flex;align-items:center;justify-content:center;z-index:10001;padding:10px;box-sizing:border-box;';
          ov.innerHTML =
              '<div id="fs-card" style="background:#222;padding:36px;border-radius:8px;color:white;font-family:Arial;width:min(94vw,520px);max-height:94vh;overflow-y:auto;box-sizing:border-box;">' +
                '<h2 style="margin-top:0;">' + fsJoin('title', ' / ') + '</h2>' +
                '<p style="line-height:1.5;overflow-wrap:anywhere;">' + fsJoin('text', '</p><p style="line-height:1.5;overflow-wrap:anywhere;">') + '</p>' +
                '<button id="fs-back" style="width:100%;padding:12px;margin-top:18px;background:darkgrey;color:white;border:none;border-radius:4px;font-size:16px;cursor:pointer;">' + fsJoin('back', ' / ') + '</button>' +
                '<button id="fs-leave" style="width:100%;padding:12px;margin-top:10px;background:#444;color:white;border:none;border-radius:4px;font-size:14px;cursor:pointer;">' + fsJoin('leave', ' / ') + '</button>' +
              '</div>';
          document.body.appendChild(ov);
          FS.overlay = ov;
  
          // keep key presses away from the experiment while the overlay is open
          window.addEventListener('keydown', fsBlockKey, true);
          window.addEventListener('keyup', fsBlockKey, true);
  
          document.getElementById('fs-back').addEventListener('click', function() {
              var p = document.documentElement.requestFullscreen();
              if (p && p.catch) { p.catch(function() {}); }
          });
  
          document.getElementById('fs-leave').addEventListener('click', function() {
              FS.active = false;
              document.getElementById('fs-card').innerHTML =
                  '<h2 style="margin-top:0;">' + fsJoin('bye', ' / ') + '</h2>';
              setTimeout(function() {
                  psychoJS.quit({message: 'Participant left full screen mode and chose to leave.', isCompleted: false});
              }, 2500);
          });
      }
  
      function fsHide() {
          if (!FS.overlay) { return; }
          window.removeEventListener('keydown', fsBlockKey, true);
          window.removeEventListener('keyup', fsBlockKey, true);
          document.body.removeChild(FS.overlay);
          FS.overlay = null;
          FS.outMs += performance.now() - FS.outSince;
          // cumulative values, written into the current data row (use the max in the analysis)
          psychoJS.experiment.addData('fs_exits', FS.exits);
          psychoJS.experiment.addData('fs_out_sec', Math.round(FS.outMs) / 1000);
      }
  
      function fsLockEscape() {
          // Chrome/Edge only: Escape must then be held to leave full screen
          if (navigator.keyboard && navigator.keyboard.lock) {
              navigator.keyboard.lock(['Escape']).catch(function() {});
          }
      }
  
      FS.disable = function() {
          FS.active = false;
          fsHide();
          try {
              if (navigator.keyboard && navigator.keyboard.unlock) { navigator.keyboard.unlock(); }
          } catch (e) {}
      };
  
      document.addEventListener('fullscreenchange', function() {
          if (document.fullscreenElement) {
              FS.wasFull = true;
              fsLockEscape();
              fsHide();
          } else if (FS.wasFull && FS.active) {
              FS.exits++;
              fsShow();
          }
      });
  
      // Already in full screen when this code runs?
      if (document.fullscreenElement) {
          FS.wasFull = true;
          fsLockEscape();
      }
  
      // Normal quits (consent declined, screen-out, end of experiment) must not trigger the message
      var fsOrigQuit = psychoJS.quit.bind(psychoJS);
      psychoJS.quit = function(options) {
          FS.active = false;
          return fsOrigQuit(options);
      };
  }
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
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  key_resp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Run 'Begin Experiment' code from code_3
  var instr_done = false;
  var instr_rt = null;
  var instr_keyHandler = null;
  // Initialize components for Routine "Condition_Loading"
  Condition_LoadingClock = new util.Clock();
  wait_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'wait_text',
    text: 'Please wait a moment while the experiment is being prepared. You will be forwarded automatically.\n\nBitte warten Sie einen Moment während das Experiment vorbereitet wird. Sie werden automatisch weitergeleitet.',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], draggable: false, height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  // Supabase Storage configuration
  window.getSupabaseUrl = function(path) {
      var SUPABASE_URL = "https://msirntwrwjuzgdbedxvy.supabase.co";
      var SUPABASE_BUCKET = "experiment";
      
      // Remove leading slash and obsolete resources/ prefix
      var cleanPath = String(path)
          .replace(/^\/+/, "")
          .replace(/^resources\//, "");
  
      return SUPABASE_URL +
          "/storage/v1/object/public/" +
          SUPABASE_BUCKET + "/" +
          String(path).replace(/^\/+/, "");
  };
  
  // Cache for loaded Supabase images
  window.supabaseImages = {};
  window.supabaseImagePromises = {};
  
  window.loadSupabaseImage = function(path) {
  
      // Return existing image if already loaded
      if (window.supabaseImages[path]) {
          return Promise.resolve(window.supabaseImages[path]);
      }
  
      // Return existing loading promise if already loading
      if (window.supabaseImagePromises[path]) {
          return window.supabaseImagePromises[path];
      }
  
      var url = window.getSupabaseUrl(path);
  
      var promise = new Promise(function(resolve, reject) {
  
          var img = new Image();
  
          // Required for cross-origin WebGL texture use
          img.crossOrigin = "anonymous";
  
          img.onload = function() {
              window.supabaseImages[path] = img;
              resolve(img);
          };
  
          img.onerror = function() {
              reject(new Error("Failed to load Supabase image: " + url));
          };
  
          img.src = url;
      });
  
      window.supabaseImagePromises[path] = promise;
  
      return promise;
  };
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
  text_continue_triple = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_continue_triple',
    text: 'Press ENTER to continue',
    font: 'Arial',
    units: undefined, 
    pos: [0, (- 0.8)], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -4.0 
  });
  
  key_resp_5 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  timer_text_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'timer_text_2',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0.85, 0.45], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -7.0 
  });
  
  // Initialize components for Routine "Scene_Description"
  Scene_DescriptionClock = new util.Clock();
  task_description = new visual.TextStim({
    win: psychoJS.window,
    name: 'task_description',
    text: 'Give a short description of the face of the person that you saw. Write atleast 50 characters to proceed.',
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
    text: 'Loading Faces...\nLade Gesichter...',
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
    depth: -20.0 
  });
  
  ranking_description = new visual.TextStim({
    win: psychoJS.window,
    name: 'ranking_description',
    text: 'Please sort these faces from least to most likely to be in the scene you saw before.',
    font: 'Arial',
    units: undefined, 
    pos: [(- 0.1), 0.5], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -22.0 
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
  
  // Initialize components for Routine "explicit_measurements"
  explicit_measurementsClock = new util.Clock();
  text_placeholder7 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_placeholder7',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 0.0,
    depth: 0.0 
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
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  var debrief_done = false;
  var debrief_rt = null;
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
    
    Quick_ModeComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
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
    Quick_ModeComponents.forEach( function(thisComponent) {
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


function Quick_ModeRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Quick_Mode' ---
    Quick_ModeComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('Quick_Mode.stopped', globalClock.getTime());
    psychoJS.window._renderer.view.style.display = 'block';
    
    psychoJS.experiment.addData('quick_mode', quickMode);
    // the Routine "Quick_Mode" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var Choose_LanguageMaxDurationReached;
var lang_done;
var lang_rt;
var lang;
var Choose_LanguageMaxDuration;
var Choose_LanguageComponents;
function Choose_LanguageRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Choose_Language' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // keep track of whether this Routine was forcibly ended
    routineForceEnded = false;
    Choose_LanguageClock.reset();
    routineTimer.reset();
    Choose_LanguageMaxDurationReached = false;
    // update component parameters for each repeat
    // ---------- Reset globals ----------
    lang_done = false;
    lang_rt = null;
    
    // Optional: preselect the language via URL, e.g. https://.../index.html?lang=de
    var urlLang = new URLSearchParams(window.location.search).get('lang');
    
    if (urlLang === 'de' || urlLang === 'en') {
        lang = urlLang;
        continueRoutine = false;
        lang_done = true;
    } else if (quickMode) {
        lang = 'en';
        continueRoutine = false;
        lang_done = true;
    } else {
        // Hide the PsychoJS canvas temporarily
        psychoJS.window._renderer.view.style.display = 'none';
    
        // ---------- Styles ----------
        var lgStyle = document.createElement('style');
        lgStyle.id = 'lang-style';
        lgStyle.textContent =
            '#lang-card, #lang-card * {box-sizing:border-box;}' +
            '#lang-card p {margin:0;line-height:1.5;font-size:15px;overflow-wrap:anywhere;word-break:break-word;}' +
            '#lang-card .lang-row {display:flex;gap:16px;margin-top:24px;flex-wrap:wrap;}' +
            '#lang-card .lang-opt {flex:1 1 180px;padding:22px 12px;background:#2c2c2c;color:white;border:2px solid #444;border-radius:6px;font-size:20px;font-family:Arial;cursor:pointer;}' +
            '#lang-card .lang-opt:hover {background:#383838;}' +
            '#lang-card .lang-opt.selected {border-color:white;background:#3d3d3d;font-weight:bold;}' +
            '#lang-submit:disabled {opacity:0.4;cursor:not-allowed;}';
        document.head.appendChild(lgStyle);
    
        // ---------- Overlay ----------
        var overlay = document.createElement('div');
        overlay.id = 'lang-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#000;display:flex;align-items:center;justify-content:center;z-index:9999;overflow-y:auto;padding:10px;box-sizing:border-box;';
    
        overlay.innerHTML =
            '<div id="lang-card" style="background:#222;padding:36px;border-radius:8px;color:white;font-family:Arial;width:min(94vw,560px);max-height:94vh;overflow-y:auto;">' +
              '<h2 style="margin-top:0;">Language / Sprache</h2>' +
              '<p>Please select your language.</p>' +
              '<p style="margin-top:4px;">Bitte wählen Sie eine Sprache.</p>' +
              '<div class="lang-row">' +
                '<button class="lang-opt" data-lang="de">Deutsch</button>' +
                '<button class="lang-opt" data-lang="en">English</button>' +
              '</div>' +
              '<button id="lang-submit" disabled style="width:100%;padding:12px;margin-top:28px;background:darkgrey;color:white;border:none;border-radius:4px;font-size:16px;cursor:pointer;">Continue / Weiter</button>' +
            '</div>';
    
        document.body.appendChild(overlay);
    
        // ---------- Selection logic ----------
        var chosen = '';
        var lgStart = performance.now();
        var optBtns = overlay.querySelectorAll('.lang-opt');
        var submitBtn = document.getElementById('lang-submit');
    
        for (var b = 0; b < optBtns.length; b++) {
            optBtns[b].addEventListener('click', function() {
                for (var c = 0; c < optBtns.length; c++) { optBtns[c].classList.remove('selected'); }
                this.classList.add('selected');
                chosen = this.getAttribute('data-lang');
                submitBtn.disabled = false;
                submitBtn.textContent = (chosen === 'de') ? 'Weiter' : 'Continue';
            });
        }
    
        submitBtn.addEventListener('click', function() {
            if (!chosen) { return; }
            lang = chosen;
            lang_rt = (performance.now() - lgStart) / 1000;
    
            // clean up
            document.body.removeChild(overlay);
            document.head.removeChild(lgStyle);
            psychoJS.window._renderer.view.style.display = 'block';
            lang_done = true;
        });
    }
    psychoJS.experiment.addData('Choose_Language.started', globalClock.getTime());
    Choose_LanguageMaxDuration = null
    // keep track of which components have finished
    Choose_LanguageComponents = [];
    Choose_LanguageComponents.push(text_placeholder8);
    
    Choose_LanguageComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function Choose_LanguageRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Choose_Language' ---
    // get current time
    t = Choose_LanguageClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_placeholder8* updates
    if (t >= 0.0 && text_placeholder8.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_placeholder8.tStart = t;  // (not accounting for frame time here)
      text_placeholder8.frameNStart = frameN;  // exact frame index
      
      text_placeholder8.setAutoDraw(true);
    }
    
    
    // if text_placeholder8 is active this frame...
    if (text_placeholder8.status === PsychoJS.Status.STARTED) {
    }
    
    if (lang_done) {
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
    Choose_LanguageComponents.forEach( function(thisComponent) {
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


function Choose_LanguageRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Choose_Language' ---
    Choose_LanguageComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('Choose_Language.stopped', globalClock.getTime());
    if (lang !== 'de' && lang !== 'en') { lang = 'en'; }   // fallback
    
    psychoJS.experiment.addData('language', lang);
    psychoJS.experiment.addData('language_rt', lang_rt);
    
    // safety cleanup in case the routine ended early
    var lgOv = document.getElementById('lang-overlay');
    if (lgOv) { document.body.removeChild(lgOv); }
    var lgSt = document.getElementById('lang-style');
    if (lgSt) { document.head.removeChild(lgSt); }
    psychoJS.window._renderer.view.style.display = 'block';
    psychoJS.experiment.addData('sona_participant', use_sona);
    // the Routine "Choose_Language" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var Check_ConsentMaxDurationReached;
var consent_given;
var consent_declined;
var consent_done;
var consent_1;
var consent_2;
var consent_rt;
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
    // ---------- Settings (adjust here) ----------
    var PROJECT_TITLE = '[PROJECT TITLE – Whats the exact title?]';
    var PROJECT_ID = '1152';
    var SHOW_SONA_PAGE = use_sona;
    
    var LINKS = {
        dsb: 'https://www.fernuni-hagen.de/universitaet/themen/datenschutz.shtml',
        contact: 'https://www.fernuni-hagen.de/service/kontakt.shtml',
        rights: 'https://www.fernuni-hagen.de/service/datenschutz.shtml#rechte',
        sona: 'https://fernuni-hagen.sona-systems.com',
        sonaInfo: 'https://www.fernuni-hagen.de/psychologie/forschung/sona_teilnahme.shtml'
    };
    
    function lk(url, label) {
        return '<a href="' + url + '" target="_blank" rel="noopener" style="color:#9cc9ff;">' + label + '</a>';
    }
    
    var L = (typeof lang !== 'undefined' && lang === 'de') ? 'de' : 'en';
    
    // ---------- German texts ----------
    var TEXT_DE = {
        title: 'Einwilligungserklärung',
        headRows: [
            ['Projekttitel', PROJECT_TITLE],
            ['Projekt-ID', PROJECT_ID],
            ['Lehrgebiet', 'Psychologische Methodenlehre und Evaluation'],
            ['Projektverantwortliche Person', 'Dr. Marleen Stelter']
        ],
        greeting: 'Liebe Teilnehmende,',
        intro1: [
            'Diese Studie untersucht, wie unterschiedliche Kontextinformationen die Wahrnehmung und Bewertung von Gesichtern beeinflussen. Ihre Antworten werden anonymisiert, zu wissenschaftlichen Zwecken verwendet und können in wissenschaftlichen Publikationen verwendet werden.'
        ],
        doTitle: 'Was Sie tun werden:',
        doList: [
            'Dieses Informationsblatt lesen und Ihre Einwilligung erteilen',
            'Gesichtsbilder zusammen mit Kontextinformationen bewerten und in eine Rangfolge bringen',
            'Einen kurzen demografischen Fragebogen ausfüllen',
            'Eine kurze Abschlussinformation (Debriefing) lesen'
        ],
        afterList: [
            'Diese Studie dauert etwa 60 Minuten.',
            'Die Teilnahme ist freiwillig. Sie können einzelne Aufgaben überspringen oder die Studie jederzeit ohne Angabe von Gründen und ohne Nachteile abbrechen.',
            'Ihre Daten werden vertraulich behandelt und ausschließlich für wissenschaftliche Forschungszwecke verwendet.'
        ],
        intro2: [
            'Für die Teilnahme ist es notwendig, dass Sie Ihre Zustimmungserklärung zur Datenerhebung und -verarbeitung durch den entsprechenden Klick abgeben.',
            'Nachfolgend wird Ihnen die Möglichkeit gegeben, sich ausführlich über die Datenerhebung und -verarbeitung zu informieren und eine bewusste Entscheidung über Ihre Zustimmung zu treffen. Zweck der Erhebung und Verarbeitung personenbezogener Daten ist das o.g. Forschungsvorhaben bzw. Serviceangebot sowie die Verwaltung der Teilnahmeincentives.',
            'Sollten Sie Fragen zu dieser Studie und zur Datenverarbeitung haben, wenden Sie sich bitte an die unten genannten projektverantwortlichen Personen.',
            'Für allgemeine Fragen zum Datenschutz wenden Sie sich bitte an den ' + lk(LINKS.dsb, 'Datenschutzbeauftragten der FernUniversität') + '.'
        ],
        contacts: 'Sarah Boidoglou &amp; Savas Großmann (Studienleitung) &mdash; sarah.boidoglou@dfki.de, savas.grossmann@dfki.de<br>' +
                  'Mansi Sharma &amp; Philipp Müller (Betreuung) &mdash; mansi.sharma@dfki.de, phmueller@is.mpg.de<br>' +
                  'DFKI GmbH, Kesselhaus in der Lanolinfabrik, Salzufer 15/16, 10587 Berlin, Deutschland',
        dpMain: 'Weiterführende Informationen zum Datenschutz',
        dpSections: [
            ['Übergeordnete Kontaktmöglichkeit zur Datenverantwortung', [
                'Die Verantwortliche im Sinne der EU-Datenschutz-Grundverordnung und der jeweils einschlägigen nationalen Datenschutzgesetze der Mitgliedsstaaten sowie sonstiger datenschutzrechtlicher Bestimmungen („Stelle, die über die Zwecke und Mittel der Verarbeitung personenbezogener Daten entscheidet“) ist die:',
                '<b>FernUniversität in Hagen</b><br>Universitätsstraße 47<br>58097 Hagen',
                'Körperschaft des Öffentlichen Rechts<br>vertreten durch den Rektor',
                'E-Mail: rektor@fernuni-hagen.de<br>' + lk(LINKS.contact, LINKS.contact)
            ]],
            ['Dauer der Datenaufbewahrung', [
                'Alle Rohdaten werden so lange aufbewahrt, wie Sie für den Forschungszweck oder die Aufrechterhaltung des oben/eingangs genannten Serviceangebots benötigt werden. Eine anschließende, eventuelle Weitergabe zur Einhaltung guter wissenschaftlicher Praxis (z.B. durch eine OpenScience Initiative) erfolgt ausschließlich in einem Zustand, der durch Datenanonymisierung/Datenaggregierung ohne unverhältnismäßigen Aufwand keine Rückschlüsse auf einzelne Personen ermöglicht.'
            ]],
            ['Folgende personenbezogene Daten können im Verlauf der Teilnahme erhoben werden', [
                '<b>Im Rahmen des Forschungszwecks:</b><br>Ausschließlich jene Daten, die für den Forschungszweck unbedingt notwendig sind (z.B. soziodemografische Daten) sowie ggf. Pseudonymisierungscodes zur Verknüpfung mehrerer Messzeitpunkte.',
                '<b>Zum Zweck der Erstellung der Teilnahmebescheinigung und Gutschrift von Teilnahmeincentives:</b><br>Zur Verifizierung der Teilnahme wird ein Pseudonym genutzt und mit den Rahmendaten des Projektes (Kennung, Titel, Lehrgebiet, Anzahl der durch die Teilnahme abgeleisteten Versuchspersonenstunden) in Zusammenhang gebracht, um die korrekte Gutschrift/Bescheinigung vorzunehmen. Wird nicht erhoben, wenn das entsprechende Incentivierungsverfahren nicht genutzt wird.',
                '<b>Zum Zweck der weiteren Incentivierung:</b><br>Kontaktdaten, um vergebene Incentives auszuhändigen (z.B. E-Mail-Adresse). Wird nicht erhoben, wenn das entsprechende Incentivierungsverfahren nicht genutzt wird.',
                'Sollten darüber hinausgehende personenbezogene Daten gesammelt und verwendet werden, werden Sie auf den nachfolgenden Seiten gesondert darauf hingewiesen und um Zustimmung gebeten.',
                'Alle personenbezogenen Daten werden ausschließlich für wissenschaftliche Zwecke oder für Zwecke der Gutschrift von Teilnahmeincentives genutzt. Alle personenbezogenen Daten werden immer so früh, wie es der Erhebungszweck erlaubt, anonymisiert/pseudonymisiert/aggregiert/gelöscht und ausschließlich für den jeweiligen Zweck verarbeitet.'
            ]],
            ['Folgende personenbezogene Daten besonderer Kategorien nach Art. 9 DSGVO werden erhoben und verarbeitet', [
                'Keine personenbezogenen Daten besonderer Kategorien nach Art. 9 DSGVO werden verarbeitet.'
            ]],
            ['Rechtliche Grundlage für die Datenverarbeitung', [
                'Art. 6, Abs. 1, lit. a DSGVO und/oder Art. 6, Abs. 1, lit. e DSGVO mit Art. 17 DSG NRW.'
            ]],
            ['Empfänger von personenbezogenen Daten', [
                'Die auf der Startseite des Forschungsprojekts genannten, projektverantwortlichen Kontaktpersonen sowie die am Forschungsprojekt beteiligten Wissenschaftler*innen. Bei Mitwirkung des Forschungssupport-Teams der Fakultät für Psychologie erhält auch das lokale, fakultätsinterne Admin-Team (questionpro-admin@fernuni-hagen.de) zweckgebunden Zugriff.'
            ]],
            ['Informationen zum Datentransfer', [
                'Eine Übermittlung von personenbezogenen Daten an ein Drittland oder eine internationale Organisation außerhalb des Anwendungsbereichs der DSGVO ist nicht vorgesehen. Im Rahmen der Einhaltung guter wissenschaftlicher Praxis (OpenScience Initiative) besteht die Möglichkeit, dass Ihre Daten in einem Zustand, der keine Rückschlüsse auf einzelne Personen ermöglicht (durch Datenanonymisierung/Datenaggregierung), veröffentlicht werden.'
            ]],
            ['Rechteinformationen', [
                'Die Ihnen durch die Datenschutz-Grundverordnung der Europäischen Union zustehenden Rechte entnehmen Sie bitte folgendem Link:<br>' + lk(LINKS.rights, 'Rechteinformationen, Absatz V. Rechte der betroffenen Person'),
                'Sofern Ihre Teilnahme identifizierbar ist, haben Sie das Recht, Ihre Einwilligung zur Datenerhebung und -verarbeitung jederzeit für die Zukunft zu widerrufen. Bitte wenden Sie sich dazu per E-Mail an die auf dieser Seite genannten, projektverantwortlichen Kontaktpersonen.'
            ]],
            ['Behördlich bestellte Datenschutzbeauftragte', [
                '<b>Postanschrift:</b><br>Datenschutzbeauftragter der FernUniversität in Hagen<br>58084',
                '<b>Hausanschrift:</b><br>Universitätsstraße 27<br>58097 Hagen',
                'Tel.: 02331 987 - 2511<br>E-Mail: Datenschutzbeauftragter@FernUni-Hagen.de'
            ]]
        ],
        agreeText: 'Mit Ihrer Zustimmung bestätigen Sie, dass Sie diese Informationen gelesen und verstanden haben und freiwillig an dieser Studie teilnehmen.',
        check1: 'Ich erteile hiermit meine datenschutzrechtliche Einwilligung entsprechend der hier bereitgestellten Informationen.',
        check2: 'Ich erteile hiermit meine Einwilligung, dass meine Daten für die o.g. wissenschaftlichen Zwecke genutzt werden.',
        decline: 'Ich stimme nicht zu',
        next: 'Weiter',
        declineTitle: 'Vielen Dank',
        declineText: 'Sie haben sich gegen eine Teilnahme entschieden. Das Experiment wird nun geschlossen.',
        sona: {
            title: 'Bitte unbedingt durchlesen!',
            paras: [
                'Teilnahmeincentives (inklusive Versuchspersonenstundenbescheinigungen) für diese Teilnahme werden über die Teilnahmeverwaltungsplattform der Fakultät für Psychologie (' + lk(LINKS.sona, 'Sona Systems') + ') gutgeschrieben.',
                'Durch die Nutzung von Sona Systems ist es möglich, Incentives für Teilnahmen zu vergeben, ohne Personendaten/Matrikelnummer der Teilnehmenden abfragen zu müssen.',
                'Für die Gutschrift der Teilnahmeincentives ist es notwendig, dass Sie sich in Sona Systems zur Teilnahme an dieser Studie anmelden bzw. angemeldet haben und anschließend Ihre Teilnahme entweder über den Teilnahmelink in Sona Systems (oder über den von den Forschenden in Sona Systems in den Details zur Studie explizit erläuterten, anderen Weg) beginnen.',
                'Dies gilt sowohl für FernUni-Studierende als auch für externe Teilnehmende, die eine Gutschrift der Teilnahmeincentives für die Teilnahme an dieser Studie erhalten möchten.',
                'Details zu Sona Systems finden Sie auf den ' + lk(LINKS.sonaInfo, 'Sona-Informationsseiten für Teilnehmende') + '.',
                'Teilnahmeincentives werden Ihnen, wie in den Studieninformationen dieser Studie beschrieben, gutgeschrieben.',
                'Bitte achten Sie unbedingt darauf, die Teilnahme vollständig zu beenden und am Ende auf <b>„Teilnahme abschließen“</b> zu klicken, um erworbene Teilnahmeincentives zu erhalten.',
                '<b>Andernfalls kann keine Ausstellung der Teilnahmeincentives erfolgen.</b>'
            ],
            button: 'Verstanden, weiter'
        }
    };
    
    // ---------- English texts ----------
    var TEXT_EN = {
        title: 'Informed Consent',
        headRows: [
            ['Project title', PROJECT_TITLE],
            ['Project ID', PROJECT_ID],
            ['Subject area', 'Psychological Methodology and Evaluation'],
            ['Responsible person', 'Dr. Marleen Stelter']
        ],
        greeting: 'Dear participants,',
        intro1: [
            'This study investigates how different contextual information influences the perception and evaluation of faces. Your responses will be anonymized and used for scientific purposes, and may be included in academic publications.'
        ],
        doTitle: 'What You Will Do:',
        doList: [
            'Read this information sheet and provide informed consent',
            'Evaluate and rank face images together with contextual information',
            'Complete a short demographic questionnaire',
            'Read a brief debriefing'
        ],
        afterList: [
            'This study takes approximately 60 minutes.',
            'Participation is voluntary. You may skip individual tasks or withdraw from the study at any time without giving a reason and without any disadvantage.',
            'Your data will be processed confidentially and used exclusively for scientific research purposes.'
        ],
        intro2: [
            'To participate, it is necessary that you give your consent to data collection and processing by clicking the corresponding option.',
            'Below you are given the opportunity to inform yourself in detail about data collection and processing and to make a conscious decision about your consent. The purpose of collecting and processing personal data is the research project mentioned above, or the service offering, as well as the administration of participation incentives.',
            'If you have questions about this study or about data processing, please contact the project contact persons named below.',
            'For general questions about data protection, please contact the ' + lk(LINKS.dsb, 'Data Protection Officer of FernUniversität') + '.'
        ],
        contacts: 'Sarah Boidoglou &amp; Savas Großmann (Study Leads) &mdash; sarah.boidoglou@dfki.de, savas.grossmann@dfki.de<br>' +
                  'Mansi Sharma &amp; Philipp Müller (Supervision) &mdash; mansi.sharma@dfki.de, phmueller@is.mpg.de<br>' +
                  'DFKI GmbH, Kesselhaus in der Lanolinfabrik, Salzufer 15/16, 10587 Berlin, Germany',
        dpMain: 'Further Information on Data Protection',
        dpSections: [
            ['Primary Contact for Data Responsibility', [
                'The controller within the meaning of the EU General Data Protection Regulation (GDPR), the applicable national data protection laws of the member states and other data protection provisions (the “body that decides on the purposes and means of the processing of personal data”) is:',
                '<b>FernUniversität in Hagen</b><br>Universitätsstraße 47<br>58097 Hagen, Germany',
                'Public-law corporation<br>represented by the Rector',
                'E-mail: rektor@fernuni-hagen.de<br>' + lk(LINKS.contact, LINKS.contact)
            ]],
            ['Duration of Data Retention', [
                'All raw data will be retained for as long as it is needed for the research purpose or for maintaining the service offering mentioned above. Any subsequent sharing in line with good scientific practice (e.g. through an Open Science initiative) will only take place in a state that, through data anonymization/aggregation, does not allow conclusions about individuals without disproportionate effort.'
            ]],
            ['The Following Personal Data May Be Collected During Participation', [
                '<b>Within the research purpose:</b><br>Only data that is strictly necessary for the research purpose (e.g. sociodemographic data) and, where applicable, pseudonymization codes for linking several measurement points.',
                '<b>For the purpose of issuing a confirmation of participation and crediting participation incentives:</b><br>To verify participation, a pseudonym is used and linked to the framework data of the project (ID, title, subject area, number of participant hours completed through participation) in order to issue the correct credit/confirmation. Not collected if the corresponding incentive procedure is not used.',
                '<b>For the purpose of further incentives:</b><br>Contact details to hand out awarded incentives (e.g. e-mail address). Not collected if the corresponding incentive procedure is not used.',
                'Should further personal data be collected and used, you will be informed separately on the following pages and asked for your consent.',
                'All personal data will be used exclusively for scientific purposes or for crediting participation incentives. All personal data will be anonymized/pseudonymized/aggregated/deleted as early as the purpose of collection allows and processed exclusively for the respective purpose.'
            ]],
            ['The Following Special Categories of Personal Data Under Art. 9 GDPR Are Collected and Processed', [
                'No special categories of personal data under Art. 9 GDPR are processed.'
            ]],
            ['Legal Basis for Data Processing', [
                'Art. 6(1)(a) GDPR and/or Art. 6(1)(e) GDPR in conjunction with Art. 17 DSG NRW (North Rhine-Westphalia Data Protection Act).'
            ]],
            ['Recipients of Personal Data', [
                'The project contact persons named on the start page of the research project and the researchers involved in the project. If the research support team of the Faculty of Psychology is involved, the local, faculty-internal admin team (questionpro-admin@fernuni-hagen.de) also receives access for this specific purpose.'
            ]],
            ['Information on Data Transfer', [
                'A transfer of personal data to a third country or an international organization outside the scope of the GDPR is not planned. In line with good scientific practice (Open Science initiative), your data may be published in a state that does not allow conclusions about individuals (through data anonymization/aggregation).'
            ]],
            ['Information on Your Rights', [
                'For the rights granted to you by the General Data Protection Regulation of the European Union, please see the following link (German):<br>' + lk(LINKS.rights, 'Rechteinformationen, Absatz V. Rechte der betroffenen Person'),
                'If your participation is identifiable, you have the right to withdraw your consent to data collection and processing at any time with effect for the future. To do so, please contact the project contact persons named on this page by e-mail.'
            ]],
            ['Officially Appointed Data Protection Officer', [
                '<b>Postal address:</b><br>Datenschutzbeauftragter der FernUniversität in Hagen<br>58084',
                '<b>Street address:</b><br>Universitätsstraße 27<br>58097 Hagen, Germany',
                'Tel.: +49 2331 987 - 2511<br>E-mail: Datenschutzbeauftragter@FernUni-Hagen.de'
            ]]
        ],
        agreeText: 'By agreeing below, you confirm that you have read and understood this information and voluntarily consent to participate in this study.',
        check1: 'I hereby give my consent under data protection law in accordance with the information provided here.',
        check2: 'I hereby consent to my data being used for the scientific purposes stated above.',
        decline: 'I do not agree',
        next: 'Continue',
        declineTitle: 'Thank you',
        declineText: 'You have chosen not to participate. The experiment will now close.',
        sona: {
            title: 'Please read carefully!',
            paras: [
                'Participation incentives (including participant-hour certificates) for this participation are credited via the participation management platform of the Faculty of Psychology (' + lk(LINKS.sona, 'Sona Systems') + ').',
                'Using Sona Systems makes it possible to award incentives for participation without having to ask participants for personal data or student ID numbers.',
                'To receive the participation incentives, you must sign up (or have signed up) for this study in Sona Systems and then start your participation either via the participation link in Sona Systems (or via another route explicitly explained by the researchers in the study details in Sona Systems).',
                'This applies both to FernUni students and to external participants who wish to receive credit for participation in this study.',
                'Details about Sona Systems can be found on the ' + lk(LINKS.sonaInfo, 'Sona information pages for participants (German)') + '.',
                'Participation incentives will be credited to you as described in the study information of this study.',
                'Please make sure to complete your participation fully and to click <b>“Complete participation”</b> at the end in order to receive the incentives you have earned.',
                '<b>Otherwise, the participation incentives cannot be issued.</b>'
            ],
            button: 'Understood, continue'
        }
    };
    
    var T = (L === 'de') ? TEXT_DE : TEXT_EN;
    
    // ---------- Reset globals ----------
    consent_given = false;
    consent_declined = false;
    consent_done = false;
    consent_1 = false;
    consent_2 = false;
    consent_rt = null;
    
    // get screensize
    expInfo['windowWidth'] = window.innerWidth;
    expInfo['windowHeight'] = window.innerHeight;
    
    if (quickMode) {
        continueRoutine = false;
        consent_done = true;
    } else {
        // Hide the PsychoJS canvas temporarily
        psychoJS.window._renderer.view.style.display = 'none';
    
        // ---------- Styles ----------
        var csStyle = document.createElement('style');
        csStyle.id = 'consent-style';
        csStyle.textContent =
            '#cs-card, #cs-card * {box-sizing:border-box;}' +
            '#cs-card {line-height:1.6;}' +
            '#cs-card p, #cs-card li {font-size:14.5px;margin:0 0 10px 0;overflow-wrap:anywhere;word-break:break-word;}' +
            '#cs-card ul {margin:0 0 10px 0;padding-left:22px;}' +
            '#cs-card h3 {font-size:17px;margin:28px 0 8px 0;padding-top:18px;border-top:1px solid #444;}' +
            '#cs-card h4 {font-size:15px;margin:18px 0 6px 0;overflow-wrap:anywhere;}' +
            '#cs-card .cs-head {display:grid;grid-template-columns:minmax(120px,200px) 1fr;gap:6px 16px;background:#2c2c2c;border-radius:6px;padding:12px 16px;margin-bottom:18px;font-size:14px;}' +
            '#cs-card .cs-k {color:#aaa;}' +
            '#cs-card .cs-v {overflow-wrap:anywhere;}' +
            '#cs-card .cs-checks {background:#2c2c2c;border-radius:6px;padding:14px 16px;margin-top:24px;}' +
            '#cs-card label {display:flex;gap:10px;align-items:flex-start;font-size:14.5px;margin-top:12px;cursor:pointer;}' +
            '#cs-card input[type=checkbox] {flex:0 0 auto;width:18px;height:18px;margin-top:3px;cursor:pointer;}' +
            '#cs-card .cs-btns {display:flex;gap:15px;margin-top:22px;flex-wrap:wrap;}' +
            '#cs-card .cs-btns button {flex:1 1 180px;padding:12px;background:darkgrey;color:white;border:none;border-radius:4px;font-size:16px;cursor:pointer;}' +
            '#cs-card .cs-btns button:disabled {opacity:0.4;cursor:not-allowed;}' +
            '@media (max-width:560px) {#cs-card .cs-head {grid-template-columns:1fr;}}';
        document.head.appendChild(csStyle);
    
        // ---------- Build HTML ----------
        function paras(arr) {
            var s = '';
            for (var i = 0; i < arr.length; i++) { s += '<p>' + arr[i] + '</p>'; }
            return s;
        }
    
        var p1 = '<h2 style="margin-top:0;">' + T.title + '</h2>';
        p1 += '<div class="cs-head">';
        for (var r = 0; r < T.headRows.length; r++) {
            p1 += '<div class="cs-k">' + T.headRows[r][0] + '</div><div class="cs-v">' + T.headRows[r][1] + '</div>';
        }
        p1 += '</div>';
        p1 += '<p>' + T.greeting + '</p>' + paras(T.intro1);
        p1 += '<p><strong>' + T.doTitle + '</strong></p><ul>';
        for (var d = 0; d < T.doList.length; d++) { p1 += '<li>' + T.doList[d] + '</li>'; }
        p1 += '</ul>' + paras(T.afterList) + paras(T.intro2);
        p1 += '<p>' + T.contacts + '</p>';
    
        p1 += '<h3>' + T.dpMain + '</h3>';
        for (var s = 0; s < T.dpSections.length; s++) {
            p1 += '<h4>' + T.dpSections[s][0] + '</h4>' + paras(T.dpSections[s][1]);
        }
    
        p1 += '<div class="cs-checks"><p style="margin:0;">' + T.agreeText + '</p>' +
              '<label><input type="checkbox" id="cs-c1"><span>' + T.check1 + '</span></label>' +
              '<label><input type="checkbox" id="cs-c2"><span>' + T.check2 + '</span></label></div>' +
              '<div class="cs-btns">' +
                '<button id="consent-decline">' + T.decline + '</button>' +
                '<button id="consent-accept" disabled>' + T.next + '</button>' +
              '</div>';
    
        var p2 = '<h2 style="margin-top:0;">' + T.sona.title + '</h2>' + paras(T.sona.paras) +
                 '<div class="cs-btns"><button id="consent-sona-next">' + T.sona.button + '</button></div>';
    
        // ---------- Overlay ----------
        var overlay = document.createElement('div');
        overlay.id = 'consent-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#000;display:flex;align-items:center;justify-content:center;z-index:9999;overflow-y:auto;padding:10px;box-sizing:border-box;';
        overlay.innerHTML =
            '<div id="cs-card" style="background:#222;padding:36px;border-radius:8px;color:white;font-family:Arial;width:min(94vw,760px);max-height:94vh;overflow-y:auto;">' +
              '<div id="cs-page1">' + p1 + '</div>' +
              '<div id="cs-page2" style="display:none;">' + p2 + '</div>' +
            '</div>';
        document.body.appendChild(overlay);
    
        var csStart = performance.now();
        var card = document.getElementById('cs-card');
        var c1 = document.getElementById('cs-c1');
        var c2 = document.getElementById('cs-c2');
        var acceptBtn = document.getElementById('consent-accept');
    
        function finishConsent() {
            document.body.removeChild(overlay);
            document.head.removeChild(csStyle);
            psychoJS.window._renderer.view.style.display = 'block';
            consent_done = true;
        }
    
        function updateAccept() {
            acceptBtn.disabled = !(c1.checked && c2.checked);
        }
        c1.addEventListener('change', updateAccept);
        c2.addEventListener('change', updateAccept);
    
        acceptBtn.addEventListener('click', function() {
            if (!(c1.checked && c2.checked)) { return; }
            consent_given = true;
            consent_1 = true;
            consent_2 = true;
            consent_rt = (performance.now() - csStart) / 1000;
    
            if (SHOW_SONA_PAGE) {
                document.getElementById('cs-page1').style.display = 'none';
                document.getElementById('cs-page2').style.display = 'block';
                card.scrollTop = 0;
            } else {
                finishConsent();
            }
        });
    
        document.getElementById('consent-sona-next').addEventListener('click', finishConsent);
    
        document.getElementById('consent-decline').addEventListener('click', function() {
            consent_declined = true;
            card.innerHTML =
                '<h2 style="margin-top:0;">' + T.declineTitle + '</h2>' +
                '<p>' + T.declineText + '</p>';
    
            // NOTE: adjust this if your project has its own quit function
            // (e.g. "quitPsychoJS('', false)") instead of calling psychoJS.quit() directly.
            setTimeout(function() {
                psychoJS.quit({message: 'Participant did not consent.', isCompleted: false});
            }, 3000);
        });
    }
    psychoJS.experiment.addData('Check_Consent.started', globalClock.getTime());
    Check_ConsentMaxDuration = null
    // keep track of which components have finished
    Check_ConsentComponents = [];
    Check_ConsentComponents.push(text_placeholder2);
    
    Check_ConsentComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
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
    Check_ConsentComponents.forEach( function(thisComponent) {
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


function Check_ConsentRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Check_Consent' ---
    Check_ConsentComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('Check_Consent.stopped', globalClock.getTime());
    if (!quickMode) {
        psychoJS.experiment.addData('consent_given', consent_given);
        psychoJS.experiment.addData('consent_data_protection', consent_1);
        psychoJS.experiment.addData('consent_scientific_use', consent_2);
        psychoJS.experiment.addData('consent_rt', consent_rt);
    
        // safety cleanup in case the routine ended early
        var csOv = document.getElementById('consent-overlay');
        if (csOv) { document.body.removeChild(csOv); }
        var csSt = document.getElementById('consent-style');
        if (csSt) { document.head.removeChild(csSt); }
        psychoJS.window._renderer.view.style.display = 'block';
    }
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
    // ---------- Texts (adjust here) ----------
    var TEXT_DE = {
        title: 'Ihr Teilnahmecode',
        body: 'Damit Ihre Daten vertraulich bleiben und Sie später trotzdem deren Löschung beantragen können, wurde Ihnen ein zufälliger Teilnahmecode zugewiesen. Bitte notieren Sie ihn jetzt oder machen Sie einen Screenshot &ndash; Sie benötigen ihn, falls Sie jemals die Entfernung Ihrer Daten wünschen. Er kann später nicht wiederhergestellt werden.',
        copy: 'Code kopieren',
        copied: 'Kopiert!',
        copyFailed: 'Kopieren fehlgeschlagen – bitte notieren Sie den Code',
        copyUnavailable: 'Kopieren nicht verfügbar – bitte notieren Sie den Code',
        confirm: 'Ich habe meinen Teilnahmecode gespeichert',
        next: 'Weiter'
    };
    var TEXT_EN = {
        title: 'Your Participant Code',
        body: 'To keep your data confidential while still allowing you to request its deletion later, you have been assigned a random participant code. Please write it down now or take a screenshot &ndash; you will need it if you ever want your data removed. It cannot be recovered later.',
        copy: 'Copy code',
        copied: 'Copied!',
        copyFailed: 'Copy failed - please write it down',
        copyUnavailable: 'Copy not available - please write it down',
        confirm: 'I have saved my participant code',
        next: 'Continue'
    };
    var L = (typeof lang !== 'undefined' && lang === 'de') ? 'de' : 'en';
    var T = (L === 'de') ? TEXT_DE : TEXT_EN;
    
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
    
    // global vars
    participant_code = generateParticipantCode();
    pcode_done = false;
    
    if (quickMode) {
        continueRoutine = false;
        pcode_done = true;
    } else {
        // Hide the PsychoJS canvas temporarily
        psychoJS.window._renderer.view.style.display = 'none';
    
        var pcStyle = document.createElement('style');
        pcStyle.id = 'pcode-style';
        pcStyle.textContent =
            '#pcode-card, #pcode-card * {box-sizing:border-box;}' +
            '#pcode-card p {overflow-wrap:anywhere;word-break:break-word;}' +
            '#pcode-continue:disabled {opacity:0.4;cursor:not-allowed;}';
        document.head.appendChild(pcStyle);
    
        var overlay = document.createElement('div');
        overlay.id = 'pcode-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#000;display:flex;align-items:center;justify-content:center;z-index:9999;overflow-y:auto;padding:10px;box-sizing:border-box;';
    
        overlay.innerHTML =
            '<div id="pcode-card" style="background:#222;padding:36px;border-radius:8px;color:white;font-family:Arial;width:min(94vw,520px);max-height:94vh;overflow-y:auto;">' +
              '<h2 style="margin-top:0;">' + T.title + '</h2>' +
              '<p style="line-height:1.5;">' + T.body + '</p>' +
              '<p id="pcode-display" style="font-size:32px;font-weight:bold;letter-spacing:4px;text-align:center;background:#111;padding:20px 10px;border-radius:4px;margin:25px 0 10px 0;"></p>' +
              '<button id="pcode-copy" style="width:100%;padding:10px;background:#444;color:white;border:none;border-radius:4px;font-size:14px;cursor:pointer;">' + T.copy + '</button>' +
              '<label style="display:flex;align-items:center;gap:8px;margin-top:25px;cursor:pointer;">' +
                '<input id="pcode-confirm" type="checkbox" style="flex:0 0 auto;width:18px;height:18px;">' +
                '<span>' + T.confirm + '</span>' +
              '</label>' +
              '<button id="pcode-continue" style="width:100%;padding:12px;margin-top:15px;background:darkgrey;color:white;border:none;border-radius:4px;font-size:16px;cursor:pointer;" disabled>' + T.next + '</button>' +
            '</div>';
    
        document.body.appendChild(overlay);
    
        document.getElementById('pcode-display').textContent = participant_code;
    
        document.getElementById('pcode-copy').addEventListener('click', function() {
            var btn = this;
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(participant_code)
                    .then(function() { btn.textContent = T.copied; })
                    .catch(function() { btn.textContent = T.copyFailed; });
            } else {
                btn.textContent = T.copyUnavailable;
            }
        });
    
        document.getElementById('pcode-confirm').addEventListener('change', function() {
            document.getElementById('pcode-continue').disabled = !this.checked;
        });
    
        document.getElementById('pcode-continue').addEventListener('click', function() {
            document.body.removeChild(overlay);
            document.head.removeChild(pcStyle);
            psychoJS.window._renderer.view.style.display = 'block';
            pcode_done = true;
        });
    }
    psychoJS.experiment.addData('Participant_Code.started', globalClock.getTime());
    Participant_CodeMaxDuration = null
    // keep track of which components have finished
    Participant_CodeComponents = [];
    Participant_CodeComponents.push(text_placeholder);
    
    Participant_CodeComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
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
    Participant_CodeComponents.forEach( function(thisComponent) {
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


function Participant_CodeRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Participant_Code' ---
    Participant_CodeComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('Participant_Code.stopped', globalClock.getTime());
    if (!quickMode) {
        psychoJS.experiment.addData('participant_code', participant_code);
    
        // safety cleanup in case the routine ended early
        var pcOv = document.getElementById('pcode-overlay');
        if (pcOv) { document.body.removeChild(pcOv); }
        var pcSt = document.getElementById('pcode-style');
        if (pcSt) { document.head.removeChild(pcSt); }
        psychoJS.window._renderer.view.style.display = 'block';
    }
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
var demo_age;
var demo_gender;
var demo_gender_self;
var demo_native_english;
var demo_english_level;
var demo_vision;
var demo_education;
var demo_student;
var demo_field_of_study;
var demo_done;
var demo_screenout;
var demo_screenout_reason;
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
    // ---------- German texts ----------
    var YESNO_DE = [['yes', 'Ja'], ['no', 'Nein']];
    var YESNO_EN = [['yes', 'Yes'], ['no', 'No']];
    
    var TEXT_DE = {
        title: 'Demografische Angaben',
        select: '-- Auswählen --',
        age: 'Alter',
        gender: 'Geschlecht',
        genderOpts: [['female', 'Weiblich'], ['male', 'Männlich'], ['non_binary', 'Nicht-binär / divers'],
                     ['self_describe', 'Ich beschreibe mich selbst'], ['prefer_not', 'Keine Angabe']],
        genderSelf: 'Bitte beschreiben Sie sich selbst',
        native: 'Ist Deutsch Ihre Erst- bzw. Muttersprache?',
        yesno: YESNO_DE,
        level: 'Selbsteingeschätzte Deutschkenntnisse',
        levelOpts: [['A1', 'A1'], ['A2', 'A2'], ['B1', 'B1'], ['B2', 'B2'], ['C1', 'C1'], ['C2', 'C2'], ['native_like', 'Muttersprachliches Niveau']],
        vision: 'Haben Sie normales oder korrigiertes Sehvermögen (z. B. mit Brille/Kontaktlinsen)?',
        education: 'Höchster Bildungsabschluss',
        eduOpts: [['high_school', 'Schulabschluss (z. B. Mittlere Reife, Abitur)'], ['some_college', 'Studium begonnen / ohne Abschluss'],
                  ['bachelor', 'Bachelor'], ['master', 'Master / Diplom / Staatsexamen'],
                  ['doctorate', 'Promotion (Dr.)'], ['other', 'Sonstiges']],
        student: 'Studieren Sie derzeit an einer Hochschule?',
        field: 'Studienfach / Fachbereich',
        fieldOpts: [['natural_sciences', 'Naturwissenschaften'], ['engineering', 'Ingenieurwesen / Technik'],
                    ['computer_science', 'Informatik / IT'], ['social_sciences', 'Sozialwissenschaften'],
                    ['psychology', 'Psychologie'], ['humanities', 'Geisteswissenschaften'],
                    ['medicine_health', 'Medizin / Gesundheitswissenschaften'], ['business_economics', 'Wirtschaftswissenschaften'],
                    ['law', 'Rechtswissenschaften'], ['arts', 'Kunst / Design'], ['education', 'Erziehungswissenschaften / Lehramt'],
                    ['other', 'Sonstiges']],
        specify: 'Bitte angeben',
        next: 'Weiter',
        error: 'Bitte beantworten Sie alle Fragen.',
        thankYou: 'Vielen Dank',
        notEligible: 'Leider erfüllen Sie die Teilnahmevoraussetzungen für diese Studie nicht. Das Experiment wird nun geschlossen.',
        reasons: {
            under_18: 'Sie müssen mindestens 18 Jahre alt sein, um an dieser Studie teilzunehmen.',
            language_below_b2: 'Für diese Studie sind Deutschkenntnisse mindestens auf dem Niveau B2 erforderlich.'
        }
    };
    
    // ---------- English texts ----------
    var TEXT_EN = {
        title: 'Demographics',
        select: '-- Select --',
        age: 'Age',
        gender: 'Gender',
        genderOpts: [['female', 'Female'], ['male', 'Male'], ['non_binary', 'Non-binary / Third gender'],
                     ['self_describe', 'Prefer to self-describe'], ['prefer_not', 'Prefer not to say']],
        genderSelf: 'Please self-describe',
        native: 'Is English your first / native language?',
        yesno: YESNO_EN,
        level: 'Self-rated English proficiency',
        levelOpts: [['A1', 'A1'], ['A2', 'A2'], ['B1', 'B1'], ['B2', 'B2'], ['C1', 'C1'], ['C2', 'C2'], ['native_like', 'Native-like']],
        vision: 'Do you have normal or corrected-to-normal vision (e.g., wearing glasses/contacts)?',
        education: 'Highest level of education',
        eduOpts: [['high_school', 'High school diploma / Secondary school'], ['some_college', 'Some college / university'],
                  ['bachelor', 'Bachelor\'s degree'], ['master', 'Master\'s degree / Graduate diploma'],
                  ['doctorate', 'Doctorate (PhD / MD)'], ['other', 'Other']],
        student: 'Are you currently a university student?',
        field: 'Field of study',
        fieldOpts: [['natural_sciences', 'Natural Sciences'], ['engineering', 'Engineering / Technology'],
                    ['computer_science', 'Computer Science / IT'], ['social_sciences', 'Social Sciences'],
                    ['psychology', 'Psychology'], ['humanities', 'Humanities'],
                    ['medicine_health', 'Medicine / Health Sciences'], ['business_economics', 'Business / Economics'],
                    ['law', 'Law'], ['arts', 'Arts / Design'], ['education', 'Education'],
                    ['other', 'Other']],
        specify: 'Please specify',
        next: 'Continue',
        error: 'Please answer all questions.',
        thankYou: 'Thank you',
        notEligible: 'Unfortunately you do not meet the eligibility criteria for this study. The experiment will now close.',
        reasons: {
            under_18: 'You must be 18 years or older to participate in this study.',
            language_below_b2: 'This study requires an English proficiency of at least B2.'
        }
    };
    
    var L = (typeof lang !== 'undefined' && lang === 'de') ? 'de' : 'en';
    var T = (L === 'de') ? TEXT_DE : TEXT_EN;
    
    // ---------- Reset globals ----------
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
    
    if (quickMode) {
        continueRoutine = false;
        demo_done = true;
    } else {
        // Hide the PsychoJS canvas temporarily
        psychoJS.window._renderer.view.style.display = 'none';
    
        // ---------- Styles ----------
        var dmStyle = document.createElement('style');
        dmStyle.id = 'demo-style';
        dmStyle.textContent =
            '#demo-card, #demo-card * {box-sizing:border-box;}' +
            '#demo-card label {display:block;margin-bottom:8px;overflow-wrap:anywhere;word-break:break-word;}' +
            '#demo-card select, #demo-card input[type=text], #demo-card input[type=number] {width:100%;padding:8px;font-size:16px;border-radius:4px;}' +
            '#demo-card .demo-field {margin-bottom:20px;}' +
            '#demo-card .demo-cond {display:none;margin-top:-10px;}' +
            '#demo-card p {overflow-wrap:anywhere;word-break:break-word;}';
        document.head.appendChild(dmStyle);
    
        // ---------- Build HTML ----------
        function selectHtml(id, opts) {
            var s = '<select id="' + id + '"><option value="">' + T.select + '</option>';
            for (var i = 0; i < opts.length; i++) {
                s += '<option value="' + opts[i][0] + '">' + opts[i][1] + '</option>';
            }
            return s + '</select>';
        }
    
        var html =
            '<h2 style="margin-top:0;">' + T.title + '</h2>' +
    
            '<div class="demo-field"><label>' + T.age + '</label>' +
              '<input id="demo-age" type="number" min="1" max="100" step="1"></div>' +
    
            '<div class="demo-field"><label>' + T.gender + '</label>' + selectHtml('demo-gender', T.genderOpts) + '</div>' +
            '<div id="demo-gender-self-wrap" class="demo-field demo-cond"><label>' + T.genderSelf + '</label>' +
              '<input id="demo-gender-self" type="text"></div>' +
    
            '<div class="demo-field"><label>' + T.native + '</label>' + selectHtml('demo-native', T.yesno) + '</div>' +
            '<div id="demo-english-level-wrap" class="demo-field demo-cond"><label>' + T.level + '</label>' +
              selectHtml('demo-english-level', T.levelOpts) + '</div>' +
    
            '<div class="demo-field"><label>' + T.vision + '</label>' + selectHtml('demo-vision', T.yesno) + '</div>' +
    
            '<div class="demo-field"><label>' + T.education + '</label>' + selectHtml('demo-education', T.eduOpts) + '</div>' +
    
            '<div class="demo-field"><label>' + T.student + '</label>' + selectHtml('demo-student', T.yesno) + '</div>' +
            '<div id="demo-field-wrap" class="demo-field demo-cond" style="margin-bottom:30px;"><label>' + T.field + '</label>' +
              '<div style="margin-bottom:8px;">' + selectHtml('demo-field', T.fieldOpts) + '</div>' +
              '<input id="demo-field-other" type="text" placeholder="' + T.specify + '" style="display:none;"></div>' +
    
            '<button id="demo-submit" style="width:100%;padding:12px;margin-top:10px;background:darkgrey;color:white;border:none;border-radius:4px;font-size:16px;cursor:pointer;">' + T.next + '</button>' +
            '<p id="demo-error" style="color:red;display:none;margin-top:10px;">' + T.error + '</p>';
    
        // ---------- Overlay ----------
        var overlay = document.createElement('div');
        overlay.id = 'demo-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#000;display:flex;align-items:center;justify-content:center;z-index:9999;overflow-y:auto;padding:10px;box-sizing:border-box;';
        overlay.innerHTML = '<div id="demo-card" style="background:#222;padding:36px;border-radius:8px;color:white;font-family:Arial;width:min(94vw,520px);max-height:94vh;overflow-y:auto;">' + html + '</div>';
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
        // reasonCode is language-independent (saved in the data); the text is shown to the participant
        function demoScreenOut(reasonCode) {
            demo_screenout = true;
            demo_screenout_reason = reasonCode;
            document.getElementById('demo-card').innerHTML =
                '<h2 style="margin-top:0;">' + T.thankYou + '</h2>' +
                '<p>' + T.reasons[reasonCode] + '</p>' +
                '<p>' + T.notEligible + '</p>';
    
            setTimeout(function() {
                psychoJS.quit({message: reasonCode, isCompleted: false});
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
                demoScreenOut('under_18');
                return;
            }
    
            if (nativeEnglish === 'no') {
                var levelOrder = {A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6, native_like: 7};
                if (levelOrder[englishLevel] < levelOrder['B2']) {
                    demoScreenOut('language_below_b2');
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
            document.head.removeChild(dmStyle);
            psychoJS.window._renderer.view.style.display = 'block';
            demo_done = true;
        });
    }
    psychoJS.experiment.addData('Demographics.started', globalClock.getTime());
    DemographicsMaxDuration = null
    // keep track of which components have finished
    DemographicsComponents = [];
    DemographicsComponents.push(text_placeholder3);
    
    DemographicsComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
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
    DemographicsComponents.forEach( function(thisComponent) {
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


function DemographicsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Demographics' ---
    DemographicsComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
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
        // safety cleanup in case the routine ended early
        var dmOv = document.getElementById('demo-overlay');
        if (dmOv) { document.body.removeChild(dmOv); }
        var dmSt = document.getElementById('demo-style');
        if (dmSt) { document.head.removeChild(dmSt); }
        psychoJS.window._renderer.view.style.display = 'block';
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
var instr_done;
var instr_rt;
var instr_keyHandler;
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
    // ---------- Texts (adjust here) ----------
    var TEXT_EN = {
        title: 'Welcome to the experiment',
        intro: 'In this study, you will complete a series of 20 trials consisting of three phases.',
        phases: [
            ['Phase 1 – Scene Presentation',
             'You will first see a short scene description together with an image.'],
            ['Phase 2 – Face Description',
             'After viewing the scene, you will be asked to briefly describe the face of the person shown in the scene using your own words.'],
            ['Phase 3 – Face Ranking',
             'Your task is to rank the faces according to how likely they match the previously shown scene.<br><br>' +
             'Place the face you think matches the scene best closer to <b>“Most likely”</b> and the face you think matches the scene least closer to <b>“Least likely”</b>.'],
            ['Phase 4 – Association Task',
             'Afterwards, you will complete a short association task. Words and images appear one at a time, and you assign each one to a category as quickly and as accurately as possible using the keyboard. Detailed instructions will follow before this task starts.']
        ],
        note: 'There are no correct or incorrect answers.',
        button: 'Start',
        hint: 'or press ENTER to begin'
    };
    
    var TEXT_DE = {
        title: 'Willkommen zum Experiment',
        intro: 'In dieser Studie bearbeiten Sie 20 Durchgänge, die jeweils aus drei Phasen bestehen.',
        phases: [
            ['Phase 1 – Szenenpräsentation',
             'Zunächst sehen Sie eine kurze Szenenbeschreibung zusammen mit einem Bild.'],
            ['Phase 2 – Gesichtsbeschreibung',
             'Nach der Szene werden Sie gebeten, das Gesicht der in der Szene gezeigten Person kurz in eigenen Worten zu beschreiben.'],
            ['Phase 3 – Gesichter-Rangfolge',
             'Ihre Aufgabe ist es, die Gesichter danach in eine Rangfolge zu bringen, wie wahrscheinlich sie zu der zuvor gezeigten Szene passen.<br><br>' +
             'Platzieren Sie das Gesicht, das Ihrer Meinung nach am besten zur Szene passt, näher an <b>„Am wahrscheinlichsten“</b> und das Gesicht, das am wenigsten zur Szene passt, näher an <b>„Am unwahrscheinlichsten“</b>.'],
            ['Phase 4 – Assoziationsaufgabe',
             'Anschließend bearbeiten Sie eine kurze Assoziationsaufgabe. Wörter und Bilder erscheinen nacheinander, und Sie ordnen jedes davon so schnell und so genau wie möglich mithilfe der Tastatur einer Kategorie zu. Ausführliche Anweisungen folgen vor Beginn dieser Aufgabe.']
        ],
        note: 'Es gibt keine richtigen oder falschen Antworten.',
        button: 'Start',
        hint: 'oder drücken Sie die ENTER-Taste, um zu beginnen'
    };
    
    var L = (typeof lang !== 'undefined' && lang === 'de') ? 'de' : 'en';
    var TEXT = (L === 'de') ? TEXT_DE : TEXT_EN;
    
    // ---------- Reset globals ----------
    instr_done = false;
    instr_rt = null;
    instr_keyHandler = null;
    
    // Hide the PsychoJS canvas temporarily
    psychoJS.window._renderer.view.style.display = 'none';
    
    // ---------- Styles ----------
    var inStyle = document.createElement('style');
    inStyle.id = 'instr-style';
    inStyle.textContent =
        '#instr-card, #instr-card * {box-sizing:border-box;}' +
        '#instr-card p {margin:0;line-height:1.5;font-size:15px;overflow-wrap:anywhere;word-break:break-word;}' +
        '#instr-card .instr-phase {background:#2c2c2c;border-radius:6px;padding:14px 18px;margin-top:14px;}' +
        '#instr-card .instr-phase h3 {font-size:16px;margin:0 0 6px 0;overflow-wrap:anywhere;}' +
        '#instr-card .instr-hint {text-align:center;font-size:13px;color:#aaa;margin-top:10px;}';
    document.head.appendChild(inStyle);
    
    // ---------- Overlay ----------
    var overlay = document.createElement('div');
    overlay.id = 'instr-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#000;display:flex;align-items:center;justify-content:center;z-index:9999;overflow-y:auto;padding:10px;box-sizing:border-box;';
    
    var html = '<div id="instr-card" style="background:#222;padding:36px;border-radius:8px;color:white;font-family:Arial;width:min(94vw,700px);max-height:94vh;overflow-y:auto;">' +
        '<h2 style="margin-top:0;">' + TEXT.title + '</h2>' +
        '<p>' + TEXT.intro + '</p>';
    
    for (var i = 0; i < TEXT.phases.length; i++) {
        html += '<div class="instr-phase"><h3>' + TEXT.phases[i][0] + '</h3><p>' + TEXT.phases[i][1] + '</p></div>';
    }
    
    html += '<p style="margin-top:20px;font-weight:bold;">' + TEXT.note + '</p>' +
        '<button id="instr-submit" style="width:100%;padding:12px;margin-top:22px;background:darkgrey;color:white;border:none;border-radius:4px;font-size:16px;cursor:pointer;">' + TEXT.button + '</button>' +
        '<p class="instr-hint">' + TEXT.hint + '</p>' +
        '</div>';
    
    overlay.innerHTML = html;
    document.body.appendChild(overlay);
    
    // ---------- Finish logic ----------
    var inStart = performance.now();
    
    function instrFinish() {
        if (instr_done) { return; }
        instr_rt = (performance.now() - inStart) / 1000;
        if (instr_keyHandler) {
            document.removeEventListener('keydown', instr_keyHandler);
            instr_keyHandler = null;
        }
        document.body.removeChild(overlay);
        document.head.removeChild(inStyle);
        psychoJS.window._renderer.view.style.display = 'block';
        instr_done = true;
    }
    
    document.getElementById('instr-submit').addEventListener('click', instrFinish);
    
    // ENTER key (ignored during the first 400 ms and for held keys)
    instr_keyHandler = function(e) {
        if (e.key === 'Enter' && !e.repeat && (performance.now() - inStart) > 400) {
            e.preventDefault();
            instrFinish();
        }
    };
    document.addEventListener('keydown', instr_keyHandler);
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
    
    if (instr_done) {
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
    psychoJS.experiment.addData('instructions_rt', instr_rt);
    
    // safety cleanup in case the routine ended early
    if (instr_keyHandler) {
        document.removeEventListener('keydown', instr_keyHandler);
        instr_keyHandler = null;
    }
    var inOv = document.getElementById('instr-overlay');
    if (inOv) { document.body.removeChild(inOv); }
    var inSt = document.getElementById('instr-style');
    if (inSt) { document.head.removeChild(inSt); }
    psychoJS.window._renderer.view.style.display = 'block';
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
        if (quickMode) {
            conditionsFile = "resources/conditions/condition_quick_" + condition + ".xlsx";
        } else {
            conditionsFile = "resources/conditions/condition_" + condition + ".xlsx";
        }
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
    
    Condition_LoadingComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
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
    Condition_LoadingComponents.forEach( function(thisComponent) {
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


function Condition_LoadingRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Condition_Loading' ---
    Condition_LoadingComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
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
      nReps: 1, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: conditionsFile,
      seed: undefined, name: 'Scene_Loop'
    });
    psychoJS.experiment.addLoop(Scene_Loop); // add the loop to the experiment
    currentLoop = Scene_Loop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    Scene_Loop.forEach(function() {
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
      nReps: faceRankingLoopNum, method: TrialHandler.Method.SEQUENTIAL,
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
    IAT_instruction_pages.forEach(function() {
      snapshot = IAT_instruction_pages.getSnapshot();
    
      IAT_instruction_pagesLoopScheduler.add(importConditions(snapshot));
      IAT_instruction_pagesLoopScheduler.add(IAT_instructionsRoutineBegin(snapshot));
      IAT_instruction_pagesLoopScheduler.add(IAT_instructionsRoutineEachFrame());
      IAT_instruction_pagesLoopScheduler.add(IAT_instructionsRoutineEnd(snapshot));
      IAT_instruction_pagesLoopScheduler.add(IAT_instruction_pagesLoopEndIteration(IAT_instruction_pagesLoopScheduler, snapshot));
    });
    
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
    IAT_blocks.forEach(function() {
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
    });
    
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
    IAT_trials.forEach(function() {
      snapshot = IAT_trials.getSnapshot();
    
      IAT_trialsLoopScheduler.add(importConditions(snapshot));
      IAT_trialsLoopScheduler.add(IAT_trialRoutineBegin(snapshot));
      IAT_trialsLoopScheduler.add(IAT_trialRoutineEachFrame());
      IAT_trialsLoopScheduler.add(IAT_trialRoutineEnd(snapshot));
      IAT_trialsLoopScheduler.add(IAT_feedbackRoutineBegin(snapshot));
      IAT_trialsLoopScheduler.add(IAT_feedbackRoutineEachFrame());
      IAT_trialsLoopScheduler.add(IAT_feedbackRoutineEnd(snapshot));
      IAT_trialsLoopScheduler.add(IAT_trialsLoopEndIteration(IAT_trialsLoopScheduler, snapshot));
    });
    
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
    window.facesPromise = null;
    sceneImagesReady = false;
    
    var scenePaths = [
        scene_image,
        face_image,
        item_image
    ];
    
    Promise.all(
        scenePaths.map(function(path) {
            return window.loadSupabaseImage(path);
        })
    )
    .then(function(images) {
    
        console.log("Scene images loaded directly from Supabase");
    
        sceneImagesReady = true;
    
        // Start loading the faces
        window.startFacePrefetch();
    
    })
    .catch(function(error) {
    
        console.error("Scene image loading failed:", error);
    
        sceneImagesReady = true;
    
    });
    psychoJS.experiment.addData('load_scene_pictures.started', globalClock.getTime());
    load_scene_picturesMaxDuration = null
    // keep track of which components have finished
    load_scene_picturesComponents = [];
    load_scene_picturesComponents.push(text_placeholder6);
    
    load_scene_picturesComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
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
    load_scene_picturesComponents.forEach( function(thisComponent) {
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


function load_scene_picturesRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'load_scene_pictures' ---
    load_scene_picturesComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
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
var slots;
var scene_position_slot;
var face_position_slot;
var item_position_slot;
var scene_layout;
var _key_resp_5_allKeys;
var task_timer_start;
var task_timer_duration;
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
    
    // =============================================
    // RESPONSIVE RANDOM IMAGE LAYOUT
    // =============================================
    
    // Screen dimensions (PsychoPy units = height)
    var screenWidth = psychoJS.window.size[0] / psychoJS.window.size[1];
    var screenHeight = 1;
    
    // Layout parameters
    var margin = 0.005;
    var gap = 0.01;
    
    // Available screen area
    var availableWidth = screenWidth - 2 * margin;
    var availableHeight = screenHeight - 2 * margin;
    
    // Two rows
    var rowHeight = (availableHeight - gap) / 2;
    
    // Two possible layouts:
    // 1. One image on top, two images below
    // 2. Two images on top, one image below
    
    var singleImageOnTop = Math.random() < 0.5;
    
    // Calculate positions and maximum bounding boxes
    var slots;
    
    if (singleImageOnTop) {
    
        // One large image on top
        slots = [
            {
                pos: [0, (rowHeight + gap) / 2],
                maxSize: [availableWidth, rowHeight]
            },
            {
                pos: [
                    -(availableWidth + gap) / 4,
                    -(rowHeight + gap) / 2
                ],
                maxSize: [
                    (availableWidth - gap) / 2,
                    rowHeight
                ]
            },
            {
                pos: [
                    (availableWidth + gap) / 4,
                    -(rowHeight + gap) / 2
                ],
                maxSize: [
                    (availableWidth - gap) / 2,
                    rowHeight
                ]
            }
        ];
    
    } else {
    
        // Two images on top, one large image below
        slots = [
            {
                pos: [
                    -(availableWidth + gap) / 4,
                    (rowHeight + gap) / 2
                ],
                maxSize: [
                    (availableWidth - gap) / 2,
                    rowHeight
                ]
            },
            {
                pos: [
                    (availableWidth + gap) / 4,
                    (rowHeight + gap) / 2
                ],
                maxSize: [
                    (availableWidth - gap) / 2,
                    rowHeight
                ]
            },
            {
                pos: [0, -(rowHeight + gap) / 2],
                maxSize: [availableWidth, rowHeight]
            }
        ];
    }
    
    // =============================================
    // RANDOMIZE IMAGE ASSIGNMENT
    // =============================================
    
    var shuffledSlots = slots.slice();
    
    for (var i = shuffledSlots.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
    
        var temp = shuffledSlots[i];
        shuffledSlots[i] = shuffledSlots[j];
        shuffledSlots[j] = temp;
    }
    
    // =============================================
    // CALCULATE MAXIMUM IMAGE SIZE
    // WHILE PRESERVING ASPECT RATIO
    // =============================================
    
    function getAspectRatioSize(imagePath, maxSize) {
    
        var img = window.supabaseImages[imagePath];
    
        if (!img || !img.naturalWidth || !img.naturalHeight) {
            throw new Error("Image dimensions unavailable: " + imagePath);
        }
    
        var aspectRatio = img.naturalWidth / img.naturalHeight;
    
        var width = maxSize[0];
        var height = width / aspectRatio;
    
        // Constrain by height if necessary
        if (height > maxSize[1]) {
            height = maxSize[1];
            width = height * aspectRatio;
        }
    
        return [width, height];
    }
    
    // =============================================
    // APPLY POSITIONS AND SIZES
    // =============================================
    
    var images = [
        { component: scene_triple, path: scene_image },
        { component: face_triple, path: face_image },
        { component: item_triple, path: item_image }
    ];
    
    images.forEach(function(image, index) {
    
        var slot = shuffledSlots[index];
    
        var size = getAspectRatioSize(
            image.path,
            slot.maxSize
        );
    
        image.component.setPos(slot.pos);
        image.component.setSize(size);
    
    });
    
    // =============================================
    // SAVE RANDOMIZATION FOR ANALYSIS
    // =============================================
    
    scene_position_slot = slots.indexOf(shuffledSlots[0]) + 1;
    face_position_slot = slots.indexOf(shuffledSlots[1]) + 1;
    item_position_slot = slots.indexOf(shuffledSlots[2]) + 1;
    
    scene_layout = singleImageOnTop ? "single_top" : "single_bottom";
    
    scene_triple.setImage(window.supabaseImages[scene_image]);
    face_triple.setImage(window.supabaseImages[face_image]);
    item_triple.setImage(window.supabaseImages[item_image]);
    key_resp_5.keys = undefined;
    key_resp_5.rt = undefined;
    _key_resp_5_allKeys = [];
    // Run 'Begin Routine' code from timer_2
    task_timer_start = globalClock.getTime();
    task_timer_duration = 40;
    
    applyLang(text_continue_triple);
    psychoJS.experiment.addData('Scene_Presentation_Triple.started', globalClock.getTime());
    Scene_Presentation_TripleMaxDuration = 40
    // keep track of which components have finished
    Scene_Presentation_TripleComponents = [];
    Scene_Presentation_TripleComponents.push(scene_triple);
    Scene_Presentation_TripleComponents.push(face_triple);
    Scene_Presentation_TripleComponents.push(item_triple);
    Scene_Presentation_TripleComponents.push(text_continue_triple);
    Scene_Presentation_TripleComponents.push(key_resp_5);
    Scene_Presentation_TripleComponents.push(timer_text_2);
    
    Scene_Presentation_TripleComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


var time_left;
var seconds;
function Scene_Presentation_TripleRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Scene_Presentation_Triple' ---
    // get current time
    t = Scene_Presentation_TripleClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // is it time to end the Routine? (based on local clock)
    if (t > Scene_Presentation_TripleMaxDuration) {
        Scene_Presentation_TripleMaxDurationReached = true
        continueRoutine = false
    }
    
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
    
    // Run 'Each Frame' code from timer_2
    time_left = task_timer_duration - (
        globalClock.getTime() - task_timer_start
    );
    
    seconds = Math.max(0, Math.floor(time_left));
    
    timer_text.setText(String(seconds));
    
    if (time_left <= 0) {
        continueRoutine = false;
    }
    
    // *timer_text_2* updates
    if (t >= 0.0 && timer_text_2.status === PsychoJS.Status.NOT_STARTED) {
      // update params
      timer_text_2.setText(`${seconds}`, false);
      // keep track of start time/frame for later
      timer_text_2.tStart = t;  // (not accounting for frame time here)
      timer_text_2.frameNStart = frameN;  // exact frame index
      
      timer_text_2.setAutoDraw(true);
    }
    
    
    // if timer_text_2 is active this frame...
    if (timer_text_2.status === PsychoJS.Status.STARTED) {
      // update params
      timer_text_2.setText(`${seconds}`, false);
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
    Scene_Presentation_TripleComponents.forEach( function(thisComponent) {
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


function Scene_Presentation_TripleRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Scene_Presentation_Triple' ---
    Scene_Presentation_TripleComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
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
    
    hint_text.setText(tr('desc_hint').replace('{n}', text_length));
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
    
    if (!window.facesPromise) {
        window.startFacePrefetch();
    }
    
    window.facesPromise
        .then(function() {
            facesReady = true;
        })
        .catch(function(error) {
            console.error("Faces not ready:", error);
        });
    psychoJS.experiment.addData('load_scene_faces.started', globalClock.getTime());
    load_scene_facesMaxDuration = null
    // keep track of which components have finished
    load_scene_facesComponents = [];
    load_scene_facesComponents.push(wait_text_2);
    
    load_scene_facesComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
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
    load_scene_facesComponents.forEach( function(thisComponent) {
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


function load_scene_facesRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'load_scene_faces' ---
    load_scene_facesComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
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
    faceBasePath = "faces/" + gender + "/" + folderName + "/";
    
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
    image_1.setImage(window.supabaseImages[face1Path]);
    image_2.setSize(aspectCorrectedSize(0.3, 0.3));
    image_2.setImage(window.supabaseImages[face2Path]);
    image_3.setSize(aspectCorrectedSize(0.3, 0.3));
    image_3.setImage(window.supabaseImages[face3Path]);
    image_4.setSize(aspectCorrectedSize(0.3, 0.3));
    image_4.setImage(window.supabaseImages[face4Path]);
    image_5.setSize(aspectCorrectedSize(0.3, 0.3));
    image_5.setImage(window.supabaseImages[face5Path]);
    image_6.setSize(aspectCorrectedSize(0.3, 0.3));
    image_6.setImage(window.supabaseImages[face6Path]);
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
    Face_RankingComponents.push(ranking_description);
    
    Face_RankingComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


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
    
    // Run 'Each Frame' code from gate_finish_ranking
    if (finish_ranking_key.keys === 'return' && !submit_allowed) {
        finish_ranking_key.keys = [];
        _finish_ranking_key_allKeys = [];
        continueRoutine = true;
    }
    
    applyLang(ranking_bar_left,  ranking_bar_right, finish_ranking_text);
    
    // *ranking_description* updates
    if (t >= 0.0 && ranking_description.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      ranking_description.tStart = t;  // (not accounting for frame time here)
      ranking_description.frameNStart = frameN;  // exact frame index
      
      ranking_description.setAutoDraw(true);
    }
    
    
    // if ranking_description is active this frame...
    if (ranking_description.status === PsychoJS.Status.STARTED) {
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


var allRows;
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
    
        // Existing DataPipe save
        saveToDataPipe(filename, convertToCSV(allRows));
    
        // Additional Supabase save
        saveToSupabase(participantID, allRows);
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
    
    IAT_instructionsComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
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
    IAT_instructionsComponents.forEach( function(thisComponent) {
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


var _mouseXYs;
function IAT_instructionsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'IAT_instructions' ---
    IAT_instructionsComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
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
    
    IAT_readyComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
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
    IAT_readyComponents.forEach( function(thisComponent) {
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


function IAT_readyRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'IAT_ready' ---
    IAT_readyComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
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
    
    IAT_trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
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
    IAT_trialComponents.forEach( function(thisComponent) {
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


var corr;
var rt;
function IAT_trialRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'IAT_trial' ---
    IAT_trialComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
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
    
    IAT_feedbackComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
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
    IAT_feedbackComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
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
    IAT_feedbackComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
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


var explicit_measurementsMaxDurationReached;
var expl_done;
var expl_data;
var expl_keys;
var expl_order;
var expl_rt;
var explicit_measurementsMaxDuration;
var explicit_measurementsComponents;
function explicit_measurementsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'explicit_measurements' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // keep track of whether this Routine was forcibly ended
    routineForceEnded = false;
    explicit_measurementsClock.reset();
    routineTimer.reset();
    explicit_measurementsMaxDurationReached = false;
    // update component parameters for each repeat
    // ---------- Texts (adjust here) ----------
    // Keys (A_weiss, aggressiv, ...) stay identical in both languages, so the data columns match.
    var LABELS_EN = {
        title: 'Ratings',
        instruction: 'Please estimate how strongly each characteristic applies to men of the two groups. ' +
                     'Click on a scale to answer (0 % = does not apply at all, 100 % = applies completely).',
        groups: [
            ['A_weiss', 'Group A: White men / men without a migration background'],
            ['B_arab',  'Group B: Arab / Muslim men']
        ],
        traits: [
            ['aggressiv',    'aggressive'],
            ['gewalttaetig', 'violent'],
            ['bedrohlich',   'threatening'],
            ['kriminell',    'criminal'],
            ['gefaehrlich',  'dangerous']
        ],
        scaleMin: '0 %',
        scaleMax: '100 %',
        button: 'Continue',
        error: 'Please answer all questions.'
    };
    
    var LABELS_DE = {
        title: 'Einschätzungen',
        instruction: 'Bitte schätzen Sie ein, wie stark die jeweilige Eigenschaft auf Männer der beiden Gruppen zutrifft. ' +
                     'Klicken Sie zum Antworten auf die Skala (0 % = trifft überhaupt nicht zu, 100 % = trifft völlig zu).',
        groups: [
            ['A_weiss', 'Gruppe A: Weiße Männer / Männer ohne Migrationshintergrund'],
            ['B_arab',  'Gruppe B: Arabische / muslimische Männer']
        ],
        traits: [
            ['aggressiv',    'aggressiv'],
            ['gewalttaetig', 'gewalttätig'],
            ['bedrohlich',   'bedrohlich'],
            ['kriminell',    'kriminell'],
            ['gefaehrlich',  'gefährlich']
        ],
        scaleMin: '0 %',
        scaleMax: '100 %',
        button: 'Weiter',
        error: 'Bitte beantworten Sie alle Fragen.'
    };
    
    var L = (typeof lang !== 'undefined' && lang === 'de') ? 'de' : 'en';
    var LABELS = (L === 'de') ? LABELS_DE : LABELS_EN;
    var SHUFFLE_TRAITS = true;
    
    // ---------- Reset globals ----------
    expl_done = false;
    expl_data = {};
    expl_keys = [];
    expl_order = '';
    expl_rt = null;
    
    // Trait order (shuffled per participant)
    var traits = LABELS.traits.slice();
    if (SHUFFLE_TRAITS) {
        for (var i = traits.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = traits[i]; traits[i] = traits[j]; traits[j] = tmp;
        }
    }
    var orderArr = [];
    for (var a = 0; a < traits.length; a++) { orderArr.push(traits[a][0]); }
    expl_order = orderArr.join(',');
    
    // Column keys (always the same set, also when skipped in quick mode)
    for (var ti0 = 0; ti0 < traits.length; ti0++) {
        for (var gi0 = 0; gi0 < LABELS.groups.length; gi0++) {
            expl_keys.push(LABELS.groups[gi0][0] + '_' + traits[ti0][0]);
        }
    }
    
    // Hide the PsychoJS canvas temporarily
    psychoJS.window._renderer.view.style.display = 'none';
    
    // ---------- Styles ----------
    var styleEl = document.createElement('style');
    styleEl.id = 'expl-style';
    styleEl.textContent =
        '#expl-card, #expl-card * {box-sizing:border-box;}' +
        '#expl-card .expl-grid {display:grid;grid-template-columns:minmax(90px,130px) 1fr 1fr;gap:18px 28px;align-items:start;}' +
        '#expl-card .expl-head {font-weight:bold;font-size:14px;line-height:1.3;overflow-wrap:anywhere;word-break:break-word;}' +
        '#expl-card .expl-trait {font-weight:bold;font-size:16px;overflow-wrap:anywhere;word-break:break-word;padding-top:2px;}' +
        '#expl-card .expl-cell {min-width:0;}' +
        '#expl-card input[type=range] {width:100%;margin:4px 0 0 0;background:transparent;-webkit-appearance:none;appearance:none;height:24px;cursor:pointer;}' +
        '#expl-card input[type=range]::-webkit-slider-runnable-track {height:6px;background:#555;border-radius:3px;}' +
        '#expl-card input[type=range]::-moz-range-track {height:6px;background:#555;border-radius:3px;}' +
        '#expl-card input[type=range]::-webkit-slider-thumb {-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:darkgrey;border:2px solid white;margin-top:-7px;}' +
        '#expl-card input[type=range]::-moz-range-thumb {width:16px;height:16px;border-radius:50%;background:darkgrey;border:2px solid white;}' +
        '#expl-card input[type=range].expl-untouched::-webkit-slider-thumb {opacity:0;}' +
        '#expl-card input[type=range].expl-untouched::-moz-range-thumb {opacity:0;}' +
        '#expl-card .expl-scale {display:flex;justify-content:space-between;font-size:12px;color:#aaa;}' +
        '#expl-card .expl-val {text-align:center;font-size:13px;min-height:17px;margin-top:2px;}' +
        '@media (max-width:640px) {' +
        '  #expl-card .expl-grid {grid-template-columns:1fr 1fr;gap:12px 16px;}' +
        '  #expl-card .expl-spacer {display:none;}' +
        '  #expl-card .expl-trait {grid-column:1 / span 2;margin-top:10px;}' +
        '}';
    document.head.appendChild(styleEl);
    
    // ---------- Overlay ----------
    var overlay = document.createElement('div');
    overlay.id = 'expl-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#000;display:flex;align-items:center;justify-content:center;z-index:9999;overflow-y:auto;padding:10px;box-sizing:border-box;';
    
    var html = '<div id="expl-card" style="background:#222;padding:32px;border-radius:8px;color:white;font-family:Arial;width:min(94vw,780px);max-height:94vh;overflow-y:auto;">' +
        '<h2 style="margin-top:0;">' + LABELS.title + '</h2>' +
        '<p style="margin:0 0 24px 0;line-height:1.4;overflow-wrap:anywhere;">' + LABELS.instruction + '</p>' +
        '<div class="expl-grid">' +
        '<div class="expl-spacer"></div>';
    
    for (var g = 0; g < LABELS.groups.length; g++) {
        html += '<div class="expl-head">' + LABELS.groups[g][1] + '</div>';
    }
    
    for (var t = 0; t < traits.length; t++) {
        html += '<div class="expl-trait">' + traits[t][1] + '</div>';
        for (var g2 = 0; g2 < LABELS.groups.length; g2++) {
            var key = LABELS.groups[g2][0] + '_' + traits[t][0];
            html += '<div class="expl-cell">' +
                '<input id="expl-sl-' + key + '" class="expl-untouched" type="range" min="0" max="100" step="1" value="50">' +
                '<div class="expl-scale"><span>' + LABELS.scaleMin + '</span><span>' + LABELS.scaleMax + '</span></div>' +
                '<div id="expl-val-' + key + '" class="expl-val"></div>' +
                '</div>';
        }
    }
    
    html += '</div>' +
        '<button id="expl-submit" style="width:100%;padding:12px;margin-top:28px;background:darkgrey;color:white;border:none;border-radius:4px;font-size:16px;cursor:pointer;">' + LABELS.button + '</button>' +
        '<p id="expl-error" style="color:red;display:none;margin-top:10px;">' + LABELS.error + '</p>' +
        '</div>';
    
    overlay.innerHTML = html;
    document.body.appendChild(overlay);
    
    // ---------- Slider logic ----------
    var touched = {};
    function bindSlider(k) {
        var el = document.getElementById('expl-sl-' + k);
        var valEl = document.getElementById('expl-val-' + k);
        function mark() {
            touched[k] = true;
            el.classList.remove('expl-untouched');
            valEl.textContent = el.value + ' %';
        }
        el.addEventListener('pointerdown', mark);
        el.addEventListener('input', mark);
        el.addEventListener('keydown', mark);
    }
    for (var s = 0; s < expl_keys.length; s++) { bindSlider(expl_keys[s]); }
    
    var tStart = performance.now();
    
    document.getElementById('expl-submit').addEventListener('click', function() {
        for (var m = 0; m < expl_keys.length; m++) {
            if (!touched[expl_keys[m]]) {
                document.getElementById('expl-error').style.display = 'block';
                return;
            }
        }
        for (var n = 0; n < expl_keys.length; n++) {
            expl_data[expl_keys[n]] = parseInt(document.getElementById('expl-sl-' + expl_keys[n]).value, 10);
        }
        expl_rt = (performance.now() - tStart) / 1000;
    
        // clean up
        document.body.removeChild(overlay);
        document.head.removeChild(styleEl);
        psychoJS.window._renderer.view.style.display = 'block';
        expl_done = true;
    });
    psychoJS.experiment.addData('explicit_measurements.started', globalClock.getTime());
    explicit_measurementsMaxDuration = null
    // keep track of which components have finished
    explicit_measurementsComponents = [];
    explicit_measurementsComponents.push(text_placeholder7);
    
    explicit_measurementsComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function explicit_measurementsRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'explicit_measurements' ---
    // get current time
    t = explicit_measurementsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_placeholder7* updates
    if (t >= 0.0 && text_placeholder7.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_placeholder7.tStart = t;  // (not accounting for frame time here)
      text_placeholder7.frameNStart = frameN;  // exact frame index
      
      text_placeholder7.setAutoDraw(true);
    }
    
    
    // if text_placeholder7 is active this frame...
    if (text_placeholder7.status === PsychoJS.Status.STARTED) {
    }
    
    if (expl_done) {
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
    explicit_measurementsComponents.forEach( function(thisComponent) {
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


function explicit_measurementsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'explicit_measurements' ---
    explicit_measurementsComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('explicit_measurements.stopped', globalClock.getTime());
    for (var q = 0; q < expl_keys.length; q++) {
        var kq = expl_keys[q];
        psychoJS.experiment.addData('explicit_' + kq, (kq in expl_data) ? expl_data[kq] : '');
    }
    psychoJS.experiment.addData('explicit_rt', expl_rt);
    psychoJS.experiment.addData('explicit_trait_order', expl_order);
    
    // safety cleanup in case the routine ended early
    var ov = document.getElementById('expl-overlay');
    if (ov) { document.body.removeChild(ov); }
    var st = document.getElementById('expl-style');
    if (st) { document.head.removeChild(st); }
    psychoJS.window._renderer.view.style.display = 'block';
    // the Routine "explicit_measurements" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var End_DemographicsMaxDurationReached;
var demo_ethnicity;
var demo_country_code;
var demo_country_name;
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
    // ---------- Texts (adjust here) ----------
    var TEXT_DE = {
        title: 'Demografische Angaben',
        select: '-- Auswählen --',
        ethnicity: 'Ethnische Herkunft',
        ethOpts: [['white', 'Weiß'],
                  ['middle_eastern', 'Naher Osten / Arabisch / Nordafrikanisch'],
                  ['black', 'Schwarz / afrikanischer Herkunft'],
                  ['asian', 'Asiatisch'],
                  ['hispanic', 'Hispanisch / Lateinamerikanisch'],
                  ['multiracial', 'Mehrere Herkünfte / gemischt'],
                  ['prefer_not', 'Keine Angabe']],
        country: 'In welchem Land leben Sie derzeit?',
        next: 'Weiter',
        error: 'Bitte beantworten Sie alle Fragen.'
    };
    var TEXT_EN = {
        title: 'Demographics',
        select: '-- Select --',
        ethnicity: 'Ethnic background',
        ethOpts: [['white', 'White / Caucasian'],
                  ['middle_eastern', 'Middle Eastern / Arab / North African'],
                  ['black', 'Black / African descent'],
                  ['asian', 'Asian'],
                  ['hispanic', 'Hispanic / Latino'],
                  ['multiracial', 'Multiracial'],
                  ['prefer_not', 'Prefer not to say']],
        country: 'In which country do you currently reside?',
        next: 'Continue',
        error: 'Please answer all questions.'
    };
    var L = (typeof lang !== 'undefined' && lang === 'de') ? 'de' : 'en';
    var T = (L === 'de') ? TEXT_DE : TEXT_EN;
    
    // ---------- Reset globals ----------
    demo_ethnicity = '';
    demo_country_code = '';
    demo_country_name = '';
    demo_done = false;
    
    if (quickMode) {
        continueRoutine = false;
        demo_done = true;
    } else {
        // Hide the PsychoJS canvas temporarily
        psychoJS.window._renderer.view.style.display = 'none';
    
        // ---------- Styles ----------
        var d2Style = document.createElement('style');
        d2Style.id = 'demo2-style';
        d2Style.textContent =
            '#demo2-card, #demo2-card * {box-sizing:border-box;}' +
            '#demo2-card label {display:block;margin-bottom:8px;overflow-wrap:anywhere;word-break:break-word;}' +
            '#demo2-card select {width:100%;padding:8px;font-size:16px;border-radius:4px;}' +
            '#demo2-card p {overflow-wrap:anywhere;word-break:break-word;}';
        document.head.appendChild(d2Style);
    
        // ---------- Build HTML ----------
        var ethHtml = '<option value="">' + T.select + '</option>';
        for (var e = 0; e < T.ethOpts.length; e++) {
            ethHtml += '<option value="' + T.ethOpts[e][0] + '">' + T.ethOpts[e][1] + '</option>';
        }
    
        // Create overlay form
        var overlay = document.createElement('div');
        overlay.id = 'demo2-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#000;display:flex;align-items:center;justify-content:center;z-index:9999;overflow-y:auto;padding:10px;box-sizing:border-box;';
    
        overlay.innerHTML =
            '<div id="demo2-card" style="background:#222;padding:36px;border-radius:8px;color:white;font-family:Arial;width:min(94vw,520px);max-height:94vh;overflow-y:auto;">' +
              '<h2 style="margin-top:0;">' + T.title + '</h2>' +
              '<div style="margin-bottom:20px;">' +
                '<label>' + T.ethnicity + '</label>' +
                '<select id="demo-race">' + ethHtml + '</select>' +
              '</div>' +
              '<div style="margin-bottom:30px;">' +
                '<label>' + T.country + '</label>' +
                '<select id="demo-country"><option value="">' + T.select + '</option></select>' +
              '</div>' +
              '<button id="demo-submit" style="width:100%;padding:12px;background:darkgrey;color:white;border:none;border-radius:4px;font-size:16px;cursor:pointer;">' + T.next + '</button>' +
              '<p id="demo-error" style="color:red;display:none;margin-top:10px;">' + T.error + '</p>' +
            '</div>';
    
        document.body.appendChild(overlay);
    
        // --- build country list (ISO 3166-1 alpha-2 codes) ---
        var countryCodes = ('AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ ' +
            'CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR ' +
            'GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP ' +
            'KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ ' +
            'NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW ' +
            'SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ ' +
            'UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW').split(' ');
    
        // Names are shown in the participant's language (L), but always saved in English (comparable data)
        var countryLocale = L;
    
        var displayNames = null;
        var displayNamesEn = null;
        try {
            displayNames = new Intl.DisplayNames([countryLocale], {type: 'region'});
            displayNamesEn = new Intl.DisplayNames(['en'], {type: 'region'});
        } catch (err) {
            displayNames = null;
            displayNamesEn = null;
        }
    
        var countries = [];
        var englishNames = {};
        for (var c = 0; c < countryCodes.length; c++) {
            var code = countryCodes[c];
            var name = code;
            var nameEn = code;
            try {
                if (displayNames) { name = displayNames.of(code) || code; }
                if (displayNamesEn) { nameEn = displayNamesEn.of(code) || code; }
            } catch (err2) {}
            countries.push({code: code, name: name});
            englishNames[code] = nameEn;
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
            var countryCode = countrySelect.value;
    
            if (!race || !countryCode) {
                document.getElementById('demo-error').style.display = 'block';
                return;
            }
    
            demo_ethnicity = race;
            demo_country_code = countryCode;
            demo_country_name = englishNames[countryCode];   // always English in the data
    
            // clean up
            document.body.removeChild(overlay);
            document.head.removeChild(d2Style);
            psychoJS.window._renderer.view.style.display = 'block';
            demo_done = true;
        });
    }
    psychoJS.experiment.addData('End_Demographics.started', globalClock.getTime());
    End_DemographicsMaxDuration = null
    // keep track of which components have finished
    End_DemographicsComponents = [];
    End_DemographicsComponents.push(text_placeholder4);
    
    End_DemographicsComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
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
    End_DemographicsComponents.forEach( function(thisComponent) {
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


function End_DemographicsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'End_Demographics' ---
    End_DemographicsComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
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
        // safety cleanup in case the routine ended early
        var d2Ov = document.getElementById('demo2-overlay');
        if (d2Ov) { document.body.removeChild(d2Ov); }
        var d2St = document.getElementById('demo2-style');
        if (d2St) { document.head.removeChild(d2St); }
        psychoJS.window._renderer.view.style.display = 'block';
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
var debrief_done;
var debrief_rt;
var sona_opened;
var sona_copied;
var saveOk;
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
    // ---------- Texts (adjust here) ----------
    var TEXT_EN = {
        title: 'Debriefing',
        thanks: 'Thank you for taking part in this study!',
        sections: [
            ['What this study is about',
             'We investigated whether <b>stereotypes</b> and <b>biases</b> influence how people interpret everyday situations. ' +
             'A <i>bias</i> is a systematic tendency to judge people or situations in a certain way, often based on group membership such as gender, origin or religion.'],
            ['What you did',
             'You saw 20 short scenes, 10 with a crime-related context and 10 with a neutral one. ' +
             'For each scene, you described the face of the person shown and ranked six faces by how likely they matched the scene. ' +
             'You also completed an association task, the Implicit Association Test (IAT), which uses your response speed to measure how strongly concepts are automatically associated with each other. ' +
             'At the end, you rated several characteristics for two groups of men.'],
            ['What we are looking for',
             'Some biases are <b>explicit</b>: people are aware of them and can report them, as in the final ratings. ' +
             'Others are <b>implicit</b> (also called <i>unknown</i> or <i>unconscious</i> biases): they work automatically, and people often don\'t notice them, ' +
             'yet they can still influence decisions, such as which face seems to fit a crime scene. ' +
             'By comparing your rankings, descriptions and IAT results with your ratings, we can see whether implicit and explicit biases match and whether the scene context changes which faces people choose. ' +
             'The faces were selected to look as non-stereotypical as possible, so differences in the rankings cannot be explained by the faces alone.']
        ],
        importantTitle: 'Important to know',
        bullets: [
            'Having biases is <b>normal</b>. They are a by-product of how the brain learns from environment, media and culture, and they say nothing about your character.',
            'There are <b>no right or wrong answers</b>, and your results are not evaluated individually.',
            'Your data is stored <b>anonymously</b> under a randomly generated participant code.'
        ],
        button: 'Complete participation',
        buttonNext: 'Continue',
        sonaTitle: 'Receive your participation credit',
        sonaIntro: 'To receive your participation credit, please open the link below. It confirms your participation in Sona Systems and contains your participant code.',
        sonaOpenLink: 'Open link in a new tab',
        sonaCopy: 'Copy link',
        sonaCopied: 'Copied!',
        sonaCopyFailed: 'Copy failed – the link is selected, please copy it manually',
        sonaHint: 'When you click “Complete participation”, the link opens automatically in a new tab. If nothing opens, please use the link above.',
        sonaBlocked: 'Your browser blocked the new tab. Please click the link above first, then press the button again.',
        saveWait: 'Saving your data… please do not close this window.',
        saveOk: 'Your data has been saved. You can now complete the study.',
        saveFail: 'The final save did not complete. You can still complete the study.'
    };
    
    var TEXT_DE = {
        title: 'Abschlussinformation (Debriefing)',
        thanks: 'Vielen Dank für Ihre Teilnahme an dieser Studie!',
        sections: [
            ['Worum es in dieser Studie geht',
             'Wir haben untersucht, ob <b>Stereotype</b> und <b>Verzerrungen (Biases)</b> beeinflussen, wie Menschen alltägliche Situationen interpretieren. ' +
             'Ein <i>Bias</i> ist eine systematische Tendenz, Menschen oder Situationen auf eine bestimmte Weise zu beurteilen, oft aufgrund der Gruppenzugehörigkeit, zum Beispiel Geschlecht, Herkunft oder Religion.'],
            ['Was Sie getan haben',
             'Sie haben 20 kurze Szenen gesehen, 10 mit einem kriminalitätsbezogenen Kontext und 10 mit einem neutralen. ' +
             'Zu jeder Szene haben Sie das Gesicht der gezeigten Person beschrieben und sechs Gesichter danach in eine Rangfolge gebracht, wie wahrscheinlich sie zur Szene passen. ' +
             'Außerdem haben Sie eine Assoziationsaufgabe bearbeitet, den Impliziten Assoziationstest (IAT), der anhand Ihrer Reaktionsgeschwindigkeit misst, wie stark Begriffe automatisch miteinander assoziiert werden. ' +
             'Am Ende haben Sie mehrere Eigenschaften für zwei Gruppen von Männern eingeschätzt.'],
            ['Wonach wir suchen',
             'Manche Biases sind <b>explizit</b>: Menschen sind sich ihrer bewusst und können darüber Auskunft geben, wie bei den abschließenden Einschätzungen. ' +
             'Andere sind <b>implizit</b> (auch <i>unbekannte</i> oder <i>unbewusste</i> Biases genannt): Sie wirken automatisch, und Menschen bemerken sie oft nicht, ' +
             'können aber dennoch Entscheidungen beeinflussen, etwa welches Gesicht zu einer Kriminalitätsszene zu passen scheint. ' +
             'Indem wir Ihre Rangfolgen, Beschreibungen und IAT-Ergebnisse mit Ihren Einschätzungen vergleichen, können wir untersuchen, ob implizite und explizite Biases übereinstimmen und ob der Kontext einer Szene beeinflusst, welche Gesichter Menschen auswählen. ' +
             'Die Gesichter wurden so ausgewählt, dass sie möglichst wenig stereotyp aussehen. Unterschiede in den Rangfolgen lassen sich daher nicht allein durch die Gesichter erklären.']
        ],
        importantTitle: 'Wichtig zu wissen',
        bullets: [
            'Biases zu haben ist <b>normal</b>. Sie entstehen als Nebenprodukt davon, wie das Gehirn aus Umwelt, Medien und Kultur lernt, und sagen nichts über Ihren Charakter aus.',
            'Es gibt <b>keine richtigen oder falschen Antworten</b>, und Ihre Ergebnisse werden nicht individuell ausgewertet.',
            'Ihre Daten werden <b>anonym</b> unter einem zufällig erzeugten Teilnahmecode gespeichert.'
        ],
        button: 'Teilnahme abschließen',
        buttonNext: 'Weiter',
        sonaTitle: 'Teilnahmeincentive erhalten',
        sonaIntro: 'Um Ihr Teilnahmeincentive zu erhalten, öffnen Sie bitte den folgenden Link. Er bestätigt Ihre Teilnahme in Sona Systems und enthält Ihren Teilnahmecode.',
        sonaOpenLink: 'Link in neuem Tab öffnen',
        sonaCopy: 'Link kopieren',
        sonaCopied: 'Kopiert!',
        sonaCopyFailed: 'Kopieren fehlgeschlagen – der Link ist markiert, bitte manuell kopieren',
        sonaHint: 'Wenn Sie auf „Teilnahme abschließen“ klicken, öffnet sich der Link automatisch in einem neuen Tab. Falls sich nichts öffnet, nutzen Sie bitte den Link oben.',
        sonaBlocked: 'Ihr Browser hat den neuen Tab blockiert. Bitte klicken Sie zuerst auf den Link oben und drücken Sie dann erneut auf die Schaltfläche.',
        saveWait: 'Ihre Daten werden gespeichert … bitte schließen Sie dieses Fenster nicht.',
        saveOk: 'Ihre Daten wurden gespeichert. Sie können die Studie jetzt abschließen.',
        saveFail: 'Die abschließende Speicherung wurde nicht vollständig durchgeführt. Sie können die Studie dennoch abschließen.'
    };
    
    var L = (typeof lang !== 'undefined' && lang === 'de') ? 'de' : 'en';
    var TEXT = (L === 'de') ? TEXT_DE : TEXT_EN;
    
    // ---------- Status texts ----------
    var SAVE_MSG_WAIT = TEXT.saveWait;
    var SAVE_MSG_OK   = TEXT.saveOk;
    var SAVE_MSG_FAIL = TEXT.saveFail;
    
    // ---------- Settings ----------
    var SHOW_SONA_LINK = use_sona;
    var SONA_BASE = 'https://fernuni-hagen.sona-systems.com/webstudy_credit.aspx?experiment_id=1152&credit_token=2c54653912d442588f16e2e2a0ee7761&survey_code=';
    var sonaCode = participant_code || 'UNKNOWN';
    var sonaUrl = SONA_BASE + encodeURIComponent(sonaCode);
    
    // ---------- Fullscreen warning off for the debriefing ----------
    if (window.fsGuard) {
        if (window.fsGuard.disable) { window.fsGuard.disable(); }
        else { window.fsGuard.active = false; }
    }
    
    // ---------- Reset globals ----------
    debrief_done = false;
    debrief_rt = null;
    sona_opened = false;
    sona_copied = false;
    
    // Hide the PsychoJS canvas temporarily
    psychoJS.window._renderer.view.style.display = 'none';
    
    // ---------- Styles ----------
    var dbStyle = document.createElement('style');
    dbStyle.id = 'debrief-style';
    dbStyle.textContent =
        '#debrief-card, #debrief-card * {box-sizing:border-box;}' +
        '#debrief-card p, #debrief-card li {overflow-wrap:anywhere;word-break:break-word;}' +
        '#debrief-card h3 {font-size:16px;margin:22px 0 8px 0;}' +
        '#debrief-card p {margin:0;line-height:1.5;font-size:15px;}' +
        '#debrief-card ul {margin:0;padding-left:22px;}' +
        '#debrief-card li {line-height:1.5;font-size:15px;margin-bottom:8px;}' +
        '#debrief-card button:disabled {opacity:0.4;cursor:not-allowed;}' +
        '#debrief-card .debrief-row {display:flex;gap:12px;flex-wrap:wrap;}' +
        '#debrief-card .debrief-row a, #debrief-card .debrief-row button {flex:1 1 180px;padding:12px;background:#444;color:white;border:none;border-radius:4px;font-size:15px;cursor:pointer;text-align:center;text-decoration:none;font-family:Arial;}';
    document.head.appendChild(dbStyle);
    
    // ---------- Overlay ----------
    var overlay = document.createElement('div');
    overlay.id = 'debrief-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#000;display:flex;align-items:center;justify-content:center;z-index:9999;overflow-y:auto;padding:10px;box-sizing:border-box;';
    
    var html = '<div id="debrief-card" style="background:#222;padding:36px;border-radius:8px;color:white;font-family:Arial;width:min(94vw,700px);max-height:94vh;overflow-y:auto;">' +
        '<div id="debrief-page1">' +
        '<h2 style="margin-top:0;">' + TEXT.title + '</h2>' +
        '<p style="font-weight:bold;font-size:17px;">' + TEXT.thanks + '</p>';
    
    for (var i = 0; i < TEXT.sections.length; i++) {
        html += '<h3>' + TEXT.sections[i][0] + '</h3><p>' + TEXT.sections[i][1] + '</p>';
    }
    
    html += '<h3>' + TEXT.importantTitle + '</h3><ul>';
    for (var j = 0; j < TEXT.bullets.length; j++) {
        html += '<li>' + TEXT.bullets[j] + '</li>';
    }
    html += '</ul>' +
        '<p id="debrief-status" style="margin-top:22px;font-size:14px;color:#aaa;text-align:center;">' + SAVE_MSG_WAIT + '</p>' +
        '<button id="debrief-submit" disabled style="width:100%;padding:12px;margin-top:14px;background:darkgrey;color:white;border:none;border-radius:4px;font-size:16px;cursor:pointer;">' +
            (SHOW_SONA_LINK ? TEXT.buttonNext : TEXT.button) + '</button>' +
        '</div>' +
    
        '<div id="debrief-page2" style="display:none;">' +
        '<h2 style="margin-top:0;">' + TEXT.sonaTitle + '</h2>' +
        '<p>' + TEXT.sonaIntro + '</p>' +
        '<div id="debrief-sonaurl" style="background:#111;padding:14px;border-radius:4px;margin:18px 0 12px 0;font-family:monospace;font-size:13px;overflow-wrap:anywhere;word-break:break-all;"></div>' +
        '<div class="debrief-row">' +
            '<a id="debrief-sonalink" target="_blank" rel="noopener noreferrer">' + TEXT.sonaOpenLink + '</a>' +
            '<button id="debrief-copy">' + TEXT.sonaCopy + '</button>' +
        '</div>' +
        '<p style="margin-top:16px;font-size:13px;color:#aaa;">' + TEXT.sonaHint + '</p>' +
        '<p id="debrief-blocked" style="display:none;margin-top:12px;color:#ff8080;font-size:14px;">' + TEXT.sonaBlocked + '</p>' +
        '<button id="debrief-finish" style="width:100%;padding:12px;margin-top:20px;background:darkgrey;color:white;border:none;border-radius:4px;font-size:16px;cursor:pointer;">' + TEXT.button + '</button>' +
        '</div>' +
        '</div>';
    
    overlay.innerHTML = html;
    document.body.appendChild(overlay);
    
    // Fill link (textContent / href, so & is handled correctly)
    var urlBox = document.getElementById('debrief-sonaurl');
    urlBox.textContent = sonaUrl;
    document.getElementById('debrief-sonalink').href = sonaUrl;
    
    // ---------- Helpers ----------
    function withTimeout(promise, ms) {
        return new Promise(function(resolve, reject) {
            var timer = setTimeout(function() { reject(new Error('timeout')); }, ms);
            promise.then(function(v) { clearTimeout(timer); resolve(v); },
                         function(e) { clearTimeout(timer); reject(e); });
        });
    }
    function wait(ms) {
        return new Promise(function(resolve) { setTimeout(resolve, ms); });
    }
    
    
    // ---------- Final save: retry each destination independently ----------
    
    var pipeSaved = false;
    var supabaseSaved = false;
    
    var participantID = participant_code || "UNKNOWN";
    
    // Snapshot the experiment data once
    var rows = psychoJS.experiment._trialsData.slice();
    var cur = psychoJS.experiment._currentTrialData;
    
    if (cur && Object.keys(cur).length > 0) {
        rows.push(cur);
    }
    
    var csvData = convertToCSV(rows);
    var filename =
        "participant_" + participantID + "_" + sessionTag + "_final.csv";
    
    // Up to 3 attempts per destination
    for (var attempt = 1; attempt <= 3; attempt++) {
    
        // DataPipe: only retry if it has not succeeded
        if (!pipeSaved) {
            try {
                pipeSaved = await withTimeout(
                    saveToDataPipe(filename, csvData),
                    20000
                ) === true;
    
                console.log("DataPipe final save:", pipeSaved ? "SUCCESS" : "FAILED");
    
            } catch (err) {
                console.warn("DataPipe save attempt " + attempt + " failed:", err);
            }
        }
    
        // Supabase: only retry if it has not succeeded
        if (!supabaseSaved) {
            try {
                supabaseSaved = await withTimeout(
                    saveToSupabase(participantID, rows),
                    20000
                ) === true;
    
                console.log("Supabase final save:", supabaseSaved ? "SUCCESS" : "FAILED");
    
            } catch (err) {
                console.warn("Supabase save attempt " + attempt + " failed:", err);
            }
        }
    
        // Both succeeded: no more attempts needed
        if (pipeSaved && supabaseSaved) {
            break;
        }
    
        if (attempt < 3) {
            await wait(1500 * attempt);
        }
    }
    
    // Overall result
    saveOk = pipeSaved && supabaseSaved;
    
    console.log("Final save results:", {
        dataPipe: pipeSaved,
        supabase: supabaseSaved,
        overall: saveOk
    });
    
    
    // ---------- Update status, enable button ----------
    var statusEl = document.getElementById('debrief-status');
    var btnEl = document.getElementById('debrief-submit');
    statusEl.textContent = saveOk ? SAVE_MSG_OK : SAVE_MSG_FAIL;
    statusEl.style.color = saveOk ? '#8fd18f' : '#ff8080';
    btnEl.disabled = false;
    
    var dbStart = performance.now();
    var cardEl = document.getElementById('debrief-card');
    
    function endDebrief() {
        if (debrief_done) { return; }
        debrief_rt = (performance.now() - dbStart) / 1000;
        document.body.removeChild(overlay);
        document.head.removeChild(dbStyle);
        psychoJS.window._renderer.view.style.display = 'block';
        debrief_done = true;
    }
    
    // Page 1 -> page 2 (or finish directly if no Sona page)
    btnEl.addEventListener('click', function() {
        if (SHOW_SONA_LINK) {
            document.getElementById('debrief-page1').style.display = 'none';
            document.getElementById('debrief-page2').style.display = 'block';
            cardEl.scrollTop = 0;
        } else {
            endDebrief();
        }
    });
    
    // Page 2: link clicked manually
    document.getElementById('debrief-sonalink').addEventListener('click', function() {
        sona_opened = true;
        document.getElementById('debrief-blocked').style.display = 'none';
    });
    
    // Page 2: copy link
    document.getElementById('debrief-copy').addEventListener('click', function() {
        var btn = this;
        var label = TEXT.sonaCopy;
        function selectUrl() {
            var range = document.createRange();
            range.selectNodeContents(urlBox);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(sonaUrl)
                .then(function() { sona_copied = true; btn.textContent = TEXT.sonaCopied; })
                .catch(function() { selectUrl(); btn.textContent = TEXT.sonaCopyFailed; });
        } else {
            selectUrl();
            btn.textContent = TEXT.sonaCopyFailed;
        }
        setTimeout(function() { btn.textContent = label; }, 3000);
    });
    
    // Page 2: finish (opens the Sona link in a new tab, then ends the study)
    document.getElementById('debrief-finish').addEventListener('click', function() {
        if (!sona_opened) {
            // leave full screen first, otherwise the new tab can behave oddly
            try {
                if (document.fullscreenElement) {
                    var fp = document.exitFullscreen();
                    if (fp && fp.catch) { fp.catch(function() {}); }
                }
            } catch (e) {}
    
            var w = window.open(sonaUrl, '_blank');
            if (w) {
                try { w.opener = null; } catch (e2) {}
                sona_opened = true;
                endDebrief();
            } else {
                // popup blocked: keep the page open, participant uses the link manually
                document.getElementById('debrief-blocked').style.display = 'block';
            }
        } else {
            endDebrief();
        }
    });
    psychoJS.experiment.addData('Exit.started', globalClock.getTime());
    ExitMaxDuration = null
    // keep track of which components have finished
    ExitComponents = [];
    ExitComponents.push(exit_message);
    
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
    
    if (debrief_done) {
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


function ExitRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Exit' ---
    ExitComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('Exit.stopped', globalClock.getTime());
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

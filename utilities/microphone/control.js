// control.js

/**
 * Audio recorder object. Handles setting up the audio context, 
 * accessing the mike, and creating the Recorder object.
 */
lexaudio.audioRecorder = function() {
/**
 * Creates an audio context and calls getUserMedia to request the mic (audio).
 * If the user denies access to the microphone, the returned Promise rejected 
 * with a PermissionDeniedError
 * @returns {Promise} 
 */
var requestDevice = function() {

    if (typeof audio_context === 'undefined') {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    audio_context = new AudioContext();
    }

    return navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function(stream) {
        audio_stream = stream; 
    });
};

var createRecorder = function() {
    return recorder(audio_context.createMediaStreamSource(audio_stream));
    };

    return {
        requestDevice: requestDevice,
        createRecorder: createRecorder
    };
};

/**
 * On audio supported callback: `onAudioSupported`.
 *
 * @callback onAudioSupported
 * @param {boolean} 
 */

/**
 * Checks that getUserMedia is supported and the user has given us access to the mic.
 * @param {onAudioSupported} callback - Called with the result.
 */
var supportsAudio = function(callback) {
    if (navigator.mediaDevices.getUserMedia) {
        audioRecorder = lexaudio.audioRecorder();
        audioRecorder.requestDevice()
        .then(function(stream) { callback(true); })
        .catch(function(error) { callback(false); });
    } else {
        callback(false);
    }
};
var express = require('express');
var router = express.Router();
var IdefineService = require('../../commons/idefine_service');
var functionUtils = require('../../commons/functions');

// Save data
const folder = 'data_webs/kenhhai/';
const pause = folder + 'pause.txt';
const first_play = folder + 'first_play.txt';
const first_quarter = folder + 'first_quarter.txt';
const second_quarter = folder + 'second_quarter.txt';
const third_quarter = folder + 'third_quarter.txt';
const fourth_quarter = folder + 'fourth_quarter.txt';
const seek = folder + 'seek.txt';
const performance = folder + 'performance.txt';
const buffered = folder + 'buffered.txt';
const buffer_load = folder + 'buffer_load.txt';
const buffer_miss = folder + 'buffer_lag.txt';

let count_firstPlay = 0;
/* Get home page */
router.get('/data', function(req, res, next) {
    res.send('kenh Hai Web');
});

/* Post home page. */
router.post('/event/first-play', function(req, res, next) {
    count_firstPlay += 1;
    let service_token = req.headers['service_token'];
    let user_id = req.body.user_id;
    functionUtils.writeAppendFileRest(first_play,
        service_token,
        user_id,
        req.body.current_uri,
        req.body.current_src,
        req.body.ip_public,
        req.body.ip_private,
        req.body.data.secondsToLoad,
        req.body.time,
        req.body.user_agent,
    );
    res.status(200).json(
        {
            'headers': req.headers,
            'body': req.body,
            'count': count_firstPlay,
        });
});

router.post('/event/pause', function(req, res, next) {
    let service_token = req.headers['service_token'];
    let user_id = req.body.user_id;
    functionUtils.writeAppendFileRest(pause,
            service_token,
            user_id,
            req.body.current_uri,
            req.body.current_src,
            req.body.data.pauseCount,
            req.body.time,
    );
    res.status(200).json({'body': req.body});
});

router.post('/event/first-quarter', function(req, res, next) {
   
    let service_token = req.headers['service_token'];
    let user_id = req.body.user_id;
    functionUtils.writeAppendFileRest(first_quarter,
            service_token,
            user_id,
            req.body.current_uri,
            req.body.current_src,
            req.body.data.seekCount,
            req.body.data.pauseCount,
            req.body.data.currentTime,
            req.body.data.duration
    );
    res.status(200).json({'body': req.body});
});

router.post('/event/second-quarter', function(req, res, next) {
    
    let service_token = req.headers['service_token'];
    let user_id = req.body.user_id;
    functionUtils.writeAppendFileRest(second_quarter,
            service_token,
            user_id,
            req.body.current_uri,
            req.body.current_src,
            req.body.data.seekCount,
            req.body.data.pauseCount,
            req.body.data.currentTime,
            req.body.data.duration
    );
    res.status(200).json({'body': req.body});
});

router.post('/event/third-quarter', function(req, res, next) {
  
    let service_token = req.headers['service_token'];
    let user_id = req.body.user_id;
    functionUtils.writeAppendFileRest(third_quarter,
            service_token,
            user_id,
            req.body.current_uri,
            req.body.current_src,
            req.body.data.seekCount,
            req.body.data.pauseCount,
            req.body.data.currentTime,
            req.body.data.duration
    );
    res.status(200).json({'body': req.body});
});

router.post('/event/fourth-quarter', function(req, res, next) {
   
    let service_token = req.headers['service_token'];
    let user_id = req.body.user_id;
    functionUtils.writeAppendFileRest(fourth_quarter,
            service_token,
            user_id,
            req.body.current_uri,
            req.body.current_src,
            req.body.data.seekCount,
            req.body.data.pauseCount,
            req.body.data.currentTime,
            req.body.data.duration
    );
    res.status(200).json({'body': req.body});
});

router.post('/event/buffered', function(req, res, next) {
   
    let service_token = req.headers['service_token'];
    let user_id = req.body.user_id;
    functionUtils.writeAppendFileRest(buffered,
            service_token,
            user_id,
            req.body.current_uri,
            req.body.current_src,
            req.body.data.currentTime,
            req.body.data.readyState, 
            req.body.data.secondsToLoad, 
            req.body.data.bufferCount
    );
    res.status(200).json({'body': req.body});
});

router.post('/event/buffer_load', function(req, res, next) {

    let service_token = req.headers['service_token'];
    let user_id = req.body.user_id;
    functionUtils.writeAppendFileRest(buffer_load,
            service_token,
            user_id,
            req.body.current_uri,
            req.body.current_src,
            req.body.data.currentTime,
            req.body.data.readyState, 
            req.body.data.secondsToLoad, 
            req.body.data.bufferCount
    );
    res.status(200).json({'body': req.body});
});

router.post('/event/buffer_miss', function(req, res, next) {

    let service_token = req.headers['service_token'];
    let user_id = req.body.user_id;
    functionUtils.writeAppendFileRest(buffer_miss,
            service_token,
            user_id,
            req.body.current_uri,
            req.body.current_src,
            req.body.data.currentTime,
            req.body.data.readyState, 
            req.body.data.secondsToLoad, 
            req.body.data.bufferCount
    );
    res.status(200).json({'body': req.body});
});

router.post('/event/seek', function(req, res, next) {
   
    let service_token = req.headers['service_token'];
    let user_id = req.body.user_id;
    functionUtils.writeAppendFileRest(seek, 
            service_token,
            user_id,
            req.body.current_uri,
            req.body.current_src,
            req.body.data.seekCount, 
            req.body.data.seekTo
    );
    res.status(200).json({'body': req.body});
});

router.post('/event/performance', function(req, res, next) {
   
    let service_token = req.headers['service_token'];
    let user_id = req.body.user_id;
    functionUtils.writeAppendFileRest(performance, 
            service_token,
            user_id,
            req.body.current_uri,
            req.body.current_src,
            req.body.data.pauseCount, 
            req.body.data.seekCount, 
            req.body.data.bufferCount, 
            req.body.data.totalDuration, 
            req.body.data.watchedDuration, 
            req.body.data.bufferDuration, 
            req.body.data.initialLoadTime, 
    );
    res.status(200).json({'body': req.body});
});

module.exports = router;

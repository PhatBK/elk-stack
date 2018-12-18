const IdefineService = require('../commons/idefine_service');
module.exports = function(req,res,next) {
    // console.log(req.body.ip_public);
    // console.log(req.body.ip_private);
    // console.log(req.body.user_id);
    // console.log(req.body.user_agent);
    if(req.method === 'POST' && 
      (
          req.headers.service_token === IdefineService.KenhHai.web ||
          req.headers.service_token === IdefineService.MyClip.web ||
          req.headers.service_token === IdefineService.VideoHay.we ||
          req.headers.service_token === IdefineService.FiveDMax.web
      )
    ) {
        if (req.body.ip_public == null) {
            req.body.ip_public = "10.10.10.10";
        }
        if (req.body.ip_private == null) {
            req.body.ip_private = "192.168.1.1";
        }
        if (req.body.user_id == null) {
            req.body.user_id = "anonymouse6c6de573985318313vdvdv";
        }
        console.log('Request Passed...');
        next();
    } else {
        res.end('GET method not supported or service token not authentication.');
    }
};

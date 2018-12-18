(function(window, videojs){

        let host = logging_host.host;
        let cookie = null;
        let UserID = null;
        console.log(user_agent);


        let current_host = window.location.protocol + '://' + window.location.hostname;
        let video_src = media_infos.current_src.substring(current_host.length -1, media_infos.current_src.length);

        const ajaxSendDataNodejs = (data, event, url, time) => {
            let reports = {
              'event' : event,
              'data' : data,
              'user_id' : UserID,
              'current_uri': media_infos.current_uri,
              'current_src': video_src,
              'ip_public': ip_public,
              'ip_private': ip_private,
              'user_agent': user_agent,
              'time' : time,
            };
            $.ajaxSetup({
                headers: {
                      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                      'service_token': service_code.token,
                }
            });
            $.ajax({
                url: url,
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(reports),
                dataType: "json",
                cache: false, 
                success : function(response) {
                  console.log(response);
                },
                error : function(error) {
                  console.log(error);
                }
            });
        };

        const ajaxSendDataPHP = (data, event, url) => {
            $.ajaxSetup({
                  headers: {
                      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                  }
            });
            e.preventDefault();
            $.ajax({
                url : url,
                data : {
                  'data' : data,
                  'category': event,
                },
                type : 'post',
                success : function(response) {
                  console.log(response);
                },
                error : function(error) {
                  console.log(error);
                }
            });
        };

        const setCookie = (cname, cvalue, exdays) => {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+ d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
            return document.cookie.split(';')
        };
        const findCookie = (cname) => {
            var result = null;
            var allCookie = document.cookie.split(';');
            for (var i = 0; i < allCookie.length; i++) {
                if(allCookie[i].split('=')[0] === cname) {
                    result = allCookie[i].split('=')[1];
                }
            }
            return result;
        };
      
        let player = videojs('videojs-event-tracking-player');
        player.eventTracking({
            performance: function(data) {
                url = host + '/event/performance';
                // time = Date.now();
                time = new Date();
                ajaxSendDataNodejs(data, 'performance', url, time);
            }
        });

        player.on('tracking:firstplay', function(e, data) {
            // console.log(checkCookie('user_id'));
            if (findCookie('user_id') === null) {
                var user_name = 'KenhHai' + Math.floor((Math.random() * 1000000) + 1);
                document.cookie = "user_id= " + "6c6de5739" + Math.floor(Math.random() * 1000000) + 1 +"34711087bfb1d329" + "; expires=Thu, 18 Dec 2020 12:00:00 UTC";
                document.cookie = "username=" + user_name + "; expires=Thu, 18 Dec 2020 12:00:00 UTC";
            } else {
                UserID = findCookie('user_id');
            }
            

            url = host + '/event/first-play';
            time = new Date();;
            // time = Date.now();
            ajaxSendDataNodejs(data, e, url, time);
        
        });

        player.on('tracking:pause', function(e, data) {
            url = host + '/event/pause';
            // time = Date.now();
            time = new Date();
            ajaxSendDataNodejs(data, e, url, time);
           
        });

        player.on('tracking:first-quarter', function(e, data) {
            url = host + '/event/first-quarter';
            // time = Date.now();
            time = new Date();
            ajaxSendDataNodejs(data, e, url, time);
        });

        player.on('tracking:second-quarter', function(e, data) {
            url = host + '/event/second-quarter';
            // time = Date.now();
            time = new Date();
            ajaxSendDataNodejs(data, e, url, time);
        });

        player.on('tracking:third-quarter', function(e, data) {
            url = host + '/event/third-quarter';
            // time = Date.now();
            time = new Date();
            ajaxSendDataNodejs(data, e, url, time);
        });

        player.on('tracking:fourth-quarter', function(e, data) {
            url = host + '/event/fourth-quarter';
            // time = Date.now();
            time = new Date();
            ajaxSendDataNodejs(data, e, url, time);
        });

        player.on('tracking:seek', function(e, data) {
            url = host + '/event/seek';
            // time = Date.now();
            time = new Date();
            ajaxSendDataNodejs(data, e, url, time);
        });

        player.on('tracking:performance', function(e, data) {
            url = host + '/event/performance';
            // time = Date.now();
            time = new Date();
            ajaxSendDataNodejs(data, e, url, time);
        });

        player.on('tracking:buffered', function(e, data) {
            url = host + '/event/buffered';
            // time = Date.now();
            time = new Date();
            ajaxSendDataNodejs(data, e, url, time);
        });

        player.on('tracking:buffer_load', function(e, data) {
            url = host + '/event/buffer_load';
            // time = Date.now();
            time = new Date();
            ajaxSendDataNodejs(data, e, url, time);
        });
        player.on('tracking:buffer_miss', function(e, data) {
            url = host + '/event/buffer_miss';
            // time = Date.now();
            time = new Date();
            ajaxSendDataNodejs(data, e, url, time);
        });

        
}(window, window.videojs));

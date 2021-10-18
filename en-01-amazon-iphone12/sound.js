    var sMobile = '/media/mainstream/alert.mp3',
        sDesktop = '/media/mainstream/alert.mp3';
    function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    }
    isMobileDevice() ? sound = sMobile : sound = sDesktop;

    window.addEventListener('load', function () {
        var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        var source = audioCtx.createBufferSource();
        var xhr = new XMLHttpRequest();
        xhr.open('GET', sound);
        xhr.responseType = 'arraybuffer';
        xhr.addEventListener('load', function (r) {
            console.log(xhr.response);
            audioCtx.decodeAudioData(
                    xhr.response,
                    function (buffer) {
                        source.buffer = buffer;
                        source.connect(audioCtx.destination);
                        source.loop = false;
                    });
            source.start(0);
        });
        xhr.send();
    });

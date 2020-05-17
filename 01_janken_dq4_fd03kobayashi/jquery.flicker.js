// jquery.flicker v0.1
// Copyright (c) 2011 Sitekickr.com
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php

(function ($) {

    $.fn.flicker = function (options) {

        var settings = {
            'reps': 10,
            'pause': 100,
            'delay': 400,
            'color': '#f00'
        };

        if (options) {
            $.extend(settings, options);
        }

        return this.each(function () {

            $this = $(this);

            flashScreen($this, settings.reps, settings.pause, settings.delay, settings.color);
        });
    };

    flashScreen = function (obj, reps, pause, delay, color) {
        if (reps == 0)
            return false;

        _reps = reps;
        _pause = pause;
        _delay = delay;
        _color = color;
        _this = obj;

        background = obj.css('background-color');
        obj.css('background-color', color);
        setTimeout("_this.css('background-color', background);", pause);

        setTimeout('flashScreen(_this, _reps - 1, _pause, _delay, _color);', _delay);
    }

})(jQuery);
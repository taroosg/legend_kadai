$(document).ready(function () {


    /////////////////////////////////////
    var num = 1;

    $('#new').on('click', function () {
        make(num, "");
        num++;

    });

    function make(e, e2) {
        var numm = "num" + e;
        if (e2 == false) {
            var $text_area = $('<div class="sticky ' + numm + '"><div class="intext">ダブルクリックで編集できます</div></div>');
            $text_area.appendTo('body')
                .css('background-color', $('#color').val())
                .draggable({ stop: save })
                .resizable({ stop: save });
            // $('.sticky').css("background-color", "#FAF0E6");
            // var off = $('.' + numm).offset();
            $('.' + numm).css('position', 'absolute');
            // $('.' + numm).css('top', '"-" + off.top');
            $('.' + numm).css('top', '315px');
            $('.' + numm).css('left', '360px');

        } else if (e2 != false) {

            var $aaa = $(e2.html);
            // console.log($aaa.text());
            var $text_area = $('<div class="sticky ' + numm + '"><div class="intext">' + $aaa.text() + '</div></div>');
            // console.log($aaa.text());
            $text_area.appendTo('body')
                .css(e2.css)
                .draggable({ stop: save })
                .resizable({ stop: save });


            var off = $('.' + numm).offset();
            $('.' + numm).css('position', 'absolute');
            $('.' + numm).css('top', '"-" + off.top');

        }


        $('.' + numm).dblclick(function () {
            // console.log($(this).html());
            // $(this).wrapInner('<textarea></textarea>');
            $(this).children('.intext').html('<textarea id="mark">' + $(this).children('.intext').html() + '</textarea>')
                .find('textarea')
                .focus()
                .select()
                .focusout(function () {
                    // $(this).parent($('textarea')).html($(this).html());
                    $(this).parent($('textarea')).html($(this).val());
                    // $(this).parent().html($(this).val());
                    save();
                });

        }).mousedown(function () {
            $('.sticky').removeClass('selected');
            $(this).addClass('selected');
            console.log("ggggggggggggggggg");
        });

    }

    function save() {
        var items = [];
        if ($('.sticky') == false) { return; }
        $('.sticky').each(function () {
            // console.log($('.sticky').html());
            // console.log($(this).parent().html());
            console.log($(this).css('width'));
            console.log($(this).css('height'));
            items.push({
                css: {
                    left: $(this).css('left'),
                    top: $(this).css('top'),
                    backgroundColor: $(this).css('background-color'),
                    width: $(this).css('width'),
                    height: $(this).css('height')
                },
                // html: $(this).html()
                html: $(this).prop("outerHTML")
            });
        });
        // console.log(items);
        var jsonItems = JSON.stringify(items);
        console.log(jsonItems);
        localStorage.setItem("fafafa", jsonItems);
    }

    function load() {
        if (localStorage.getItem("fafafa") == null) { return; }
        // console.log(localStorage.getItem("fafafa"));
        var items = JSON.parse(localStorage.fafafa);
        // console.log(items);
        // console.log(items.length);
        for (var i = 0; i < items.length; i++) {
            var memo = items[i];
            console.log(i);
            console.log(memo);
            make(num, memo);
            console.log(i);
            num++;
        }
    }
    load();


    ////////////////title処理
    $('#head2').on('focusout', function () {
        localStorage.setItem("theme", $('#head2out [name=NAME]').val());
        console.log("tes");
    });

    function load2() {
        if (localStorage.getItem('theme')) {
            var theme = localStorage.getItem('theme');
            $('#head2out [name=NAME]').val(theme);
        }
    }
    load2();

    $('#clear').on("click", function () {
        localStorage.clear();
        $('.sticky').hide();
    });

    $('#del').click(function () {
        $('.selected').remove();
        save();
    });

    ///////////////////////
});
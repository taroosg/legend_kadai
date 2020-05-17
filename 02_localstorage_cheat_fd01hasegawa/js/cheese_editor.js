jQuery(function () {

    //--------------------------------------------------
    //共通設定
    //--------------------------------------------------

    //クリックした要素を取得
    $(document).on("click", function (event) {
        var target = $(event.target);
        console.log(target);

        // 使用例１
        // target.css("background", "#ff6300");
        // 使用例２ クリックした親要素のIDをゲットする
        // let parentsID = $(target.parents('.div_sortable_photo')).attr('ID');
        // console.log(parentsID);
    });


    //--------------------------------------------------
    //画面が開いたとき（1行目でjQueryの宣言をしているからonload宣言の必要なし）
    //--------------------------------------------------
    //SAVEとLOADのラベルを整える
    for (let i = 1; i <= 3; i++) {
        let load_rabel = localStorage.getItem(`savedata_html${i}`);
        if (load_rabel) {
            //データがある場合
            $(`.save_number${i}`).html(`<a href="#">data${i}</a>`);
            $(`.load_number${i}`).html(`<a href="#">data${i}</a>`);
            $(`.clear_number${i}`).html(`<a href="#">data${i}</a>`);
        } else {
            //データがない場合
            $(`.save_number${i}`).html(`<a href="#">no data</a>`);
            $(`.load_number${i}`).html(`<a href="#">no data</a>`);
            $(`.clear_number${i}`).html(`<a href="#">no data</a>`);
        };
    };

    //HTML内のstyleをデフォルトにしておく
    default_style();

    //textareaに入れておく
    to_html_textarea();
    to_css_textarea();


    //--------------------------------------------------
    //#controller
    //--------------------------------------------------
    Sortable.create(controller, {
        group: {
            name: 'main_lists',
            pull: 'clone',
            put: false
        },
        sort: false,
        animation: 150,

        //ドラッグをスタートしたとき
        onStart: function (evt) {
            let cnt_item_class = $(evt.item).attr('class');
            console.log(`ドラッグスタート class：${cnt_item_class}`);
        },

        //ドラッグが終わったとき
        onEnd: function (evt) {
            let cnt_item_class = $(evt.item).attr('class');
            console.log(`ドラッグエンド class：${cnt_item_class}`);
        }
    });

    //--------------------------------------------------
    //#menu_button
    //--------------------------------------------------
    // 0. 共通（メニュー開閉）
    $(".save_button").hover(
        function () {
            $(".save_list_wrap").toggleClass('sr_wrap');
            $(".save_list_wrap").toggleClass('sr_wrap_hide');
        });

    $(".load_button").hover(
        function () {
            $(".load_list_wrap").toggleClass('sr_wrap');
            $(".load_list_wrap").toggleClass('sr_wrap_hide');
        });

    $(".clear_button").hover(
        function () {
            $(".clear_list_wrap").toggleClass('sr_wrap');
            $(".clear_list_wrap").toggleClass('sr_wrap_hide');
        });

    //--------------------------------------------------
    //1. saveボタン
    $(".save_number1").on('click', function () {
        save_click(1);
    });
    $(".save_number2").on('click', function () {
        save_click(2);
    });
    $(".save_number3").on('click', function () {
        save_click(3);
    });

    function save_click(save_number) {
        let result = confirm(`セーブしますか？`);
        if (result) {
            //はいを選んだときの処理
            //1-0. 初期画面（未編集でないか）で分岐
            let save_data_html = $("#main_display").html();
            if (save_data_html == "") {
                alert("保存するデータがありません\nまずは画面を編集してからね！");
            }
            else {
                //1-1. localstrageの「savedata(1〜3)」を取得
                let save_data_html = localStorage.getItem(`savedata_html${save_number}`);
                let save_data_css = localStorage.getItem(`savedata_css${save_number}`);

                //1-2. セーブデータがあるかどうかで分岐
                if (save_data_html) {
                    //セーブデータあり
                    let result2 = confirm(`すでにデータがあるようです\n上書きしますか？`);
                    if (result2) {
                        //（保存データを消した上で）保存する
                        localStorage.removeItem(`savedata_html${save_number}`);
                        localStorage.removeItem(`savedata_css${save_number}`);
                        //localstrageに「savedata(1〜3)」という箱をつくって「save_data」の変数の中身を入れる
                        let save_data_html = $("#main_display").html();
                        let save_data_css = $('.textarea_css').val();
                        localStorage.setItem(`savedata_html${save_number}`, save_data_html);
                        localStorage.setItem(`savedata_css${save_number}`, save_data_css);

                        alert("上書きして保存しました！");
                    }
                    else {
                        //上書きしない
                        console.log("上書き保存しない");
                        alert("セーブをキャンセルしました！");
                    };
                } else {
                    //セーブデータなし
                    console.log("セーブデータなし 新規保存する");
                    //localstrageに「savedata(1〜3)」という箱をつくって「save_data」の変数の中身を入れる
                    let save_data_html = $("#main_display").html();
                    let save_data_css = $('.textarea_css').val();
                    localStorage.setItem(`savedata_html${save_number}`, save_data_html);
                    localStorage.setItem(`savedata_css${save_number}`, save_data_css);
                    //先にメニューを非表示にする（これ必須！）
                    $(".save_list_wrap").toggleClass('sr_wrap');
                    $(".save_list_wrap").toggleClass('sr_wrap_hide');
                    //ラベルを書き換える
                    $(`.load_number${save_number}`).html(`<a href="#">data${save_number}</a>`);
                    $(`.save_number${save_number}`).html(`<a href="#">data${save_number}</a>`);
                    $(`.clear_number${save_number}`).html(`<a href="#">data${save_number}</a>`);
                    alert("新しくセーブしました");
                };
            };
        } else {
            //いいえを選んだときの処理
            console.log("いいえ");
            alert("キャンセルしました！");
        };
    };

    //--------------------------------------------------
    //2. loadボタン
    $(".load_number1").on('click', function () {
        load_click(1);
    });
    $(".load_number2").on('click', function () {
        load_click(2);
    });
    $(".load_number3").on('click', function () {
        load_click(3);
    });

    function load_click(load_number) {
        //2-1. セーブデータ「savedata（1〜3）」を取得
        let load_data_html = localStorage.getItem(`savedata_html${load_number}`);
        let load_data_css = localStorage.getItem(`savedata_css${load_number}`);

        //2-2. セーブデータがあるかどうかで分岐
        if (load_data_html) {
            //データがある場合
            let result = confirm(`現在画面で編集している内容はクリアされますが、\nセーブしているデータをロードしますか？`);
            if (result) {
                //はいを選んだときの処理
                //2-3. いまある編集情報をクリア
                $("#main_display").html("");
                $('.textarea_css').val("");
                //2-4. ロードデータでHTMLとCSSを書き換え
                $("#main_display").html(load_data_html);
                $('.textarea_css').val(load_data_css);
                //2-5. textareaに反映（HTMLのみ）
                to_html_textarea();
                //2-6. メインディスプレイに反映（CSSのみ）
                to_display_css()
                //2-7. メッセージを出す
                alert("データをロードします！")
            } else {
                //いいえを選んだときの処理
                console.log("いいえ");
                alert("キャンセルしました！");
            };
        } else {
            //データがない場合
            alert("残念！セーブデータがありません");
        };
    };

    //--------------------------------------------------
    //3. clearボタン
    $(".clear_maindisplay").on('click', function () {
        clear_click("maindisplay");
    });
    $(".clear_all").on('click', function () {
        clear_click("all");
    });
    $(".clear_number1").on('click', function () {
        clear_click(1);
    });
    $(".clear_number2").on('click', function () {
        clear_click(2);
    });
    $(".clear_number3").on('click', function () {
        clear_click(3);
    });

    function clear_click(clear_number) {
        //3-1. セーブデータ「savedata（1〜3）」を取得
        let clear_data_html = localStorage.getItem(`savedata_html${clear_number}`);

        //3-2. データの種類で分岐
        //3-2-1. 編集画面をクリア
        if (clear_number == "maindisplay") {
            let result = confirm("編集画面をクリアしますか？");
            if (result) {
                //はいを選んだときの処理
                console.log("はい");
                //画面をクリア
                $("#main_display").html("");
                $('.textarea_html').val("");
                $('.textarea_css').val("");
                //HTML内のstyleもクリア
                default_style();
                //完了報告
                alert("編集画面をクリアしました！");
            } else {
                //いいえを選んだときの処理
                console.log("いいえ");
                alert("キャンセルしました！");
            }
        }
        //3-2-2. LocalStrageのデータをクリア
        else if (clear_number == "all") {
            let result = confirm("保存データをすべてクリアしますか？");
            if (result) {
                //はいを選んだときの処理
                console.log("はい");
                localStorage.clear();
                //ラベルを書き換えておく
                for (let i = 1; i <= 3; i++) {
                    $(`.save_number${i}`).html(`<a href="#">no data</a>`);
                    $(`.load_number${i}`).html(`<a href="#">no data</a>`);
                    $(`.clear_number${i}`).html(`<a href="#">no data</a>`);
                };
                //完了報告
                alert("保存データをすべてクリアしました！");
            } else {
                //いいえを選んだときの処理
                console.log("いいえ");
                alert("キャンセルしました！");
            }
        }
        //3-2-3. それ以外のデータ（データ1〜3）
        else {
            //セーブデータがあるかどうかで分岐
            if (clear_data_html) {
                //データがある場合
                let result = confirm("セーブデータをクリアしますか？");
                if (result) {
                    //はいを選んだときの処理
                    console.log("はい");
                    localStorage.removeItem(`savedata_html${clear_number}`);
                    localStorage.removeItem(`savedata_css${clear_number}`);
                    //先にメニューを非表示にする（これ必須！）
                    $(".clear_list_wrap").toggleClass('sr_wrap');
                    $(".clear_list_wrap").toggleClass('sr_wrap_hide');
                    //ラベルを書き換えておく
                    $(`.save_number${clear_number}`).html(`<a href="#">no data</a>`);
                    $(`.load_number${clear_number}`).html(`<a href="#">no data</a>`);
                    $(`.clear_number${clear_number}`).html(`<a href="#">no data</a>`);
                    //完了報告
                    alert(`セーブデータ${clear_number}をクリアしました！`);
                } else {
                    //いいえを選んだときの処理
                    console.log("いいえ");
                    alert("キャンセルしました！");
                };
            } else {
                //データがない場合
                alert("残念！セーブデータがありません");
            };
        };
    };


    //--------------------------------------------------
    //#main_display
    //--------------------------------------------------
    let sortableItem = Sortable.create(main_display, {
        group: {
            name: 'main_lists',
            pull: true,
            put: true
        },
        handle: ".drag-handle",
        animation: 150,

        //追加時の動作
        onAdd: function (evt) {
            //1. オリジナルアイテムのclassを取得する
            let el = sortableItem.closest(evt.item);
            let el_class = $(el).attr('class');
            console.log(el);
            console.log(`オリジナルアイテムのclass：${el_class}`);

            //2. 時間を使って一意となる値を取得する
            let gettime = new Date().getTime();
            console.log(`追加するアイテムに付与するID：${gettime}`);

            //3. 追加アイテムごとに分岐
            add_item_branch(el, el_class, gettime);

            //4. CSSをスイッチ
            $(el).removeClass('cnt');
            $(el).toggleClass('div_sortable_wrap');

            //5. ハンドルを追加
            $(el).prepend(`
                <div class="drag-handle">☰</div>
            `);

            //6. textareaに反映
            to_html_textarea();
            to_css_textarea();
        },
        //並び替え時の動作
        onUpdate: function (evt) {
            to_html_textarea();
            to_css_textarea();
        }
    });

    //--------------------------------------------------
    //追加アイテム初期パラメーター（追加時の動作３）
    //--------------------------------------------------
    function add_item_branch(el, el_class, gettime) {
        //3-1. トップ画像
        if (/cnt_top/.test(el_class)) {
            console.log("分岐：cnt_top");
            $(el).prepend(`<div id="${gettime}" class="div_sortable_top"></div>`);
            $(`#${gettime}`).append(`<img src="img/hanatoletter_top.jpg">`);
            $(el).append(`<!-- top置換用 -->`);
        }
        //3-2. ナビ
        else if (/cnt_navi/.test(el_class)) {
            console.log("分岐：cnt_navi");
            $(el).prepend(`<div id="${gettime}" class="div_sortable_navi"></div>`);
            $(`#${gettime}`).append(`
                <div class="logo">
                    <img src="img/logo.png" alt="" class="logo_img">
                </div>
                <div class="menu-wrap">
                    <ul class="nav_list">
                        <li class="nav-item">
                            <a href="#">ABOUT</a>
                        </li>
                        <li class="nav-item">
                            <a href="#">COURSE</a>
                        </li>
                        <li class="nav-item">
                            <a href="#">NEWS</a>
                        </li>
                        <li class="nav-item">
                            <a href="#">ACCESS</a>
                        </li>
                        <li class="nav-item">
                            <a href="#">CONTACT</a>
                        </li>
                    </ul>
                </div>
            `);
            $(el).append(`<!-- navi置換用 -->`);
        }
        //3-3. テキスト
        else if (/cnt_text/.test(el_class)) {
            console.log("分岐：cnt_text");
            $(el).prepend(`<div id="${gettime}" class="div_sortable_text"></div>`);
            $(`#${gettime}`).append(`
                <h3>ABOUT</h3>
                <h4>花とお手紙について</h4>
                <p>花とお手紙の招待状は「お手紙」です<br>
                    形式的に印刷された、無機質な招待状ではなく<br>
                    温度が伝わる「お手紙」を届けるサービスです</p>
                <p>（ここに説明文を記載しましょう）</p>
            `);
            $(el).append(`<!-- text置換用 -->`);
        }
        //3-4. PHOTO
        else if (/cnt_photo/.test(el_class)) {
            console.log("分岐：cnt_photo");
            $(el).prepend(`<div id="${gettime}" class="div_sortable_photo"></div>`);
            $(`#${gettime}`).append(`
                <img src="img/photo_360-660px_b1.jpg" alt="">
                <img src="img/photo_360-660px_b2.jpg" alt="">
                <img src="img/photo_360-660px_b3.jpg" alt="">
            `);
            $(el).append(`<!-- photo置換用 -->`);
        }

        //3-5. COURSE
        else if (/cnt_course/.test(el_class)) {
            console.log("分岐：cnt_course");
            $(el).prepend(`<div id="${gettime}" class="div_sortable_course"></div>`);
            $(`#${gettime}`).append(`
                <div class="course-left">
                    <div class="course-photo">
                        <img src="img/course1.JPG" alt="">
                    </div>
                    <div class="course-text">
                        <h4>「これ、私に向けたお手紙だ」</h4>
                        <p>「皆様へ」と書かれた、誰にでも届けられる書類のような招待状ではなく、大切なあの人へ、あなたが届けるお手紙を作れます（行数が増えても自動で改行されます）</p>
                    </div>
                </div>
                <div class="course-right">
                    <div class="course-photo">
                        <img src="img/course2.JPG" alt="">
                    </div>
                    <div class="course-text">
                        <h4>「世界でたったひとつ」を作ろう</h4>
                        <p>花とお手紙は、ゲストそれぞれへのメッセージを入れられたり、自分で表紙に絵の具を塗ってあげられるお手紙です。世界にたったひとつを、届けるお手伝いができます（行数が増えても自動で改行されます）</p>
                    </div>
                </div>
                <div class="course-left">
                    <div class="course-photo">
                        <img src="img/course3.JPG" alt="">
                    </div>
                    <div class="course-text">
                        <h4>あなたの温度が残ったまま届きます</h4>
                        <p>封筒から取り出したときの、１ページ目を開いて自分の名前を見つけたときの、そして、最後のページのメッセージを読んだときの、あなたの温度が大切なゲストの心を動かします（行数が増えても自動で改行されます）</p>
                    </div>
                </div>
            `);
            $(el).append(`<!-- course置換用 -->`);
        }

        //3-6. NEWS
        else if (/cnt_news/.test(el_class)) {
            console.log("分岐：cnt_news");
            $(el).prepend(`<div id="${gettime}" class="div_sortable_news"></div>`);
            $(`#${gettime}`).append(`
                <div class="news-box">
                    <div class="news-top">
                        <img src="img/news1.JPG" alt="">
                    </div>
                    <div class="news-bottom">
                        <h5>2018/04/15</h5>
                        <p>郁日１ヶ月くらい。両手をバンザイしながら寝る姿がとてもかわいいです。この頃はまだ、いただきもののトッポンチーノにぴったり収まるサイズ。</p>
                    </div>
                </div>
                <div class="news-box">
                    <div class="news-top">
                        <img src="img/news2.JPG" alt="">
                    </div>
                    <div class="news-bottom">
                        <h5>2018/05/01</h5>
                        <p>とっても笑うようになってきた。この笑いは反射行動らしいんだけど、親としては嬉しいから困る。</p>
                    </div>
                </div>
                <div class="news-box">
                    <div class="news-top">
                        <img src="img/news3.JPG" alt="">
                    </div>
                    <div class="news-bottom">
                        <h5>2018/05/18</h5>
                        <p>おうちでひとり放置プレイになった郁日氏。ひろいスペースを占領していただいております。</p>
                    </div>
                </div>
                <div class="news-box">
                    <div class="news-top">
                        <img src="img/news4.JPG" alt="">
                    </div>
                    <div class="news-bottom">
                        <h5>2018/06/06</h5>
                        <p>ヒント：お父さんお母さんが寝れません</p>
                    </div>
                </div>
                <div class="news-box">
                    <div class="news-top">
                        <img src="img/news5.JPG" alt="">
                    </div>
                    <div class="news-bottom">
                        <h5>2018/06/20</h5>
                        <p>お友達のお家でリラックスしている様子。新しい服とおもちゃにご満足されている模様。</p>
                    </div>
                </div>
                <div class="news-box">
                    <div class="news-top">
                        <img src="img/news6.JPG" alt="">
                    </div>
                    <div class="news-bottom">
                        <h5>2018/07/01</h5>
                        <p>右手には太陽のように、誰かを輝かせられる力を。左手には月のように、誰かに輝かせてもらえる力を。名前に負けないイケメンになあれ…！</p>
                    </div>
                </div>
            `);
            $(el).append(`<!-- news置換用 -->`);
        }
        //3-7. MAP
        else if (/cnt_map/.test(el_class)) {
            console.log("分岐：cnt_map");
            $(el).prepend(`<div id="${gettime}" class="div_sortable_map"></div>`);
            $(`#${gettime}`).append(`
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.394942511381!2d139.71156151495794!3d35.66727618019761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188c9fa9e2e881%3A0x35396adb5ba7ce03!2sG&#39;s+ACADEMY+TOKYO!5e0!3m2!1sja!2sjp!4v1532276953838"
                width="100%" height="200" frameborder="0" style="border:0" allowfullscreen></iframe>
            `);
            $(el).append(`<!-- map置換用 -->`);
        }
        //3-8. INFO
        else if (/cnt_info/.test(el_class)) {
            console.log("分岐：cnt_info");
            $(el).prepend(`<div id="${gettime}" class="div_sortable_info"></div>`);
            $(`#${gettime}`).append(`
                <table>
                    <tr>
                        <th>サービス名</th>
                        <td>花とお手紙</td>
                    </tr>
                    <tr>
                        <th>事務所所在地</th>
                        <td>〒107-0061 東京都港区北青山3-5-6 青朋ビル2F</td>
                    </tr>
                    <tr>
                        <th>TEL</th>
                        <td>03-5413-5045</td>
                    </tr>
                    <tr>
                        <th>FAX</th>
                        <td>03-5413-5046</td>
                    </tr>
                    <tr>
                        <th>MAIL</th>
                        <td>dummy@hanatoletter.com</td>
                    </tr>
                </table>
            `);
            $(el).append(`<!-- info置換用 -->`);
        }
        //3-9. FORM
        else if (/cnt_form/.test(el_class)) {
            console.log("分岐：cnt_form");
            $(el).prepend(`<div id="${gettime}" class="div_sortable_form"></div>`);
            $(`#${gettime}`).append(`
                <form action="" method="POST">
                    <table>
                        <tr>
                            <th>名前</th>
                            <td>
                                <input type="text" name="name" value="">
                            </td>
                        </tr>
                        <tr>
                            <th>カナ</th>
                            <td>
                                <input type="text" name="kana" value="">
                            </td>
                        </tr>
                        <tr>
                            <th>メールアドレス</th>
                            <td>
                                <input type="text" name="mail" value="">
                            </td>
                        </tr>
                        <tr>
                            <th>花とお手紙を知ったきっかけ</th>
                            <td>
                                <input type="checkbox" name="e_1975[value][]" id="ck1" value="1">
                                <label for="ck1">ネットで探して見つけた</label>
                                <br>
                                <input type="checkbox" name="e_1975[value][]" id="ck2" value="2">
                                <label for="ck2">インスタグラムから見つけた</label>
                                <br>
                                <input type="checkbox" name="e_1975[value][]" id="ck3" value="3">
                                <label for="ck3">知り合いからのご紹介（ここのテキストが長くなっても２行に改行されて、かつチェックボックスもきれいにそろいます）</label>
                                <br>
                                <input type="checkbox" name="e_1975[value][]" id="ck4" value="4">
                                <label for="ck4">いくぴよクエストのファン</label>
                            </td>
                        </tr>
                        <tr>
                            <th>リクエスト</th>
                            <td>
                                <textarea name="detail" id="detail" cols="50" rows="10"></textarea>
                            </td>
                        </tr>
                    </table>

                    <div class="form-send">
                        <button type="submit">
                            <a class="send_btn" href="#">SEND</a>
                        </button>
                    </div>
                </form>
            `);
            $(el).append(`<!-- form置換用 -->`);
        }
        //3-10. FOOTER
        else if (/cnt_footer/.test(el_class)) {
            console.log("分岐：cnt_footer");
            $(el).prepend(`<div id="${gettime}" class="div_sortable_footer"></div>`);
            $(`#${gettime}`).append(`
                <p>花とお手紙（JINSEI inc.）</p>
            `);
            $(el).append(`<!-- footer置換用 -->`);
        }
        //3-X error
        else {
            console.log("ERROR! 条件分岐に当てはまりませんでした");
        };

    };

    //--------------------------------------------------
    //#trash_can
    //--------------------------------------------------
    let trashItem = Sortable.create(trash_can, {
        group: {
            name: 'main_lists',
            pull: true,
            put: true
        },
        animation: 150,

        //ドラッグしてきたものを削除
        onAdd: function (evt) {
            //削除
            let el = trashItem.closest(evt.item);
            el && el.parentNode.removeChild(el);
            //textareaを更新
            to_html_textarea();
            to_css_textarea();
        }
    });

    //--------------------------------------------------
    //#code_display（コードエディター）
    //--------------------------------------------------

    //エディタの開閉
    $("#code_display_button").on('click', function () {
        if ($("#code_display").css("right") == "0px") {
            $("#code_display").animate({ "right": "-400px" });
        } else {
            $("#code_display").animate({ "right": "0px" });
        }
    });

    //--------------------------------------------------
    //エディターに反映させる処理

    //HTML
    function to_html_textarea() {
        //1. htmlコードをゲットする
        let inputtext = $("#main_display").html();

        //2. 表示用に置換する
        let name = ['top', 'navi', 'text', 'photo', 'course', 'news', 'map', 'info', 'form', 'footer'];
        let code1 = `<div class="cnt_`;
        let code2 = ` div_sortable_wrap" draggable="false" style="">
                <div class="drag-handle">☰</div>
            `;   //←改行してここに「`」打つのが大事！

        for (i = 0; i <= 9; i++) {
            inputtext = inputtext.replace(new RegExp(code1 + name[i] + code2, 'g'), `<!-- ${name[i]} - - - -->\n`);
            inputtext = inputtext.replace(new RegExp("<!-- " + name[i] + "置換用 --></div>", 'g'), `\n<!-- /${name[i]} - - - -->\n`);
            // ハマりポイント！「RegExp」を使って「正規表現」にして、さらに「g」オプションを使わないと最初に一致したのしか変わらない
            // 例）以下のコードではすべての置換がされない
            // inputtext = inputtext.replace(`${code1}cnt_${name[i]}${code2}`, `<!-- ${name[i]} - - - -->\n`);
            // inputtext = inputtext.replace(`<!-- ${name[i]}置換用 --></div>`, `\n<!-- /${name[i]} - - - -->\n`);
        };

        //3. エディタに表示する
        $('.textarea_html').val(inputtext)
    };

    //CSS
    function to_css_textarea() {
        let inputtext = $("style").html();
        $('.textarea_css').val(inputtext)
    };


    //--------------------------------------------------
    //書いたコードを「keyup」を使って即反映させる

    //HTML
    $('.textarea_html').keyup(function () {
        to_display_html();
    });

    function to_display_html() {
        //1. textareaのコードをゲットする
        let html_text = $('.textarea_html').val();

        //2. 表示用に置換する
        let name = ['top', 'navi', 'text', 'photo', 'course', 'news', 'map', 'info', 'form', 'footer'];
        let code1 = `<div class="cnt_`;
        let code2 = ` div_sortable_wrap" draggable="false" style="">
                <div class="drag-handle">☰</div>
            `;   //←改行してここに「`」打つのが大事！

        for (i = 0; i <= 9; i++) {
            html_text = html_text.replace(new RegExp("<!-- " + name[i] + " - - - -->\n", 'g'), code1 + name[i] + code2);
            html_text = html_text.replace(new RegExp("\n<!-- /" + name[i] + " - - - -->\n", 'g'), "<!-- " + name[i] + "置換用 --></div>");
        };

        //3. メインディスプレイに表示する
        $("#main_display").html(html_text);
    };

    //CSS
    $('.textarea_css').keyup(function () {
        to_display_css();
    });

    function to_display_css() {
        $("style").html($('.textarea_css').val());
    };


    //--------------------------------------------------
    //ダウンロード
    $(".dl_html").on('click', function () {
        file_download("html")
    });
    $(".dl_css").on('click', function () {
        file_download("css")
    });

    function file_download(codetype) {
        console.log(`${codetype} ダウンロードスタート！`);

        let content;
        let content_header;
        let content_main;
        let content_footer;

        if (codetype == "html") {
            content_header =
                `<!DOCTYPE html>
        <html lang="en">

        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>チーズアカデミー</title>
        <meta name="description" content=“世界を変えるチーズを作ろう。チーズアカデミーは、チーズ職人を養成するための学校です。”>
        <meta property="og:title" content="チーズアカデミー">
        <meta property="og:type" content="website" />
        <meta property="og:url" content="#" />
        <meta property="og:site_name" content="チーズアカデミー" />
        <meta property="og:description" content="世界を変えるチーズを作ろう。チーズアカデミーは、チーズ職人を養成するための学校です。" />
        <meta name="format-detection" content="telephone=no">
        <link rel="canonical" href="#">
        <link rel="stylesheet" type="text/css" href="css/reset.css" />
        <link rel="stylesheet" type="text/css" href="css/sanitize.css" />
        <link rel="stylesheet" type="text/css" href="css/filename.css" />
        </head>
            
        <!-- - - - - - - - - - - - - - - - - - - - - -->

        <body>
            <div id="main_wrap">\n`

            content_footer = `</div></body></html>`

            content_main = $(`.textarea_${codetype}`).val();
            content = content_header + content_main + content_footer;
        }
        else if (codetype == "css") {
            content = $(`.textarea_${codetype}`).val();
        };

        //ダウンロード処理
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(new Blob([content]));
        link.download = `filename.${codetype}`;
        link.click();
    };


    //--------------------------------------------------
    //デフォルトCSS（HTMLのstyleに反映させる）
    //--------------------------------------------------

    function default_style() {
        console.log("default_styleを適用");
        const default_css =

            `/* 0. 共通設定 ----------------------------- */

body {
font-family: Roboto, "Yu Gothic Medium", "游ゴシック Medium", YuGothic, "游ゴシック体", "ヒラギノ角ゴ Pro W3", "メイリオ", sans - serif;
line-height: 1.75;
font-size: 16px;
}

* {
padding: 0;
margin: 0;
-webkit-box-sizing: border-box;
-moz-box-sizing: border-box;
-o-box-sizing: border-box;
-ms-box-sizing: border-box;
box-sizing: border-box;
}

h1 {
font-size: 1.2em;
}

h2 {
font-size: 1em;
}

h3 {
color: #ffd61a;
font-size: 0.8em;
margin: 1em auto 0.5em;
letter-spacing: 0.2em;
}

h4 {
font-size: 0.7em;
margin-bottom: 2%;
font-weight: normal;
}

h5 {
font-size: 0.4em;
margin: 0.6em 0 0 0;
letter-spacing: 0.2em;
}

p {
font-size: 0.4em;
margin: 0.2em 0;
}

/* 1. top -------------------------------- */

.div_sortable_top {
background: #ffffff;
width: 100%;

display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
}

.div_sortable_top img {
width: 100%;
height: auto;
}

/* 2. navi -------------------------------- */

.div_sortable_navi {
background: #ffffff;
width: 100%;

display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
}

.logo {
margin: 1% 0 1% 2%;

display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
}

.logo_img {
width: 100%;
max-width: 120px;
height: auto;
}

.menu-wrap {
margin: 1% 2% 1% 0;
}

.nav_list {
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
}

.nav-item {
padding: 0 0 0 1.5em;
font-size: 0.1em;
text-align: center;
color: #666666;
}

.nav-item a:link {
color: #666666
}

.nav-item a:visited {
color: #666666
}

.nav-item a:hover {
color: black
}

.nav-item a:active {
color: black
}


/* 3. text ---------------------------- */

.div_sortable_text {
background: #ffffff;
width: 100%;
padding: 0 0 1em 0;
text-align: center;
}

/* 4. photo ---------------------------- */

.div_sortable_photo {
background: #ffffff;
width: 100%;

padding: 2% 1%;

display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
flex-wrap: wrap;
}

.div_sortable_photo img {
width: auto;
max-width: 30%;
max-height: 30%;

margin: 0 0 0.2em 0;
}

/* 5. course ---------------------------- */

.div_sortable_course {
background: #ffffff;
width: 100%;

display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
flex-wrap: wrap;
}

.course-left {
width: 100%;

display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
}

.course-right {
width: 100%;

display: flex;
flex-direction: row-reverse;
justify-content: center;
align-items: center;
}

.course-photo {
width: 50%;
}

.course-photo img {
width: 100%;
height: auto;
}

.course-text {
width: 50%;
padding: 0 1em;

display: flex;
flex-direction: column;
justify-content: center;
align-items: left;
}

/* 6. news    ---------------------------- */

.div_sortable_news {
background: #ffffff;
width: 100%;

display: flex;
flex-direction: row;
justify-content: space-evenly;
align-items: end;
flex-wrap: wrap;
}

.news-box {
width: 30%;
margin: 0.2em 0;
}

.news-top {
width: 100%;
}

.news-top img {
width: 100%;
height: auto;
}

.news-bottom {
width: 100%;
padding: 0 1em;

display: flex;
flex-direction: column;
justify-content: center;
align-items: left;
}

/* 7. map -------------------------------- */

.div_sortable_map {
background: #ffffff;
width: 100%;

display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
}

/* 8. info -------------------------------- */

.div_sortable_info {
background: #ffffff;
width: 100%;

padding: 0.5em;

display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
}

.div_sortable_info th {
padding: 0.2em;
font-size: 0.5em;
text-align: left;
}

.div_sortable_info td {
padding: 0 0 0 1em;
font-size: 0.5em;
text-align: left;
}

/* 9. form -------------------------------- */

.div_sortable_form {
background: #ffffff;
width: 100%;

display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
}

.div_sortable_form form {
width: 60%;
margin: 1em auto;
}

.div_sortable_form th {
width: 24%;
padding: 0.2em 0 2em 0.2em;
font-size: 0.5em;
text-align: left;
}

.div_sortable_form td {
padding: 0 0 1em 1em;
font-size: 0.5em;
text-align: left;
}

.div_sortable_form label {
width: 90%;
/* 幅に合わせて改行する */
word-wrap: break-word;
display: inline-block;
}

textarea,
input[type="text"] {
background: #ffffff;
width: 100%;
padding: 0.5em;
border: 1px solid #aaa;
border-radius: 5px;
color: #333;
outline: none;
}

input[type="radio"],
input[type="checkbox"] {
/* widthで右余白を、heightとmargin-topで上余白を調整  */
width: 10%;
height: 1em;
margin-top: 0.25em;
float: left;
outline: none;
}

input:focus,
textarea:focus {
/* アクティブな要素を少し強調する */
border-color: #000;
}

textarea {
/* ラベルにテキストフィールドをきちんと揃える */
vertical-align: top;
}

.form-send {
width: 100%;
margin: 1em auto 0 auto;

display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
}

button[type="submit"] {
width: 40%;
outline: none;
}

a.send_btn {
padding: 0.5em;

font-size: 0.8em;
letter-spacing: 0.2em;
color: #ffd61a;
border: 1px solid #ffd61a;
border-radius: 5px;

text-align: center;
display: block;

transition: .4s;
}

a.send_btn:hover {
background: #ffd61a;
color: #ffffff;
}

/* 10. footer -------------------------------- */

.div_sortable_footer {
background: #707070;
width: 100%;

padding: 1em 0;

display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
}

.div_sortable_footer p {
font-size: 0.5em;
letter-spacing: 0.2em;
color: #ffffff;
}`

        $("style").html("");
        $("style").append(default_css);
    };


});

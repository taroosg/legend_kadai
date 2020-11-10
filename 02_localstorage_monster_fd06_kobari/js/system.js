$(function () {
    // 目次：変数管理4~76, 関数記述78~375, ボタン等の機能377~ 細かく変動しているかも
    // Demoで変更する箇所は16,17,253から。
    // テキスト一覧
    const greetText = ["を育てよう！", "は元気に遊んでいる。", "はまた君に会えて嬉しそうだ。", "は少し眠そうだ。"];
    const lifeText = ["おや、", "の様子が…", "に進化した！おめでとう！", "は寿命を迎えて死んでしまった。", "強さを少し引き継いでスライムとして生まれ変わったぞ！もう一度可愛がって育てよう！", "宇宙人に乗っ取られてしまった！", "魔王として蘇った。魔王も育てられるのかな・・・。"];
    const trainingText = ["たいりょく", "こうげき", "ぼうぎょ", "すばやさ", "のトレーニングをしますか？", "のトレーニングは失敗した。", "のトレーニングが成功して", "が上がった！"];
    const battleText = ["たいせんシステムは現在鋭意開発中です。なんかこういうと本物のアプリっぽいでしょ？？ふふっ。"];
    const mealText = ["にく", "さかな", "やさい", "を食事として与えますか？", "前の食事と同じで不満足だったようだ。", "を美味しくいただいた！"];
    const sleepText = ["を寝させますか？", "は気持ちよさそうに寝始めた。", "は気持ちよく目覚めた！"];
    const toiletText = ["をトイレに行かせますか？", "はトイレに行ってきた！"];
    const saveText = [["ここまでのデータをセーブしますか？", "今までのデータが全て上書きされます。本当によろしいですか？", "セーブしました。"], ["前回のデータをロードしますか？", "ここまでのデータが消えてしまいます。本当にロードしますか？", "データをロードします。"], ["データを消去しますか？", "今までのデータが全て失われてしまいます。本当によろしいですか？", "データを消去しました。", "タイトルへ戻ります。"], ["タイトルへ戻りますか？", "セーブは行われませんがこのままタイトルへ戻りますか？", "タイトルへ戻ります。"]];
    // pMStatus = {name: "なまえ", img: "url", hitPoint: [初期値, 得意度, 0], attack: [初期値, 得意度, 1], defense: [初期値, 得意度, 2], speed: [初期値, 得意度, 3], life: 寿命, bonus: [HP取得値, attack取得値, defense取得値, speed取得値] , evoBonus: 取得値, training: 初回１秒, meal: [初回食事時間, mealNow初期化], toilet: 初回トイレ, sleep: 初回睡眠, evoPattern: 進化パターン}
    // const playerMonsterStatusTemp = {name: "", img: "url('img/m_img/m000.png')", hitPoint: [0, 1, 0], attack: [0, 1, 1], defense: [0, 1, 2], speed: [0, 1, 3], life: 0, bonus: [0, 0, 0, 0], evoBonus: 0, training: 1, meal: [0, 3], toilet: 0, sleep: 0, evoPattern: 0  };
    // 検証用及びdemo用。
    // const playerMonsterStatusTest1 = { name: "スライム", img: "url('img/m_img/m000.png')", hitPoint: [10, 1, 0], attack: [10, 1, 1], defense: [10, 1, 2], speed: [10, 1, 3], life: 20, bonus: [0, 0, 0, 0], evoBonus: 0, training: 1, meal: [5, 3], toilet: 10, sleep: 60, evoPattern: 0 };
    // const playerMonsterStatusTest2 = { name: "いぬ", img: "url('img/m_img/m001.png')", hitPoint: [20, 1, 0], attack: [20, 2, 1], defense: [15, 1, 2], speed: [20, 2, 3], life: 20, bonus: [0, 0, 0, 0], evoBonus: 0, training: 1, meal: [60, 3], toilet: 60, sleep: 5, evoPattern: 6 };
    // こっから本採用。
    const playerMonsterStatus0 = { name: "スライム", img: "url('img/m_img/m000.png')", hitPoint: [10, 1, 0], attack: [10, 1, 1], defense: [10, 1, 2], speed: [10, 1, 3], life: 7200, bonus: [0, 0, 0, 0], evoBonus: 0, training: 1, meal: [10, 3], toilet: 60, sleep: 3600, evoPattern: 0 };
    const playerMonsterStatus1 = { name: "いぬ", img: "url('img/m_img/m001.png')", hitPoint: [20, 2, 0], attack: [25, 2, 1], defense: [15, 1, 2], speed: [15, 1, 3], life: 14400, bonus: [0, 0, 0, 0], evoBonus: 0, training: 1, meal: [30, 3], toilet: 1200, sleep: 600, evoPattern: 1 };
    const playerMonsterStatus2 = { name: "とり", img: "url('img/m_img/m002.png')", hitPoint: [20, 2, 0], attack: [15, 1, 1], defense: [15, 1, 2], speed: [25, 2, 3], life: 14400, bonus: [0, 0, 0, 0], evoBonus: 0, training: 1, meal: [30, 3], toilet: 1200, sleep: 600, evoPattern: 2 };
    const playerMonsterStatus3 = { name: "さかな", img: "url('img/m_img/m003.png')", hitPoint: [20, 2, 0], attack: [15, 1, 1], defense: [25, 2, 2], speed: [15, 1, 3], life: 14400, bonus: [0, 0, 0, 0], evoBonus: 0, training: 1, meal: [30, 3], toilet: 1200, sleep: 600, evoPattern: 3 };
    const playerMonsterStatus4 = { name: "ゴーレム", img: "url('img/m_img/m004.png')", hitPoint: [30, 3, 0], attack: [15, 1, 1], defense: [15, 1, 2], speed: [15, 1, 3], life: 21600, bonus: [0, 0, 0, 0], evoBonus: 0, training: 1, meal: [21601, 3], toilet: 21601, sleep: 21601, evoPattern: 4 };
    const playerMonsterStatus5 = { name: "ユニコーン", img: "url('img/m_img/m005.png')", hitPoint: [20, 2, 0], attack: [20, 2, 1], defense: [20, 2, 2], speed: [20, 2, 3], life: 21600, bonus: [0, 0, 0, 0], evoBonus: 0, training: 1, meal: [30, 3], toilet: 1200, sleep: 600, evoPattern: 5 };
    const playerMonsterStatus6 = { name: "ケルベロス", img: "url('img/m_img/m006.png')", hitPoint: [30, 3, 0], attack: [40, 3, 1], defense: [20, 1, 2], speed: [30, 2, 3], life: 43200, bonus: [0, 0, 0, 0], evoBonus: 0, training: 1, meal: [300, 3], toilet: 900, sleep: 1500, evoPattern: 6 };
    const playerMonsterStatus7 = { name: "ベヒモス", img: "url('img/m_img/m007.png')", hitPoint: [30, 3, 0], attack: [30, 2, 1], defense: [40, 3, 2], speed: [20, 1, 3], life: 43200, bonus: [0, 0, 0, 0], evoBonus: 0, training: 1, meal: [300, 3], toilet: 900, sleep: 1500, evoPattern: 6 };
    const playerMonsterStatus8 = { name: "白虎", img: "url('img/m_img/m008.png')", hitPoint: [30, 3, 0], attack: [20, 1, 1], defense: [30, 2, 2], speed: [40, 3, 3], life: 43200, bonus: [0, 0, 0, 0], evoBonus: 0, training: 1, meal: [300, 3], toilet: 900, sleep: 1500, evoPattern: 6 };
    const playerMonsterStatus9 = { name: "ワイバーン", img: "url('img/m_img/m009.png')", hitPoint: [30, 3, 0], attack: [40, 3, 1], defense: [30, 2, 2], speed: [20, 1, 3], life: 43200, bonus: [0, 0, 0, 0], evoBonus: 0, training: 1, meal: [300, 3], toilet: 900, sleep: 1500, evoPattern: 6 };
    const playerMonsterStatus10 = { name: "グリフォン", img: "url('img/m_img/m010.png')", hitPoint: [30, 3, 0], attack: [20, 1, 1], defense: [40, 3, 2], speed: [30, 2, 3], life: 43200, bonus: [0, 0, 0, 0], evoBonus: 0, training: 1, meal: [300, 3], toilet: 900, sleep: 1500, evoPattern: 6 };
    const playerMonsterStatus11 = { name: "朱雀", img: "url('img/m_img/m011.png')", hitPoint: [30, 3, 0], attack: [30, 2, 1], defense: [20, 1, 2], speed: [40, 3, 3], life: 43200, bonus: [0, 0, 0, 0], evoBonus: 0, training: 1, meal: [300, 3], toilet: 900, sleep: 1500, evoPattern: 6 };
    const playerMonsterStatus12 = { name: "クラーケン", img: "url('img/m_img/m012.png')", hitPoint: [30, 3, 0], attack: [40, 3, 1], defense: [20, 1, 2], speed: [30, 2, 3], life: 43200, bonus: [0, 0, 0, 0], evoBonus: 0, training: 1, meal: [300, 3], toilet: 900, sleep: 1500, evoPattern: 6 };
    const playerMonsterStatus13 = { name: "玄武", img: "url('img/m_img/m013.png')", hitPoint: [30, 3, 0], attack: [30, 2, 1], defense: [40, 3, 2], speed: [20, 1, 3], life: 43200, bonus: [0, 0, 0, 0], evoBonus: 0, training: 1, meal: [300, 3], toilet: 900, sleep: 1500, evoPattern: 6 };
    const playerMonsterStatus14 = { name: "青龍", img: "url('img/m_img/m014.png')", hitPoint: [30, 3, 0], attack: [20, 1, 1], defense: [30, 2, 2], speed: [40, 3, 3], life: 43200, bonus: [0, 0, 0, 0], evoBonus: 0, training: 1, meal: [300, 3], toilet: 900, sleep: 1500, evoPattern: 6 };
    const playerMonsterStatus15 = { name: "ハンプティダンプティ", img: "url('img/m_img/m015.png')", hitPoint: [40, 4, 0], attack: [20, 1, 1], defense: [20, 1, 2], speed: [40, 3, 3], life: 43200, bonus: [0, 0, 0, 0], evoBonus: 0, training: 1, meal: [1, 3], toilet: 300, sleep: 150, evoPattern: 6 };
    const playerMonsterStatus16 = { name: "ダイダラボッチ", img: "url('img/m_img/m016.png')", hitPoint: [40, 4, 0], attack: [40, 3, 1], defense: [20, 1, 2], speed: [20, 1, 3], life: 43200, bonus: [0, 0, 0, 0], evoBonus: 0, training: 1, meal: [1, 3], toilet: 300, sleep: 150, evoPattern: 6 };
    const playerMonsterStatus17 = { name: "海坊主", img: "url('img/m_img/m017.png')", hitPoint: [40, 4, 0], attack: [20, 1, 1], defense: [40, 3, 2], speed: [20, 1, 3], life: 43200, bonus: [0, 0, 0, 0], evoBonus: 0, training: 1, meal: [1, 3], toilet: 300, sleep: 150, evoPattern: 6 };
    const playerMonsterStatus18 = { name: "ユニコーン企業", img: "url('img/m_img/m018.png')", hitPoint: [40, 4, 0], attack: [25, 2, 1], defense: [40, 4, 2], speed: [25, 2, 3], life: 64800, bonus: [0, 0, 0, 0], evoBonus: 0, training: 1, meal: [300, 3], toilet: 900, sleep: 1500, evoPattern: 6 };
    const playerMonsterStatus19 = { name: "麒麟", img: "url('img/m_img/m019.png')", hitPoint: [30, 2, 0], attack: [40, 4, 1], defense: [25, 2, 2], speed: [40, 4, 3], life: 64800, bonus: [0, 0, 0, 0], evoBonus: 0, training: 1, meal: [300, 3], toilet: 900, sleep: 1500, evoPattern: 6 };
    const playerMonsterStatus20 = { name: "魔王", img: "url('img/m_img/m020.png')", hitPoint: [40, 4, 0], attack: [40, 4, 1], defense: [30, 3, 2], speed: [30, 3, 3], life: 43200, bonus: [0, 0, 0, 0], evoBonus: 0, training: 1, meal: [43201, 3], toilet: 1, sleep: 900, evoPattern: 7 };
    const playerMonsterStatus21 = { name: "宇宙人", img: "url('img/m_img/m021.png')", hitPoint: [30, 3, 0], attack: [50, 5, 1], defense: [20, 1, 2], speed: [50, 5, 3], life: 21600, bonus: [0, 0, 0, 0], evoBonus: 0, training: 1, meal: [1, 3], toilet: 900, sleep: 21601, evoPattern: 7 };
    const playerMonsterPackage = [[playerMonsterStatus7, playerMonsterStatus6, playerMonsterStatus8], [playerMonsterStatus9, playerMonsterStatus10, playerMonsterStatus11], [playerMonsterStatus12, playerMonsterStatus13, playerMonsterStatus14], [playerMonsterStatus16, playerMonsterStatus17, playerMonsterStatus15]];
    const backgroundImg = { umi: "url('img/bg_img/umi.png')", yama: "url('img/bg_img/yama.png')", mori: "url('img/bg_img/mori.png')", sougen: "url('img/bg_img/sougen.png')", huyuyama: "url('img/bg_img/huyuyama.png')", sawabe: "url('img/bg_img/sawa_main.jpg')" };

    // 食事の50分～70分, トイレは50分～70分, 睡眠は2時間～3時間。
    const trainingInterval = 900;
    const mealElementaryInterval = 3000;
    const mealMax = 1200;
    const mealMin = 0;
    let mealRN = "";
    const toiletElementaryInterval = 4800;
    const toiletMax = 1200;
    const toiletMin = 0;
    let toiletRN = "";
    const sleepElementaryInterval = 7200;
    const sleepMax = 3600;
    const sleepMin = 0;
    let sleepRN = "";
    let playerMonsterStatus = "";
    let greetRN = "";
    let trainingNow = "";
    let mealNow = "";
    let savePattern = "";
    let toTitleSwitch = false;
    let dataLoad = false;
    let localStorageFlag = "";
    let trainingFlag = "";
    let mealFlag = "";
    let toiletFlag = "";
    let sleepFlag = "";
    let timer = "";
    let bonusSave = "";
    let elapsedTime = 0;
    let deathSwitch = false;
    let moveRNX = "";
    let moveRNY = "";
    let monsterMove = "";

    // 以下関数。
    // savedataの有無に応じて関連ボタンがタッチ不可。
    function untouchableSwitch() {
        if (localStorageFlag == true) {
            $("#restart_btn").removeClass("untouchable");
            $("#dataclear_btn").removeClass("untouchable");
            $("#save_commands1").removeClass("untouchable")
        } else if (localStorageFlag == false) {
            $("#restart_btn").addClass("untouchable");
            $("#dataclear_btn").addClass("untouchable");
            $("#save_commands1").addClass("untouchable");
        }
    };

    // 育成系コマンドのタッチ不可は別にまとめ。
    function untouchableSwAnother() {
        if (trainingFlag == true) {
            $("#training_command").removeClass("untouchable");
        } else if (mealFlag == false) {
            $("#training_command").addClass("untouchable");
        };
        if (mealFlag == true) {
            $("#meal_command").removeClass("untouchable");
        } else if (mealFlag == false) {
            $("#meal_command").addClass("untouchable");
        };
        if (toiletFlag == true) {
            $("#toilet_command").removeClass("untouchable");
        } else if (toiletFlag == false) {
            $("#toilet_command").addClass("untouchable");
        };
        if (sleepFlag == true) {
            $("#sleep_command").removeClass("untouchable");
        } else if (sleepFlag == false) {
            $("#sleep_command").addClass("untouchable");
        };
    };

    // 育成アイコンの表示管理。最後にはコマンドと連動。
    function iconsManager() {
        if (playerMonsterStatus.training <= 0) {
            trainingFlag = true;
        } else {
            trainingFlag = false;
        };
        if (playerMonsterStatus.meal[0] <= 0) {
            mealFlag = true;
            $("#meal_icon").css("display", "flex");
        } else {
            mealFlag = false;
            $("#meal_icon").css("display", "none");
        };
        if (playerMonsterStatus.sleep <= 0) {
            sleepFlag = true;
            $("#sleep_icon").css("display", "flex");
        } else {
            sleepFlag = false;
            $("#sleep_icon").css("display", "none");
        };
        if (playerMonsterStatus.toilet <= 0) {
            toiletFlag = true;
            $("#toilet_icon").css("display", "flex");
        } else {
            toiletFlag = false;
            $("#toilet_icon").css("display", "none");
        };
        untouchableSwAnother();
    };

    // テキストダイアログをリセット。あると便利。
    function dialogReset() {
        $("#text_dialogbox").text("");
        $(".yn_boxes").css("display", "none");
        $("#text_dialog").css("display", "none");
    };

    // モンスターが自由移動。一定周期で判定を繰り返す。
    function monsterMoveStart() {
        let moveRN = Math.floor(Math.random() * 2);
        if (moveRN == 0) {
            moveRNX = Math.floor(Math.random() * 11 + 1);
            $("#player_monster").animate({ left: moveRNX * 5 + 25 + "%" }, 3000);
        } else if (moveRN == 1) {
            moveRNY = Math.floor(Math.random() * 9 + 1);
            $("#player_monster").animate({ top: moveRNY * 5 + 30 + "%" }, 3000);
        };
        monsterMove = setInterval(function () {
            moveRN = Math.floor(Math.random() * 2);
            if (moveRN == 0) {
                moveRNX = Math.floor(Math.random() * 11 + 1);
                $("#player_monster").animate({ left: moveRNX * 5 + 25 + "%" }, 3000);
            } else if (moveRN == 1) {
                moveRNY = Math.floor(Math.random() * 9 + 1);
                $("#player_monster").animate({ top: moveRNY * 5 + 30 + "%" }, 3000);
            };
        }, 3000);
    };

    // データロード時に行ってほしい動作まとめ。
    function loadAction() {
        $("#pm_img").css("background", playerMonsterStatus.img);
        greetRN = Math.floor(Math.random() * 3 + 1);
        $("#text_dialogbox").text(playerMonsterStatus.name + greetText[greetRN]);
        clearInterval(monsterMove);
        $("#player_monster").animate({ top: 50 + "%" });
        $("#player_monster").animate({ left: 50 + "%" });
    };

    // トレーニングによる能力上昇の判定と管理。
    function training() {
        trainingRN = Math.floor(Math.random() * (trainingNow[1] + 1));
        if (trainingRN == 0) {
            $("#text_dialogbox").text(trainingText[trainingNow[2]] + trainingText[5]);
        } else {
            playerMonsterStatus.bonus[trainingNow[2]]++;
            playerMonsterStatus.evoBonus++
            $("#text_dialogbox").text(trainingText[trainingNow[2]] + trainingText[6] + trainingText[trainingNow[2]] + trainingText[7]);
        }
        playerMonsterStatus.training = trainingInterval;
        iconsManager();
    };

    // 次回食事時間を決める乱数生成。
    function mealRNG() {
        mealRN = Math.floor(Math.random() * (mealMax - mealMin));
        playerMonsterStatus.meal[0] = mealElementaryInterval + mealRN;
    };

    // 食事行動の成功失敗判定。
    function meal() {
        if (mealNow == playerMonsterStatus.meal[1]) {
            playerMonsterStatus.evoBonus = playerMonsterStatus.evoBonus - 3;
            $("#text_dialogbox").text(mealText[4]);
            mealFlag = false;
            iconsManager();
            mealRNG();
        } else {
            playerMonsterStatus.evoBonus++;
            $("#text_dialogbox").text(playerMonsterStatus.name + "は" + mealText[mealNow] + mealText[5]);
            mealFlag = false;
            $("#meal_icon").css("display", "none");
            iconsManager();
            mealRNG();
        };
        playerMonsterStatus.meal[1] = mealNow;
    };

    // 次回睡眠時間を決める乱数生成。
    function sleepRNG() {
        sleepRN = Math.floor(Math.random() * (sleepMax - sleepMin) - (sleepMax * 2));
        playerMonsterStatus.sleep = sleepElementaryInterval + sleepRN;
    };

    // 睡眠による能力上昇管理。
    function sleep() {
        playerMonsterStatus.evoBonus = playerMonsterStatus.evoBonus + 3;
        sleepFlag = false;
        iconsManager();
        sleepRNG();
    };

    // 次回トイレ時間を決める乱数生成。
    function toiletRNG() {
        mealRN = Math.floor(Math.random() * (toiletMax - toiletMin) - (toiletMax * 2));
        playerMonsterStatus.toilet = toiletElementaryInterval + toiletRN;
    };

    // トイレによる能力上昇管理。
    function toilet() {
        playerMonsterStatus.evoBonus = playerMonsterStatus + 2;
        toiletFlag = false;
        iconsManager();
        toiletRNG();
    };

    // 進化時の条件管理。evoPatternとevoBonusごとに進化先が変更。特殊条件も。
    function lifeEvent() {
        bonusSave = [Math.floor(playerMonsterStatus.bonus[0] / 2), Math.floor(playerMonsterStatus.bonus[1] / 2), Math.floor(playerMonsterStatus.bonus[2] / 2), Math.floor(playerMonsterStatus.bonus[3] / 2)];
        // demo用の記述。コードレビュー会ではここを使います。
        // if (playerMonsterStatus.evoPattern == 6) {
        //     deathSwitch = true;
        // } else {
        //     playerMonsterStatus = playerMonsterStatusTest2;
        //     playerMonsterStatus.bonus = bonusSave;
        // };

        if (playerMonsterStatus.evoPattern == 0) {
            let evoRN1 = Math.floor(Math.random() * 10);
            if (evoRN1 == 0) {
                playerMonsterStatus = playerMonsterStatus5;
            } else if (evoRN1 >= 1) {
                if (playerMonsterStatus.evoBonus < 0 && playerMonsterStatus.bonus[0] >= 2) {
                    playerMonsterStatus = playerMonsterStatus4;
                } else if (playerMonsterStatus.evoBonus <= 2) {
                    playerMonsterStatus = playerMonsterStatus3;
                } else if (playerMonsterStatus.evoBonus >= 3 && playerMonsterStatus.evoBonus <= 6) {
                    playerMonsterStatus = playerMonsterStatus2;
                } else if (playerMonsterStatus.evoBonus >= 7) {
                    playerMonsterStatus = playerMonsterStatus1;
                };
            };
        } else if (playerMonsterStatus.evoPattern >= 1 && playerMonsterStatus.evoPattern <= 4) {
            console.log(playerMonsterPackage[playerMonsterStatus.evoPattern - 1]);
            if (playerMonsterStatus.evoBonus <= 12) {
                playerMonsterStatus = playerMonsterPackage[playerMonsterStatus.evoPattern - 1][0];
            } else if (playerMonsterStatus.evoBonus >= 13 && playerMonsterStatus.evoBonus <= 29) {
                playerMonsterStatus = playerMonsterPackage[playerMonsterStatus.evoPattern - 1][1];
            } else if (playerMonsterStatus.evoBonus >= 30) {
                playerMonsterStatus = playerMonsterPackage[playerMonsterStatus.evoPattern - 1][2];
            };
        } else if (playerMonsterStatus.evoPattern == 5) {
            if (playerMonsterStatus.bonus[0] >= 10) {
                playerMonsterStatus = playerMonsterStatus18;
            } else {
                if (playerMonsterStatus.evoBonus >= 36) {
                    playerMonsterStatus = playerMonsterStatus19;
                } else {
                    deathSwitch = true;
                }
            };
        } else if (playerMonsterStatus.evoPattern == 6) {
            let evoRN2 = Math.floor(Math.random() * 10);
            if (evoRN2 == 0) {
                playerMonsterStatus = playerMonsterStatus21;
            } else {
                deathSwitch = true;
            };
        } else if (playerMonsterStatus.evoPattern == 7) {
            deathSwitch = true;
        };
    };

    // 経過時間を算出して更新する。
    function saveTimer() {
        playerMonsterStatus.training = playerMonsterStatus.training - elapsedTime;
        playerMonsterStatus.meal[0] = playerMonsterStatus.meal[0] - elapsedTime;
        playerMonsterStatus.sleep = playerMonsterStatus.sleep - elapsedTime;
        playerMonsterStatus.toilet = playerMonsterStatus.toilet - elapsedTime;
        playerMonsterStatus.life = playerMonsterStatus.life - elapsedTime;
    };

    // 時間経過を管理して指定した時間になるとイベントが発生する。
    function startTimer() {
        elapsedTime = 0;
        timer = setInterval(function () {
            elapsedTime++;
            if (elapsedTime >= playerMonsterStatus.training) {
                trainingFlag = true;
                untouchableSwAnother();
            };
            if (elapsedTime >= playerMonsterStatus.meal[0]) {
                mealFlag = true;
                $("#meal_icon").css("display", "flex");
                untouchableSwAnother();
            };
            if (elapsedTime >= playerMonsterStatus.sleep) {
                sleepFlag = true;
                $("#sleep_icon").css("display", "flex");
                untouchableSwAnother();
            };
            if (elapsedTime >= playerMonsterStatus.toilet) {
                toiletFlag = true;
                $("#toilet_icon").css("display", "flex");
                untouchableSwAnother();
            };
            if (elapsedTime >= playerMonsterStatus.life) {
                $("#text_dialog").css("display", "flex");
                $("#life_next").css("display", "flex");
                $("#text_dialogbox").text(lifeText[0] + playerMonsterStatus.name + lifeText[1]);
                clearInterval(timer);
                lifeEvent();
                $(".command_boxes").css("display", "none");
            };
        }, 1000);
    };

    // savepatternごとにどのような挙動を行うか。『今週の肝』。
    // 0でセーブ, 1でロード, 2でクリア
    function save() {
        if (savePattern == 0) {
            const jsonData = JSON.stringify(playerMonsterStatus);
            localStorage.setItem("saveData", jsonData)
            localStorageFlag = true;
        } else if (savePattern == 1) {
            const jsonData = localStorage.getItem("saveData");
            playerMonsterStatus = JSON.parse(jsonData);
        } else if (savePattern == 2) {
            localStorage.removeItem("saveData");
            localStorageFlag = false;
            playerMonsterStatus = "";
        } else if (savePattern == 3) {
            toTitleSwitch = true;
        };
    };

    /////////////////
    // ここまで関数
    /////////////////

    // タイトルシーンが触れられるかどうかはブラウザ読み込み時にも判定。
    $(document).ready(function () {
        if (localStorage.getItem("saveData")) {
            localStorageFlag = true;
        } else {
            localStorageFlag = false;
        };
        untouchableSwitch();
    });

    // はじめからを押すと。statusを呼び込んで、ゲーム開始ができるように準備。
    $("#start_btn").on("click", function () {
        $("#opening").fadeOut(800);
        setTimeout(function () {
            // playerMonsterStatusTest1.bonus = [0, 0, 0, 0];
            // playerMonsterStatusTest1.evoBonus = 0;
            // playerMonsterStatus = playerMonsterStatusTest1;
            // playerMonsterStatus0.bonus = [0, 0, 0, 0];
            // playerMonsterStatus0.evoBonus = 0;
            playerMonsterStatus = playerMonsterStatus0;
            $("#loading").fadeIn(800);
        }, 800);
        setTimeout(function () {
            $("#loading").fadeOut(800);
        }, 1600);
        setTimeout(function () {
            $("#loading").fadeIn(800);
        }, 2400);
        setTimeout(function () {
            $("#loading").fadeOut(800);
            $("#main_scene").css("display", "flex");
            $("#pm_img").css("background", playerMonsterStatus.img);
            $("#text_dialog").css("display", "flex");
            $("#dialog_close").css("display", "flex");
            $("#text_dialogbox").text(playerMonsterStatus.name + greetText[0]);
            iconsManager();
        }, 3200);
        setTimeout(function () {
            $("#main_scene").animate({ opacity: '1' }, 1000);
        }, 4000);
    });

    // ロードの場合はstatusをlocalStorageから読み込んだものにする。あとは一緒。
    $("#restart_btn").on("click", function () {
        $("#opening").fadeOut(800);
        setTimeout(function () {
            $(".icons").css("display", "none");
            $("#loading").fadeIn(800);
        }, 800);
        setTimeout(function () {
            $("#loading").fadeOut(800);
        }, 1600);
        setTimeout(function () {
            $("#loading").fadeIn(800);
        }, 2400);
        setTimeout(function () {
            $("#loading").fadeOut(800);
            $("#main_scene").css("display", "flex");
            savePattern = 1;
            save();
            loadAction();
            $("#text_dialog").css("display", "flex");
            $("#dialog_close").css("display", "flex");
            iconsManager();
        }, 3200);
        setTimeout(function () {
            $("#main_scene").animate({ opacity: '1' }, 800);
        }, 4000);
    });

    // データクリア時の挙動。
    $("#dataclear_btn").on("click", function () {
        $("#opening").fadeOut(800);
        setTimeout(function () {
            $("#loading").fadeIn(800);
        }, 800);
        setTimeout(function () {
            $("#loading").fadeOut(800);
        }, 1600);
        setTimeout(function () {
            $("#loading").fadeIn(800);
        }, 2400);
        setTimeout(function () {
            $("#loading").fadeOut(800);
            $("#dataclear_dialog").text(saveText[2][0]);
            $("#dataclear_yes1").css("display", "block");
            $("#dataclear_yes2").css("display", "none");
            $("#dataclear_no").css("display", "block");
            $("#dataclear_totitle").css("display", "none");
        }, 3200);
        setTimeout(function () {
            $("#dataclear_scene").fadeIn(800);
        }, 4000);
    });

    $("#dataclear_yes1").on("click", function () {
        $("#dataclear_yes1").css("display", "none");
        $("#dataclear_dialog").text(saveText[2][1]);
        $("#dataclear_yes2").css("display", "block");
    });

    $("#dataclear_yes2").on("click", function () {
        savePattern = 2;
        save();
        $("#dataclear_yes2").css("display", "none");
        $("#dataclear_no").css("display", "none");
        $("#dataclear_dialog").text(saveText[2][2] + saveText[2][3]);
        $("#dataclear_totitle").css("display", "block");
    });

    $("#dataclear_no").on("click", function () {
        $("#dataclear_yes1").css("display", "none");
        $("#dataclear_yes2").css("display", "none");
        $("#dataclear_no").css("display", "none");
        $("#dataclear_dialog").text(saveText[2][3]);
        $("#dataclear_totitle").css("display", "block");
    });

    $("#dataclear_totitle").on("click", function () {
        untouchableSwitch();
        $("#dataclear_scene").fadeOut(800);
        setTimeout(function () {
            $("#loading").fadeIn(800);
        }, 800);
        setTimeout(function () {
            $("#loading").fadeOut(800);
        }, 1600);
        setTimeout(function () {
            $("#loading").fadeIn(800);
        }, 2400);
        setTimeout(function () {
            $("#loading").fadeOut(800);
            $("#dataclear_dialog").text("");
        }, 3200);
        setTimeout(function () {
            $("#opening").fadeIn(800);
        }, 4000);
    });

    // 各コマンド挙動
    // 各commandを押すと最初にダイアログボックスを一括で初期化する。
    // 他にもタイマースタートもトリガーに。
    $(".command").on("click", function () {
        clearInterval(monsterMove);
        monsterMoveStart();
        dialogReset();
    });

    // ファームコマンド, 特になし他のシーンがあれば閉じる。
    $("#farm_command").on("click", function () {
        $(".main_scenes").css("display", "none");
        $("#farm_scene").css("display", "flex");
    });

    // ステータスコマンド, ステータスをplayerMonsterStatusより参照して記述。開いている間はカウントは停止。
    // 文字列に全角スペースを採用していますが勘弁してください。
    $("#status_command").on("click", function () {
        $(".main_scenes").css("display", "none");
        $("#main_commandbox").css("display", "none");
        $("#status_commandbox").css("display", "flex");
        $("#status_scene").css("display", "flex");
        $("#status_img").css("background", playerMonsterStatus.img);
        $("#status_name").text("なまえ：" + playerMonsterStatus.name);
        $("#status_hp").text("たいりょく：" + (playerMonsterStatus.hitPoint[0] + playerMonsterStatus.bonus[0]));
        $("#status_attack").text("こうげき　：" + (playerMonsterStatus.attack[0] + playerMonsterStatus.bonus[1]));
        $("#status_defense").text("ぼうぎょ　：" + (playerMonsterStatus.defense[0] + playerMonsterStatus.bonus[2]));
        $("#status_speed").text("すばやさ　：" + (playerMonsterStatus.speed[0] + playerMonsterStatus.bonus[3]));
        saveTimer();
        clearInterval(timer);
    });

    $("#status_return").on("click", function () {
        startTimer();
    });

    // 戦闘コマンド, まだメンテ中。
    $("#battle_command").on("click", function () {
        $("#main_commandbox").css("display", "none");
        $("#text_dialog").css("display", "flex");
        $("#text_dialogbox").text(battleText);
        $("#dialog_close").css("display", "flex");
    });

    // トレーニングコマンド
    // 各コマンドで上昇可能なステータスを指定し, training()により判定。
    $("#training_command").on("click", function () {
        $("#main_commandbox").css("display", "none");
        $("#training_commandbox").css("display", "flex");
    });

    $("#training_commands0").on("click", function () {
        $("#text_dialog").css("display", "flex");
        $("#training_yn").css("display", "flex");
        trainingNow = playerMonsterStatus.hitPoint;
        $("#text_dialogbox").text(trainingText[trainingNow[2]] + trainingText[4]);
    });

    $("#training_commands1").on("click", function () {
        $("#text_dialog").css("display", "flex");
        $("#training_yn").css("display", "flex");
        trainingNow = playerMonsterStatus.attack;
        $("#text_dialogbox").text(trainingText[trainingNow[2]] + trainingText[4]);
    });

    $("#training_commands2").on("click", function () {
        $("#text_dialog").css("display", "flex");
        $("#training_yn").css("display", "flex");
        trainingNow = playerMonsterStatus.defense;
        $("#text_dialogbox").text(trainingText[trainingNow[2]] + trainingText[4]);
    });

    $("#training_commands3").on("click", function () {
        $("#text_dialog").css("display", "flex");
        $("#training_yn").css("display", "flex");
        trainingNow = playerMonsterStatus.speed;
        $("#text_dialogbox").text(trainingText[trainingNow[2]] + trainingText[4]);
    });

    $("#training_yes").on("click", function () {
        training();
        $("#training_yn").css("display", "none");
        $("#dialog_close").css("display", "flex");
        saveTimer();
        clearInterval(timer);
    });

    $("#training_no").on("click", function () {
        trainingNow = "";
        dialogReset();
    });

    // 食事コマンド
    // 各コマンドmealNowを指定し, meal()により判定。
    $("#meal_command").on("click", function () {
        $("#main_commandbox").css("display", "none");
        $("#meal_commandbox").css("display", "flex");
    });

    $("#meal_commands0").on("click", function () {
        $("#text_dialog").css("display", "flex");
        $("#meal_yn").css("display", "flex");
        mealNow = 0;
        $("#text_dialogbox").text(mealText[mealNow] + mealText[3]);
    });

    $("#meal_commands1").on("click", function () {
        $("#text_dialog").css("display", "flex");
        $("#meal_yn").css("display", "flex");
        mealNow = 1;
        $("#text_dialogbox").text(mealText[mealNow] + mealText[3]);
    });

    $("#meal_commands2").on("click", function () {
        $("#text_dialog").css("display", "flex");
        $("#meal_yn").css("display", "flex");
        mealNow = 2;
        $("#text_dialogbox").text(mealText[mealNow] + mealText[3]);
    });

    $("#meal_yes").on("click", function () {
        meal();
        $("#meal_yn").css("display", "none");
        $("#dialog_close").css("display", "flex");
        saveTimer();
        clearInterval(timer);
    });

    $("#meal_no").on("click", function () {
        mealNow = "";
        dialogReset();
    });

    // 睡眠コマンド
    // 暗転により睡眠を演出, 暗転動作は他のアニメーションに比べて少しだけ長い。総時間は短い。
    $("#sleep_command").on("click", function () {
        $("#text_dialog").css("display", "flex");
        $("#sleep_yn").css("display", "flex");
        $("#text_dialogbox").text(playerMonsterStatus.name + sleepText[0]);
    });

    $("#sleep_yes").on("click", function () {
        sleep();
        saveTimer();
        clearInterval(timer);
        $("#sleep_yn").css("display", "none");
        $("#text_dialogbox").text(playerMonsterStatus.name + sleepText[1]);
        $("#sleep_close").css("display", "flex");
    });

    $("#sleep_no").on("click", function () {
        dialogReset();
    });

    $("#sleep_close_btn").on("click", function () {
        setTimeout(function () {
            $("#main_scene").animate({ opacity: '0' }, 1200);
        }, 1200);
        setTimeout(function () {
            $("#sleep_close").css("display", "none");
            $("#text_dialogbox").text(playerMonsterStatus.name + sleepText[2]);
            $("#dialog_close").css("display", "flex");
        }, 2400);
        setTimeout(function () {
            $("#main_scene").animate({ opacity: '1' }, 1000);
        }, 3600);
    });

    // といれコマンド
    // 特に特殊な動作はなくtoilet()が起動する。
    $("#toilet_command").on("click", function () {
        $("#text_dialog").css("display", "flex");
        $("#toilet_yn").css("display", "flex");
        $("#text_dialogbox").text(playerMonsterStatus.name + toiletText[0]);
    });

    $("#toilet_yes").on("click", function () {
        toilet();
        $("#toilet_yn").css("display", "none");
        $("#text_dialogbox").text(playerMonsterStatus.name + toiletText[1]);
        $("#dialog_close").css("display", "flex");
        saveTimer();
        clearInterval(timer);
    });

    $("#toilet_no").on("click", function () {
        dialogReset();
    });

    // 背景コマンド
    // 各背景を設定する。リロード時には引き継がれない。
    $("#background_command").on("click", function () {
        $("#main_commandbox").css("display", "none");
        $("#background_commandbox").css("display", "flex");
    });

    $("#background_commands0").on("click", function () {
        $("#farm_scene").css("background-image", "none");
    });

    $("#background_commands1").on("click", function () {
        $("#farm_scene").css("background-image", backgroundImg.umi);
    });

    $("#background_commands2").on("click", function () {
        $("#farm_scene").css("background-image", backgroundImg.yama);
    });

    $("#background_commands3").on("click", function () {
        $("#farm_scene").css("background-image", backgroundImg.mori);
    });

    $("#background_commands4").on("click", function () {
        $("#farm_scene").css("background-image", backgroundImg.sougen);
    });

    $("#background_commands5").on("click", function () {
        $("#farm_scene").css("background-image", backgroundImg.huyuyama);
    });

    $("#background_commands6").on("click", function () {
        $("#farm_scene").css("background-image", backgroundImg.sawabe);
    });

    // セーブ＆ロード、ようやく今週の肝である。
    // 各コマンドでどの挙動をするか確定してsave()を実行。
    // 簡単に実行されると困るので、二重に警告を出す。そのため必要なボタンも増え, 見た目はよくない。
    $("#save_command").on("click", function () {
        $("#main_commandbox").css("display", "none");
        $("#save_commandbox").css("display", "flex");
    });

    $("#save_commands0").on("click", function () {
        $("#save_commandbox").css("display", "none");
        $("#text_dialog").css("display", "flex");
        $("#save_yn1").css("display", "flex");
        savePattern = 0;
        $("#text_dialogbox").text(saveText[savePattern][0]);
    });

    $("#save_commands1").on("click", function () {
        $("#save_commandbox").css("display", "none");
        $("#text_dialog").css("display", "flex");
        $("#save_yn1").css("display", "flex");
        savePattern = 1;
        dataLoad = true;
        $("#text_dialogbox").text(saveText[savePattern][0]);
    });

    $("#save_commands2").on("click", function () {
        $("#save_commandbox").css("display", "none");
        $("#text_dialog").css("display", "flex");
        $("#save_yn1").css("display", "flex");
        savePattern = 3;
        $("#text_dialogbox").text(saveText[savePattern][0]);
    });

    // 警告一回目
    $("#save_yes1").on("click", function () {
        $("#save_yn1").css("display", "none");
        $("#save_yn2").css("display", "flex");
        $("#text_dialogbox").text(saveText[savePattern][1]);
    });

    $("#save_no1").on("click", function () {
        savePattern = "";
        dialogReset();
        $("#main_commandbox").css("display", "flex");
    });

    // 警告二回目
    $("#save_yes2").on("click", function () {
        saveTimer();
        clearInterval(timer);
        save();
        if (toTitleSwitch == true) {
            $("#save_yn2").css("display", "none");
            $("#dialog_to_title").css("display", "flex");
            $("#text_dialogbox").text(saveText[savePattern][2]);
        } else if (toTitleSwitch == false) {
            $("#save_yn2").css("display", "none");
            $("#dialog_close").css("display", "flex");
            $("#text_dialogbox").text(saveText[savePattern][2]);
        }
    });

    $("#save_no2").on("click", function () {
        savePattern = "";
        dialogReset();
        $("#main_commandbox").css("display", "flex");
    });

    // 共通特殊コマンド
    // 進化及び寿命の特殊ダイアログ, 全ダイアログの閉じるボタン
    // 各コマンド共通の戻るボタン, あとセーブコマンド内で少し特殊なタイトルへ戻るボタン
    // 魔王進化イベントのみここ。
    $("#life_next_btn").on("click", function () {
        $("#main_scene").animate({ opacity: '0' }, 800);
        setTimeout(function () {
            $("#loading").fadeIn(800);
        }, 800);
        setTimeout(function () {
            $("#loading").fadeOut(800);
        }, 1600);
        setTimeout(function () {
            $("#loading").fadeIn(800);
        }, 2400);
        setTimeout(function () {
            $("#loading").fadeOut(800);
            $("#life_next").css("display", "none");
            if (deathSwitch == true) {
                $("#text_dialogbox").text(playerMonsterStatus.name + lifeText[3]);
                $("#pm_img").css("background", "");
                $(".command_boxes").css("display", "none");
                $(".icons").css("display", "none");
                $("#life_close").css("display", "flex");
                deathSwitch = false;
            } else if (deathSwitch == false) {
                if (playerMonsterStatus == playerMonsterStatus21) {
                    $("#text_dialogbox").text(lifeText[5]);
                    $("#dialog_close").css("display", "flex");
                    $("#pm_img").css("background", playerMonsterStatus.img);
                    iconsManager();
                } else {
                    $("#text_dialogbox").text(playerMonsterStatus.name + lifeText[2]);
                    $("#dialog_close").css("display", "flex");
                    $("#pm_img").css("background", playerMonsterStatus.img);
                    iconsManager();
                };
            };
        }, 3200);
        setTimeout(function () {
            $("#main_scene").animate({ opacity: '1' }, 800);
        }, 4000);
    });

    $("#life_close_btn").on("click", function () {
        $("#main_scene").animate({ opacity: '0' }, 800);
        setTimeout(function () {
            $("#loading").fadeIn(800);
        }, 800);
        setTimeout(function () {
            $("#loading").fadeOut(800);
        }, 1600);
        setTimeout(function () {
            $("#loading").fadeIn(800);
            if (playerMonsterStatus.evoBonus < 0) {
                let evoRN3 = Math.floor(Math.random() * 3);
                if (evoRN3 == 0) {
                    playerMonsterStatus = playerMonsterStatus20;
                    $("#text_dialogbox").text(lifeText[6]);
                } else {
                    playerMonsterStatus = playerMonsterStatus0;
                    $("#text_dialogbox").text(lifeText[4]);
                };
            } else {
                playerMonsterStatus = playerMonsterStatus0;
                $("#text_dialogbox").text(lifeText[4]);
            };
        }, 2400);
        setTimeout(function () {
            $("#loading").fadeOut(800);
            $("#pm_img").css("background", playerMonsterStatus.img);
            $("#life_close").css("display", "none");
            $("#dialog_close").css("display", "flex");
            playerMonsterStatus.bonus = bonusSave;
            iconsManager();
        }, 3200);
        setTimeout(function () {
            $("#main_scene").animate({ opacity: '1' }, 800);
            bonusSave = "";
        }, 4000);
    });

    $("#close").on("click", function () {
        if (dataLoad == true) {
            dataLoad = false;
            $("#main_scene").animate({ opacity: '0' }, 800);
            setTimeout(function () {
                $("#save_commandbox").css("display", "none");
                $("#main_commandbox").css("display", "flex");
                loadAction();
                $("#loading").fadeIn(800);
            }, 800);
            setTimeout(function () {
                $("#loading").fadeOut(800);
            }, 1600);
            setTimeout(function () {
                $("#loading").fadeIn(800);
            }, 2400);
            setTimeout(function () {
                $("#loading").fadeOut(800);
            }, 3200);
            setTimeout(function () {
                $("#main_scene").animate({ opacity: '1' }, 800);
                $("#main_scene").fadeIn(800);
            }, 4000);
        } else if (dataLoad == false) {
            dialogReset();
            $(".main_scenes").css("display", "none");
            $(".command_boxes").css("display", "none");
            $("#farm_scene").css("display", "flex");
            $("#main_commandbox").css("display", "flex");
            untouchableSwitch();
            startTimer();
            clearInterval(monsterMove);
            monsterMoveStart();
        };
    });

    $(".return_commands").on("click", function () {
        $(".main_scenes").css("display", "none");
        $(".command_boxes").css("display", "none");
        $("#farm_scene").css("display", "flex");
        $("#main_commandbox").css("display", "flex");
    });

    $("#to_title").on("click", function () {
        toTitleSwitch = false;
        untouchableSwitch();
        $("#main_scene").animate({ opacity: '0' }, 800);
        setTimeout(function () {
            $("#save_commandbox").css("display", "none");
            $("#main_commandbox").css("display", "flex");
            $("#loading").fadeIn(800);
        }, 800);
        setTimeout(function () {
            $("#loading").fadeOut(800);
        }, 1600);
        setTimeout(function () {
            $("#loading").fadeIn(800);
        }, 2400);
        setTimeout(function () {
            $("#loading").fadeOut(800);
            dialogReset();
            $("#main_scene").css("display", "none");
        }, 3200);
        setTimeout(function () {
            $("#opening").fadeIn(800);
        }, 4000);
    });

});
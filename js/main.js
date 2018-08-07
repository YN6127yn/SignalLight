$(function(){
    var ctx = $('canvas')[0].getContext('2d');
    
    // 信号機のベース(灰色の部分)
    var signal_base_x = 25; // 信号機のx座標
    var signal_base_y = 25; // 信号機のy座標
    var signal_base_width = 250; // 信号機の幅
    var signal_base_height = 100; // 信号機の高さ
    var corner_radius = 10; // 信号機の丸角の円の半径

    // 信号
    var go_signal_x = 75; // 青信号のx座標
    var warn_signal_x = 150; // 黄信号のx座標
    var stop_signal_x = 225; // 赤信号のx座標
    var signal_y = 75; // 各信号のy座標
    var signal_radius = 30; // 各信号の半径
    
    // 信号機のベースを描画する
    function drawSignalBase(param){
        ctx.beginPath();

        // パラメータ設定
        var x = param.x;
        var y = param.y;
        var width = param.width;
        var height = param.height;
        var radius = param.radius;
        var color = param.color;

        // 色の設定
        ctx.fillStyle = color;

        // 丸角四角形の描画
        ctx.moveTo(x+radius, y); // 左上の位置に移動
        ctx.lineTo(x+width-radius, y); // 左上から右上へのサブパスを定義
        ctx.arc(x+width-radius, y+radius, radius, Math.PI*1.5, 0, false); // 右上の丸角の四分円を描画
        ctx.lineTo(x+width, y+height-radius); // 右上から右下へのサブパスを定義
        ctx.arc(x+width-radius, y+height-radius, radius, 0, Math.PI*0.5, false); // 右下の丸角の四分円を描画
        ctx.lineTo(x+radius, y+height); // 右下から左下へのサブパスを定義
        ctx.arc(x+radius, y+height-radius, radius, Math.PI*0.5, Math.PI, false); // 左下の丸角の四分円を描画
        ctx.lineTo(x, y+radius); // 左下から左上へのサブパスを定義
        ctx.arc(x+radius, y+radius, radius, Math.PI, Math.PI*1.5, false); // 左上の丸角の四分円を描画

        ctx.closePath();
        ctx.fill();
    }

    // 信号を描画する
    function drawSignal(param){
        ctx.beginPath();

        // パラメータ設定
        var x = param.x;
        var y = param.y;
        var radius = param.radius;
        var color = param.color;
        
        // 円を描画
        ctx.arc(x, y, radius, 0, Math.PI*2, false);

        // 色の設定
        ctx.fillStyle = color;

        ctx.closePath();
        ctx.fill();
    }

    // 信号を初期化する
    function initializeSignal(){
        // 青信号を描画
        drawSignal({
            x: go_signal_x,
            y: signal_y,
            radius: signal_radius,
            color: "#00CED1"
        });

        // 黄信号を描画
        drawSignal({
            x: warn_signal_x,
            y: signal_y,
            radius: signal_radius,
            color: "#DAA520"
        });

        // 赤信号を描画
        drawSignal({
            x: stop_signal_x,
            y: signal_y,
            radius: signal_radius,
            color: "#B22222"
        });
    }

    // 信号機を初期化する
    function initialize(){
        // 信号機のベース部分を描画
        drawSignalBase({
            x: signal_base_x,
            y: signal_base_y,
            width: signal_base_width,
            height: signal_base_height,
            radius: corner_radius,
            color: "#D3D3D3"
        });

        // 信号を初期化
        initializeSignal();
    }

    // 信号を変更
    function changeSignal(signal){
        // 現在の信号を初期化
        initializeSignal();

        switch(signal){
            case "go" :
                // 青信号を点灯
                drawSignal({
                    x: go_signal_x,
                    y: signal_y,
                    radius: signal_radius,
                    color: "#00FFFF"
                });
                break;
            
            case "warn":
                // 黄信号を点灯
                drawSignal({
                    x: warn_signal_x,
                    y: signal_y,
                    radius: signal_radius,
                    color: "#FFFF00"
                });
                break;

            case "stop":
                // 赤信号を点灯
                drawSignal({
                    x: stop_signal_x,
                    y: signal_y,
                    radius: signal_radius,
                    color: "#FF0000"
                });
                break;

            default:
                break;
        }
    }

    // Deferredで処理を待機する
    $.wait = function(wait_time_ms){
        // Deferredオブジェクトを作成する
        var deferred = new $.Deferred;

        // 指定時間後にresolveするようにする
        setTimeout(function(){
            deferred.resolve(wait_time_ms);
        }, wait_time_ms);

        // DefferredオブジェクトのPromiseを返す
        return deferred.promise();
    }

    // 開始ボタンがクリックされた際、信号の変更を開始する
    $('#start').click(function(){
        // 処理が終わるまで、押下不可能にする
        $(this).prop("disabled", true);

        changeSignal("go");
        $.wait(3000)
            .then(function(wait_time){
                changeSignal("warn");
                return $.wait(wait_time);
            })
            .then(function(wait_time){
                changeSignal("stop");
                return $.wait(wait_time);
            })
            .done(function(){
                // 信号を初期化
                initializeSignal();
                // 押下可能にする
                $('#start').prop("disabled", false); // thisでは開始ボタンを指定できない!
            });
    });

    initialize();
});
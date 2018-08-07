$(function(){
    var ctx = $('canvas')[0].getContext('2d');
    
    var go_signal_x = 75; // 青信号のx座標
    var warn_signal_x = 150; // 黄信号のx座標
    var stop_signal_x = 225; // 赤信号のx座標
    var signal_y = 75; // 各信号のy座標
    var signal_radius = 30; // 各信号の半径
    
    // 信号機のベース(灰色の部分)を描画する
    function drawSignalBase(param){
        ctx.beginPath();

        // パラメータ設定
        var x = param.x;
        var y = param.y;
        var width = param.width;
        var height = param.height;
        var radius = param.corner_radius;
        var color = param.color;

        // 色の設定
        ctx.fillStyle = color;

        // 丸角四角形の描画
        ctx.moveTo(x+radius, y); // 左上の位置に移動
        ctx.lineTo(x+width-radius, y); // 左上から右上へのサブパスを定義
        ctx.arc(x+width-radius, y+radius, radius, Math.PI*1.5, 0, false); // 右上の丸角の四分円を描画
        ctx.lineTo(x+width, y+height-radius);// 右上から右下へのサブパスを定義
        ctx.arc(x+width-radius, y+height-radius, radius, 0, Math.PI*0.5, false); // 右下の丸角の四分円を描画
        ctx.lineTo(x+radius, y+height);// 右下から左下へのサブパスを定義
        ctx.arc(x+radius, y+height-radius, radius, Math.PI*0.5, Math.PI, false); // 左下の丸角の四分円を描画
        ctx.lineTo(x, y+radius);// 左下から左上へのサブパスを定義
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

    // 進めボタンがクリックされた際、他の信号を消灯し、青信号を点灯する
    $('#go').click(function(){
        // 信号機を初期化
        initialize();

        // 青信号を点灯
        drawSignal({
            x: go_signal_x,
            y: signal_y,
            radius: signal_radius,
            color: "#00FFFF"
        });
    });

    // 注意ボタンがクリックされた際、他の信号を消灯し、黄信号を点灯する
    $('#warn').click(function(){
        // 信号機を初期化
        initialize();

        // 黄信号を点灯
        drawSignal({
            x: warn_signal_x,
            y: signal_y,
            radius: signal_radius,
            color: "#FFFF00"
        });
    });

    // 止まれボタンがクリックされた際、他の信号を消灯し、赤信号を点灯する
    $('#stop').click(function(){
        // 信号機を初期化
        initialize();

        // 赤信号を点灯
        drawSignal({
            x: stop_signal_x,
            y: signal_y,
            radius: signal_radius,
            color: "#FF0000"
        });
    });

    // 信号機を初期化する
    function initialize(){
        // 信号機のベース部分を描画
        drawSignalBase({
            x: 25,
            y: 25,
            width: 250,
            height: 100,
            corner_radius: 10,
            color: "#D3D3D3"
        });

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
    initialize();
});
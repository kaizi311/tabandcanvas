var canvas_list = document.getElementsByClassName('canvas');

var PI = Math.PI;
var baseColor = '#f99ba7';
var coverColor = '#fc5e6d';


for (var i = 0; i < canvas_list.length; i++) {
    var item = canvas_list[i];
    console.log(item);
    var item_dom = $(item);
    var cWidth = item.width;
    var cHeight = item.height;
    var cxt = item.getContext('2d');
    cxt.scale(2,2);
    var sumNumber = item_dom.attr('data-sum_number');
    var number = item_dom.attr('data-number');
    var percent = (number / sumNumber) * 100;
    draw(cxt, percent, cWidth, cHeight);
}

function draw(cxt, percent, cWidth, cHeight) {
    if (percent < 0 || percent > 100) {
        return;
    }

    var sR = 4 / 5 * PI; // 默认圆弧的起始点弧度为π/2

    var finalRadian = sR + ((PI + (PI - sR) * 2) * percent / 100); // 红圈的终点弧度
    var step = (PI + (PI - sR) * 2) / 100; // 一个1%对应的弧度大小
    var text = 0; // 显示的数字

    window.requestAnimationFrame(paint);

    function paint() {
        cxt.clearRect(0, 0, cWidth, cHeight);
        var endRadian = sR + text * step;
        // 画灰色圆弧
        drawCanvas(cWidth / 4, cHeight / 4 + 10, 22, sR, sR + (PI + (PI - sR) * 2), baseColor, 4);
        // 画红色圆弧
        if(percent>0){
        drawCanvas(cWidth / 4, cHeight /4 + 10, 22, sR, endRadian, coverColor, 4);
        }

        // 数字
        cxt.fillStyle = coverColor;
        cxt.font = '10px PT Sans';
        var textWidth = cxt.measureText(text + '%').width;
        cxt.fillText(text + '%', cWidth / 4 - textWidth / 4-5, cHeight / 4 + 20);
        cxt.fillText('已领', cWidth / 4-10 , cHeight /4+ 6);
        text++;

        if (endRadian.toFixed(2) < finalRadian.toFixed(2)) {
            window.requestAnimationFrame(paint);
        }
    }

    function drawCanvas(x, y, r, sRadian, eRadian, color, lineWidth) {
        cxt.beginPath();
        cxt.lineCap = "round";
        cxt.strokeStyle = color;
        cxt.lineWidth = lineWidth;
        cxt.arc(x, y, r, sRadian, eRadian, false);
        cxt.stroke();
    }
}

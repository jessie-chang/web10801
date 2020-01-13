// $(".d-none").removeClass("d-none");

$(window).scroll(function() {
  roadProgress();

  // index animation control
  var winh = $(window).height();
  var winw = $(window).width();
  var scrolled = $(window).scrollTop();

  $("#b1").css("left", 1180 - scrolled * 11 + "px");
  $("#b1").css("top", 260 + scrolled * 0.2 + "px");
  $("#b1").css("width", 20 + scrolled * 2.5 + "px");

  $("#b2").css("left", 1200 - scrolled * 11 + "px");
  $("#b2").css("top", 260 + scrolled * 1.5 + "px");
  $("#b2").css("width", 20 + scrolled * 2.7 + "px");

  $("#b3").css("left", 1225 - scrolled * 8 + "px");
  $("#b3").css("top", 260 + scrolled * 1.5 + "px");
  $("#b3").css("width", 20 + scrolled * 3 + "px");

  //console.log($("#b0").css('left'));
  //console.log($("#b0").css('top'));
  //console.log($("#b0").css('width'));
  if (scrolled <= 88) {
    $("#b0").css("left", -200 + scrolled * 12.5 + "px");
    $("#b0").css("top", 800 - scrolled * 4.9 + "px");
    $("#b0").css("width", 1500 - scrolled * 12.7 + "px");
  } else {
    $("#b0").css("left", 900 + "px");
    $("#b0").css("top", 368.8 + "px");
    $("#b0").css("width", 382.4 + "px");
  }
});
// 回傳此obj有多少%的身體已到viewport過
$.fn.percentInView = function() {
  let win = $(window);
  let obj = $(this);

  let visibleArea = win.scrollTop() + win.height();

  return ((visibleArea - obj.offset().top) / obj.outerHeight()) * 100;
};

function roadProgress() {
  $(".road>img")
    .not("d-none")
    .each(function() {
      let scrolled = $(this).percentInView() * 0.9;

      $(this).css(
        "background-image",
        "linear-gradient(to bottom, #004b97," +
          scrolled +
          "%, white " +
          scrolled * 1.05 +
          "%)"
      );
    });
}
function motoClick(element, moto) {
  $(element).toggleClass('spin')
  $(".d-none").removeClass("d-none");
  const data = DataTable[moto];
  $("main")
    .children()
    .each(function(index) {
      const obj = $(this);
        if (index == 5) {
            obj.css({
                "background-image": `url(${data[index].bg})`,
                "background-size": 'cover'
            });
            obj.children('h1').html(data[index].txt);
          obj.children("iframe").attr("src", data[index].map);
      } else if (index % 2) {
        //condition
        $("img", obj).each(function(j) {
          $(this).attr("src", data[index].src[j]);
        });
        $("h1", obj).each(function(j) {
          $(this).html(data[index].txt[j]);
        });
      } else {
        //road
        obj.children().attr("src", data[index]);
      }
    });
}
const DataTable = {
  wemo: [
    "./img/wemo/wemo1.png",
    {
      name: "wemo1",
      src: ["./img/wemo/wemo2.png", "./img/wemo/wemo2-1.png"],
      txt: [
        "騎了50分鐘，機車漸漸沒電，只好……",
        "WeMo有後勤維護團隊會負責更換電池，<br> 使用者無需自己充電或更換電池喔！<br>若不幸遇到沒電，會開始限制騎乘速度，<br>請再次評估行程，並盡快準備還車；<br>若騎乘機車完全沒電時，直接聯繫客服<br>(點選APP畫面上的Call WeMo)，就會有專人協助處理囉！"
      ]
    },
    "./img/wemo/wemo3.png",
    {
      name: "wemo2",
      src: ["./img/wemo/wemo4.png", "./img/wemo/wemo4-1.png"],
      txt: [
        "50分鐘後到達目的地了！此時要付多少錢呢？",
        "前 6 分鐘 15 元，第 7 分鐘開始 2.5元/分鐘\n所以你要付：15+44*2.5=110 元！"
      ]
    },
    "./img/wemo/wemo5.png",
    {
      bg: "./img/wemo/wemo6.png",
      txt: "下車！但…該去哪裡還車呢？",
      map: "./map/wemo.htm"
    },
    "./img/wemo/wemo7.png"
  ],
  irent: [
    "./img/irent/irent1.png",
    {
      name: "irent1",
      src: ["./img/irent/irent2.png", "./img/irent/irent2-1.png"],
      txt: [
        "騎了50分鐘，機車漸漸沒電，只好……",
        "按下主頁面的『電池服務』並選取『能源站導航』<br>系統就會導航至最靠近你的能源站囉！"
      ]
    },
    "./img/irent/irent3.png",
    {
      name: "irent2",
      src: ["./img/irent/irent4.png", "./img/irent/irent4-1.png"],
      txt: [
        "50分鐘後到達目的地了！此時要付多少錢呢？",
        "前 10 分鐘 20 元，之後每分鐘 1 元\n所以你要付：20+40=60 元！"
      ]
    },
    "./img/irent/irent5.png",
    {
      bg: "./img/irent/irent6.png",
      txt: "下車！但…該去哪裡還車呢？",
      map: "./map/irent.htm"
    },
    "./img/irent/irent7.png"
  ],
  goshare: [
    "./img/goshare/goshare1.png",
    {
      name: "goshare1",
      src: ["./img/goshare/goshare2.png", "./img/goshare/goshare2-1.png"],
      txt: [
        "騎了50分鐘，機車漸漸沒電，只好……",
        "打開Goshare App點擊左下人像後選擇電池交換站<br>你就會被引導至最近的Gogoro電池交換站囉！"
      ]
    },
    "./img/goshare/goshare3.png",
    {
      name: "goshare2",
      src: ["./img/goshare/goshare4.png", "./img/goshare/goshare4-1.png"],
      txt: [
        "50分鐘後到達目的地了！此時要付多少錢呢？",
        "依照車款不同，費率也有所不同喔!<br>GOGORO VIVA 前6分鐘15元，之後每後分鐘2.5元<br>所以若是騎乘50分鐘，即為6*15+44*2.5=200元<br>GOGORO2 前6分鐘25元，之後每分鐘2.5元<br>所以若是騎乘50分鐘，即為6*25+44*2.5=<span class='text-primary'>260</span>元！"
      ]
    },
    "./img/goshare/goshare5.png",
    {
      bg: "./img/goshare/goshare6.png",
      txt: "下車！但…該去哪裡還車呢？",
      map: "./map/goshare.htm"
    },
    "./img/goshare/goshare7.png"
  ]
};

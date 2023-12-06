$num = $(".vid").length;
$even = $num / 2;
$odd = ($num + 1) / 2;

if ($num % 2 == 0) {
  $(".vid:nth-child(" + $even + ")").addClass("active");
  $(".vid:nth-child(" + $even + ")")
    .prev()
    .addClass("prev");
  $(".vid:nth-child(" + $even + ")")
    .next()
    .addClass("next");
} else {
  $(".vid:nth-child(" + $odd + ")").addClass("active");
  $(".vid:nth-child(" + $odd + ")")
    .prev()
    .addClass("prev");
  $(".vid:nth-child(" + $odd + ")")
    .next()
    .addClass("next");
}

/*$(".left").on("click", function () {
  $slide = $(".active").width();
  $(".slider")
    .stop(false, true)
    .animate({ left: "+=" + $slide });
});

$(".right").on("click", function () {
  $slide = $(".active").width();
  $(".slider")
    .stop(false, true)
    .animate({ left: "-=" + $slide });
});*/

$(".vid").click(function () {
  $slide = $(".active").width();
  console.log($(".active").position().left);

  if ($(this).hasClass("next")) {
    $(".slider")
      .stop(false, true)
      .animate({ left: "-=" + $slide });
  } else if ($(this).hasClass("prev")) {
    $(".slider")
      .stop(false, true)
      .animate({ left: "+=" + $slide });
  }

  $(this).removeClass("prev next");
  $(this).siblings().removeClass("prev active next");
  $(this).addClass("active");
  $(this).prev().addClass("prev");
  $(this).next().addClass("next");
  $(".vid.active>video").on("timeupdate", (e) => {
    console.log("pepe");
    console.log($(".vid.active .controls-container .timeline-control"));
    $(".vid.active .controls-container .timeline-control")[0].value =
      Math.round(
        (e.currentTarget.currentTime / e.currentTarget.duration) * 100
      );
  });
  document
    .querySelector(".active .volume-slider")
    .addEventListener("change", (e) => {
      const sliderValue = e.target.value;
      const video = document.querySelector(".active .video-element");
      console.log(video);
      if (video.muted) {
        video.muted = false;
      }
      video.volume = sliderValue / 100;
    });
});

const slider = document.querySelector(".slider");
slider.addEventListener("click", (e) => {
  const element = e.target;
  const isPlayBtn = element.className.includes("play-btn");
  const isAudioBtn = element.className.includes("sound-control");
  const video = document.querySelector(".active .video-element");
  console.log(video);
  const isTimeline = element.className.includes("timeline-control");
  const isArrowBtn = element.className.includes("arrow-btn");
  console.log(element);
  if (isPlayBtn) {
    onPlayClick(video);
    return;
  }
  if (isAudioBtn) {
    console.log("pepe");
    onAudioClick(video);
    return;
  }
});

const arrowBtn = document.querySelectorAll(".arrow-btn");
arrowBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (e.target.className.includes("left")) {
      document.querySelector(".active").previousElementSibling.click();
    } else {
      document.querySelector(".active").nextElementSibling.click();
    }
    return;
  });
});

const onPlayClick = (video) => {
  if (video.paused) {
    video.play();
    return;
  }
  video.pause();
};

const onAudioClick = (video) => {
  if (video.muted) {
    video.muted = false;
    return;
  }
  video.muted = true;
};

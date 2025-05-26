(function () {
  $(".modal").on("hidden.bs.modal", function () {
    var video = $(this).find("video").get(0);
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  });
})();

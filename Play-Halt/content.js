const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

if (!isSafari) {
  const pauseVideos = () => {
    const videos = document.querySelectorAll('video');
    videos.forEach((video) => {
      if (!video.paused) {
        video.pause();
        video.setAttribute('data-paused-by-extension', 'true');
      }
    });
  };

  const playVideos = () => {
    const videos = document.querySelectorAll('video[data-paused-by-extension="true"]');
    videos.forEach((video) => {
      video.play();
      video.removeAttribute('data-paused-by-extension');
    });
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      pauseVideos();
    } else {
      playVideos();
    }
  };

  window.addEventListener('blur', pauseVideos);
  window.addEventListener('focus', playVideos);
  document.addEventListener('visibilitychange', handleVisibilityChange);
}
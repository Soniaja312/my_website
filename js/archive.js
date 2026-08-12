/* ── ARCHIVE PAGE ── reel hover-to-play */

document.addEventListener('DOMContentLoaded', () => {

  /* Cards sit still on the first frame, play while hovered, and reset on leave.
     Click is handled by the wrapping <a> — it opens the Reel on Instagram. */
  const POSTER_TIME = 0.1;

  document.querySelectorAll('.reel-card').forEach(card => {
    const video = card.querySelector('video');
    if (!video) return;

    card.addEventListener('mouseenter', () => {
      // play() rejects if the browser blocks it or data isn't ready yet — ignore
      const played = video.play();
      if (played) played.catch(() => {});
    });

    card.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = POSTER_TIME;
    });
  });

});

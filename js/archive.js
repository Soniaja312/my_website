/* ── ARCHIVE PAGE ── scroll reveal + reel hover-to-play */

document.addEventListener('DOMContentLoaded', () => {

  /* reel hover-to-play */
  document.querySelectorAll('.reel-card').forEach(card => {
    const video = card.querySelector('video');
    if (!video) return;
    card.addEventListener('mouseenter', () => video.play());
    card.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
  });

});

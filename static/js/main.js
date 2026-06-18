document.addEventListener('DOMContentLoaded', () => {
  const album = document.querySelector('.project-album');
  if (!album) return;

  const track = album.querySelector('.album-track');
  const prevBtn = album.querySelector('.album-prev');
  const nextBtn = album.querySelector('.album-next');
  const slides = album.querySelectorAll('.album-slide');

  if (!track || !prevBtn || !nextBtn || slides.length === 0) return;

  let index = 0;

  const getSlideWidth = () => slides[0].getBoundingClientRect().width;

  const getGap = () => parseFloat(getComputedStyle(track).gap) || 0;

  const getStep = () => getSlideWidth() + getGap();

  const getVisibleCount = () => {
    const viewport = album.querySelector('.album-viewport');
    return Math.max(1, Math.floor((viewport.offsetWidth + getGap()) / getStep()));
  };

  const getMaxIndex = () => Math.max(0, slides.length - getVisibleCount());

  const updateAlbum = () => {
    index = Math.min(index, getMaxIndex());
    track.style.transform = `translateX(-${index * getStep()}px)`;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index >= getMaxIndex();
  };

  prevBtn.addEventListener('click', () => {
    index = Math.max(0, index - 1);
    updateAlbum();
  });

  nextBtn.addEventListener('click', () => {
    index = Math.min(getMaxIndex(), index + 1);
    updateAlbum();
  });

  window.addEventListener('resize', updateAlbum);
  updateAlbum();
});

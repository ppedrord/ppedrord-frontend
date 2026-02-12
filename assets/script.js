// Initialize GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// Scrool smooter
ScrollSmoother.create({
  smooth: 1.5,
  effects: true,
});

// Animate page function
function animatePage() {
  gsap.from(".hero", {
    duration: 1,
    opacity: 0,
  });

  gsap.from(".hero-photo-container", {
    duration: 1.5,
    opacity: 0,
    x: 100,
  });

  gsap.to(".pb-logo path", {
    duration: 2.5,
    strokeDashoffset: 0,
    repeat: -1,
    yoyo: true,
  });

  // Split text
  const splitTextGroup = document.querySelectorAll(".splitText");

  // Animate each elementyoutube
  splitTextGroup.forEach((element) => {
    const splitText = SplitText.create(element, {
      type: "lines, words, chars",
      mask: "words",
    });

    gsap.from(splitText.chars, {
      y: 20,
      opacity: 0,
      duration: 0.3,
      stagger: 0.03,
      scrollTrigger: {
        trigger: element,
      },
    });
  });

  gsap.from(".social-container > div", {
    opacity: 0,
    y: 40,
    duration: 0.45,
    ease: "power2.out",
    stagger: 0.12, // <-- faz surgir um por vez
    delay: 0.2, // opcional: espera um pouquinho antes de começar
  });
}

// Initialize preloader and timeline
const tl = gsap.timeline({
  onComplete() {
    animatePage();
    gsap.to("#preloader", {
      opacity: 0,
      display: "none",
    });
  },
});

tl.to("#preloader path", {
  duration: 1.5,
  strokeDashoffset: 0,
});
tl.to("#preloader path", {
  fill: "rgb(0, 0, 0)",
  duration: 0.5,
  strokeDashoffset: 0,
});

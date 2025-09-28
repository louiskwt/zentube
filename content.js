// inject css to block videos & ads
const style = document.createElement("style");
if (style) {
  style.innerHTML = `
  #primary, #items, ytd-rich-grid-renderer, ytd-guide-section-renderer {
    display: none !important
  }
`;
}

document.head.appendChild(style);

function hideYouTubeVideos() {
  const primaryContent = document.getElementById("primary");
  if (primaryContent) primaryContent.style.display = "None";
  const items = document.getElementById("items");
  if (items) items.style.display = "None";
}

// throttle
function throttle(fn, wait) {
  let time = Date.now();
  return () => {
    if (time + wait - Date.now() < 0) {
      fn();
      time = Date.now();
    }
  };
}

const throttleHide = throttle(hideYouTubeVideos, 10);

const observer = new MutationObserver((mutations) => {
  mutations.forEach(() => {
    throttleHide();
  });
});

const targetNode = document.querySelector("ytd-app");

if (targetNode) {
  observer.observe(targetNode, {
    childList: true,
    subtree: true,
  });
}

hideYouTubeVideos();

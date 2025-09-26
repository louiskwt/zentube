function hideYouTubeVideos() {
  const primaryContent = document.getElementById("primary");
  primaryContent.style.display = "None";
  const items = document.getElementById("items");
  items.style.display = "None";
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach(() => {
    hideYouTubeVideos();
  });
});

const targetNode = document.querySelector("ytd-app");

if (targetNode) {
  observer.observe(targetNode, {
    childList: true,
    subtree: true,
  });
}

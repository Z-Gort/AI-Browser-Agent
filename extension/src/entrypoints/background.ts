export default defineBackground(() => {
  console.log("Hello background!");

  // Set the sidepanel to open when clicking the extension icon
  browser.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

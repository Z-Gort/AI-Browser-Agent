export default defineBackground(() => {
  console.log("Hello background!", { id: browser.runtime.id });

  // // Set the sidepanel to open when clicking the extension icon
  browser.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});
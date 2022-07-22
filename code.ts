// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

figma.ui.postMessage({ type: 'networkRequest' });

figma.ui.onmessage = async (msg) => {
  const text = figma.createText()
  // Make sure the new text node is visible where we're currently looking
  text.x = figma.viewport.center.x
  text.y = figma.viewport.center.y

  await figma.loadFontAsync(text.fontName as FontName)
  text.characters = msg

  figma.closePlugin()
}

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
/*
figma.ui.onmessage = async (msg) => {

    let api_key = 'figd_yLeSkacWJ_PEvHJvk9Dp0V20a688L81ia9cWPP3X';
    let format = 'jpg';
    let scale = 4;

    // TODO variable parts
    let file_key = '4PBBD2a0bHiYUr6BkjmWIw';
    let node_id;

    for (const node of figma.currentPage.selection) {
      node_id = node.id
      console.log(node_id);

      const url=`https://api.figma.com/v1/images/${file_key}?ids=${node_id}&scale=4&format=jpg`;
      const headerDict = {
        'X-FIGMA-TOKEN': 'figd_yLeSkacWJ_PEvHJvk9Dp0V20a688L81ia9cWPP3X'
      }
      
      console.log(
        this.http.get(url, {                                                                                                                                                                                 
          headers: headerDict, 
        })
      );

    }



    figma.closePlugin();
  
};
*/
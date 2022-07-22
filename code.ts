// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {

    let api_key = 'figd_yLeSkacWJ_PEvHJvk9Dp0V20a688L81ia9cWPP3X';
    let format = 'jpg';
    let scale = 4;

    // TODO variable parts
    let file_key = '4PBBD2a0bHiYUr6BkjmWIw';
    let node_id;

    for (const node of figma.currentPage.selection) {
      node_id = node.id
      console.log(node_id);

      let request = `https://api.figma.com/v1/images/${file_key}?ids=${node_id}&scale=4&format=jpg`;
    }
    figma.closePlugin();
    return;


    (async () => {
      const polygon = figma.createPolygon()
      polygon.pointCount = 6
      polygon.fills = [{ type: 'SOLID', color: { r: 1, g: 0, b: 0 } }]
    
      // Export a 2x resolution PNG of the node
      const bytes = await polygon.exportAsync({
        format: 'PNG',
        constraint: { type: 'SCALE', value: 2 },
      })
    
      // Add the image onto the canvas as an image fill in a frame
      const image = figma.createImage(bytes)
      const frame = figma.createFrame()
      frame.x = 200
      frame.resize(200, 230)
      frame.fills = [{
        imageHash: image.hash,
        scaleMode: "FILL",
        scalingFactor: 1,
        type: "IMAGE",
      }]
    })()



  

  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'create-rectangles') {
    for (const node of figma.currentPage.selection) {
      if ("opacity" in node) {
        node.opacity *= 0.5
      }
      console.log(node.id);
    }



    const nodes: SceneNode[] = [];
    for (let i = 0; i < msg.count; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 200;
      rect.y = i * 100;
      rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 1}}];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.

  Promise.allSettled([promise]).then(([result]) => {
    //reach here regardless
    // {status: "fulfilled", value: 33}

    figma.closePlugin();
 });
  
};

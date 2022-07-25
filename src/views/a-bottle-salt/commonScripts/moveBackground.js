/**
 * 背景图动起来逻辑开始
 */

  let boxes = [];

  let mousePos = {
    x: -10,
    y: -10
  };

  function mousemove(e) {
    // update mouse position
    mousePos.x = e.pageX;
    mousePos.y = e.pageY;
    if(document.getElementsByClassName("image-wrap").length > 0) {
      document.getElementsByClassName("image-wrap")[0].style.transform = 'scale(0.94)';
    }
  }

  function mouseout(e) {
    // update mouse position
    if(document.getElementsByClassName("image-wrap").length > 0) {
      document.getElementsByClassName("image-wrap")[0].style.transform = 'scale(0.8)';
    }
    mousePos.x = 0;
    mousePos.y = 0;
  }

  function updateBox(box) {
    // check if mouse is in box area
    if (mousePos.x > box.left && mousePos.x < (box.left + box.size) && mousePos.y > box.top && mousePos.y < (box.top + box.size)) {
      // the mouse is in the space over the box - update the box image target
      // position dependent on how far the mouse position is from the center
      // of the box (box size/2)
      box.targetX = (box.size / 2 - (mousePos.x - box.left)) * 0.05;
      box.targetY = (box.size / 2 - (mousePos.y - box.top)) * 0.05;
    } else {
      // otherwise the box isn't being hovered, its target is 0
      box.targetX = 0;
      box.targetY = 0;
    }

    // update the image element position by lerping position to target
    // http://codepen.io/rachsmith/post/animation-tip-lerp
    box.x += (box.targetX - box.x) * 0.1;
    box.y += (box.targetY - box.y) * 0.1;
    // update css of image element
    box.el.children[0].children[0].style.transform = 'translate3d(' + box.x + 'px, ' + box.y + 'px, 0)';
  }

  function loop() {
    // in the loop - updated each of the boxes
    for (let i = 0, l = boxes.length; i < l; i++) {
      updateBox(boxes[i]);
    }
    window.requestAnimationFrame(loop);
  }

  function resize() {
    // the box positions/sizes have updated on resize, so they need to be
    // reset
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].left = boxes[i].el.offsetLeft;
      boxes[i].top = boxes[i].el.offsetTop;
      boxes[i].size = boxes[i].el.offsetWidth;
    }
  }

// attach the mouse event listener to the document
  document.addEventListener('mousemove', mousemove);
  document.addEventListener('mouseout', mouseout);
// listen for resize event, so box sizes can be updated
  window.addEventListener('resize', resize);
// run the animation loop
  loop();

/**
 * 背景图动起来逻辑结束
 */
export default boxes


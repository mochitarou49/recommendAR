import { loadGLTF, loadVideo } from './libs/loader.js';


const THREE = window.MINDAR.IMAGE.THREE;

/**
 * HTMLがロードされた時に実行される
 */
document.addEventListener('DOMContentLoaded', async () => {
  let mindarThree = null;
  
  // let font = null;
  // const fontLoader = new THREE.FontLoader();
  // fontLoader.load('../assets/fonts/helvetiker_regular.typeface.json', (_font) => {
  //   font = _font;
  // });

  const makeVideoPlane1 = async (videoPath) => {
    const video = await loadVideo(videoPath);
    const texture = new THREE.VideoTexture(video);
    const geometry = new THREE.PlaneGeometry(1, 3 / 4);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const plane = new THREE.Mesh(geometry, material);
    video.addEventListener('play', () => {
      video.currentTime = 0;
    });
    return {
      plane: plane,
      video: video,
    };
  }


  const makeTextMesh = (text) => {
    const textMesh = new THREE.Mesh(
      new THREE.TextGeometry(text, {
        font: font, // フォントを指定 (FontLoaderで読み込んだjson形式のフォント)
        size: 0.1,   // 文字のサイズを指定
        height: 0.01,  // 文字の厚さを指定
      }),
      new THREE.MeshBasicMaterial({
        color: `#ccc`, // 文字の色
      })
    );
    return textMesh;
  };

  const setupMoviePlane1 = async (anchorIndex, url) => {
    const anchor = mindarThree.addAnchor(anchorIndex);
    anchor.onTargetFound = async () => {
      const videoSet = await makeVideoPlane1(url);
      anchor.onTargetLost = () => {
        videoSet.video.pause();
      }
      anchor.group.add(videoSet.plane);
      videoSet.video.play();
    }
  };

  const load0 = async () => {

    const videoSet0 = await makeVideoPlane1('assets/videos/terrace.mp4');
    const anchor0 = mindarThree.addAnchor(0);
    const videoSet1 = await makeVideoPlane1('assets/videos/veranda.mp4');
    const anchor1 = mindarThree.addAnchor(1);
    const videoSet2 = await makeVideoPlane1('assets/videos/27-19.mp4');
    const anchor2 = mindarThree.addAnchor(2);
    const videoSet3 = await makeVideoPlane1('assets/videos/33-2.mp4');
    const anchor3 = mindarThree.addAnchor(3);
    const videoSet4 = await makeVideoPlane1('assets/videos/connect.mp4');
    const anchor4 = mindarThree.addAnchor(4);
    anchor0.group.add(videoSet0.plane);
    anchor0.onTargetFound = () => {
      videoSet0.video.play();
    }
    anchor0.onTargetLost = () => {
      videoSet0.video.pause();
    }
    anchor1.group.add(videoSet1.plane);
    anchor1.onTargetFound = () => {
      videoSet1.video.play();
    }
    anchor1.onTargetLost = () => {
      videoSet1.video.pause();
    }
    anchor2.group.add(videoSet2.plane);
    anchor2.onTargetFound = () => {
      videoSet2.video.play();
    }
    anchor2.onTargetLost = () => {
      videoSet2.video.pause();
    }
    anchor3.group.add(videoSet3.plane);
    anchor3.onTargetFound = () => {
      videoSet3.video.play();
    }
    anchor3.onTargetLost = () => {
      videoSet3.video.pause();
    }
    anchor4.group.add(videoSet4.plane);
    anchor4.onTargetFound = () => {
      videoSet4.video.play();
    }
    anchor4.onTargetLost = () => {
      videoSet4.video.pause();
    }
    // const textMesh = makeTextMesh('Disney');
    // anchor.group.add(textMesh);

  };

  const load1 = async () => {

    const videoSet = await makeVideoPlane1('assets/videos/veranda.mp4');
    const anchor = mindarThree.addAnchor(1);
    anchor.group.add(videoSet.plane);
    anchor.onTargetFound = () => {
      videoSet.video.play();
    }
    anchor.onTargetLost = () => {
      videoSet.video.pause();
    }
    // const textMesh = makeTextMesh('Disney');
    // anchor.group.add(textMesh);

  };

  const load2 = async () => {

    const videoSet = await makeVideoPlane1('assets/videos/27-19.mp4');
    const anchor = mindarThree.addAnchor(2);
    anchor.group.add(videoSet.plane);
    anchor.onTargetFound = () => {
      videoSet.video.play();
    }
    anchor.onTargetLost = () => {
      videoSet.video.pause();
    }
    // const textMesh = makeTextMesh('Disney');
    // anchor.group.add(textMesh);

  };

  const load3 = async () => {

    const videoSet = await makeVideoPlane1('assets/videos/33-2.mp4');
    const anchor = mindarThree.addAnchor(3);
    anchor.group.add(videoSet.plane);
    anchor.onTargetFound = () => {
      videoSet.video.play();
    }
    anchor.onTargetLost = () => {
      videoSet.video.pause();
    }
    // const textMesh = makeTextMesh('Disney');
    // anchor.group.add(textMesh);

  };

  const load4 = async () => {

    const videoSet = await makeVideoPlane1('assets/videos/connect.mp4');
    const anchor = mindarThree.addAnchor(4);
    anchor.group.add(videoSet.plane);
    anchor.onTargetFound = () => {
      videoSet.video.play();
    }
    anchor.onTargetLost = () => {
      videoSet.video.pause();
    }
    // const textMesh = makeTextMesh('Disney');
    // anchor.group.add(textMesh);

  };


  const Start = async () => {

    mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets/targets.mind',
    });
    const { renderer, scene, camera } = mindarThree;
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });

    // loadtest;

    // setupMoviePlane1(0, 'assets/videos/test.mp4');
    // setupMoviePlane1(1, 'assets/videos/veranda.mp4');
    // setupMoviePlane1(2, 'assets/videos/27-19.mp4');
    // setupMoviePlane1(3, 'assets/videos/33-2.mp4');
    // setupMoviePlane1(4, 'assets/videos/connect.mp4');

  }

  const startButton = document.getElementById('start-button');
  startButton.addEventListener('click', Start);
  const start0Button = document.getElementById('start-0-button');
  start0Button.addEventListener('click', load0, load1);
  const start1Button = document.getElementById('start-1-button');
  start1Button.addEventListener('click', load1);
  const start2Button = document.getElementById('start-2-button');
  start2Button.addEventListener('click', load2);
  const start3Button = document.getElementById('start-3-button');
  start3Button.addEventListener('click', load3);
  const start4Button = document.getElementById('start-4-button');
  start4Button.addEventListener('click', load4);
});

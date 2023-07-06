import { loadGLTF, loadVideo } from './libs/loader.js';


const THREE = window.MINDAR.IMAGE.THREE;

/**
 * HTMLがロードされた時に実行される
 */
document.addEventListener('DOMContentLoaded', async () => {
  let mindarThree = null;
  
  let font = null;
  const fontLoader = new THREE.FontLoader();
  fontLoader.load('../assets/fonts/helvetiker_regular.typeface.json', (_font) => {
    font = _font;
  });

  const makeVideoPlane1 = async (videoPath) => {
    const video = await loadVideo(videoPath);
    const texture = new THREE.VideoTexture(video);
    const geometry = new THREE.PlaneGeometry(1, 9 / 16);
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

  const makeVideoPlane2 = async (videoPath) => {
    const video = await loadVideo(videoPath);
    const texture = new THREE.VideoTexture(video);
    const geometry = new THREE.PlaneGeometry(1, 16 / 9);
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

  

  const makeImagePlane = async (imagePath) => {
    const image = await loadimage(imagePath);
    const texture = new THREE.Texture(image);
    const geometry = new THREE.PlaneGeometry(1, 450 / 600);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const plane = new THREE.Mesh(geometry, material);
    return {
      plane: plane,
      image: image,
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

  const setupMoviePlane2 = async (anchorIndex, url) => {
    const anchor = mindarThree.addAnchor(anchorIndex);
    anchor.onTargetFound = async () => {
      const videoSet = await makeVideoPlane2(url);
      anchor.onTargetLost = () => {
        videoSet.video.pause();
      }
      anchor.group.add(videoSet.plane);
      videoSet.video.play();
    }
  };


  const setupImagePlane = async (anchorIndex, url) => {
    const anchor = mindarThree.addAnchor(anchorIndex);
    anchor.onTargetFound = async () => {
      const imageSet = await makeImagePlane(url);
      anchor.group.add(imageSet.plane);
    }
  };

  const Start = async () => {

    mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets/targets.mind',
    });
    const { renderer, scene, camera } = mindarThree;

    setupMoviePlane1(0, 'assets/videos/sumple.mp4');
    setupMoviePlane2(1, 'assets/videos/openLab.mp4');
    setupMoviePlane2(2, 'assets/videos/hatake.mp4');
    setupMoviePlane2(3, 'assets/videos/terus.mp4');
    setupMoviePlane2(4, 'assets/videos/hunsui.mp4');

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }

  const startButton = document.getElementById('start-button');
  startButton.addEventListener('click', Start);
});

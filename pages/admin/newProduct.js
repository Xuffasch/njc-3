import Head from 'next/head';
import Link from 'next/link';
import s from '../../styles/NewProduct.module.css';

import { useState, useEffect, useCallback } from 'react'; 

import { v4 as uuidv4 } from 'uuid';

const useMemory = () => {
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(375);
  const [streaming, setStreaming] = useState(false);
  const [images, setImages] = useState([]);
  const [name, setName] = useState("Nom Produit");
  const [facingMode, setFacingMode] = useState('environment');

  return { width, setWidth, height, setHeight, streaming, setStreaming, images, setImages, name, setName, facingMode, setFacingMode }
}

export default function NewProduct() {
  const { width, setWidth, height, setHeight, streaming, setStreaming, images, setImages, name, setName, facingMode, setFacingMode } = useMemory();

  function startup() {
    let video = document.getElementById('video');
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');

    if (navigator) {
      console.log("Can get the navigator");
    }

    if (navigator.mediaDevices) {
      console.log('Can list navigator media devices');
    }

    navigator.mediaDevices.enumerateDevices()
    .then( devices => {
      devices.forEach(d => console.log("device : ", d));
    })

    console.log('userAgent : ', navigator.userAgent);

    let isMobileDevice = !!(/Android|webOS|iPhone|iPad|iPod|BB10|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(window.navigator.userAgent || ''));

    console.log('Mobile device ? ', isMobileDevice);

    let streamConstraints = {
      video: {
        facingMode: isMobileDevice ? 'environment' : 'user',
      }
    }

    navigator.mediaDevices.getUserMedia(streamConstraints)
    .then( stream => {
      video.srcObject = stream;
    })
    .catch( err => {
      console.log("An error occured while getting media : ", err);
    })

    video.addEventListener('canplay', e => {
      if (!streaming) {
        setStreaming(true);
      }
    }, false)


    

  }

  function clearphoto() {
    setImages([]);
  }

  const changeFacing = useCallback( (e) => {
    console.log('changeFacing is called');
    let isMobileDevice = !!(/Android|webOS|iPhone|iPad|iPod|BB10|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(window.navigator.userAgent || ''));
    console.log('current Facing mode : ', facingMode);
    let newFacingMode = facingMode == 'environment' ? 'user' : 'environment'
    console.log('new Facing mode : ', newFacingMode);

    if (isMobileDevice) {
      let streamConstraints = {
        video: {
          facingMode: newFacingMode,
        }
      }

      window.navigator.getUserMedia(streamConstraints)
      .then( function(stream) {
        console.log('new stream is received ');
        e.target.srcObject = stream;
      });

      setFacingMode(facingMode == 'environment' ? 'user' : 'environment');
    }

  }, [facingMode])

  const takeCapture = useCallback( () => {
    console.log("current name : ", name);
    let video = document.getElementById('video');
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      var data = canvas.toDataURL('image/png');
      setImages(prev => [...prev, {id: uuidv4(), data: data, selected: false, name: name }]);
    }

  } , [name])

  function takephoto() {
    console.log("current name : ", name);
    let video = document.getElementById('video');
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      var data = canvas.toDataURL('image/png');
      setImages(prev => [...prev, {id: uuidv4(), data: data, selected: false, name: name }]);
    } else {
      clearphoto();
    }
  }

  const selectImages = (e) => {
    console.log('event target : ', e.target);
    let sIndex = images.findIndex(i => i.id == e.target.id)
    let selectedImage = { ...images[sIndex], selected: !images[sIndex].selected };
    let newSelected = [...images.slice(0, sIndex), selectedImage, ...images.slice(sIndex+1)];
    console.log("new list : ", newSelected);
    setImages(newSelected);
  }
  
  const deleteImage = (e) => {
    e.stopPropagation();
    console.log("Will delete : ", e.target);
  }

  const changeName = (e) => {
    console.log("New name from target: ", e.target.value);
    setName(e.target.value);
    console.log('New name in state: ', name );
  }

  const confirmPictures = (e) => {
    e.stopPropagation();
    console.log("Confirm images with name : ", name);
  }

  useEffect(() => {
    window.onload = startup();
  }, []);

  return (
    <>
      <Head>
        <meta name='robots' content='noindex, nofollow' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1 className={s.title}>Create a new product</h1>
        <input className={s.newTitle} value={name} placeholder='Nouveau produit' onChange={changeName} />
        <Link href='/'>
          <a className={s.back}>&#60; NJC</a>
        </Link>
        <div className='flex flex-col items-center'>
          <div className='camera'>
            <video id='video' onClick={changeFacing}>Video stream not available</video>

          </div>
          <canvas id='canvas' className={s.canvas}>
          </canvas>
          <button className={`block ${s.startbutton}`} id='startbutton' onClick={takeCapture} >Take photo</button>
          <span>
            <button className={s.savebutton} onClickCapture={confirmPictures}>
              Save Selected Pictures
            </button>
            <button className={s.clearbutton} onClickCapture={clearphoto}>
              Clear Photos
            </button>
          </span>

          <div id='captured'>
            <ul className="w-full grid grid-cols-2 gap-2">
              {images.map(i => {
                return (
                  <li className={'block relative p-2 ' + (i.selected ? 'bg-green-400' : '')} key={i.id} id={i.id} onClick={selectImages} >
                    <img src={i.data} alt={i.name} className='w-full z-0' id={i.id} />
                    <button className='absolute top-0 left-0 p-2 bg-red-400 text-white z-1' onClickCapture={deleteImage}>Delete</button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </main>
    </>
  )
}

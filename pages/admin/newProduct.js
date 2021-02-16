import Head from 'next/head';
import Link from 'next/link';
import s from '../../styles/NewProduct.module.css';

import { useState, useEffect } from 'react'; 

import { v4 as uuidv4 } from 'uuid';

export default function NewProduct() {
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(375);
  const [streaming, setStreaming] = useState(false);
  const [images, setImages] = useState([]);
  const [name, setName] = useState("Nom Produit");

  function startup() {
    let video = document.getElementById('video');
    let startbutton = document.getElementById('startbutton');

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    })
    .then( stream => {
      video.srcObject = stream;
      video.play();
    })
    .catch( err => {
      console.log("An error occured while getting media : ", err);
    })

    video.addEventListener('canplay', e => {
      if (!streaming) {
        setStreaming(true);
      }
    }, false)

    startbutton.addEventListener('click', ev => {
      ev.preventDefault();
      takephoto();
    }, false);

    clearphoto();
  }

  function clearphoto() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    context.fillStyle = '#AAA';
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    // let photo = document.getElementById('photo');
    // photo.setAttribute('src', data);
  }

  function takephoto() {
    let video = document.getElementById('video');
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      var data = canvas.toDataURL('image/png');
      setImages(prev => [...prev, {id: uuidv4(), data: data, selected: false, name: name }]);
      console.log('images : ', images);

      // let photo = document.getElementById('photo');
      // photo.setAttribute('src', data);
    } else {
      clearphoto();
    }
  }

  const selectImages = (e) => {
    console.log('event target : ', e.target);
    let sIndex = images.findIndex(i => i.id == e.target.id)
    console.log('sIndex image : ', images[sIndex]);
    let selectedImage = { ...images[sIndex], selected: !images[sIndex].selected };
    console.log('selected : ', selectedImage);
    let newSelected = [...images.slice(0, sIndex), selectedImage, ...images.slice(sIndex+1)];
    console.log("new list : ", newSelected);
    setImages(newSelected);
  } 

  useEffect(() => {
    window.addEventListener('load', startup);
  }, []);

  return (
    <>
      <Head>
        <meta name='robots' content='noindex, nofollow' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1 className={s.title}>Create a new product</h1>
        <input className='block w-full p-2 m-2 bg-yellow-400 border-blue-800' value={name} placeholder='Nouveau produit' onChange={(event) => setName(event.target.value)} />
        <Link href='/'>
          <a className={s.back}>&#60; NJC</a>
        </Link>
        <div>
          
          <div className='camera'>
            <video id='video'>Video stream not available</video>
            <button className={s.startbutton} id='startbutton' >Take photo</button>
          </div>
          <canvas id='canvas' className={s.canvas}>
          </canvas>
          {/* <div className='output'>
            <img id='photo' alt="The screen capture will appear here" />
          </div> */}
          <div id='captured'>
            <ul className="w-full flex flex-wrap">
              {images.map(i => {
                return (
                  <li className={'w-1/2 ' + (i.selected ? 'bg-yellow-500' : '')} key={i.id} id={i.id} onClick={selectImages} >
                    <img src={i.data} alt={i.name} className='border-red-400' id={i.id}/>
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

import React, { useState, useEffect } from "react";

import IconButton from "@mui/material/IconButton";

import CameraRoundedIcon from "@mui/icons-material/CameraRounded";

import { storage } from "../config/firebase_config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import moment from "moment";

import Container from "@mui/material/Container";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

function SetCamera({ user, item, setItem }) {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);

  /* console.log("user & item in SetCamera", user, item); */

  const onTakePhotoHandler = async (photoUri) => {
    //metto la foto in array locale per visulizzarle
    if (!item.item_ref) {
      return alert("scegli prima un cienam");
    }

    /* console.log(photoUri); */
    if (images.length > 2) {
      return alert("al massimo puoi memorizzare 3 photo");
    }
    const snapTime = moment().format("MMMM Do YYYY h:mm:ss a");
    const name = `${item.cinema}/${item.item_ref}/${item.item_ref}-${snapTime}.jpg`;

    const alberdan = await fetch(photoUri)
      .then(function (response) {
        return response.blob();
      })
      .then(function (blob) {
        return blob;
        // here the image is a blob
      });

    upLoadSingle(name, alberdan);
    const newObj = {
      name,
      blob: alberdan,
      photo: photoUri
    };

    const newImages = [...images];
    newImages.push(newObj);
    setImages(newImages);
  };

  const upLoadSingle = async (name, blob) => {
    const imageRef = ref(storage, name);
    const metadata = {
      contentType: "image/jpeg",

      customMetadata: {
        name: `${name}`,
        author: `${user.name}`
      }
    };

    const uploadTask = uploadBytesResumable(imageRef, blob, metadata);
    await uploadTask.on(
      "state_changed",
      (snapshot) => {
        /* console.log("snapshot", snapshot); */
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
          default:
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          /* urlArray.push(downloadURL); */
          console.log(downloadURL);

          if (item.photos) {
            let newArray = [...item.photos, { url: downloadURL, name: name }];

            setItem({ ...item, photos: newArray });
          } else {
            setItem({ ...item, photos: [{ url: downloadURL, name: name }] });
          }
        });
      }
    );
  };

  function handleCameraStop() {
    console.log("handleCameraStop");
  }

  const ViewCamera = () => {
    if (open) {
      return (
        <Container
          sx={{
            p: 4,
            m: 2,
            display: "flex",
            height: "400",
            width: "640",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <Camera
            imageCompression={0.4}
            isMaxResolution={true}
            isImageMirror={false}
            isSilentMode={false}
            isDisplayStartCameraError={true}
            isFullscreen={false}
            sizeFactor={0.2}
            onTakePhoto={onTakePhotoHandler}
            onCameraStop={() => {
              handleCameraStop();
            }}
            idealFacingMode="environment"
            idealResolution={{ width: 640, height: 400 }}
          />
        </Container>
      );
    } else {
      return null;
    }
  };

  const openCamera = () => {
    setOpen(false);
    /* console.log(item.photos); */
    if (item.photos > 0) {
      setImages(item.photos);
    }
  };

  useEffect(() => {
    setImages([]);

    openCamera();

    return () => {
      setOpen(false);
    };
  }, [item.item_ref]);

  return (
    <Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <IconButton
          color="primary"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
          onClick={() => {
            setOpen(!open);
          }}
          aria-label="openCamera"
          size="large"
        >
          {!open ? <p>open camera </p> : <p>close camera </p>}
          <CameraRoundedIcon />
        </IconButton>
      </Container>

      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <ViewCamera />
      </Container>
    </Container>
  );
}

export default SetCamera;

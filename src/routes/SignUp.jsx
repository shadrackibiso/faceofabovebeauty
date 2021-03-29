import React, { useState } from "react";
import "../css/signUp.css";
import "../css/home.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import avatar from "../images/avatar.png";
import { MdAddAPhoto, MdCheckCircle } from "react-icons/md";
import ReactLoading from "react-loading";
// import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase/app";
import fb from "../config/config.jsx";

function SignUp() {
  const [creatingProfile, setCreatingProfile] = useState(false);
  const [profileCreated, setProfileCreated] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState({
    createdAt: new Date(),
    votes: 0,
  });

  const handleChange = (e) => {
    let detail = { [e.target.name]: e.target.value };
    setUser((prevState) => ({ ...prevState, ...detail }));
  };

  const signUp = (e) => {
    e.preventDefault();
    setCreatingProfile(true);
    fb.auth()
      .createUserWithEmailAndPassword(user.email, "123456789")
      .then((data) => {
        const profile = {
          id: data.user.uid,
          ...user,
        };

        firebase
          .firestore()
          .collection("users")
          .doc(`${profile.name}-${data.user.uid}`)
          .set(profile)
          .then(setProfileCreated(true))
          .catch((error) => {
            console.log(error)
            setErrorMessage(error.message)
          });
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message)
      });
  };

  const handleProfileImageChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const imageName = `img_${uuidv4()}`;

      const uploadTask = firebase
        .storage()
        .ref(`images/${imageName}.jpg`)
        .put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadingImage(true);
          setImageUploadProgress(progress);
        },
        (error) => {
          console.log(error);
          setErrorMessage(error.message)
        },
        () => {
          // resize image to smaller size
          // function resizeAgain() {
          //   getResizedImage();
          // }

          // function getResizedImage() {
            firebase
              .storage()
              .ref(`images/${imageName}.jpg`)
              // .ref(`images/${imageName}_1080x1080.jpg`)
              .getDownloadURL()
              .then((url) => {
                setUploadingImage(false);
                setImageUrl(url);
                setUser((prevState) => ({ ...prevState, profilePic: url }));

                // Delete original uploaded images
                // firebase
                //   .storage()
                //   .ref(`images/${imageName}.jpg`)
                //   .delete()
                //   .catch((error) => {
                //     console.log(error);
                //   });
              })
              .catch((error) => {
                // error.code === "storage/object-not-found" && resizeAgain();
                console.log(error);
                setErrorMessage(error.message)
              });
          // }

          // getResizedImage();
        }
      );
    }
  };

  const ImageLoader = () => (
    <div className="imageLoader" style={{ display: !uploadingImage && "none" }}>
      <div className="reactLoaderContainer">
        <ReactLoading type="spokes" color="#fbb03b" height={50} width={50} />
      </div>
      <div>uploading ({imageUploadProgress})</div>
    </div>
  );

  const SuccessModal = () => (
    <div
      className="successModal"
      style={{ display: !creatingProfile && "none" }}
    >
      <div className="modalBlind"></div>
      <div className="modalContainer">
        <div className="successModalImage">
          {/* creating profile spinner */}
          <div
            className="reactLoaderContainer"
            style={{ display: (profileCreated || errorMessage) && "none" }}
          >
            <ReactLoading type="spokes" color="black" height={50} width={50} />
          </div>
          {/* profile created icon */}
          <span style={{ display: !profileCreated && "none" }}>
            <MdCheckCircle />
          </span>
        </div>
        <div className="successModalMessage">
          <span style={{ display: (profileCreated || errorMessage) && "none" }}>
            Creating your profile, please hold on...
          </span>
          {/* ERROR MESSAGE */}
          <span style={{ display: !errorMessage && "none" }}>
            {errorMessage}
          </span>
          <button className="secondaryBtn mt-3" style={{display: !errorMessage && 'none'}} onClick={() => {setErrorMessage(null); setCreatingProfile(false)}}>Close</button>
          {/* REGISTRATION SUCCESS */}
          <span style={{ display: !profileCreated && "none" }}>
            Your profile has been created successfully. Please clink the button below to complete registration.
          </span>
        </div>
        <a href="https://wa.link/hg48x2" style={{ display: !profileCreated && "none" }}>
          <button className="secondaryBtn">Complete Registration</button>
        </a>
      </div>
    </div>
  );

  return (
    <>
      <div className="signUp">
        <Navbar />
        <div className="section signUpSection">
          {/* <!-- label --> */}
          <div className="label">Create Profile</div>
          <div className="labelLine"></div>
          {/* Form */}
          <form className="signUpForm" onSubmit={signUp}>
            {/* profile image input */}
            <input
              type="file"
              name="imageInput"
              id="profileImageInput"
              accept="image/*"
              onChange={handleProfileImageChange}
              style={{ display: "none" }}
              required
            />
            {/* image box */}
            <div className="imageInputBox">
              <img src={imageUrl ? imageUrl : avatar} alt="profilePic" />
              {/* image add button */}
              <label htmlFor="profileImageInput">
                <div className="imageAddBtn" title="add profile picture">
                  <MdAddAPhoto />
                </div>
              </label>
              {/* uploading image loader */}
              <ImageLoader />
            </div>
            <div className="signUpFormDetails">
              <div className="inputLabel">full name</div>
              <input
                type="text"
                name="name"
                className="inputBox"
                onChange={handleChange}
                required
              />
              {/*  */}
              <div className="inputLabel">age</div>
              <input
                type="number"
                name="age"
                className="inputBox"
                onChange={handleChange}
                required
              />
              {/*  */}
              <div className="inputLabel">state of origin</div>
              <input
                type="text"
                name="state"
                className="inputBox"
                onChange={handleChange}
                required
              />
              {/*  */}
              <div className="inputLabel">state of residence</div>
              <input
                type="text"
                name="stateOfResidence"
                className="inputBox"
                onChange={handleChange}
                required
              />
              {/*  */}
              <div className="inputLabel">phone number</div>
              <input
                type="text"
                name="phoneNumber"
                className="inputBox"
                onChange={handleChange}
                required
              />
              {/*  */}
              <div className="inputLabel">email</div>
              <input
                type="email"
                name="email"
                className="inputBox"
                onChange={handleChange}
                required
              />
            </div>
            {/*  */}
            <div className="signUpInfoText">
              please note: the image you added above would be used for the
              competition and can't be change after you've created your profile.
              Also ensure that your email is valid so that you can receive our
              mails. ALl your details are fully secured and protected. Thank
              you.
            </div>
            {/*  */}
            <button className="mainBtn">Create Profile</button>
          </form>
        </div>
      </div>
      <SuccessModal />
      <Footer />
    </>
  );
}

export default SignUp;

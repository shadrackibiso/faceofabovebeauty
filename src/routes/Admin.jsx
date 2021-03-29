import React, { useEffect, useState } from "react";
import "../css/contestants.css";
import avatar from "../images/avatar.png";
import firebase from "firebase/app";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import ReactLoading from "react-loading";
import moment from "moment";

function Admin() {
  const [contestants, setContestants] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  // const [contestants, setContestants] = useState([
  //   {
  //     id: "1",
  //     name: "cassandra shadrack",
  //     age: "19",
  //     gender: "male",
  //     university: "UNIPORT",
  //     state: "rivers state",
  //     votes: 2500,
  //     createdAt: moment(),
  //   },
  //   {
  //     id: "2",
  //     name: "Diana prince",
  //     age: "19",
  //     gender: "male",
  //     university: "UNIPORT",
  //     state: "rivers state",
  //     votes: 190,
  //     createdAt: moment(),
  //   },
  //   {
  //     id: "3",
  //     name: "angel hart",
  //     age: "19",
  //     gender: "male",
  //     university: "UNIPORT",
  //     state: "rivers state",
  //     votes: 87,
  //     createdAt: moment(),
  //   },
  //   {
  //     id: "4",
  //     name: "Serena Williams",
  //     age: "19",
  //     gender: "male",
  //     university: "UNILAG",
  //     state: "rivers state",
  //     votes: 102,
  //     createdAt: moment(),
  //   },
  // ]);

  // fetch data
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((data) => {
        let users = [];
        data.forEach((doc) => {
          users.push(doc.data());
        });
        setContestants(users);
      })
      .catch((error) => console.log(error));
  }, []);

  const Loader = () => (
    <div
      className="dataLoader mt-3 flex-column justify-content-center align-items-center"
      style={{ display: contestants ? "none" : "flex", width: "100%" }}
    >
      <div className="reactLoaderContainer">
        <ReactLoading type="spokes" color="#fbf03b" height={30} width={30} />
      </div>
    </div>
  );

  const ContestantCard = (props) => {
    const [displayVotesForm, setDisplayVotesForm] = useState(false);
    const [votes, setVotes] = useState(props.votes);

    const handleContestantEdit = (e) => {
      e.preventDefault();
      setContestants(
        contestants.map((cts) => {
          if (cts.id === props.id) {
            firebase
              .firestore()
              .collection("users")
              .doc(`${cts.name}-${cts.id}`)
              .update({
                votes,
              })
              .catch((error) => console.log(error));
            return { ...cts, votes };
          }
          return cts;
        })
      );
    };

    return (
      <div className="ctsCard">
        {/* image */}
        <div className="ctsCardImage">
          <img
            src={props.profilePic ? props.profilePic : avatar}
            alt="contestant"
          />
        </div>
        <div className="ctsCardDetails w-100">
          {/* name */}
          <div className="ctsCardDetail">
            <div className="ctsCardLabel">Name</div>
            {props.name}
          </div>
          {/* Age */}
          <div className="ctsCardDetail">
            <div className="ctsCardLabel">Age</div>
            {props.age}
          </div>
          {/* State of Origin */}
          <div className="ctsCardDetail">
            <div className="ctsCardLabel">State Of Origin</div>
            {props.state}
          </div>
          {/* Phone Number */}
          <div className="ctsCardDetail">
            <div className="ctsCardLabel">Phone Number</div>
            {props.phoneNumber}
          </div>
          {/* Email */}
          <div className="ctsCardDetail">
            <div className="ctsCardLabel">Email</div>
            {props.email}
          </div>
          {/* Registered On */}
          <div className="ctsCardDetail">
            <div className="ctsCardLabel">Registered On</div>
            {moment(props.createdAt.toDate()).format("LL")}
          </div>
          {/* votes */}
          <div className="ctsCardDetail">
            <div className="ctsCardLabel">Votes</div>
            {props.votes}
          </div>
          {/* ===== 
          card edit
          ====== */}
          <div
            className="ctsCardVoteBtn"
            onClick={() => setDisplayVotesForm((prevState) => !prevState)}
          >
            <div>Edit</div>
            <div>
              <span style={{ display: displayVotesForm && "none" }}>
                <MdKeyboardArrowDown />
              </span>
              <span style={{ display: !displayVotesForm && "none" }}>
                <MdKeyboardArrowUp />
              </span>
            </div>
          </div>
          {/* =======
          Change votes Form
          ========= */}
          <form
            style={{ display: !displayVotesForm && "none" }}
            onSubmit={handleContestantEdit}
          >
            {/* votes */}
            <label className="inputLabel">votes</label>
            <input
              type="number"
              name="votes"
              className="inputBox"
              required
              value={votes}
              onChange={(e) => {
                setVotes(parseInt(e.target.value, 10));
              }}
            />
            {/* save button */}
            <button className="mainBtn">save changes</button>
          </form>
          {/*  */}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="contestants section mt-3">
        {/* top menu */}
        <div className="d-flex flex-column justify-content-center align-items-center">
          {/* <!-- label --> */}
          <div className="label">Admin</div>
          <div className="labelLine"></div>

          <div className="adminMenuContainer mt-3 row no-gutters">
            {/* =========
            search bar 
            ========= */}
            <form className="ctsSearchForm col-12">
              <input
                type="text"
                name="searchBar"
                placeholder="search contestant"
                className="ctsSearchBar mb-md-0 mt-0 w-100"
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </form>

            {/* =========
            Details Menu
            ========= */}
            <div className="adminMenu col-12 mt-3 d-flex justify-content-center align-items-center">
              {/* total contestants */}
              <p className="menuContent">
                <span className="mr-2">Total:</span>{" "}
                {contestants &&
                  contestants.length}
              </p>
            </div>
          </div>
        </div>

        {/* ==========
        contestants
        =========== */}
        <div className="ctsCardContainer row">
          <Loader />
          {contestants &&
            contestants
              .filter((cts) => cts.name.toLowerCase().includes(searchValue.toLowerCase()) && cts.votes >= 750 )
              .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
              .map((cts) => (
                <div className="col-lg-3 col-md-6" key={cts.id}>
                  <ContestantCard {...cts} />
                </div>
              ))}
        </div>
      </div>
    </>
  );
}

export default Admin;


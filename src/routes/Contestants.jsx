import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/contestants.css";
import avatar from "../images/avatar.png";
import firebase from "firebase/app";
import ReactLoading from "react-loading";
import {
  MdCheckCircle,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { PaystackButton } from "react-paystack";
import { v4 as uuidv4 } from "uuid";

function Contestants() {
  const [contestants, setContestants] = useState(null);
  const [selectedTab, displayTab] = useState(1);
  const [displayModal, setDisplayModal] = useState(false);
  const [selectedContestant, setSelectedContestant] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState();
  // const [contestants, setContestants] = useState([
  //   {
  //     id: "1",
  //     name: "cassandra shadrack",
  //     age: "19",
  //     state: "rivers state",
  //     votes: 2500,
  //   },
  //   {
  //     id: "2",
  //     name: "Diana prince",
  //     age: "19",
  //     state: "rivers state",
  //     votes: 190,
  //   },
  //   {
  //     id: "3",
  //     name: "angel hart",
  //     age: "19",
  //     state: "rivers state",
  //     votes: 87,
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

  const search = () => {
    let searchResult =
      contestants &&
      contestants.filter((cts) =>
        cts.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    setSearchResult(searchResult);
  };

  const Loader = () => (
    <div className="dataLoader mt-3" style={{ display: contestants && "none" }}>
      <div className="reactLoaderContainer">
        <ReactLoading type="spokes" color="#fbb03b" height={30} width={30} />
      </div>
    </div>
  );

  const SuccessModal = (props) => (
    <div className="successModal" style={{ display: !displayModal && "none" }}>
      <div className="modalBlind"></div>
      <div className="modalContainer">
        <div className="successModalImage">
          {/* profile created icon */}
          <span>
            <MdCheckCircle />
          </span>
        </div>
        <div className="successModalMessage">
          <span>You've successfully voted for {props.name}</span>
          <p>
            Please don't panic if you're vote doesn't reflect immediately, it
            might take some time to process. Thank you.
          </p>
        </div>
        <button className="secondaryBtn" onClick={() => setDisplayModal(false)}>
          Done
        </button>
      </div>
    </div>
  );

  const ContestantCard = (props) => {
    const [displayVoteForm, setDisplayVoteForm] = useState(false);
    // paystack payment
    const publicKey = "pk_live_d557ee563e1b49853c870b886a36b4ca8931f819";
    // const publicKey = "pk_test_8ecbac418f27432bf99e076ae8e5e05e244499d2";
    const [amount, setAmount] = useState(5000);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const handleSuccessfulPayment = () => {
      let amountPaid = amount / 100;
      setContestants(
        contestants.map((cts) => {
          if (cts.id === props.id && amountPaid === 50) {
            firebase
              .firestore()
              .collection("users")
              .doc(`${cts.name}-${cts.id}`)
              .update({
                votes: firebase.firestore.FieldValue.increment(1),
              })
              .catch((error) => console.log(error));
            cts.votes += 1;
          }
          if (cts.id === props.id && amountPaid === 500) {
            firebase
              .firestore()
              .collection("users")
              .doc(`${cts.name}-${cts.id}`)
              .update({
                votes: firebase.firestore.FieldValue.increment(10),
              })
              .catch((error) => console.log(error));
            cts.votes += 10;
          }
          if (cts.id === props.id && amountPaid === 1000) {
            firebase
              .firestore()
              .collection("users")
              .doc(`${cts.name}-${cts.id}`)
              .update({
                votes: firebase.firestore.FieldValue.increment(20),
              })
              .catch((error) => console.log(error));
            cts.votes += 20;
          }
          if (cts.id === props.id && amountPaid === 2500) {
            firebase
              .firestore()
              .collection("users")
              .doc(`${cts.name}-${cts.id}`)
              .update({
                votes: firebase.firestore.FieldValue.increment(50),
              })
              .catch((error) => console.log(error));
            cts.votes += 50;
          }
          if (cts.id === props.id && amountPaid === 5000) {
            firebase
              .firestore()
              .collection("users")
              .doc(`${cts.name}-${cts.id}`)
              .update({
                votes: firebase.firestore.FieldValue.increment(100),
              })
              .catch((error) => console.log(error));
            cts.votes += 100;
          }
          if (cts.id === props.id && amountPaid === 10000) {
            firebase
              .firestore()
              .collection("users")
              .doc(`${cts.name}-${cts.id}`)
              .update({
                votes: firebase.firestore.FieldValue.increment(200),
              })
              .catch((error) => console.log(error));
            cts.votes += 200;
          }
          if (cts.id === props.id && amountPaid === 15000) {
            firebase
              .firestore()
              .collection("users")
              .doc(`${cts.name}-${cts.id}`)
              .update({
                votes: firebase.firestore.FieldValue.increment(300),
              })
              .catch((error) => console.log(error));
            cts.votes += 300;
          }
          if (cts.id === props.id && amountPaid === 25000) {
            firebase
              .firestore()
              .collection("users")
              .doc(`${cts.name}-${cts.id}`)
              .update({
                votes: firebase.firestore.FieldValue.increment(500),
              })
              .catch((error) => console.log(error));
            cts.votes += 500;
          }
          if (cts.id === props.id && amountPaid === 50000) {
            firebase
              .firestore()
              .collection("users")
              .doc(`${cts.name}-${cts.id}`)
              .update({
                votes: firebase.firestore.FieldValue.increment(1000),
              })
              .catch((error) => console.log(error));
            cts.votes += 1000;
          }
          if (cts.id === props.id && amountPaid === 100000) {
            firebase
              .firestore()
              .collection("users")
              .doc(`${cts.name}-${cts.id}`)
              .update({
                votes: firebase.firestore.FieldValue.increment(2000),
              })
              .catch((error) => console.log(error));
            cts.votes += 2000;
          }
          return cts;
        })
      );
      setSelectedContestant(props);
      setDisplayModal(true);
    };
    const refName = name.split(" ").join("-");
    const reference = `${refName}-${uuidv4()}`;
    const componentProps = {
      email,
      amount,
      reference,
      publicKey,
      text: "vote",
      onSuccess: () => handleSuccessfulPayment(),
      onClose: () => alert("oops! we couldn't process your vote."),
    };
    return (
      <div className="col-lg-3 col-md-6">
        <div className="ctsCard">
          <div className="ctsCardImage">
            <img
              src={props.profilePic ? props.profilePic : avatar}
              alt="contestant"
              loading="lazy"
            />
          </div>
          <div className="ctsCardDetails">
            {/* <div className="ctsCardDetail">
              <div className="ctsCardLabel">Position</div>
              {props.position + 1}
            </div> */}
            <div className="ctsCardDetail">
              <div className="ctsCardLabel">Name</div>
              {props.name}
            </div>
            <div className="ctsCardDetail">
              <div className="ctsCardLabel">Age</div>
              {props.age}
            </div>
            <div className="ctsCardDetail">
              <div className="ctsCardLabel">State</div>
              {props.state}
            </div>
            <div className="ctsCardDetail">
              <div className="ctsCardLabel">Votes</div>
              {props.votes}
            </div>
          </div>
          <div
            className="ctsCardVoteBtn"
            onClick={() => setDisplayVoteForm((prevState) => !prevState)}
          >
            <div>vote</div>
            <div>
              <span style={{ display: displayVoteForm && "none" }}>
                <MdKeyboardArrowDown />
              </span>
              <span style={{ display: !displayVoteForm && "none" }}>
                <MdKeyboardArrowUp />
              </span>
            </div>
          </div>
          <form
            style={{ display: !displayVoteForm && "none" }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="inputLabel">your email</div>
            <input
              type="email"
              name="email"
              className="inputBox"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setName(props.name);
              }}
            />
            <div className="inputLabel">amount</div>
            <select
              name="amount"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            >
              <option value="5000">1 vote (N50)</option>
              <option value="50000">10 votes (N500)</option>
              <option value="100000">20 votes (N1000)</option>
              <option value="250000">50 votes (N2500)</option>
              <option value="500000">100 votes (N5000)</option>
              <option value="1000000">200 votes (N10000)</option>
              <option value="1500000">300 votes (N15000)</option>
              <option value="2500000">500 votes (N25000)</option>
              <option value="5000000">1000 votes (N50000)</option>
              <option value="10000000">2000 votes (N100000)</option>
            </select>
            <PaystackButton {...componentProps} />
          </form>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <SuccessModal {...selectedContestant} />
      <div className="contestants section d-flex flex-column justify-content-center align-items-center">
        {/* <!-- label --> */}
        <div className="label">Contestants</div>
        <div className="labelLine"></div>

        {/* tab */}
        <div className="tab w-100">
          <div
            onClick={() => displayTab(1)}
            className={selectedTab === 1 ? "activeTab" : ""}
          >
            vote
          </div>
          <div
            onClick={() => displayTab(2)}
            className={selectedTab === 2 ? "activeTab" : ""}
          >
            ranking
          </div>
        </div>

        {/* search bar */}
        <form
          className="ctsSearchForm w-100"
          style={{ display: selectedTab !== 1 && "none" }}
        >
          <input
            type="text"
            name="searchBar"
            placeholder="search contestant"
            className="ctsSearchBar"
            onChange={(e) => {
              setSearchValue(e.target.value);
              search();
            }}
          />
        </form>

        {/* contestants */}
        <div
          className="ctsCardContainer row"
          style={{ display: selectedTab !== 1 && "none" }}
        >
          <Loader />
          {contestants &&
            contestants
              .filter((cts) => cts.name.toLowerCase().includes(searchValue.toLowerCase()) && cts.votes >= 750) 
              // .sort((a, b) => (a.votes > b.votes ? -1 : 1))
              .map((cts, i) => (
                <ContestantCard {...cts} key={cts.id} position={i} />
              ))}
        </div>

        {/* no contestant text */}
        {searchResult && searchResult.length === 0 && (
          <div>
            no contestant found! Please ensure you typed the correct name.
          </div>
        )}

        {/* leader board */}
        <div
          className="ctsLeaderBoard"
        style={{ display: selectedTab !== 2 && "none" }}
        >
          <div className="ctsRankingCard ctsRankingHeader">
            <div className="ctsRankingCardRank"></div>
            <div className="ctsRankingCardName">name</div>
            {/* <div className="ctsRankingCardVotes">votes</div> */}
          </div>
          <Loader />
          {contestants &&
            contestants
              .filter((cts) => cts.votes >= 750) 
              .sort((a, b) => (a.votes > b.votes ? -1 : 1))
              .map((cts, i) => (
                <div key={cts.id} className="ctsRankingCard">
                  <div className="ctsRankingCardRank">{(i += 1)}</div>
                  <div className="ctsRankingCardName">{cts.name}</div>
                  {/* <div className="ctsRankingCardVotes">{cts.votes}</div> */}
                </div>
              ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contestants;

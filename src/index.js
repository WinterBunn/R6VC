import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Main from './components/test-chat/test-chat'
import firebase from 'firebase/app';
import 'firebase/firestore';
import {io as IO}from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";


ReactDOM.render(
    <App />,
  document.getElementById('root')
);

/*
const firebaseConfig = {
  apiKey: "AIzaSyB5pFNHqiZt87gkrHpsR6ZDHwMhTK1SARs",
  authDomain: "video-conference-1eb6b.firebaseapp.com",
  projectId: "video-conference-1eb6b",
  storageBucket: "video-conference-1eb6b.appspot.com",
  messagingSenderId: "1044741318959",
  appId: "1:1044741318959:web:d84153deea686064e519da"
};

if (!firebase.apps.length) {
firebase.initializeApp(firebaseConfig);
}
const firestore = firebase.firestore();

const servers = {
iceServers: [
  {
    urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
  },
],
iceCandidatePoolSize: 10,
};

// Global State
const pc = new RTCPeerConnection(servers);
let localStream = null;
let remoteStream = null;

// HTML elements
const webcamButton = document.getElementById('webcamButton');
const webcamVideo = document.getElementById('webcamVideo');
const callButton = document.getElementById('callButton');
const callInput = document.getElementById('callInput');
const answerButton = document.getElementById('answerButton');
const remoteVideo = document.getElementById('remoteVideo');
const hangupButton = document.getElementById('hangupButton');

// 1. Setup media sources

webcamButton.onclick = async () => {
localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
remoteStream = new MediaStream();

// Push tracks from local stream to peer connection
localStream.getTracks().forEach((track) => {
  pc.addTrack(track, localStream);
});

// Pull tracks from remote stream, add to video stream
pc.ontrack = (event) => {
  event.streams[0].getTracks().forEach((track) => {
    remoteStream.addTrack(track);
  });
};

webcamVideo.srcObject = localStream;
remoteVideo.srcObject = remoteStream;

webcamVideo.setAttribute("controls", true);

callButton.disabled = false;
answerButton.disabled = false;
webcamButton.disabled = true;
};

// 2. Create an offer
callButton.onclick = async () => {
// Reference Firestore collections for signaling
const callDoc = firestore.collection('calls').doc();
const offerCandidates = callDoc.collection('offerCandidates');
const answerCandidates = callDoc.collection('answerCandidates');

callInput.value = callDoc.id;

// Get candidates for caller, save to db
pc.onicecandidate = (event) => {
  event.candidate && offerCandidates.add(event.candidate.toJSON());
};

// Create offer
const offerDescription = await pc.createOffer();
await pc.setLocalDescription(offerDescription);

const offer = {
  sdp: offerDescription.sdp,
  type: offerDescription.type,
  user: "test",
};

await callDoc.set({ offer });

// Listen for remote answer
callDoc.onSnapshot((snapshot) => {
  const data = snapshot.data();
  if (!pc.currentRemoteDescription && data?.answer) {
    const answerDescription = new RTCSessionDescription(data.answer);
    pc.setRemoteDescription(answerDescription);
  }
});

// When answered, add candidate to peer connection
answerCandidates.onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === 'added') {
      const candidate = new RTCIceCandidate(change.doc.data());
      pc.addIceCandidate(candidate);
    }
  });
});

hangupButton.disabled = false;
answerButton.disabled = true;
};

// 3. Answer the call with the unique ID
answerButton.onclick = async () => {
const callId = callInput.value;
const callDoc = firestore.collection('calls').doc(callId);
const answerCandidates = callDoc.collection('answerCandidates');
const offerCandidates = callDoc.collection('offerCandidates');

pc.onicecandidate = (event) => {
  event.candidate && answerCandidates.add(event.candidate.toJSON());
};

const callData = (await callDoc.get()).data();

const offerDescription = callData.offer;
console.log(callData.offer.user)
await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

const answerDescription = await pc.createAnswer();
await pc.setLocalDescription(answerDescription);

const answer = {
  type: answerDescription.type,
  sdp: answerDescription.sdp,
};

await callDoc.update({ answer });

offerCandidates.onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    console.log(change);
    if (change.type === 'added') {
      let data = change.doc.data();
      pc.addIceCandidate(new RTCIceCandidate(data));
    }
  });
});
};*/
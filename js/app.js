//import React, { Component } from 'react';

var srcDuration;
var srcSeconds;

function getMusicList() {
	var data;
  $.ajax({
    async: false, //thats the trick
    url: 'json/music_db.json',
    dataType: 'json',
    success: function(response) {
     	data = response;
    }
  });
  return data.musicList;
}

const headerElement = (
	<>
		<h1><a href="/">Korppi's Jukebox</a></h1>
		<nav>
			<a href="jukebox">Royalty-free music</a>
			<a href="contact">Contact</a>
			<a href="donate">Donate</a>
			<a href="faq">FAQ</a>
		</nav>
	</>
);


function MusicInfo(props) {
	const playMusic = () => {
		document.getElementById("source-music").src = "audio/"+props.info['source'];
		document.getElementById("title-music").innerHTML = props.info['title'];
		srcSeconds = document.getElementById("play-music").duration ;
		document.getElementById("play-music").load();
		document.getElementById("play-music").play();
	}
	return (
	<tr onClick={playMusic}>
		<td>{ props.info['title'] }</td>
		<td>{ props.info['duration'] }</td>
		<td>{ props.info['genre'] }</td>
		<td>{ props.info['tempo'] }</td>
		<td>{ props.info['feel'] }</td>
	</tr>
	);
}

function MusicList() {
	const data = getMusicList();
	return (
    <>
      {data.map((music) => <MusicInfo info={music} />)}
    </>
  );
}

const header = ReactDOM.createRoot(document.getElementById('header'));
const music = ReactDOM.createRoot(document.getElementById('music-list'));
music.render(<MusicList />);
header.render(headerElement);

document.getElementById('play-music').addEventListener('loadedmetadata', (e) => {
	document.getElementById("player-slider").max = parseInt(document.getElementById('play-music').duration);
	document.getElementById("duration-time").innerHTML = (document.getElementById('play-music').duration)%60 >= 10 ? parseInt((document.getElementById('play-music').duration)/60)+":"+parseInt((document.getElementById('play-music').duration)%60) : parseInt((document.getElementById('play-music').duration)/60)+":0"+parseInt((document.getElementById('play-music').duration)%60);
});

document.getElementById('play-music').addEventListener('timeupdate', (e) => {
	var current = document.getElementById("play-music").currentTime;
	document.getElementById("player-slider").value = Math.ceil(current);
	var currentS = Math.floor(current % 60) >= 10 ? parseInt(Math.floor(current % 60)) : "0" + parseInt(Math.floor(current % 60));
  var currentM = parseInt((current / 60) % 60);
	document.getElementById("current-time").innerHTML = currentM+":"+currentS;
},false);

document.getElementById('play-music').addEventListener('playing', (e) => {
	document.getElementById('play-button').className = "fa fa-pause";
});

document.getElementById("play-button").addEventListener('click', (e) => {
	if (document.getElementById("play-music").paused) {
		document.getElementById("play-music").play();
		document.getElementById('play-button').className = "fa fa-pause";
	}else{
		document.getElementById("play-music").pause();
		document.getElementById('play-button').className = "fa fa-play";
	}
});

document.getElementById("toggle-loop").addEventListener('click', (e) => {
	if (document.getElementById("play-music").loop) {
		document.getElementById("play-music").loop = false;
		document.getElementById('toggle-loop').className = "fa fa-undo no-loop";
	}else{
		document.getElementById("play-music").loop = true;
		document.getElementById('toggle-loop').className = "fa fa-undo";
	}
});

document.getElementById("stop-button").addEventListener('click', (e) => {
	document.getElementById("play-music").pause();
	document.getElementById("play-music").currentTime = 0;
	document.getElementById('play-button').className = "fa fa-play";
});

document.querySelector('#player-slider').addEventListener('pointerup', function(event) {
    var playerSlider = event.target;
    var audio = document.getElementById("play-music");
    audio.currentTime = parseInt(playerSlider.value);
});

document.getElementById("sub-10s").addEventListener('click', (e) => {
	if (document.getElementById("play-music").currentTime > 5) {
		document.getElementById("play-music").currentTime = document.getElementById("play-music").currentTime - 5;
	}else{
		document.getElementById("play-music").currentTime = "0";
	}
});

document.getElementById("add-10s").addEventListener('click', (e) => {
	if (parseInt(document.getElementById("play-music").currentTime)+5 < srcSeconds) {
		document.getElementById("play-music").currentTime = document.getElementById("play-music").currentTime + 5;
	}else{
		document.getElementById("play-music").currentTime = srcSeconds-1;
	}
});



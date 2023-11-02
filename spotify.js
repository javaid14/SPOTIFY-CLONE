console.log("WELCOME TO SPOTIFY");
//initialize the variables
let songIndex = 0;

let audioElement = new Audio('songs/1.mpeg');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressbar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));


let songs = [
    {songName:"Aksar is duniya mei",filepath:"songs/1.mpeg",coverPath:"covers/1.jpg"},
    {songName:"Ayei ho meri zindagi mei",filepath:"songs/2.mpeg",coverPath:"covers/2.jpg"},
    {songName:"Kahani suno",filepath:"songs/3.mpeg",coverPath:"covers/3.jpg"},
    {songName:"Kesariya",filepath:"songs/4.mpeg",coverPath:"covers/4.jpg"},
    {songName:"Lut Gayei (Emraan Hashmi)",filepath:"songs/5.mpeg",coverPath:"covers/5.jpg"},
    {songName:"Shaam b Khoob hai",filepath:"songs/6.mpeg",coverPath:"covers/6.jpg"},
    {songName:"Tera fitoor",filepath:"songs/7.mpeg",coverPath:"covers/7.jpg"},
    {songName:"Tere vastei",filepath:"songs/8.mpeg",coverPath:"covers/8.jpg"},
    {songName:"vibes of love jukebox",filepath:"songs/9.mpeg",coverPath:"covers/9.jpg"},
    {songName:"Zihaal e Miskin",filepath:"songs/10.mpeg",coverPath:"covers/10.jpg"}
]
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    
});

  


//handle play/pause click
masterPlay.addEventListener("click",() => {
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
    
        gif.style.opacity =1;

    }else{
        audioElement.pause();
        masterPlay.classList.add("fa-play-circle");
        masterPlay.classList.remove("fa-pause-circle");
        gif.style.opacity = 0;
    }
});

//listen to events
audioElement.addEventListener("timeupdate",() => {
    

    //update seek bar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    
    myProgressBar.value = progress;
    
    
});

myProgressBar.addEventListener("change",()=> {
    audioElement.currentTime = myProgressBar.value * audioElement.duration /100;
});

const makeAllPlay =() => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
})
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener("click",(e)=>{
        makeAllPlay();
        songIndex = parseInt(e.target.id);
        if(audioElement.paused || audioElement.currentTime<=0){
    
        audioElement.src = songs[songIndex].filepath;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterSongName.innerText = songs[songIndex].songName;
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");

        masterPlay.classList.add("fa-pause-circle");
        masterPlay.classList.remove("fa-play-circle");
        }else{
            audioElement.pause();
            e.target.classList.remove("fa-pause-circle");
            e.target.classList.add("fa-play-circle");

            masterPlay.classList.add("fa-play-circle");
            masterPlay.classList.remove("fa-pause-circle");
            gif.style.opacity = 0;

        }

    });
});

document.getElementById("next").addEventListener("click",()=>{
    if(songIndex>=9){
        songIndex = 0;
    }else{
        songIndex+=1;
    }
    audioElement.src = songs[songIndex].filepath;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.add("fa-pause-circle");
    masterPlay.classList.remove("fa-play-circle");
    
});

document.getElementById("previous").addEventListener("click",()=>{
    if(songIndex<=0){
        songIndex = 0;
    }else{
        songIndex-=1;
    }
    audioElement.src = songs[songIndex].filepath;
    
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.add("fa-pause-circle");
    masterPlay.classList.remove("fa-play-circle");
    

})
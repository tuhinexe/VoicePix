
const chatBtn = document.getElementById('record-button');
const imageBtn = document.getElementById('image-button')
const chatBox = document.querySelector(".chat")
const imageBox = document.querySelector(".imageBox")
const promptTag = document.querySelector(".prompt")
const imageDiv = document.querySelector(".imageResp")
const responseDiv = document.querySelector(".response")
const previewDiv = document.querySelector(".previewDiv")
const previewBox = document.querySelector(".preview")
const stopBtn = document.getElementById("stop-button")
const vox = document.querySelector(".vox")
const downloadBtn = document.querySelector("#download")
responseDiv.style.display = "none"


let mediaRecorder;

const getAudioAndReq = async (url,button) =>{
  stopBtn.disabled = false
  
  try {
    let recordedChunks = [];
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.addEventListener('dataavailable', event => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    });

    mediaRecorder.addEventListener('stop', async () => {
      const audioBlob = new Blob(recordedChunks, { type: 'audio/wav' });
      const audioFile = new File([audioBlob], 'recording.wav');
      const formData = new FormData();
      formData.append('audio', audioFile);

      try{
        const response = await fetch(url, {
          method: 'POST',
          body: formData
        });
        const result = await response.json()
          
        if(url === "/chat"){
          stopBtn.disabled = true
          previewBox.style.display = "none"
          responseDiv.style.display = "flex"
          imageDiv.style.display = "none"
          chatBox.innerHTML= result.data
          promptTag.innerHTML = result.prompt
        } else{
          stopBtn.disabled = true
          previewBox.style.display = "none"
          responseDiv.style.display = "flex"
          vox.style.display = "none"
          promptTag.innerHTML = result.prompt
          imageBox.src = result.data
          downloadBtn.href = result.data
          downloadBtn.download = "image.png"
          downloadBtn.target = "_blank"
        }

      } catch (err) {
      previewDiv.innerHTML = `<p>Sorry, we couldn't hear you. Please try again.</p>`
      }
    });

    mediaRecorder.start();
    button.disabled = true;
  } catch (err) {
    console.error('Error occurred while recording audio: ', err);
    previewBox.style.display = "none"
    responseDiv.style.display = "flex"
    responseDiv.innerHTML = `<p>Sorry, we couldn't hear you. Please try again.</p>`
  }
}

chatBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  await getAudioAndReq("/chat",chatBtn)
});
imageBtn.addEventListener('click', async (e) =>{
  e.preventDefault()
  await getAudioAndReq("/image",imageBtn)
})


// Stop button 


stopBtn.addEventListener("click", (e) =>{
  e.preventDefault()
  if (mediaRecorder && mediaRecorder.state === 'recording') {
        previewDiv.innerHTML = `<img src="./icons/loading.gif" alt="" width="50px" height="50px" style="border-radius: 50%;">
        <p>Grab your snacks! Fetching Response...</p>`
        mediaRecorder.stop();
        chatBtn.disabled = false;
        imageBtn.disabled = false
      } else {
        mediaRecorder.start();
        chatBtn.disabled = true;
        imageBtn.disabled = true;
      }
    
});

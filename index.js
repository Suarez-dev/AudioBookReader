const video = document.querySelector(".video");
const textElement = document.querySelector("[data-text] ")

async function setUp(){

    /* acceder a la webcam */
const stream = await navigator.mediaDevices.getUserMedia({video: true});

    video.srcObject= stream;

    video.addEventListener("playing", async ()=>{
        /* aqui uso la libreria Tesseract */
        const worker  = Tesseract.createWorker()
        await worker.load();
        await worker.loadLanguage("eng");
        await worker.initialize("eng");

     const canvas = document.createElement("canvas");
    canvas.width = video.width;
    canvas.height = video.height;
  
    document.addEventListener("keypress", async e => {
        if(e.code !== "Space") return 
         canvas.getContext("2d").drawImage(video, 0,0, video.width ,  video.height) 
         const {
            data : { text },
        } = await worker.recognize(canvas)

            speechSynthesis.speak(new SpeechSynthesisUtterance(text.replace(/\s/g, ""))
            )    
        
            textElement.textContent = text;
            
          })
        })
      }
      

setUp();
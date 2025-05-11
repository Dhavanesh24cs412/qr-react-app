import {useState} from 'react';



export const Qrcode = () => {

  const [img,setImg] =useState("");
  const[loading,setLoading]=useState(false);
  const[qrData,setqrData]=useState("https://www.linkedin.com/in/dhavanesh-venkatesan-b40579301/");
  const[qrSize,setqrSize]=useState("150");
  
  async function generate(){
    setLoading(true);
    try{
      const url= `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
      setImg(url);
    }catch(error){
      console.error("Error in generating QR code",error);
    }finally{
      setLoading(false);
    }
  }

  function downloadQr(){
    fetch(img)
    .then((response)=>response.blob())
    .then((blob)=>{
      const link =document.createElement("a");
      link.href=URL.createObjectURL(blob);//blob is a binary data format of the response
      link.download="qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
   
      // Function to refresh the page
      const handleRefresh = () => {
        window.location.reload(); // This reloads the current webpage
      };
  

  return (
    <>
    <div className="topbar">
       <h1>Free QR Generator</h1>
       
       
    </div>
    <div className="app-container">
        <h1>QR CODE GENERATOR</h1>
        {loading && <p>Please wait..</p>}
        {img && <img className="mainimg" src={img}/>}
        <div>
      <label htmlFor="dataInput" className="input-label">
        Data for QR:
      </label>
      <input type="text" id="dataInput" placeholder="" onChange={(e)=>setqrData(e.target.value)}/>
      <label className="input-label" >
        Image size:
      </label>
      <p className="sampleSize">Eg: 150;</p> 
      <input type="text" id="sizeInput" placeholder="Enter image size" onChange={(e)=>setqrSize(e.target.value)}></input>
      <br/><br/>
      <button className="generate-button" onClick={generate}>Generate QR code</button>
      <button className="download-button" onClick={downloadQr}>Download QR code</button>   
      <button className="Refresh" onClick={handleRefresh}>Refresh</button>
    </div>
    <div className="endCredits">
    <p className="description">Designed by <span>Dhavanesh</span></p>
    </div>
    
</div>

</>
  )

}


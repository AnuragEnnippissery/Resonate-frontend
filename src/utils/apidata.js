// import { useState } from "react";

// async function SendPdf(){
//     const [data,setData]=useState([]);
//     const res= await fetch("http://127.0.0.1:8000/convert")
//     console.log("hi")

// }
// export  default SendPdf;

export async function sendPdfApi(file) {
  const formData = new FormData();
  formData.append("pdf", file);

  const res = await fetch("https://resonate-backend-o4h8.onrender.com/convert", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  // IMPORTANT: read as blob, not json
  const audioBlob = await res.blob();
  return audioBlob;
}


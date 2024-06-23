import React, { useState } from 'react'

function AddBot() {
    const [pdfPath, setPDFPath] = useState("")
    const handleFileUpload = (event) => {
        const file = event.target.files[0].name;
        console.log(file)
        setPDFPath(file)
    }
    return (
    <div>
        <div>
            <input type='file' onChange={handleFileUpload}></input>
        </div>
        <button>Live the Bot</button>
    </div>
    )
}

export default AddBot
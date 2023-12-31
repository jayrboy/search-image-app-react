import { useState } from "react";
import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const key = "p1fkPloDSYpBNNzVeXGT1z6oBb88gZY4o2DVrMDWov0";

  function searchImage(e) {
    e.preventDefault();
    if (!word) {
      alert("กรุณาป้อนข้อมูล");
    } else {
      // เรียกใช้งาน API
      fetchImageFromAPI(word);
    }
  }

  async function fetchImageFromAPI() {
    const url = `https://api.unsplash.com/search/photos?page=1&query=${word}&client_id=${key}&per_page=15`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
  }

  return (
    <>
      <h1>ระบบค้นหารูปภาพด้วย API</h1>
      <form onSubmit={searchImage}>
        <input
          type="text"
          placeholder="ป้อนชื่อรูปภาพที่ต้องการค้นหา"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button type="submit">ค้นหา</button>
      </form>
    </>
  );
}

export default App;

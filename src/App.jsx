import { useState } from "react";
import "./App.css";
import Picture from "./components/Picture";

function App() {
  const [word, setWord] = useState("");
  const [photos, setPhotos] = useState([]);

  function searchImage(e) {
    e.preventDefault();
    if (!word) {
      alert("กรุณาป้อนข้อมูล");
    } else {
      // เรียกใช้งาน API
      fetchImageFromAPI();
      // console.log(import.meta.env);
    }
  }

  async function fetchImageFromAPI() {
    const url = `${
      import.meta.env.VITE_API_URL
    }?page=1&query=${word}&client_id=${
      import.meta.env.VITE_API_KEY
    }&per_page=15`;
    const res = await fetch(url);
    const data = await res.json();
    const result = data.results;

    if (result.length == 0) {
      alert("ไม่มีรูปภาพ");
      setWord("");
    } else {
      // แสดงข้อมูล
      setPhotos(result);
      console.log(result);
    }
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
      {/* แสดงข้อมูลรูปภาพ */}
      <div className="search-result">
        {photos.map((data, index) => {
          return <Picture {...data} key={index} />;
        })}
      </div>
    </>
  );
}

export default App;

import { useState } from 'react'

import Picture from './components/Picture'

function App() {
  const [word, setWord] = useState('')
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)

  function searchImage(e) {
    e.preventDefault()
    if (!word) {
      alert('กรุณาป้อนข้อมูล')
    } else {
      // เรียกใช้งาน API
      fetchImageFromAPI()
      // console.log(import.meta.env);
    }
  }

  async function fetchImageFromAPI() {
    setLoading(true)
    const url = `${
      import.meta.env.VITE_API_URL
    }?page=1&query=${word}&client_id=${
      import.meta.env.VITE_API_KEY
    }&per_page=15`
    const res = await fetch(url)
    const data = await res.json()
    const result = data.results

    if (result.length == 0) {
      alert('ไม่มีรูปภาพ')
      setWord('')
    } else {
      // แสดงข้อมูล
      setPhotos(result)
      console.log(result)
    }
    setLoading(false) // หยุดแสดง loading ทันทีเมื่อเสร็จสิ้นการค้นหา
  }

  let showImages

  if (photos.length > 0) {
    showImages = photos.map((data, index) => {
      return (
        <div key={index} className="col-12 col-sm-6 col-lg-4 mt-3">
          <Picture {...data} />
        </div>
      )
    })
  }

  if (loading === true) {
    showImages = (
      <div className="d-flex justify-content-center p-5">
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading..</span>
        </div>
      </div>
    )
  }

  return (
    <main className="container mt-5 mb-5">
      <h1 className="text-center">ระบบค้นหารูปภาพด้วย API</h1>
      <div
        className="mt-3 mx-auto p-3 border rounded"
        style={{ width: '350px' }}
      >
        <form onSubmit={searchImage}>
          <div className="input-group">
            <input
              type="search"
              placeholder="ป้อนชื่อรูปภาพ"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              className="form-control form-control-lg"
            />
            &nbsp;
            <button className="btn btn-primary btn-sm" type="submit">
              ค้นหา
            </button>
          </div>
        </form>
      </div>
      {/* แสดงข้อมูลรูปภาพ */}
      <div className="row">{showImages}</div>
    </main>
  )
}

export default App

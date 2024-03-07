const Picture = (props) => {
  return (
    <div className="card">
      <img
        src={props.urls.small}
        alt={props.description}
        className="img-fluid rounded"
      />
    </div>
  )
}
export default Picture

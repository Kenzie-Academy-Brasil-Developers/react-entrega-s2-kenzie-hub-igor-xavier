function Card({ title, status }) {
  return (
    <div className="list-item">
      <h6>{title}</h6> <label className="label-tech">{status}</label>
    </div>
  );
}
export default Card;

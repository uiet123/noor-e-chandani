import "./Loading.css";

const Loading = ({ text = "Loading..." }) => {
  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
      <p>{text}</p>
    </div>
  );
};

export default Loading;

import './Frame.css';

const Frame = ({ children }) => {
  return (
    <div className="ipad-container">
      <div className="ipad-frame">
        {children}
      </div>
    </div>
  );
};

export default Frame;

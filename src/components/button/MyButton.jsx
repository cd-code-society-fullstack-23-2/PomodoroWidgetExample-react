import "./MyButton.css"; // Create a CSS file for styling, named RoundedButton.css

const MyButton = (props) => {
  const {children, onClick} = props;
  return (
    <button className="rounded-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default MyButton;
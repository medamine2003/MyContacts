import { Link } from "react-router-dom";

function WelcomePage() {
  return (
    <>
      <p>Avez-vous un compte ?</p>
      <br />
      <Link to="/login">
        <button>Je me connecte</button>
      </Link>
      <Link to="/register">
        <button>Je crée un compte</button>
      </Link>
    </>
  );
}

export default WelcomePage;

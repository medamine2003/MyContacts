import { Link } from "react-router-dom";

function WelcomePage() {
  return (
    <>
      <p>Avez-vous un compte ?</p>
      <br />
      <div>
      <Link to="/login">
        <button>Je me connecte</button>
      </Link>
      </div>
      <div>
      <Link to="/register">
        <button>Je crée un compte</button>
      </Link>
      </div>
    </>
  );
}

export default WelcomePage;

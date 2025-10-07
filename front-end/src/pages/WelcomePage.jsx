import { Link } from "react-router-dom";

function WelcomePage() {
  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow p-4" style={{ maxWidth: "400px" }}>
        <div className="card-body text-center">
          <h2 className="mb-4">My Contacts</h2>
          <p className="mb-4">Avez-vous un compte ?</p>
          
          <div className="d-grid gap-2">
            <Link to="/login">
              <button className="btn btn-primary w-100">Je me connecte</button>
            </Link>
            
            <Link to="/register">
              <button className="btn btn-outline-primary w-100">Je crée un compte</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
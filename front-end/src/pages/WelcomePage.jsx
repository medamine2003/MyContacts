import { Link } from "react-router-dom";

function WelcomePage() {
  return (
    <div >
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg border-0">
            <div className="card-body p-5 text-center">
              
              <div className="mb-4">
                <i className="bi bi-person-circle display-1 text-primary"></i>
              </div>
              
             
              <h1 className="h3 mb-3 fw-bold">Bienvenue sur My Contacts</h1>
              
              
              <p className="text-muted mb-4">
                Gérez vos contacts en toute simplicité
              </p>
              
              
              <p className="fw-semibold mb-4">Avez-vous un compte ?</p>
              
             
              <div className="d-grid gap-3">
                <Link to="/login" className="text-decoration-none">
                  <button className="btn btn-primary btn-lg w-100">
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Je me connecte
                  </button>
                </Link>
                
                <Link to="/register" className="text-decoration-none">
                  <button className="btn btn-outline-primary btn-lg w-100">
                    <i className="bi bi-person-plus me-2"></i>
                    Je crée un compte
                  </button>
                </Link>
              </div>
              
             
              <div className="mt-4 pt-4 border-top">
                <small className="text-muted">
                  Une application sécurisée avec authentification JWT
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
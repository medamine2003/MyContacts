 import { useEffect, useState } from "react";
 import {
  getContacts,
  createContact,
   deleteContact,
  updateContact,
 } from "../services/contactServices";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function ContactForm() {
   const [contacts, setContacts] = useState([]);
   const [form, setForm] = useState({ firstName: "", lastName: "", phone: "" });
   const [editId, setEditId] = useState(null); 
   const [error, setError] = useState("");

   const fetchContacts = async () => {
     try {
       const data = await getContacts();
       
       setContacts(data);
    } catch (err) {
       setError("Erreur lors du chargement des contacts");
     }
  };

   useEffect(() => {
     fetchContacts();
   }, []);

 const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

   const handleSubmit = async (e) => {
   e.preventDefault();
     try {
      if (editId) {
       
        await updateContact(editId, form);
        setEditId(null);
      } else {
        
         await createContact(form);
       }

       setForm({ firstName: "", lastName: "", phone: "" });
       fetchContacts();
     } catch (err) {
       setError(err.response?.data?.error || "Erreur lors de la soumission");
     }
   };

  const handleDelete = async (id) => {
     if (window.confirm("Supprimer ce contact ?")) {
      await deleteContact(id);
      fetchContacts();
     }
   };

   const handleEdit = (contact) => {
    setForm({
       firstName: contact.firstName,
       lastName: contact.lastName,
      phone: contact.phone,
     });
     setEditId(contact._id);
   };

   const handleCancelEdit = () => {
     setEditId(null);
     setForm({ firstName: "", lastName: "", phone: "" });
   };

  return (
    <div className="container mt-5">
       <Link to="/">
         <button className="btn btn-secondary mb-3">Page d'accueil</button>
       </Link>

       <h2 className="mb-4"> Mes Contacts</h2>

       {error && <div className="alert alert-danger">{error}</div>}

       {/* Formulaire de création / édition */}
       <div className="card p-3 mb-4 shadow-sm">
         <h5>{editId ? "Modifier le contact" : "Ajouter un contact"}</h5>
         <form onSubmit={handleSubmit} className="row g-3">
           <div className="col-md-4">
            <input
              type="text"
              name="firstName"
              placeholder="Prénom"
              className="form-control"
              value={form.firstName}
               onChange={handleChange}
               required
            />
           </div>
           <div className="col-md-4">
             <input
               type="text"
               name="lastName"
               placeholder="Nom"
               className="form-control"
              value={form.lastName}
               onChange={handleChange}
               required
            />
           </div>
           <div className="col-md-4">
            <input
               type="text"
               name="phone"
               placeholder="Téléphone"
               className="form-control"
               value={form.phone}
               onChange={handleChange}
              required
            />
           </div>
           <div className="col-12">
             <button className="btn btn-primary me-2" type="submit">
               {editId ? "Mettre à jour" : "Ajouter"}
             </button>
             {editId && (
              <button
                type="button"
                 className="btn btn-secondary"
                 onClick={handleCancelEdit}
               >
                 Annuler
               </button>
)}
           </div>
         </form>
       </div>

      
      <div className="card p-3 shadow-sm">
         <h5>Liste de mes contacts</h5>
         {contacts.length === 0 ? (
           <p className="text-muted mt-3">Aucun contact pour le moment.</p>
        ) : (
           <table className="table mt-3">
            <thead>
              <tr>
                 <th>Prénom</th>
                 <th>Nom</th>
                 <th>Téléphone</th>
                 <th>Actions</th>
              </tr>
            </thead>
             <tbody>
               {contacts.map((c) => (
                 <tr key={c._id}>
                   <td>{c.firstName}</td>
                   <td>{c.lastName}</td>
                  <td>{c.phone}</td>
                   <td>
                    <button
                       className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(c)}
                     >
                      Modifier
                    </button>
                     <button
                      className="btn btn-danger btn-sm"
                       onClick={() => handleDelete(c._id)}
                     >
                       Supprimer
                    </button>
                  </td>
                 </tr>
              ))}
           </tbody>
           </table>
        )}
      </div>
    </div>

);
}

export default ContactForm;

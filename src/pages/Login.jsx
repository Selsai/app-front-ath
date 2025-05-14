import { useState } from "react";
import { Form, Button, Container, Card, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://offers-api.digistos.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw { status: response.status, message: data.message || "Une erreur est survenue." };
      }

      const data = await response.json();
      
      // Rediriger vers la page d'accueil
      navigate("/offres/professionnelles");
    } catch (err) {
      console.error("Erreur de connexion:", err);
      
      // Gestion des erreurs basée sur le status code
      if (err.status === 401) {
        setError("Email ou mot de passe incorrect.");
      } else if (err.status === 429) {
        setError("Trop de tentatives de connexion. Veuillez réessayer plus tard.");
      } else if (err.status === 422) {
        setError("Données de formulaire invalides. Veuillez vérifier vos informations.");
      } else {
        setError(`Une erreur est survenue (${err.status || 'Inconnue'}). Veuillez réessayer.`);
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="p-4 shadow-lg">
            <h2 className="text-center mb-4">Se connecter</h2>
            
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="loginPassword">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Se connecter
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    message: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validar solo números para el campo de teléfono
    if (name === 'phone' && !/^\d*$/.test(value)) return;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que todos los campos están llenos
    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.message) {
      setError('Por favor, completa todos los campos.');
      setSuccess('');
      return;
    }

    // Validar el formato del teléfono (puedes ajustar la expresión regular según tus necesidades)
    if (!/^\d{10,15}$/.test(formData.phone)) {
      setError('Número de teléfono inválido. Debe contener entre 10 y 15 dígitos.');
      setSuccess('');
      return;
    }

    setError('');
    setSuccess('Consulta enviada correctamente.');

    console.log('Form Data:', formData);

    // Limpiar el formulario después de enviarlo
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      message: ''
    });
  };

  return (
    <section className="menu">
      <Container className="mt-5">
        <h2 className="routeTitle">Contacto</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFirstName">
            <Form.Label className="form-label">Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu nombre"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formLastName">
            <Form.Label className="form-label">Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu apellido"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formPhone">
            <Form.Label className="form-label">Teléfono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu teléfono"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              // Opcionalmente, puedes agregar un patrón para ayudar a la validación
              pattern="\d*"
            />
          </Form.Group>

          <Form.Group controlId="formMessage" className="form-group-textarea">
            <Form.Label className="form-label">Mensaje</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ingresa tu mensaje"
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
          </Form.Group>

          <Button type="submit" className="custom-button">
            Enviar Consulta
          </Button>
        </Form>
      </Container>
    </section>
  );
};

export default Contact;

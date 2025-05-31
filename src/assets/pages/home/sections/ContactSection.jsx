// src/components/sections/ContactSection.jsx
import React from 'react';
import sectionStyles from './ContentSection.module.css';
import styles from './ContactSection.module.css';
import Button from '../../../components/common/Button';

function ContactSection({ id = 'contact' }) {
  return (
    <section
      id={id}
      className={`${sectionStyles.section} ${sectionStyles.alternateBg}`}
    >
      <div className={sectionStyles.container}>
        <h2 className={sectionStyles.title}>Contact</h2>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message">Mensagem</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Type a message..."
              required
            ></textarea>
          </div>

          <div className={styles.actions}>
            <Button type="submit" variant="primary">
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ContactSection;

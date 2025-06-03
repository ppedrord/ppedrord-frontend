import React from 'react';
import styles from './SocialIcon.module.css';
import {
  FaInstagram,
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
} from 'react-icons/fa';

/**
 * Tabela de ícones disponíveis.
 * Adicione novos pares { nome: Componente } conforme necessário.
 */
const ICONS = {
  instagram: FaInstagram,
  github: FaGithub,
  linkedin: FaLinkedinIn,
  twitter: FaTwitter,
};

/**
 * Ícone social reutilizável.
 *
 * @param {string}  icon  – chave definida em ICONS (ex.: "github")
 * @param {string}  href  – URL de destino
 * @param {string}  label – rótulo acessível (aria-label)
 * @param {number}  size  – tamanho do ícone (px). Default: 24
 */
function SocialIcon({ icon, href, label, size = 24, className = '' }) {
  const Icon = ICONS[icon];

  if (!Icon) {
    console.warn(`[SocialIcon] ícone "${icon}" não encontrado.`);
    return null;
  }

  return (
    <a
      href={href}
      aria-label={label || icon}
      className={`${styles.social} ${className}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon size={size} aria-hidden="true" focusable="false" />
    </a>
  );
}

export default SocialIcon;

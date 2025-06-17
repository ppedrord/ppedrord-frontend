// src/components/common/DarkModeToggle/DarkModeToggle.jsx
import React from 'react'; // Já importado no contexto do build
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Ícone para modo escuro (lua)
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Ícone para modo claro (sol)
import Tooltip from '@mui/material/Tooltip';
import { useAppTheme } from '@/contexts/ThemeContext'; // Usando alias

/**
 * Componente DarkModeToggle.
 * Permite ao usuário alternar entre os temas claro e escuro.
 * @returns {JSX.Element} O componente de toggle.
 */
const DarkModeToggle = () => {
  const { mode, toggleColorMode } = useAppTheme();

  return (
    <Tooltip
      title={
        mode === 'light' ? 'Mudar para tema escuro' : 'Mudar para tema claro'
      }
    >
      <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
};

export default DarkModeToggle;

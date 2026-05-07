import { Cita, Paciente } from '../types/models';

export const validarCitaHealthCore = (cita: Cita): boolean => {
  const ahora: Date = new Date();

  if (cita.estado === 'programada' && cita.fecha < ahora) {
    return false;
  }
  if (cita.costo < 0) {
    return false;
  }

  return true;
};

export const validarCumplimiento = (paciente: Paciente): boolean => {
  if (paciente.pais === 'UK' && !paciente.cumpleGDPR) {
    return false;
  }
  return true;
};

export const validatePatient = (paciente: Partial<Paciente>): boolean => {
  if (!paciente.nombre || paciente.nombre.length < 3) {
    return false;
  }

  if (!paciente.email || !paciente.email.includes('@')) {
    return false;
  }

  if (!paciente.pais || (paciente.pais !== 'US' && paciente.pais !== 'UK')) {
    return false;
  }

  return true;
};
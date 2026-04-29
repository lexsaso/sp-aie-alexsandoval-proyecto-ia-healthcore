import { Cita, Paciente } from '../types/models';

export const validarCitaHealthCore = (cita: Cita): boolean => {
    const ahora = new Date();

    if (cita.estado === 'programada' && cita.fecha < ahora) return false;
    if (cita.costo < 0) return false;

    return true;
};

export const validarCumplimiento = (paciente: Paciente): boolean => {
    if (paciente.pais === 'UK' && !paciente.cumpleGDPR) return false;
    return true;
};
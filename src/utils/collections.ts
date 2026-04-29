import { Cita, Paciente, Pais } from '../types/models';

/**
 * Busqueda binaria para encontrar pacientes por ID de forma eficiente.
 * Requisito: el array debe venir ordenado por id ascendente.
 */
export function buscarPacientePorId(pacientes: Paciente[], id: number): Paciente | null {
    let inicio = 0;
    let fin = pacientes.length - 1;

    while (inicio <= fin) {
        const medio = Math.floor((inicio + fin) / 2);
        if (pacientes[medio].id === id) return pacientes[medio];
        pacientes[medio].id < id ? (inicio = medio + 1) : (fin = medio - 1);
    }

    return null;
}

/**
 * Filtra citas por pais del paciente para evitar mezcla de regiones.
 */
export const filtrarPorRegion = (citas: Cita[], pacientes: Paciente[], region: Pais): Cita[] => {
    const pacientesOrdenados = [...pacientes].sort((a, b) => a.id - b.id);

    return citas.filter((cita) => {
        const paciente = buscarPacientePorId(pacientesOrdenados, cita.pacienteId);
        return paciente?.pais === region;
    });
};
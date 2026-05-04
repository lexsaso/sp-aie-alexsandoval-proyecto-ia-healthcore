import { Cita, Paciente, Pais } from '../types/models';

/**
 * Busqueda binaria para encontrar pacientes por ID de forma eficiente.
 * Requisito: el array debe venir ordenado por id ascendente.
 * Complejidad: O(log n)
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
 * Filtra citas por país del paciente para evitar mezcla de regiones.
 * Respeta la separation de datos geográficos (GDPR/HIPAA).
 * Complejidad: O(n log n) - ordenamiento + filtrado
 */
export const filtrarPorRegion = (citas: Cita[], pacientes: Paciente[], region: Pais): Cita[] => {
    const pacientesOrdenados: Paciente[] = [...pacientes].sort((a, b) => a.id - b.id);

    return citas.filter((cita): boolean => {
        const paciente: Paciente | null = buscarPacientePorId(pacientesOrdenados, cita.pacienteId);
        return paciente?.pais === region;
    });
};
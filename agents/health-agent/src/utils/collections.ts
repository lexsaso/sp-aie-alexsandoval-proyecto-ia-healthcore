import { Cita, Paciente, Pais } from '../types/models';

export function buscarPacientePorId(pacientes: Paciente[], id: number): Paciente | null {
  let inicio = 0;
  let fin = pacientes.length - 1;

  while (inicio <= fin) {
    const medio = Math.floor((inicio + fin) / 2);
    if (pacientes[medio].id === id) {
      return pacientes[medio];
    }
    if (pacientes[medio].id < id) {
      inicio = medio + 1;
    } else {
      fin = medio - 1;
    }
  }

  return null;
}

export const filtrarPorRegion = (citas: Cita[], pacientes: Paciente[], region: Pais): Cita[] => {
  const pacientesOrdenados: Paciente[] = [...pacientes].sort((a, b) => a.id - b.id);

  return citas.filter((cita): boolean => {
    const paciente: Paciente | null = buscarPacientePorId(pacientesOrdenados, cita.pacienteId);
    return paciente?.pais === region;
  });
};
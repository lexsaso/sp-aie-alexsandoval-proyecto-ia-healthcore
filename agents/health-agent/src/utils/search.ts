import { Paciente } from '../types/models';

export function busquedaLineal<T extends { id: number }>(array: T[], id: number): T | null {
  for (const item of array) {
    if (item.id === id) {
      return item;
    }
  }
  return null;
}

export function busquedaBinaria<T extends { id: number }>(array: T[], id: number): T | null {
  let inicio = 0;
  let fin = array.length - 1;

  while (inicio <= fin) {
    const medio = Math.floor((inicio + fin) / 2);
    if (array[medio].id === id) {
      return array[medio];
    }

    if (array[medio].id < id) {
      inicio = medio + 1;
    } else {
      fin = medio - 1;
    }
  }
  return null;
}

export function findPatientByName(pacientes: Paciente[], nombre: string): Paciente | null {
  for (const paciente of pacientes) {
    if (paciente.nombre.toLowerCase() === nombre.toLowerCase()) {
      return paciente;
    }
  }
  return null;
}

export function sortPatientsByName(pacientes: Paciente[]): Paciente[] {
  return [...pacientes].sort((a, b) => a.nombre.localeCompare(b.nombre));
}

export function sortPatientsByNameDesc(pacientes: Paciente[]): Paciente[] {
  return [...pacientes].sort((a, b) => b.nombre.localeCompare(a.nombre));
}

export function sortPatientsByIdAsc(pacientes: Paciente[]): Paciente[] {
  return [...pacientes].sort((a, b) => a.id - b.id);
}

export function sortPatientsByIdDesc(pacientes: Paciente[]): Paciente[] {
  return [...pacientes].sort((a, b) => b.id - a.id);
}
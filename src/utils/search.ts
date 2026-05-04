import { Paciente } from '../types/models';

/**
 * Busqueda lineal: revisa elemento por elemento.
 * Ideal para arrays sin ordenar.
 * Complejidad: O(n)
 */
export function busquedaLineal<T extends { id: number }>(array: T[], id: number): T | null {
    for (const item of array) {
        if (item.id === id) return item;
    }
    return null;
}

/**
 * Busqueda binaria: divide el array en mitades.
 * Requisito: el array debe estar ordenado por id.
 * Complejidad: O(log n)
 */
export function busquedaBinaria<T extends { id: number }>(array: T[], id: number): T | null {
    let inicio = 0;
    let fin = array.length - 1;

    while (inicio <= fin) {
        const medio = Math.floor((inicio + fin) / 2);
        if (array[medio].id === id) return array[medio];

        if (array[medio].id < id) {
            inicio = medio + 1;
        } else {
            fin = medio - 1;
        }
    }
    return null;
}

/**
 * Búsqueda lineal por nombre (case-insensitive).
 * Ideal para búsquedas por nombre sin ordenamiento previo.
 * Complejidad: O(n)
 */
export function findPatientByName(pacientes: Paciente[], nombre: string): Paciente | null {
    for (const paciente of pacientes) {
        if (paciente.nombre.toLowerCase() === nombre.toLowerCase()) {
            return paciente;
        }
    }
    return null;
}

/**
 * Ordenamiento de pacientes por nombre (A-Z ascendente).
 * Complejidad: O(n log n)
 */
export function sortPatientsByName(pacientes: Paciente[]): Paciente[] {
    return [...pacientes].sort((a, b) => a.nombre.localeCompare(b.nombre));
}

/**
 * Ordenamiento de pacientes por nombre (Z-A descendente).
 * Complejidad: O(n log n)
 */
export function sortPatientsByNameDesc(pacientes: Paciente[]): Paciente[] {
    return [...pacientes].sort((a, b) => b.nombre.localeCompare(a.nombre));
}

/**
 * Ordenamiento de pacientes por ID (ascendente).
 * Complejidad: O(n log n)
 */
export function sortPatientsByIdAsc(pacientes: Paciente[]): Paciente[] {
    return [...pacientes].sort((a, b) => a.id - b.id);
}

/**
 * Ordenamiento de pacientes por ID (descendente).
 * Complejidad: O(n log n)
 */
export function sortPatientsByIdDesc(pacientes: Paciente[]): Paciente[] {
    return [...pacientes].sort((a, b) => b.id - a.id);
}
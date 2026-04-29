/**
 * Busqueda lineal: revisa elemento por elemento.
 * Ideal para arrays sin ordenar.
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
import { Cita } from '../types/models';

/**
 * Interfaz para el reporte ejecutivo de HealthCore.
 * Responde a las necesidades de la Dra. Elena Rodríguez.
 */
export interface ReporteEjecutivo {
    totalCitas: number;
    tasaNoShow: string;
    tasaRechazo: string;
    ingresosNetos: string;
}

/**
 * Genera un reporte ejecutivo de citas para análisis operativo.
 * Métricas clave:
 * - Total de citas procesadas
 * - Tasa de no-show (pacientes que no asistieron)
 * - Tasa de rechazo por seguros
 * - Ingresos netos (solo citas pagadas)
 * 
 * Complejidad: O(n) - una pasada por el array
 */
export const generarReporteEjecutivo = (citas: Cita[]): ReporteEjecutivo | null => {
    const total: number = citas.length;
    if (total === 0) return null;

    const noShows: number = citas.filter((cita): boolean => cita.estado === 'no-show').length;
    const tasaNoShow: number = (noShows / total) * 100;

    const rechazadas: number = citas.filter((cita): boolean => cita.rechazadaPorSeguro).length;
    const tasaRechazo: number = (rechazadas / total) * 100;

    const ingresosTotales: number = citas.reduce(
        (acumulado: number, cita: Cita): number => acumulado + (cita.facturaPagada ? cita.costo : 0),
        0,
    );

    return {
        totalCitas: total,
        tasaNoShow: `${tasaNoShow.toFixed(2)}%`,
        tasaRechazo: `${tasaRechazo.toFixed(2)}%`,
        ingresosNetos: `$${ingresosTotales.toLocaleString()}`,
    };
};
import { Cita } from '../types/models';

export interface ReporteEjecutivo {
    totalCitas: number;
    tasaNoShow: string;
    tasaRechazo: string;
    ingresosNetos: string;
}

export const generarReporteEjecutivo = (citas: Cita[]): ReporteEjecutivo | null => {
    const total = citas.length;
    if (total === 0) return null;

    const noShows = citas.filter((cita) => cita.estado === 'no-show').length;
    const tasaNoShow = (noShows / total) * 100;

    const rechazadas = citas.filter((cita) => cita.rechazadaPorSeguro).length;
    const tasaRechazo = (rechazadas / total) * 100;

    const ingresosTotales = citas.reduce(
        (acumulado, cita) => acumulado + (cita.facturaPagada ? cita.costo : 0),
        0,
    );

    return {
        totalCitas: total,
        tasaNoShow: `${tasaNoShow.toFixed(2)}%`,
        tasaRechazo: `${tasaRechazo.toFixed(2)}%`,
        ingresosNetos: `$${ingresosTotales.toLocaleString()}`,
    };
};
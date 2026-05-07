import { Cita } from '../types/models';

export interface ReporteEjecutivo {
  totalCitas: number;
  tasaNoShow: string;
  tasaRechazo: string;
  ingresosNetos: string;
}

export const generarReporteEjecutivo = (citas: Cita[]): ReporteEjecutivo | null => {
  const total: number = citas.length;
  if (total === 0) {
    return null;
  }

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
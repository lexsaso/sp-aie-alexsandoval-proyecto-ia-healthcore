import { CitaMedica } from '../types/models';

export interface ReporteCitas {
    cantidadTotal: number;
    totalIngresos: number;
    promedioCosto: string;
    citaMasCara: CitaMedica;
}

export const generarReporteCitas = (citas: CitaMedica[]): ReporteCitas | null => {
    if (citas.length === 0) return null;

    const totalIngresos = citas.reduce((acc, cita) => acc + cita.costo, 0);
    const promedioCosto = totalIngresos / citas.length;
    const citaMasCara = citas.reduce((max, cita) => (cita.costo > max.costo ? cita : max), citas[0]);

    return {
        cantidadTotal: citas.length,
        totalIngresos,
        promedioCosto: promedioCosto.toFixed(2),
        citaMasCara,
    };
};
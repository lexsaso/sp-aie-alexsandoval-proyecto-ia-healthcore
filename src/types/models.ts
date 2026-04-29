export type Pais = 'US' | 'UK';
export type EstadoCita = 'programada' | 'completada' | 'no-show' | 'cancelada';

export interface Paciente {
    id: number;
    nombre: string;
    pais: Pais;
    email: string;
    fechaRegistro: Date;
    cumpleGDPR: boolean;
}

export interface Cita {
    id: number;
    pacienteId: number;
    clinicaId: number;
    especialidad: string;
    fecha: Date;
    estado: EstadoCita;
    costo: number;
    facturaPagada: boolean;
    rechazadaPorSeguro: boolean;
}
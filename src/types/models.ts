export interface Paciente {
    id: number;
    nombre: string;
    edad: number;
    genero: 'M' | 'F' | 'Otro';
    historialCompleto: boolean;
}

export interface CitaMedica {
    id: number;
    pacienteId: number;
    especialidad: string;
    fecha: Date;
    costo: number;
}
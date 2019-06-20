export class UsuarioModel {
    email: string;
    password: string;
}
export class EmpleadoModel {
    id: string; // Obtenida por google
    rut: string;
    nombre: string;
    apellidopaterno: string;
    apellidomaterno: string;
    sexo: string;
    fechaNac: string;
    domicilio: string;
    email: string;
    telefono: number;
}
export class DepartamentoModel {
    nombre: string;
    nombreJefe = 'jose';
}
export class ValoresModel {
    id: string;
}
export class SolicitudEmpleado {
    id: string;
    tipo: string;
    rut: string;
    fecha: string;
    horainicio: string;
    horatermino: string;
}
export class AusenciaModel {
    id: string;
    rut: string;
    fecha_inicio: string;
    fecha_termino: string;
    tipo: string;
    observacion: string;
}

export class RetrasoModel {
    id: string;
    rut: string;
    fecha: string;
    minutos: string;
    tipo: string;
    observacion: string;
}

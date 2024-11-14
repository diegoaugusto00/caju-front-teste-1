export interface Registration {
    id: string,
    email: string,
    employeeName: string,
    admissionDate: string,
    cpf: string,
    status: string,
}

export interface RegistrationPaginateResponse {
    data: Registration[]
    total: number;
    totalPages: number;
    currentPage: number;
}
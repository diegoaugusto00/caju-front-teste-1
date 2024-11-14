import type { Registration, RegistrationPaginateResponse } from "~/data/models/registration";

class RegistrationPaginatedMockBuilder {
    private data: Registration[] = [];
    private total: number = 0;
    private totalPages: number = 1;
    private currentPage: number = 1;


    addRegistration(id: string, email: string, employeeName: string, admissionDate: string, status: string, cpf: string): this {
        this.data.push({ id, email, employeeName, admissionDate, status, cpf });
        return this;
    }

    setTotal(total: number): this {
        this.total = total;
        return this;
    }

    setTotalPages(totalPages: number): this {
        this.totalPages = totalPages;
        return this;
    }

    setCurrentPage(currentPage: number): this {
        this.currentPage = currentPage;
        return this;
    }

    build(): RegistrationPaginateResponse {
        return {
            data: this.data,
            total: this.total,
            totalPages: this.totalPages,
            currentPage: this.currentPage
        };
    }
}

export default RegistrationPaginatedMockBuilder;

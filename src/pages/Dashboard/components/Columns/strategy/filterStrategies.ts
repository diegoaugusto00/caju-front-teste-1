import { STATUS } from '~/pages/Dashboard/constants';
import { IFilterStrategy } from './filterStrategyInterface';
import type { Registration } from '~/data/models/registration';


export class ApprovedFilterStrategy implements IFilterStrategy {
    filter(registrations: Registration[]): Registration[] {
        return registrations.filter((registration) => registration.status === STATUS.APPROVED); 
    }
}

export class ReviewFilterStrategy implements IFilterStrategy {
    filter(registrations: Registration[]): Registration[] {
        return registrations.filter((registration) => registration.status === STATUS.REVIEW);
    }
}

export class ReprovedFilterStrategy implements IFilterStrategy {
    filter(registrations: Registration[]): Registration[] {
        return registrations.filter((registration) => registration.status === STATUS.REPROVED);
    }
}

import { SimpleService } from './simple.service';

describe('Simple Service', () => {
    it( 'should class be created', () => {
        const service = new SimpleService();
        expect(service).toBeTruthy();
    });
});
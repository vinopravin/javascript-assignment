export class Restaurant {
    name: string;
    address: {
        street_name: string;
        locality: string;
        city: string;
        state: string;
        country: string;
    };
    cuisines: [string]
}
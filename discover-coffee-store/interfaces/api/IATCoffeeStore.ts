export interface IATFields {
    id: string;
    name: string;
    address: string;
    neighbourd: string;
    imageUrl: string;
    voting: number;
}
export interface IATCoffeeStore {
    fields: IATFields;
}
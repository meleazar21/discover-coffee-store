interface ILocation {
   address: string;
   address_extended: string;
   census_block: string;
   country: string;
   cross_street: string;
   dma: string;
   formatted_address: string;
   locality: string;
   postcode: string;
   region: string;
}
export interface ICoffeeStore {
   fsq_id: string;
   categories: Array<any>;
   chains: Array<any>;
   distance: number;
   geocodes: Array<any>;
   link: string;
   location: ILocation;
   name: string;
   related_places: object
   timezone: string;
   imageUrl: string;
}
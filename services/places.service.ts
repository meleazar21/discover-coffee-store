import { Headers } from "@/utils/headers.util";
import { API_PLACES_BUSSINESS_TYPE, API_PLACES_URL, UNSPLASH_KEY } from "@/constants/commonStrings.contants";
import { createApi } from 'unsplash-js';
import { ICoffeeStoreResponse } from "@/interfaces/ICoffeeStoreResponse";
import { ICoffeeStore } from "@/interfaces";

const unsplash = createApi({
    accessKey: UNSPLASH_KEY,
});

class PlacesService {

    async getListOfCoffeeStores(limit: number = 40) {
        const photos = await unsplash.search.getPhotos({
            query: API_PLACES_BUSSINESS_TYPE,
            page: 1,
            perPage: limit
        })
        const unsplashResult = await photos.response?.results.map(result => result.urls["small"]);
        return unsplashResult ?? [];
    }

    async getPlaces(latlong: string = "12.114849225752563,-86.23295953520532", limit: number = 30) {
        const photos = await this.getListOfCoffeeStores();
        const options = {
            method: "GET",
            headers: Headers
        };
        const request = await fetch(`${API_PLACES_URL}search?query=${API_PLACES_BUSSINESS_TYPE}&ll=${latlong}&limit=${limit}`, options)
        const result: ICoffeeStoreResponse = await request.json();
        return result.results.map((result: ICoffeeStore, index) => {
            return {
                ...result,
                imageUrl: photos[index]
            }
        });
    }
}
export const placesService = new PlacesService();
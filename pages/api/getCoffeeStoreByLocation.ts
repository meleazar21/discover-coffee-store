import { NextApiRequest, NextApiResponse } from "next";
import { placesService } from "../../services/places.service";
import { ParsedUrlQuery } from "querystring";

interface GetCoffeeStoreQuery extends ParsedUrlQuery {
    latLong: string;
    limit: string;
}

const getCoffeeStoreByLocation = async (request: NextApiRequest, response: NextApiResponse) => {
    try {
        const query = request.query as GetCoffeeStoreQuery;
        const { latLong, limit } = query;
        const res = await placesService.getPlaces(latLong, parseInt(limit));
        response.status(200).json(res);
    } catch (err) {
        console.log("this is an error: " + err);
        response.status(500).json({ message: "something went wrong" });
    }
}

export default getCoffeeStoreByLocation;
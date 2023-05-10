import { IATCoffeeStore } from "@/interfaces/api/IATCoffeeStore";
import { findRecordByFilter, getMinifiedRecords, table } from "@/services/airtable.service";
import { NextApiRequest, NextApiResponse } from "next";

const getCoffeeStoreById = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const id = req.query.id as string;
        if (!id) res.status(400).json({ message: "Id is missing" });

        const records = await findRecordByFilter(id);
        if (records.length) res.json(records);
        else res.json({ message: `id could not be found` });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
}

export default getCoffeeStoreById;
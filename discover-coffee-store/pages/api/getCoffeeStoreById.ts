import { IATCoffeeStore } from "@/interfaces/api/IATCoffeeStore";
import { findRecordByFilter, getMinifiedRecords, table } from "@/services/airtable.service";
import { NextApiRequest, NextApiResponse } from "next";

const getCoffeeStoreById = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const id = req.query.id as string;
        if (!id) res.status(400).json({ message: 'Id is missing' });

        if (!id) return res.status(400).json({ message: 'Id is missing' });

        const records = await findRecordByFilter(id);
        if (!records.length) return res.status(400).json({ message: 'record not found' });

        res.status(200).json(records);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "something went wrong", error });
    }
}

export default getCoffeeStoreById;
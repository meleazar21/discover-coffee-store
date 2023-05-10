import { IATCoffeeStore, IATFields } from "@/interfaces/api/IATCoffeeStore";
import { findRecordByFilter, getMinifiedRecords, table } from "@/services/airtable.service";
import { NextApiRequest, NextApiResponse } from "next";

const createCoffeeStore = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'POST') {
            const { id, name, neighbourd, imageUrl, address, voting } = req.body as IATFields;

            if (!id) return res.status(400).json({ message: 'Id is missing' });

            const records = await findRecordByFilter(id);
            if (records.length !== 0) {
                res.json(records);
            } else {
                if (!name) return res.status(400).json({ message: 'name is missing' });
                const createdRecord = await table.create([
                    {
                        fields: {
                            id,
                            name,
                            address,
                            neighbourd,
                            imageUrl,
                            voting
                        }
                    }
                ])
                const result = getMinifiedRecords(createdRecord);
                res.json(result);
            }
        }
    } catch (error) {
        res.status(500).json({ message: `Error creating or finding an store: ${error}` });
    }
}

export default createCoffeeStore;
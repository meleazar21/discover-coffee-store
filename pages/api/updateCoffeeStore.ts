import { IATCoffeeStore } from "@/interfaces/api/IATCoffeeStore";
import { IATUpdateCoffeeStore } from "@/interfaces/api/IATUpdateCoffeeStore.";
import { findRecordByFilter, table } from "@/services/airtable.service";
import { NextApiRequest, NextApiResponse } from "next";

const updateCoffeeStore = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method !== 'PUT') return res.status(400).json({ error: "Wrong Method type" });

        const { id } = req.body as IATUpdateCoffeeStore;
        if (id) {
            const records = await findRecordByFilter(id);

            if (records.length !== 0) {
                const record = records[0];
                const calculatedVoting = record.voting + 1;

                const response = await table.update(record.recordId,
                    {
                        voting: calculatedVoting
                    },
                );
                if (response) {
                    const minifiedRecord = response as IATCoffeeStore;
                    res.json(minifiedRecord);
                }
            }
            else {
                res.json({ message: 'Coffee Store does not exist' });
            }

        } else {
            res.status(400).json({ message: 'id does not exist' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error', error });
    }
}

export default updateCoffeeStore;
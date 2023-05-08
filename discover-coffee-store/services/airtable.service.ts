import { AIRTABLE_ACCESS_TOKEN, AIRTABLE_BASE_ID } from "@/constants/commonStrings.contants";
import { IATCoffeeStore } from "@/interfaces/api/IATCoffeeStore";

const Airtable = require('airtable');
const base = new Airtable({ apiKey: AIRTABLE_ACCESS_TOKEN }).base(AIRTABLE_BASE_ID);
const table = base('coffee-stores');


const getMinifiedRecord = (record: IATCoffeeStore) => {
    return {
        ...record.fields
    };
}

const getMinifiedRecords = (records: Array<IATCoffeeStore>) => {
    return records.map(item => getMinifiedRecord(item));
}

const findRecordByFilter = async (id: string) => {
    const findCoffeeStoreRecords = await table.select({
        filterByFormula: `id="${id}"`
    }).firstPage() as Array<IATCoffeeStore>;

    return getMinifiedRecords(findCoffeeStoreRecords);
}

export { table, getMinifiedRecords, findRecordByFilter };
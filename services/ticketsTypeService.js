import TicketTypeModel from "../models/TicketTypeModel.js";
import {
    getTicketsTypeCache,
    setTicketsTypeCache,
} from "../cache/ticketsTypeCache.js";

export async function getTicketsTypeService() {
    const cached = getTicketsTypeCache();
    if (cached) return cached;

    const data = await TicketTypeModel
        .find({ active: true },{ label: 1 })
        .sort({ label: 1 });

    setTicketsTypeCache(data);
    return data;
}
import { getTicketsTypeService} from "../services/ticketsTypeService.js";

export async function getTicketsTypeController(req, res, next) {
    try {
        const data = await getTicketsTypeService();
        res.json(data);
    } catch (err) {
        next(err);
    }
}
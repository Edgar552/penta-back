import prisma from "../lib/prisma.js";
import {generatePDF} from "../services/pdfService.js";

export async function createMembershipRequest(req, res) {
    try {

        //Default Data -------------------------------------------------------
        //Request Date
        const register_date = new Date();


        //-------------------------------------------------------
        const membershipRequest = await prisma.reg_elemento.create({
            data: {
                ...req.body,
                fecha_registro:register_date.toISOString().slice(0, 10),
                reclutamiento:Number(req.body.reclutamiento),
                codigo_postal:Number(req.body.codigo_postal),
                telefono:Number(req.body.telefono),
                id_renovacion: Number(req.body.id_renovacion),
                id_genero: Number(req.body.id_genero),
                id_lugar_nacimiento: Number(req.body.id_lugar_nacimiento),
                id_municipio: Number(req.body.id_municipio),
                id_ocupacion: Number(req.body.id_ocupacion),
                id_estado_civil: Number(req.body.id_estado_civil),
                id_grado_estudio: Number(req.body.id_grado_estudio),

                //Default tipo sanguineo a  - Pendiente
                id_tipo_sanguineo: 9,
                //Default zona a  - San Luis Potosi
                id_zona: 24,
                id_subzona: Number(req.body.id_subzona),
                id_grado: Number(req.body.id_grado),
                id_cuerpo: Number(req.body.id_cuerpo),
                id_cargo: Number(req.body.id_cargo),
            }
        });


        res.status(201).json({
            message: "Solicitud Creada Correctamente",
            membershipRequest
        });

    } catch (err) {
        console.error("Solicitud error:", err);

        res.status(400).json({
            error: err.message,
        });
    }
}


export async function getMemberships(req, res) {
    const page = Number(req.query.page) || 1;
    const limit = 25;
    const skip = (page - 1) * limit;

    const {
        search = "",
        subzona = "",
        grado = "",
        matricula = ""
    } = req.query;

    try {

        const where = {
            AND: [
                // búsqueda por nombre y apellidos
                search
                    ? {
                        OR: [
                            { nombre: { contains: search  } },
                            { ape_pat: { contains: search } },
                            { ape_mat: { contains: search } }
                        ]
                    }
                    : {},

                subzona
                    ? { id_subzona: Number(subzona) }
                    : {},
                // filtro por grado
                grado
                    ? { id_grado: Number(grado) }
                    : {},

                //  filtro por matrícula
                matricula
                    ? { matricula: { contains: matricula } }
                    : {}
            ]
        };

        const [memberships, total] = await Promise.all([
            prisma.reg_elemento.findMany({
                where,
                skip,
                take: limit,
                orderBy: {
                    id_elemento: 'desc'
                },
                include: {
                    grado: {
                        select: {
                            id_grado: true,
                            grado: true
                        }
                    },
                    subzona: {
                        select: {
                            id_subzona: true,
                            subzona: true
                        }
                    }
                }
            }),
            prisma.reg_elemento.count({ where }) // 🔥 importante para paginación correcta
        ]);

        res.json({
            data: memberships,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

export const generateMembershipPDF = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await prisma.reg_elemento.findUnique({
            where: { id_elemento: Number(id) },
            include: {
                renovacion: true,
                genero: true,
                municipio: true,
                estado_civil: true,
                ocupacion: true,
                grado_estudio: true,
                tipo_sanguineo: true,
                zona: true,
                subzona: true,
                grado: true,
                cuerpo: true,
                cargo: true
            }
        });

        if (!data) {
            return res.status(404).json({ error: "No encontrado" });
        }

        const pdf = await generatePDF(data);

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline");
        pdf.pipe(res);
        //return res.send(pdf);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error generando PDF" });
    }
};

export const getMembershipById = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await prisma.reg_elemento.findUnique({
            where: { id_elemento: Number(id) }
        });

        if (!data) return res.status(404).json({ error: "No encontrado" });

        res.json(data);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateMembership = async (req, res) => {
    try {
        const { id } = req.params;

        const updated = await prisma.reg_elemento.update({
            where: { id_elemento: Number(id) },
            data: {
                ...req.body,
                reclutamiento:Number(req.body.reclutamiento),
                codigo_postal:Number(req.body.codigo_postal),
                telefono:Number(req.body.telefono),
                id_renovacion: Number(req.body.id_renovacion),
                id_genero: Number(req.body.id_genero),
                id_lugar_nacimiento: Number(req.body.id_lugar_nacimiento),
                id_municipio: Number(req.body.id_municipio),
                id_ocupacion: Number(req.body.id_ocupacion),
                id_estado_civil: Number(req.body.id_estado_civil),
                id_grado_estudio: Number(req.body.id_grado_estudio),

                //Default tipo sanguineo a  - Pendiente
                id_tipo_sanguineo: 9,
                //Default zona a  - San Luis Potosi
                id_zona: 24,
                id_subzona: Number(req.body.id_subzona),
                id_grado: Number(req.body.id_grado),
                id_cuerpo: Number(req.body.id_cuerpo),
                id_cargo: Number(req.body.id_cargo),
            }
        });

        res.json(updated);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
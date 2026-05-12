import prisma from "../lib/prisma.js";

export const getCatalogs = async (req, res) => {
    try {
        const [
            renovacion,
            grados,
            cargos,
            cuerpos,
            generos,
            edo_civil,
            estudios,
            nacimiento,
            municipio,
            ocupacion,
            subzona

        ] = await Promise.all([
            prisma.cat_renovacion.findMany(),
            prisma.cat_grado.findMany(),
            prisma.cat_cargo.findMany(),
            prisma.cat_cuerpo.findMany(),
            prisma.cat_genero.findMany(),
            prisma.cat_estado_civil.findMany(),
            prisma.cat_grado_estudio.findMany(),
            prisma.cat_lugar_nacimiento.findMany(),
            prisma.cat_municipio.findMany(),
            prisma.cat_ocupacion.findMany(),
            prisma.cat_subzona.findMany(),
            prisma.cat_grado_estudio.findMany()


        ]);

        res.json({
            renovacion,
            grados,
            cargos,
            cuerpos,
            generos,
            edo_civil,
            estudios,
            nacimiento,
            municipio,
            ocupacion,
            subzona
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
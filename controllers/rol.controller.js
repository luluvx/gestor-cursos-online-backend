const db = require('../models');
const { sendError500, isRequestValid } = require('../utils/request.util');


exports.listRol = async (req, res) => {
    try {
        const roles = await db.roles.findAll();
        res.status(200).json(roles);
    } catch (error) {
        sendError500(res, error);
    }
}

exports.getRolById = async (req, res) => {
    const id = req.params.id;
    try {
        const rol = await db.roles.findByPk(id);

        if (!rol) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }

        res.status(200).json(rol);
    } catch (error) {
        sendError500(res, error);
    }
}

exports.createRol = async (req, res) => {
    const requiredFields = ['nombre']

    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }

    try {
        const { nombre } = req.body;

        const existingRol = await db.roles.findOne(
            { where: { nombre }}
        );

        if (existingRol) {
            return res.status(400).json({ message: 'El rol ya existe' });
        }

        const nuevoRol = await db.roles.create({ nombre });
        res.status(201).json(nuevoRol);

    } catch (error) {
        sendError500(res, error);
    }

}

exports.updateRol= async (req, res) => {
    const id = req.params.id;

    try {
        const rol = await getRolOr404(id,res);
        if (!rol) {
            return;
        }
        const requiredFields = ['nombre']

        if (!isRequestValid(requiredFields, req.body, res)) {
            return;
        }

        const { nombre } = req.body;

        const rolExist = await db.roles.findOne({
            where: {
                nombre: nombre,
                id: {
                    [db.Sequelize.Op.ne]: id
                }
            }
        });

        if (rolExist) {
            return res.status(400).json({ message: 'Ya existe otro rol con ese nombre' });
        }

        rol.nombre = nombre;
        await rol.save();

        res.status(200).json(rol);
    } catch (error) {
        sendError500(res, error);
    }
}

exports.deleteRol = async (req, res) => {
    const id = req.params.id;

    try {
        const rol = await db.roles.findByPk(id);
        if (!rol) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        await rol.destroy();
        res.status(200).json({ message: 'Rol eliminado' });
    } catch (error) {
        sendError500(res, error);
    }
}

async function getRolOr404(id,res){
    const rol = await db.roles.findByPk(id);
    if (!rol) {
        res.status(404).json({
            message: 'Rol no encontrado'
        });
        return;
    }
    return rol;
}

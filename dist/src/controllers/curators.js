import prisma from "../prisma.js";
export const getCurators = async (req, res, next) => {
    const curators = await prisma.curator.findMany();
    res.status(200).json({ curators });
};
export const deleteCurator = async (req, res, next) => {
    const id = parseInt(req.params.id);
    await prisma.curator.delete({
        where: {
            id
        }
    });
    res.sendStatus(204);
};
export const getCourses = async (req, res, next) => {
    const curatorId = parseInt(req.user.id);
    console.log(curatorId);
    const courses = await prisma.course.findMany({
        where: { curatorId }
    });
    res.status(200).json({ courses });
};

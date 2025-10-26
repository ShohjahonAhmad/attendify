import { RequestHandler } from "express";
import prisma from "../prisma.js";

export const getCourses: RequestHandler = async (req, res, next) => {
    const courses = await prisma.course.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    res.status(200).json({courses})
}

export const createCourse: RequestHandler = async (req, res, next) => {
    const curatorId = req.user.id;
    console.log(curatorId)
    const course = await prisma.course.create({
        data: {...req.body, curatorId}
    });

    res.status(201).json({course});
}

export const getCourse: RequestHandler = async (req, res, next) => {
    const courseId = parseInt(req.params.id);

    const course = await prisma.course.findUnique({
        where: {id: courseId}
    });

    if(!course) {
        res.status(404).json({error: "Course not found"});
        return;
    }

    res.status(200).json({course});
}

export const updateCourse: RequestHandler = async (req, res, next) => {
    const courseId = parseInt(req.params.id);

    const course = await prisma.course.update({
        where:{id: courseId},
        data: req.body
    })

    res.status(200).json({course})
}

export const deleteCourse: RequestHandler = async (req, res, next) => {
    const courseId = parseInt(req.params.id);

    await prisma.course.delete({
        where: {
            id: courseId
        }
    })

    res.sendStatus(204);
}
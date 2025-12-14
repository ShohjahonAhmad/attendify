import { RequestHandler } from "express";
import prisma from "../prisma.js";
import {randomUUID} from "crypto";


export const getCourses: RequestHandler = async (req, res, next) => {
    const courses = await prisma.course.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    res.status(200).json({courses});
}

export const createCourse: RequestHandler = async (req, res, next) => {
    const curatorId = req.user.id;
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
    });

    res.status(200).json({course});
}

export const deleteCourse: RequestHandler = async (req, res, next) => {
    const courseId = parseInt(req.params.id);

    await prisma.course.delete({
        where: {
            id: courseId
        }
    });

    res.sendStatus(204);
}

export const createAttendance: RequestHandler = async (req, res, next) => {
    const courseId = parseInt(req.params.id);

    const course = await prisma.course.findUnique({
        where: {
            id: courseId
        }
    });

    if(req.user.id !== course?.curatorId){
        res.status(403).json({error: "Forbidden"});
        return;
    }
    const token = randomUUID();
    const attendance = await prisma.attendance.create({
        data: {
            courseId,
            qrCode: {
                create : {
                    code: token,
                }
            }
        },
        include: {
            qrCode: true
        }
    });

    res.json({attendance});
}

export const getAttendances: RequestHandler = async (req, res, next) => {
    const courseId = parseInt(req.params.id);
    const course = await prisma.course.findUnique({
        where: {
            id: courseId
        }
    });

    if(!course){
        res.status(404).json({error: "Course not found"});
        return;
    }

    if(course.curatorId !== req.user?.id){
        res.status(403).json({error: "Forbidden"});
        return;
    }

    const attendances = await prisma.attendance.findMany({
        where: {
            courseId
        },
        include: {
            qrCode: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    res.status(200).json({attendances});
}

export const getAttendance: RequestHandler = async (req, res, next) =>{
    const courseId = parseInt(req.params.id);

    const course = await prisma.course.findUnique({
        where: {
            id: courseId
        }
    });

    if(req.user.id !== course?.curatorId){
        res.status(403).json({error: "Forbidden"});
        return;
    }

    const attendanceId = parseInt(req.params.ID);

    const attendance = await prisma.attendance.findFirst({
        where:{
            id: attendanceId,
            courseId: courseId
        },
        include: {
            qrCode: true
        }
    })

    if(!attendance){
        res.status(404).json({error: "Attendance not found"});
        return;
    }

    res.status(200).json({attendance});
}

export const deleteAttendance: RequestHandler = async (req, res, next) => {
    const courseId = parseInt(req.params.id);

    const course = await prisma.course.findUnique({where: {id: courseId}});

    if(req.user.id !== course?.curatorId){
        res.status(403).json({error: "Forbidden"});
        return;
    }
    const attendanceId = parseInt(req.params.ID);
    await prisma.attendance.delete({
        where: {
            id: attendanceId,
            courseId,
        }
    })

    res.sendStatus(204);
}

export const handleSSE: RequestHandler = async (req, res, next) => {
    const attendanceId = parseInt(req.params.ID);

    const sendAttendance = async () => {
        try {
          const attendance = await prisma.attendance.findUnique({
            where: { id: attendanceId },
            include: {
              students: {
                select: { firstName: true, lastName: true, uniqueIdentifier: true, id: true }
              }
            }
          });
          res.write(`event: attendanceUpdate\ndata: ${JSON.stringify(attendance)}\n\n`);
        } catch (err) {
          console.error('SSE DB error', err);
          res.write(`event: error\ndata: Failed to fetch student list\n\n`);
        }
      };
    //Set headers to inform client to keep connection alive and server is sending event-stream data
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    res.write(`event: connected\ndata: Connected to server\n\n`);

    sendAttendance();

    const intervalId = setInterval(sendAttendance, 5000);

    res.on('close', () => {
        clearInterval(intervalId);
        res.end();
    })
}


import type { Request, Response } from "express";
import { pool } from "../../db";
import { userService } from "./user.service";

//get all user
const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllUsersFromDB();

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not found!",
            });
        }

        res.status(200).json({
            success: true,
            message: "Users retrived successfully.",
            data: result.rows
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error
        })
    }
}

//get single user
const getSingleUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await userService.getSingleUserFromDB(id as string);

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not found!",
            });
        }

        res.status(200).json({
            success: true,
            message: "User retrived successfully.",
            data: result.rows[0]
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error
        })
    }
}

//create user
const createUser = async (req: Request, res: Response) => {
    try {
        // console.log(req.body);

        const result = await userService.createUserIntoDB(req.body);

        res.status(201).json({
            success: true,
            message: "User created successfully!",
            data: result.rows
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error
        });
    }
}

//update user
const updateUser = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;

        const result = await userService.updateUserFromDB(req.body, id as string);

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not found!",
            });
        }

        res.status(200).json({
            success: true,
            message: "User data updated successfully!",
            data: result.rows[0]
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error
        });
    }
}

//delete user
const deleteUser = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;

        const result = await userService.deleteUserFromDB(id as string);

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not found!",
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error
        });
    }
}

export const userController = {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
}
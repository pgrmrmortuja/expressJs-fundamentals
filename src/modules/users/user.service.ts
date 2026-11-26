import { pool } from "../../db";
import type { IUser } from "./user.interface";

//get all user
const getAllUsersFromDB = async () => {
    const result = await pool.query(`
            SELECT * FROM users
            `);

    return result;
}

//get single user
const getSingleUserFromDB = async (id: string) => {
    const result = await pool.query(`
            SELECT * FROM users WHERE id=$1 
            `, [id]);

    return result;
}

//create user
const createUserIntoDB = async (payload: IUser) => {
    const { name, email, age, password } = payload;

    const result = await pool.query(`
            INSERT INTO users (name, email, age, password) VALUES ($1, $2, $3, $4) RETURNING *
        ` , [name, email, age, password]);

    return result;
}

//update user

//delete user

export const userService = {
    getAllUsersFromDB,
    getSingleUserFromDB,
    createUserIntoDB
}
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
const updateUserFromDB = async (payload: IUser, id: string) => {
    const { name, age, password, is_Active } = payload;

    const result = await pool.query(`
            UPDATE users
            SET
            name = COALESCE($1, name),
            age = COALESCE($2, age),
            password = COALESCE($3, password),
            is_Active = COALESCE($4, is_Active),
            updated_at = NOW()

            WHERE id=$5 RETURNING *
            `, [name ?? null, age ?? null, password ?? null, is_Active ?? null, id])

    return result;
}

//delete user
const deleteUserFromDB = async (id: string) => {
    const result = await pool.query(`
            DELETE FROM users WHERE id=$1
            `, [id])

    return result;
}

export const userService = {
    getAllUsersFromDB,
    getSingleUserFromDB,
    createUserIntoDB,
    updateUserFromDB,
    deleteUserFromDB
}
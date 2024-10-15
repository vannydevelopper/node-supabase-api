const express = require("express");
// const Validation = require("../../class/Validation");
const RESPONSE_STATUS = require('../../constants/RESPONSE_STATUS');
const RESPONSE_CODES = require('../../constants/RESPONSE_CODES');
const { supabase } = require("../../utils/supabase");
// const md5 = require("md5");
// const generateToken = require("../../utils/generateToken");


const getAllData = async (req, res) => {
    try {
        const user = await supabase.from('users').select('*')
        res.status(RESPONSE_CODES.CREATED).json({
            statusCode: RESPONSE_CODES.CREATED,
            httpStatus: RESPONSE_STATUS.CREATED,
            message: "Listes des utilisateurs",
            result: user,
        });
    }
    catch (error) {
        console.log(error);
        res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: RESPONSE_CODES.INTERNAL_SERVER_ERROR,
            httpStatus: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
            message: "Erreur interne du serveur, réessayer plus tard",
        });
    }
};


const createUsers = async (req, res) => {
    try {
        const { name, prenom, email, password } = req.body
        // Validation des données d'entrée
        if (!name || !prenom || !email || !password) {
            return res.status(RESPONSE_CODES.BAD_REQUEST).json({
                statusCode: RESPONSE_CODES.BAD_REQUEST,
                httpStatus: RESPONSE_STATUS.BAD_REQUEST,
                message: "Tous les champs sont requis.",
            });
        }

        const user = await supabase.from('users').insert([{ name, prenom, email, password }])
        res.status(RESPONSE_CODES.CREATED).json({
            statusCode: RESPONSE_CODES.CREATED,
            httpStatus: RESPONSE_STATUS.CREATED,
            message: "Utilisateur créé avec succès.",
            result: user.data,
        });
    }
    catch (error) {
        console.log(error);
        res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: RESPONSE_CODES.INTERNAL_SERVER_ERROR,
            httpStatus: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
            message: "Erreur interne du serveur, réessayer plus tard",
        });
    }
};

const deleteUsers = async (req, res) => {
    try {
        const { id_users } = req.params
        console.log(id_users)
        const user = await supabase.from('users').delete().eq('id', id_users);
        console.log(user)
        res.status(RESPONSE_CODES.CREATED).json({
            statusCode: RESPONSE_CODES.CREATED,
            httpStatus: RESPONSE_STATUS.CREATED,
            message: "la suppression a ete faites avec succes",
        });
    }
    catch (error) {
        console.log(error);
        res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: RESPONSE_CODES.INTERNAL_SERVER_ERROR,
            httpStatus: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
            message: "Erreur interne du serveur, réessayer plus tard",
        });
    }
};

module.exports = {
    getAllData,
    createUsers,
    deleteUsers
}
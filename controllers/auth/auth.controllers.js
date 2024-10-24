const express = require("express");
// const Validation = require("../../class/Validation");
const RESPONSE_STATUS = require('../../constants/RESPONSE_STATUS');
const RESPONSE_CODES = require('../../constants/RESPONSE_CODES');
const { supabase } = require("../../utils/supabase");
// const generateToken = require("../../utils/generateToken");


const loginUsers = async (req, res) => {
    try {
        const { email, password } = req.body
        // Validation des données d'entrée
        if (!email || !password) {
            return res.status(RESPONSE_CODES.BAD_REQUEST).json({
                statusCode: RESPONSE_CODES.BAD_REQUEST,
                httpStatus: RESPONSE_STATUS.BAD_REQUEST,
                message: "Tous les champs sont requis.",
            });
        }
        // Récupérer l'utilisateur avec l'e-mail correspondant
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single(); // Utiliser .single() pour obtenir un seul utilisateur

        if(!error || user){
            if (password !== user.password) {
                return res.status(RESPONSE_CODES.UNAUTHORIZED).json({
                    statusCode: RESPONSE_CODES.UNAUTHORIZED,
                    httpStatus: RESPONSE_STATUS.UNAUTHORIZED,
                    message: "Identifiants invalides.",
                });
            }
            res.status(RESPONSE_CODES.OK).json({
                statusCode: RESPONSE_CODES.OK,
                httpStatus: RESPONSE_STATUS.OK,
                message: "Connexion réussie.",
                result: user,
            });
        }else{
            return res.status(RESPONSE_CODES.UNAUTHORIZED).json({
                statusCode: RESPONSE_CODES.UNAUTHORIZED,
                httpStatus: RESPONSE_STATUS.UNAUTHORIZED,
                message: "Identifiants invalides.",
            });
        }
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

const getAllData = async (req, res) => {
    try {
        const user = await supabase.from('livres').select('*, auteur(id, nom, prenom,telophone,email)');
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
    deleteUsers,
    loginUsers
}
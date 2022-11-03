import { Pool } from 'pg'

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'admin123',
    port: 5432,
})
const getUsers = (request, response) => {
    pool.query('SELECT * FROM eltanin.usuario ORDER BY id_usuario', (error, results) => {
        if (error) {
            throw error
        }
        response.header("Access-Control-Allow-Origin", "http://localhost:3000");
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM eltanin.usuario WHERE id_usuario = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.header("Access-Control-Allow-Origin", "http://localhost:3000");
        response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const { name, email } = request.body

    pool.query('INSERT INTO eltanin.usuario (nome, email) VALUES ($1, $2)', [name, email], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${result.insertId}`)
    })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body

    pool.query(
        'UPDATE eltanin.usuario SET nome = $1, email = $2 WHERE id_usuario = $3',
        [name, email, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM eltanin.usuario WHERE id_usuario = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}
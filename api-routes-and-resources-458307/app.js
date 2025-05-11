const express = require('express');
const port = 3000;
const app = express();

app.use(express.json());

let livros = [];
let usuarios = [];

app.post('/livros', (req, res) => {
    const { titulo, autor, ano, paginas } = req.body;
    const novoLivro = { id: livros.length + 1, titulo, autor, ano, paginas };
    livros.push(novoLivro);
    res.status(201).json(novoLivro);
});

app.get('/livros', (req, res) => {
    res.json(livros);
});

app.get('/livros/:id', (req, res) => {
    const livro = livros.find(l => l.id == req.params.id);
    livro ? res.json(livro) : res.status(404).json({ erro: 'Livro não encontrado' });
});

app.put('/livros/:id', (req, res) => {
    const livro = livros.find(l => l.id == req.params.id);
    if (livro) {
        Object.assign(livro, req.body);
        res.json(livro);
    } else {
        res.status(404).json({ erro: 'Livro não encontrado' });
    }
});


app.delete('/livros/:id', (req, res) => {
    livros = livros.filter(l => l.id != req.params.id);
    res.status(204).send();
});

app.post('/usuarios', (req, res) => {
    const { nome, email, dataInscricao } = req.body;
    const novoUsuario = { id: usuarios.length + 1, nome, email, dataInscricao };
    usuarios.push(novoUsuario);
    res.status(201).json(novoUsuario);
});

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.get('/usuarios/:id', (req, res) => {
    const usuario = usuarios.find(u => u.id == req.params.id);
    usuario ? res.json(usuario) : res.status(404).json({ erro: 'Usuário não encontrado' });
});

app.put('/usuarios/:id', (req, res) => {
    const usuario = usuarios.find(u => u.id == req.params.id);
    if (usuario) {
        Object.assign(usuario, req.body);
        res.json(usuario);
    } else {
        res.status(404).json({ erro: 'Usuário não encontrado' });
    }
});

app.delete('/usuarios/:id', (req, res) => {
    usuarios = usuarios.filter(u => u.id != req.params.id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
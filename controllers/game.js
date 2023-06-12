const express = require('express');

const { Game, User } = require('../models');
const { authenticateToken } = require('../middleware');

const gameRouter = express.Router();

gameRouter.get('/', authenticateToken, async (req, res) => {
    try {
        const currentUser = await User.findByPk(req.user.id);
    
        const games = await Promise.all([
            currentUser.getGuessedGames(), 
            currentUser.getQuestionedGames(),
        ]);
    
        res.status(200).json(games.flat());
    } catch (error) {
        res.status(500).json({ error });
    }
});

gameRouter.post('/', authenticateToken, async (req, res) => {
    const { oponentId, maxGuessCount, word } = req.body;

    try {
        const guesser = await User.findByPk(oponentId);
        const currentUser = await User.findByPk(req.user.id);

        if (!guesser) throw new Error('User not found');

        const game = await Game.create({ 
            guesserId: guesser.id, 
            questionerId: currentUser.id,
            word,
            maxGuessCount,
            guessedLetters: '',
        });

        res.status(200).json({ game });
    } catch (error) {
        res.status(500).json({ error });
    }
});

gameRouter.post('/guess_letter/:gameId', authenticateToken, async (req, res) => {
    const { gameId } = req.params;
    const { letter } = req.body;

    try {
        const currentUser = await User.findByPk(req.user.id);
        const game = await Game.findByPk(gameId);
    
        if (game.questionerId === currentUser.id) {
            const currentLetters = game.guessedLetters.split(',');
            if (game.guessedLetters === '') currentLetters.pop();
    
            if (currentLetters.includes(letter)) {
                res.status(500).json({ error: { message: 'Letter already guessed' }});
            } else {
                currentLetters.push(letter);
                game.guessedLetters = currentLetters.join();
                await game.save();
    
                res.status(200).json({ game });
            }
        } else {
            res.status(401);
        }
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = { gameRouter };
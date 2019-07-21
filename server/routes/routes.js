const router = require('express').Router();
const { Register } = require('../controllers/userControllers');
const { Login } = require('../controllers/loginControllers');
const {
    createPost,
    getPosts,
    deletePost,
    editPost
} = require('../controllers/postControllers');

router.post('/register', Register);

router.post('/login', Login);

router.post('/posts', createPost);
router.get('/posts', getPosts);
router.delete('/posts', deletePost);
router.put('/posts', editPost);

module.exports = router;
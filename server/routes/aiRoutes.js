const router = require('express').Router();
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/query', verifyToken, async (req, res) => {
    try {
        const { prompt } = req.body;
        const role = req.user.role;

        // Custom contextual smart-responses depending on SSO role
        let aiResponse = "";
        if (role === 'student') {
            aiResponse = `[Student AI Assistant]: Here is help regarding your query "${prompt}". Remember to review your upcoming assignments and check the portal calendar for due dates!`;
        } else if (role === 'teacher') {
            aiResponse = `[Teacher AI Assistant]: Assisting with curriculum planning and grading for query: "${prompt}". Suggested grading rubric templates are ready.`;
        } else if (role === 'parent') {
            aiResponse = `[Parent Support AI]: Regarding "${prompt}", your child's recent attendance and psychomotor performance records are updated on your dashboard.`;
        } else {
            aiResponse = `[Admin AI Core]: System diagnostic and administrative automated query processed for: "${prompt}".`;
        }

        res.json({ response: aiResponse });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

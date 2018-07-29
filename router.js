const Auth = require('./controllers/auth');
const Question = require('./controllers/questions');
const Report = require('./controllers/reports');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = function (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err); 
    }
    if (!user) {
      return res.status(401).json(info);
    }
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = (app) => {
  app.post('/reports', requireAuth, Report.createReport);
  app.get('/reports', requireAuth, Report.getReports);
  app.get('/reports/:year/:month/:date/:time', requireAuth, Report.getReportByDate);
  app.put('/reports/:id', requireAuth, Report.updateReport);
  
  app.delete('/questions/:delete', requireAuth, Question.deleteQuestion);
  app.put('/questions/:id', requireAuth, Question.updateQuestion);
  app.get('/questions/:id', requireAuth, Question.getQuestion);
  app.get('/questions', requireAuth, Question.getQuestions);
  app.post('/questions', requireAuth, Question.addQuestion);

  app.post('/signin', requireSignin, Auth.signin);
  app.post('/signup', Auth.signup);
}

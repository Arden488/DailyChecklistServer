const Report = require('../models/report');

exports.getReports = (req, res) => {
  Report.find({}, (err, items) => {
    if (err) res.sendStatus(500);
    else res.status(200).send({ items });
  });
}

exports.getReport = (req, res) => {
  Report.findById(req.params.id, (err, item) => {
    if (err) res.sendStatus(500);
    else res.status(200).send(item);
  });
}

exports.getReportByDate = (req, res) => {
  const dateStr = `${req.params.year}-${req.params.month}-${req.params.date}`;
  Report.find({ date: 
    {
      '$gte': new Date(`${dateStr}T00:00:00.000Z`), 
      '$lt': new Date(`${dateStr}T23:59:59.990Z`)
    } 
  }, (err, item) => {
    if (err) res.sendStatus(500);
    else res.status(200).send(item);
  });
}

exports.deleteReport = (req, res) => {
  Report.remove({ _id: req.params.delete }, (err) => {
    if (err) res.sendStatus(500);
    else res.sendStatus(200)
  });
}

exports.updateReport = (req, res) => {
  const data = {
    date: req.body.date,
    answers: []
  }

  req.body.answers.forEach(answer => {
    const answerData = {
      label: answer.label,
      fieldType: answer.type,
      value: answer.value,
      options: {}
    };

    if (answer.options.range)
      answerData.options.range = answer.options.range;

    if (answer.options.badEndsOn)
      answerData.options.badEndsOn = answer.options.badEndsOn;

    if (answer.options.goodStartsOn)
      answerData.options.goodStartsOn = answer.options.goodStartsOn;

    if (answer.options.values) {
      answerData.options.values = [];

      answer.options.values.forEach(value => {
        answerData.options.values.push({
          key: value.key,
          label: value.label,
          value: value.value,
          color: value.color
        })
      });
    }

    data.answers.push(answerData);
  });

  Report.findById(req.params.id, (err, item) => {
    Object.keys(data).forEach(el => {
      if (item[el] !== data[el])
        item[el] = data[el];
    });

    item.save(err => {
      if (err) res.sendStatus(500);
      else res.sendStatus(200)
    })
  });
}

exports.createReport = (req, res, next) => {
  const data = {
    date: req.body.date,
    answers: []
  }

  req.body.answers.forEach(answer => {
    const answerData = {
      label: answer.label,
      fieldType: answer.type,
      value: answer.value,
      options: {}
    };

    if (answer.options.range)
      answerData.options.range = answer.options.range;

    if (answer.options.badEndsOn)
      answerData.options.badEndsOn = answer.options.badEndsOn;

    if (answer.options.goodStartsOn)
      answerData.options.goodStartsOn = answer.options.goodStartsOn;

    if (answer.options.values) {
      answerData.options.values = [];

      answer.options.values.forEach(value => {
        answerData.options.values.push({
          key: value.key,
          label: value.label,
          value: value.value,
          color: value.color
        })
      });
    }

    data.answers.push(answerData);
  });
  
  if (!data.date || (data.answers.length === 0)) {
    return res.status(422).send({ error: 'Some fields are missing' });
  }

  const report = new Report(data);

  report.save(err => {
    if (err) return next(err);
    else return res.sendStatus(200);

    // return next();
  });
};

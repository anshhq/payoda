'use strict';

const routes = require('express').Router();
const noSql = new (require('../lib/noSql.js'))();
const apiError = 'error in api';

/**
 * Client wants to know list of employees in each department
 */
routes.get('/byDepartment', (req, res) => {
  try {
    noSql.findEmployeesByDepartment().then(
      (data) => {
        res.status(200).json(data);
        res.end();
      },
      (error) => {
        res.status(200).json(error);
        res.end();
      }
    );
  } catch {
    res.status(200).json({ error: apiError });
    res.end();
  }
});

/**
 * Client wants a screen to find list of employees reporting directly to a given manager and through supervisors reporting to him
 */
routes.get('/byManager/:id', (req, res) => {
  try {
    noSql.findEmployeesByReportingStructure(parseInt(req.params.id)).then(
      (data) => {
        res.status(200).json(data);
        res.end();
      },
      (error) => {
        res.status(200).json(error);
        res.end();
      }
    );
  } catch {
    res.status(200).json({ error: apiError });
    res.end();
  }
});

module.exports = routes;

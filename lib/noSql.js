'use strict';

const mongojs = require('mongojs');

const dbHost = 'localhost';
const dbPort = 27017;
const dbName = 'local';
const dbError = 'error in nosql';
const employeesCollection = 'flatemployees';
const listDepartment = ['IT', 'Operations', 'Finance', 'HRD'];

class noSql {
  constructor() {
    this.dbHost = dbHost;
    this.dbPort = dbPort;
    this.dbName = dbName;
    this.noSql = mongojs(`${this.dbHost}:${this.dbPort}/${this.dbName}`);
    this.employeesCollection = employeesCollection;
    this.listDepartment = listDepartment;
    this.noSql.on('error', function (err) {
      console.log(dbError, err);
    });
  }

  /**
   * Client wants to know list of employees in each department
   */
  findEmployeesByDepartment = async () => {
    const respObj = {};

    const findByDepartment = async (d) => {
      // const query = { $and: [{ department: d }, { isManager: false }, { isSupervisor: false }, { $or: [{ managerId: { $ne: null } }, { supervisorId: { $ne: null } }] }] };
      const query = { department: d };
      const r = [];
      try {
        return new Promise(async (resolve, reject) => {
          await this.noSql[this.employeesCollection].find(query).forEach(async (err, doc) => {
            if (doc) {
              let eObj = { id: doc.id, name: doc.name };
              if (doc.isManager) {
                eObj.isManager = true;
              } else if (doc.isSupervisor) {
                eObj.isSupervisor = true;
              }
              r.push(eObj);
            } else if (!doc) {
              resolve(r);
            } else if (err) {
              reject(dbError);
            }
          });
        });
      } catch (err) {
        reject(dbError);
      }
    };

    for (const d of this.listDepartment) {
      await findByDepartment(d).then((r) => {
        respObj[d] = r;
      });
    }
    return respObj;
  };

  /**
   * Client wants a screen to find list of employees reporting directly to a given manager and through supervisors reporting to him
   */
  findEmployeesByReportingStructure = async (managerId) => {
    const respObj = {};

    const findManager = async (id) => {
      const query = { $and: [{ id: id }, { isManager: true }, { isSupervisor: false }, { supervisorId: null }, { managerId: null }] };
      try {
        return new Promise(async (resolve, reject) => {
          await this.noSql[this.employeesCollection].findOne(query, (err, doc) => {
            if (doc) {
              resolve(doc);
            } else {
              reject(dbError);
            }
          });
        });
      } catch (err) {
        reject(dbError);
      }
    };

    const findEmployeesByDirectManager = async (id) => {
      const query = { $and: [{ managerId: id }, { isManager: false }, { isSupervisor: false }, { supervisorId: null }] };
      const employees = [];

      try {
        return new Promise(async (resolve, reject) => {
          await this.noSql[this.employeesCollection].find(query).forEach(async (err, doc) => {
            if (doc) {
              let eObj = { id: doc.id, name: doc.name, department: doc.department };
              employees.push(eObj);
            } else if (!doc) {
              resolve(employees);
            } else if (err) {
              reject(dbError);
            }
          });
        });
      } catch (err) {
        reject(dbError);
      }
    };

    const findSupervisors = async (id) => {
      const query = { $and: [{ isManager: false }, { isSupervisor: true }, { managerId: id }, { supervisorId: null }] };
      const supervisors = [];

      try {
        return new Promise(async (resolve, reject) => {
          await this.noSql[this.employeesCollection].find(query).forEach(async (err, doc) => {
            if (doc) {
              let eObj = { id: doc.id, name: doc.name, department: doc.department, staff: [] };
              supervisors.push(eObj);
            } else if (!doc) {
              for (let supervisor of supervisors) {
                supervisors.find((o) => o.id === supervisor.id).staff = await findEmployeesBySupervisor(supervisor.id);
              }
              resolve(supervisors);
            } else if (err) {
              reject(dbError);
            }
          });
        });
      } catch (err) {
        reject(dbError);
      }
    };

    const findEmployeesBySupervisor = async (id) => {
      const query = { $and: [{ supervisorId: id }, { isManager: false }, { isSupervisor: false }, { managerId: null }] };
      const employees = [];

      try {
        return new Promise(async (resolve, reject) => {
          await this.noSql[this.employeesCollection].find(query).forEach(async (err, doc) => {
            if (doc) {
              let eObj = { id: doc.id, name: doc.name, department: doc.department };
              employees.push(eObj);
            } else if (!doc) {
              resolve(employees);
            } else if (err) {
              reject(dbError);
            }
          });
        });
      } catch (err) {
        reject(dbError);
      }
    };

    await findManager(managerId).then(async (res) => {
      respObj.id = res.id;
      respObj.name = res.name;
      respObj.department = res.department;
      respObj.staff = await findEmployeesByDirectManager(res.id);
      respObj.supervisors = await findSupervisors(managerId);
    });

    return respObj;
  };
}

module.exports = noSql;

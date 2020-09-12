
## PROBLEM STATEMENT
The client is a leading manufacturing firm having around 1,50,000 employees. Client wants to know list of employees in each department. Most of the employees work in a single department but some employees are shared between multiple departments. Some departments have supervisors and some departments have managers. Supervisors report to managers.

Client wants a screen to find list of employees reporting directly to a given manager and through supervisors reporting to him. 


## SOLUTION
[**Previous code** is here](https://github.com/anshhq/payoda/tree/develop), https://github.com/anshhq/payoda/tree/develop
### Client wants to know list of employees in each department
[http://localhost:3000/api/employees/bydepartment](http://localhost:3000/api/employees/bydepartment)

### Client wants a screen to find list of employees reporting directly to a given manager
 1. [http://localhost:3000/api/employees/bymanager/1](http://localhost:3000/api/employees/bymanager/1)
 1. [http://localhost:3000/api/employees/bymanager/2](http://localhost:3000/api/employees/bymanager/2)
 1. [http://localhost:3000/api/employees/bymanager/3](http://localhost:3000/api/employees/bymanager/3)
 1. [http://localhost:3000/api/employees/bymanager/8](http://localhost:3000/api/employees/bymanager/8)
 1. [http://localhost:3000/api/employees/bymanager/14](http://localhost:3000/api/employees/bymanager/14)
 1. These are few examples of ***not managers***:
  1. [http://localhost:3000/api/employees/bymanager/4](http://localhost:3000/api/employees/bymanager/4)
  1. [http://localhost:3000/api/employees/bymanager/5](http://localhost:3000/api/employees/bymanager/5)
  1. [http://localhost:3000/api/employees/bymanager/6](http://localhost:3000/api/employees/bymanager/6)
  1. [http://localhost:3000/api/employees/bymanager/7](http://localhost:3000/api/employees/bymanager/7)
  1. [http://localhost:3000/api/employees/bymanager/9](http://localhost:3000/api/employees/bymanager/9)



### Client wants a screen to find list of employees reporting directly to a given manager and through supervisors reporting to him

## DATASET
```json
{ id: 1, name: 'Mohan', department: 'IT', isSupervisor: false, isManager: true, supervisorId: null, managerId: null }
{ id: 3, name: 'Amit', department: 'IT', isSupervisor: false, isManager: true, supervisorId: null, managerId: null }
{ id: 8, name: 'Latha', department: 'IT', isSupervisor: false, isManager: true, supervisorId: null, managerId: null }
{ id: 6, name: 'Ajit', department: 'IT', isSupervisor: true, isManager: false, supervisorId: null, managerId: 3 }
{ id: 12, name: 'Tarang', department: 'IT', isSupervisor: true, isManager: false, supervisorId: null, managerId: 1 }
{ id: 4, name: 'Sumit', department: 'IT', isSupervisor: false, isManager: false, supervisorId: 6, managerId: null }
{ id: 7, name: 'Roy', department: 'IT', isSupervisor: false, isManager: false, supervisorId: 6, managerId: null }
{ id: 10, name: 'Kiran', department: 'IT', isSupervisor: false, isManager: false, supervisorId: null, managerId: 1 }
{ id: 13, name: 'Zia', department: 'IT', isSupervisor: false, isManager: false, supervisorId: 12, managerId: null }
{ id: 16, name: 'Bindu', department: 'IT', isSupervisor: false, isManager: false, supervisorId: 6, managerId: null }
{ id: 2, name: 'Rohan', department: 'Operations', isSupervisor: false, isManager: true, supervisorId: null, managerId: null }
{ id: 5, name: 'Ajay', department: 'Operations', isSupervisor: true, isManager: false, supervisorId: null, managerId: 2 }
{ id: 9, name: 'Prerna', department: 'Operations', isSupervisor: false, isManager: false, supervisorId: 5, managerId: null }
{ id: 17, name: 'Roy', department: 'Operations', isSupervisor: false, isManager: false, supervisorId: 5, managerId: null }
{ id: 11, name: 'Vimal', department: 'HRD', isSupervisor: true, isManager: false, supervisorId: null, managerId: null }
{ id: 18, name: 'Kiran', department: 'HRD', isSupervisor: false, isManager: false, supervisorId: 11, managerId: null }
{ id: 14, name: 'Abdul', department: 'Finance', isSupervisor: false, isManager: true, supervisorId: null, managerId: null }
{ id: 15, name: 'Nisar', department: 'Finance', isSupervisor: true, isManager: false, supervisorId: null, managerId: 14 }
{ id: 16, name: 'Zia', department: 'Finance', isSupervisor: false, isManager: false, supervisorId: 15, managerId: null }
```
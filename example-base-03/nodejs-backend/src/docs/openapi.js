const openApiSpecification = {
  openapi: '3.0.3',
  info: {
    title: 'Sample Employee & Student API',
    version: '1.0.0',
    description:
      'Demo Express backend exposing employee and student resources. The documentation is generated manually and served via Swagger UI and Redoc.',
    contact: {
      name: 'API Support',
      email: 'support@example.com'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local development server'
    }
  ],
  tags: [
    {
      name: 'Employees',
      description: 'Operations related to managing employees'
    },
    {
      name: 'Students',
      description: 'Operations related to managing students'
    }
  ],
  components: {
    schemas: {
      Employee: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1
          },
          name: {
            type: 'string',
            example: 'John Doe'
          },
          position: {
            type: 'string',
            example: 'Developer'
          }
        },
        required: ['id', 'name', 'position']
      },
      EmployeeInput: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'Jane Smith'
          },
          position: {
            type: 'string',
            example: 'Designer'
          }
        },
        required: ['name', 'position']
      },
      Student: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1
          },
          name: {
            type: 'string',
            example: 'John Doe'
          },
          age: {
            type: 'integer',
            example: 18
          }
        },
        required: ['id', 'name', 'age']
      },
      StudentInput: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'Jane Doe'
          },
          age: {
            type: 'integer',
            example: 19
          }
        },
        required: ['name', 'age']
      },
      NotFoundError: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Resource not found'
          }
        }
      }
    }
  },
  paths: {
    '/api/employees': {
      get: {
        tags: ['Employees'],
        summary: 'List employees',
        description: 'Returns all employees currently stored in memory.',
        responses: {
          200: {
            description: 'List of employees',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Employee'
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Employees'],
        summary: 'Create employee',
        description: 'Creates a new employee with the provided information.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/EmployeeInput'
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Employee created',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Employee'
                }
              }
            }
          }
        }
      }
    },
    '/api/employees/{id}': {
      get: {
        tags: ['Employees'],
        summary: 'Get employee by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer'
            },
            description: 'ID of the employee'
          }
        ],
        responses: {
          200: {
            description: 'Employee found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Employee'
                }
              }
            }
          },
          404: {
            description: 'Employee not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFoundError'
                }
              }
            }
          }
        }
      },
      put: {
        tags: ['Employees'],
        summary: 'Update employee',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer'
            },
            description: 'ID of the employee'
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/EmployeeInput'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Employee updated',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Employee'
                }
              }
            }
          },
          404: {
            description: 'Employee not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFoundError'
                }
              }
            }
          }
        }
      },
      delete: {
        tags: ['Employees'],
        summary: 'Delete employee',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer'
            },
            description: 'ID of the employee'
          }
        ],
        responses: {
          200: {
            description: 'Employee deleted',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Employee'
                }
              }
            }
          },
          404: {
            description: 'Employee not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFoundError'
                }
              }
            }
          }
        }
      }
    },
    '/students': {
      get: {
        tags: ['Students'],
        summary: 'List students',
        description: 'Returns all students currently stored in memory.',
        responses: {
          200: {
            description: 'List of students',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Student'
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Students'],
        summary: 'Create student',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/StudentInput'
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Student created',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Student'
                }
              }
            }
          }
        }
      }
    },
    '/students/{id}': {
      get: {
        tags: ['Students'],
        summary: 'Get student by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer'
            },
            description: 'ID of the student'
          }
        ],
        responses: {
          200: {
            description: 'Student found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Student'
                }
              }
            }
          },
          404: {
            description: 'Student not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFoundError'
                }
              }
            }
          }
        }
      },
      put: {
        tags: ['Students'],
        summary: 'Update student',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer'
            },
            description: 'ID of the student'
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/StudentInput'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Student updated',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Student'
                }
              }
            }
          },
          404: {
            description: 'Student not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFoundError'
                }
              }
            }
          }
        }
      },
      delete: {
        tags: ['Students'],
        summary: 'Delete student',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer'
            },
            description: 'ID of the student'
          }
        ],
        responses: {
          200: {
            description: 'Student deleted',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Student'
                }
              }
            }
          },
          404: {
            description: 'Student not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFoundError'
                }
              }
            }
          }
        }
      }
    }
  }
};

export default openApiSpecification;


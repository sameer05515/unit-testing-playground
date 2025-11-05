const { validate, sanitizePath } = require('../../src/middleware/validation');
const { validationResult } = require('express-validator');

describe('Validation Middleware', () => {
  describe('validate', () => {
    test('should pass validation with no errors', () => {
      const req = {
        // Mock validationResult to return no errors
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      // Mock validationResult
      jest.spyOn(require('express-validator'), 'validationResult').mockReturnValue({
        isEmpty: () => true,
        array: () => [],
      });

      validate(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    test('should return 400 with validation errors', () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      // Mock validationResult with errors
      jest.spyOn(require('express-validator'), 'validationResult').mockReturnValue({
        isEmpty: () => false,
        array: () => [{ msg: 'Validation error' }],
      });

      validate(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('sanitizePath', () => {
    test('should allow valid paths within base directory', () => {
      const baseDir = '/base/path';
      const userInput = 'subdir/file';
      
      // Mock path.resolve
      const path = require('path');
      const originalResolve = path.resolve;
      path.resolve = jest.fn((base, input) => {
        if (base === baseDir && input === userInput) {
          return '/base/path/subdir/file';
        }
        return originalResolve(base, input);
      });

      const result = sanitizePath(baseDir, userInput);
      expect(result).toBeDefined();
      
      path.resolve = originalResolve;
    });

    test('should throw error for directory traversal attempts', () => {
      const baseDir = '/base/path';
      const userInput = '../../etc/passwd';
      
      const path = require('path');
      const originalResolve = path.resolve;
      path.resolve = jest.fn(() => '/etc/passwd'); // Outside base directory

      expect(() => sanitizePath(baseDir, userInput)).toThrow();
      
      path.resolve = originalResolve;
    });
  });
});


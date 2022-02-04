"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const cors_1 = (0, tslib_1.__importDefault)(require("cors"));
const body_parser_1 = require("body-parser");
const auth_1 = (0, tslib_1.__importStar)(require("./auth"));
exports.app = (0, express_1.default)();
// Middlewares
exports.app.use((0, cors_1.default)());
exports.app.use('/static', express_1.default.static(path_1.default.join(__dirname, '../public')));
exports.app.use((0, body_parser_1.urlencoded)({ extended: false }));
exports.app.use(auth_1.default);
// Auth Routes
exports.app.post('/api/login', (0, body_parser_1.json)(), auth_1.login);
exports.app.get('/api/user/current', auth_1.currentUser);
exports.default = exports.app;
//# sourceMappingURL=server.js.map
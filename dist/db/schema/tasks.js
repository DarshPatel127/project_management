"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasks = exports.statusEnum = void 0;
const users_1 = require("./users");
const projects_1 = require("./projects");
const t = __importStar(require("drizzle-orm/pg-core"));
exports.statusEnum = t.pgEnum("task_status", ["completed", "not_completed"]);
exports.tasks = t.pgTable("tasks", {
    id: t.serial("id").primaryKey(),
    title: t.varchar("title", { length: 255 }).notNull(),
    description: t.text("description").notNull(),
    project: t.integer("project_id").notNull().references(() => projects_1.projects.id, { onDelete: "cascade" }),
    status: (0, exports.statusEnum)().notNull().default("not_completed"),
    assigned_to: t.integer("assigned_to").notNull().references(() => users_1.users.id, { onDelete: "cascade" }),
});

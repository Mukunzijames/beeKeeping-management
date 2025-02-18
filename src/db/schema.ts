import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  decimal,
  varchar,
} from "drizzle-orm/pg-core";

export const hives = pgTable("hives", {
  id: serial("id").primaryKey(),
  location: text("location").notNull(),
  type: varchar("type", { length: 100 }).notNull(),
  condition: text("condition"),
  colonyStrength: integer("colony_strength"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const hivesRelations = relations(hives, ({ many }) => ({
  healthRecords: many(colonyHealth),
  honeyProduction: many(honeyProduction),
  feeding: many(feeding),
  tasks: many(tasks),
}));

export const colonyHealth = pgTable("colony_health", {
  id: serial("id").primaryKey(),
  hiveId: integer("hive_id").references(() => hives.id),
  queenPresent: boolean("queen_present").notNull(),
  broodPattern: integer("brood_pattern"), // Scale 1-10
  pestPresence: boolean("pest_presence"),
  diseaseSymptoms: text("disease_symptoms"),
  notes: text("notes"),
  checkDate: timestamp("check_date").defaultNow(),
});

export const honeyProduction = pgTable("honey_production", {
  id: serial("id").primaryKey(),
  hiveId: integer("hive_id").references(() => hives.id),
  harvestDate: timestamp("harvest_date").notNull(),
  quantity: decimal("quantity").notNull(),
  quality: varchar("quality", { length: 50 }),
  batchNumber: varchar("batch_number", { length: 100 }).unique(),
});

export const equipment = pgTable("equipment", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  purchaseDate: timestamp("purchase_date"),
  lastMaintenance: timestamp("last_maintenance"),
  notes: text("notes"),
});

export const feeding = pgTable("feeding", {
  id: serial("id").primaryKey(),
  hiveId: integer("hive_id").references(() => hives.id),
  feedType: varchar("feed_type", { length: 100 }).notNull(),
  quantity: decimal("quantity").notNull(),
  feedingDate: timestamp("feeding_date").defaultNow(),
  notes: text("notes"),
});

export const pestDiseaseManagement = pgTable("pest_disease_management", {
  id: serial("id").primaryKey(),
  hiveId: integer("hive_id").references(() => hives.id),
  type: varchar("type", { length: 100 }).notNull(), // pest or disease
  name: varchar("name", { length: 100 }).notNull(),
  treatmentApplied: text("treatment_applied"),
  treatmentDate: timestamp("treatment_date").defaultNow(),
  outcome: text("outcome"),
  followUpDate: timestamp("follow_up_date"),
});

export const inventory = pgTable("inventory", {
  id: serial("id").primaryKey(),
  productName: varchar("product_name", { length: 100 }).notNull(),
  quantity: decimal("quantity").notNull(),
  unit: varchar("unit", { length: 20 }).notNull(),
  price: decimal("price"),
  batchNumber: varchar("batch_number", { length: 100 }),
});

export const sales = pgTable("sales", {
  id: serial("id").primaryKey(),
  quantity: decimal("quantity").notNull(),
  unitPrice: decimal("unit_price").notNull(),
  totalAmount: decimal("total_amount").notNull(),
  saleDate: timestamp("sale_date").defaultNow(),
  customerInfo: text("customer_info"),
});

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  hiveId: integer("hive_id").references(() => hives.id),
  taskType: varchar("task_type", { length: 100 }).notNull(),
  description: text("description").notNull(),
  assignedTo: varchar("assigned_to", { length: 100 }),
  dueDate: timestamp("due_date"),
  status: varchar("status", { length: 50 }).notNull(),
  completedAt: timestamp("completed_at"),
  notes: text("notes"),
});

export const colonyHealthRelations = relations(colonyHealth, ({ one }) => ({
  hive: one(hives, {
    fields: [colonyHealth.hiveId],
    references: [hives.id],
  }),
}));

export const honeyProductionRelations = relations(honeyProduction, ({ one }) => ({
  hive: one(hives, {
    fields: [honeyProduction.hiveId],
    references: [hives.id],
  }),
}));

export const feedingRelations = relations(feeding, ({ one }) => ({
  hive: one(hives, {
    fields: [feeding.hiveId],
    references: [hives.id],
  }),
}));

export const pestDiseaseManagementRelations = relations(pestDiseaseManagement, ({ one }) => ({
  hive: one(hives, {
    fields: [pestDiseaseManagement.hiveId],
    references: [hives.id],
  }),
}));



export const tasksRelations = relations(tasks, ({ one }) => ({
  hive: one(hives, {
    fields: [tasks.hiveId],
    references: [hives.id],
  }),
}));

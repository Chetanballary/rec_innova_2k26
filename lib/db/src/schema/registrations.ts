import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const registrationsTable = pgTable("registrations", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  collegeDepartment: text("college_department").notNull(),
  event: text("event").notNull(),
  participationType: text("participation_type").notNull(),
  teamName: text("team_name"),
  teamSize: integer("team_size"),
  registeredAt: timestamp("registered_at").defaultNow().notNull(),
});

export const insertRegistrationSchema = createInsertSchema(registrationsTable)
  .omit({ id: true, registeredAt: true })
  .extend({
    event: z.enum(["singing", "dance", "mehandi", "hair_and_makeover", "rangoli", "cooking_without_fire", "nail_art", "reels", "debate"]),
    participationType: z.enum(["individual", "team"]),
  });

export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;
export type Registration = typeof registrationsTable.$inferSelect;

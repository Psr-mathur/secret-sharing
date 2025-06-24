import { z } from "zod";
import ShortUniqueId from "short-unique-id";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const secretRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const data = ctx.db.secret.findMany({
      where: { createdById: ctx.session.user.id },
    });
    return data ?? null;
  }),

  getBySecretKey: protectedProcedure
    .input(z.object({ key: z.string() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.secret.findUnique({
        where: { key: input.key },
        include: {
          createdBy: true,
        }
      });
      if (data?.createdById !== ctx.session.user.id) {
        return null
      }
      return data ?? null;
    }),

  create: protectedProcedure
    .input(z.object({ content: z.string(), expiresIn: z.string().optional(), password: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      const { randomUUID } = new ShortUniqueId({ length: input.password ? 8 : 6 });
      return ctx.db.secret.create({
        data: {
          key: randomUUID(),
          content: input.content,
          expiresIn: input.expiresIn,
          password: input.password,
          createdById: ctx.session.user.id
        },
      });
    }),
});

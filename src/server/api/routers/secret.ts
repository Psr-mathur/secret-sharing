import { z } from "zod";

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
    .input(z.object({ content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.secret.create({
        data: {
          key: 'ddd',
          content: input.content,
          createdById: ctx.session.user.id
        },
      });
    }),
});

import { z } from "zod";
import ShortUniqueId from "short-unique-id";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { TRPCError } from '@trpc/server';

export const secretRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const data = ctx.db.secret.findMany({
      where: { createdById: ctx.session.user.id },
      orderBy: { updatedAt: "desc" },
    });
    return data ?? null;
  }),

  getCounts: protectedProcedure
    .query(async ({ ctx }) => {
      const total = await ctx.db.secret.count({
        where: { createdById: ctx.session.user.id },
      });
      const active = await ctx.db.secret.count({
        where: {
          createdById: ctx.session.user.id,
          AND: {
            expiresAt: {
              gt: new Date()
            },
            views: {
              lte: 0
            }
          }
        },
      });
      const expired = await ctx.db.secret.count({
        where: {
          createdById: ctx.session.user.id,
          AND: {
            expiresAt: {
              lt: new Date(),
            },
            views: {
              lte: 0
            }
          }
        },
      });
      const viewed = await ctx.db.secret.count({
        where: {
          createdById: ctx.session.user.id,
          AND: {
            views: {
              gt: 0
            }
          }
        },
      });
      return { total, active, expired, viewed };
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
    .input(z.object({ content: z.string(), expiresAt: z.date().optional(), password: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      const { randomUUID } = new ShortUniqueId({ length: input.password ? 8 : 6 });
      return ctx.db.secret.create({
        data: {
          key: randomUUID(),
          content: input.content,
          expiresAt: input.expiresAt ? new Date(input.expiresAt) : null,
          password: input.password,
          createdById: ctx.session.user.id
        },
      });
    }),

  update: protectedProcedure
    .input(z.object({ key: z.string(), content: z.string(), expiresAt: z.date().optional(), password: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      // if not expired
      const data = await ctx.db.secret.findUnique({
        where: {
          key: input.key,
          AND: {
            expiresAt: {
              gt: new Date()
            },
            views: {
              lt: 1
            }
          }
        },
      });
      if (!data) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Secret has been expired or viewed already',
        });
      }
      // if not viewed
      return ctx.db.secret.update({
        where: { key: input.key },
        data: {
          content: input.content,
          expiresAt: input.expiresAt ?? null,
          password: input.password,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.secret.delete({
        where: { key: input.key },
      });
    }),
});

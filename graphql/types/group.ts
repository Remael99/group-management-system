import {
  Contribution as ContributionType,
  Disbursement as DisbursementType,
} from "@prisma/client";
import { enumType, extendType, intArg, objectType } from "nexus";
import { Contribution } from "./contribution";
import { Disbursement } from "./disbursement";
import { User } from "./User";

export const Group = objectType({
  name: "Group",
  definition(t) {
    t.int("id");
    t.string("group_id");
    t.string("group_name");
    t.int("group_account_no");
    t.string("group_mpesa_paybill");
    t.string("group_mpesa_account");
    t.string("group_total_balance");
    t.list.field("users", {
      type: User,
      //@ts-ignore
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.group
          .findUnique({
            where: {
              //@ts-ignore
              id: _parent.id,
            },
          })
          .users();
      },
    });

    t.list.field("contribution", {
      type: Contribution,
      //@ts-ignore
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.group
          .findUnique({
            where: {
              //@ts-ignore
              id: _parent.id,
            },
          })
          .contributions();
      },
    });
    t.int("total_contributions");
    t.int("total_disbursements");
    t.int("total_users");
    t.list.field("disbursement", {
      type: Disbursement,
      //@ts-ignore
      async resolve(_parent, _args, ctx) {
        console.log(ctx);
        return await ctx.prisma.group
          .findUnique({
            where: {
              //@ts-ignore
              id: _parent.id,
            },
          })
          .disbursements();
      },
    });
    t.string("createdAt");
    t.string("updatedAt");
  },
});

export const groupInformation = extendType({
  type: "Query",
  definition: (t) => {
    t.field("groupInformation", {
      type: "Group",
      //@ts-ignore
      async resolve(_parent, args, ctx) {
        const group_contributions = await ctx.prisma.group
          .findUnique({
            where: {
              //@ts-ignore
              id: 1,
            },
          })
          .contributions();

        const total_contributions: number = group_contributions.reduce(
          (previousValue, currentValue) => {
            return previousValue + currentValue.amount;
          },
          0
        );

        const group_disbursements: DisbursementType[] = await ctx.prisma.group
          .findUnique({
            where: {
              //@ts-ignore
              id: 1,
            },
          })
          .disbursements();

        const total_disbursements: number = group_disbursements.reduce(
          (previousValue, currentValue) => {
            return previousValue + currentValue.amount;
          },
          0
        );

        const group = await ctx.prisma.group.findUnique({
          where: {
            //@ts-ignore
            id: 1,
          },
        });

        const users = await ctx.prisma.group
          .findUnique({
            where: {
              //@ts-ignore
              id: 1,
            },
          })
          .users();

        const total_users = users.length;
        return {
          ...group,
          total_contributions,
          total_disbursements,
          total_users,
        };
      },
    });
  },
});

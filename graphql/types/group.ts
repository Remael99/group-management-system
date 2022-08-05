import {
  Contribution as ContributionType,
  Disbursement as DisbursementType,
  Group as GroupType,
  User as UserType,
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
    t.string("contribution_as_at");
    t.string("disbursement_as_at");
    t.string("user_as_at");
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
    t.int("total_contribution");
    t.int("total_disbursement");
    t.int("contribution_percentage_increase");
    t.int("disbursement_percentage_increase");
    t.int("total_user");
    t.list.field("disbursement", {
      type: Disbursement,
      //@ts-ignore
      async resolve(_parent, _args, ctx) {
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

        const group: GroupType | null = await ctx.prisma.group.findUnique({
          where: {
            //@ts-ignore
            id: 1,
          },
        });

        const add_contribution_disbursement_to_group =
          await ctx.prisma.group.update({
            where: {
              id: 1,
            },
            data: {
              //@ts-ignore
              total_contribution: total_contributions,
              total_disbursement: total_disbursements,
            },
          });

        const last_contribution_createdat =
          await ctx.prisma.contribution.findMany();
        const last_disbursement_createdat =
          await ctx.prisma.disbursement.findMany();

        const contribution_as_at =
          last_contribution_createdat[last_contribution_createdat.length - 1]
            .createdAt;

        const disbursement_as_at =
          last_disbursement_createdat[last_disbursement_createdat.length - 1]
            .createdAt;

        function calculate_percentage_increase(
          current_balance: number,
          previous_balance: number
        ) {
          const percentage_increase =
            (previous_balance / current_balance) * 100;

          return Math.floor(percentage_increase);
        }

        const contribution_percentage_increase = calculate_percentage_increase(
          add_contribution_disbursement_to_group.total_contribution,
          last_contribution_createdat[last_contribution_createdat.length - 1]
            .amount
        );

        const disbursement_percentage_increase = calculate_percentage_increase(
          add_contribution_disbursement_to_group.total_disbursement,
          last_disbursement_createdat[last_disbursement_createdat.length - 1]
            .amount
        );

        const users: UserType[] = await ctx.prisma.group
          .findUnique({
            where: {
              //@ts-ignore
              id: 1,
            },
          })
          .users();

        const total_users = users.length;

        //save

        await ctx.prisma.group.update({
          where: {
            id: 1,
          },
          data: {
            total_user: total_users,
            //@ts-ignore
            start_contribution_amount:
              add_contribution_disbursement_to_group.total_contribution,
            start_disbursement_amount:
              add_contribution_disbursement_to_group.total_disbursement,
          },
        });

        return {
          ...group,
          contribution_percentage_increase,
          disbursement_percentage_increase,
          contribution_as_at,
          disbursement_as_at,
        };
      },
    });
  },
});

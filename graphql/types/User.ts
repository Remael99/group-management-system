import { enumType, extendType, intArg, objectType } from "nexus";
import { Contribution } from "./contribution";
import { Disbursement } from "./disbursement";
import { Message } from "./message";

export const User = objectType({
  name: "User",
  definition(t) {
    t.int("id");
    t.string("user_id");
    t.string("username");
    t.string("email");
    t.string("password");
    t.string("createdAt");
    t.string("updatedAt");
    t.string("role_id");
    t.string("profile_id");
    t.string("group_id");
    t.field("title", { type: Title });

    t.list.field("contribution", {
      type: Contribution,
      //@ts-ignore
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              //@ts-ignore
              id: _parent.id,
            },
          })
          .contributions();
      },
    });
    t.list.field("disbursement", {
      type: Disbursement,
      //@ts-ignore
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              //@ts-ignore
              id: _parent.id,
            },
          })
          .disbursements();
      },
    });
    t.list.field("messages", {
      type: Message,
      //@ts-ignore
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              //@ts-ignore
              id: _parent.id,
            },
          })
          .messages();
      },
    });
  },
});

const Title = enumType({
  name: "Title",
  members: ["CHAIRPERSON", "SECRETARY", "TREASURER", "MEMBER"],
});

export const findAllUsers = extendType({
  type: "Query",
  definition: (t) => {
    t.field("findAllUsers", {
      type: "User",
      //@ts-ignore
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.user.findMany();
      },
    });
  },
});

export const findUserById = extendType({
  type: "Query",
  definition: (t) => {
    t.field("findUserById", {
      type: "User",
      args: { id: intArg() },
      //@ts-ignore
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.user.findUnique({
          where: {
            //@ts-ignore
            id: args.id,
          },
        });
      },
    });
  },
});

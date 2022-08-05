import { profile } from "console";
import * as argon2 from "argon2";
import {
  enumType,
  extendType,
  inputObjectType,
  intArg,
  objectType,
  stringArg,
} from "nexus";
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

export const profileInput = inputObjectType({
  name: "profileInput",

  definition(t) {
    t.nonNull.string("first_name");

    t.nonNull.string("second_name");
    t.nonNull.string("phone_number");
    t.nonNull.string("id_number");
  },
});

export const createUser = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("createUser", {
      type: "User",
      args: {
        role_id: intArg(),

        email: stringArg(),
        title: stringArg(),
        password: stringArg(),
        username: stringArg(),
        profileInput: profileInput,
      },
      //@ts-ignore
      async resolve(
        _parent,
        { email, title, username, password, profileInput, role_id },
        ctx
      ) {
        const checkUserExists = await ctx.prisma.user.findUnique({
          //@ts-ignore
          where: { email },
        });

        if (checkUserExists) {
          throw new Error("user already exists");
        }

        password = await argon2.hash(password);

        const newUser = await ctx.prisma.user.create({
          //@ts-ignore
          data: {
            email,
            title,
            username,
            password,

            profile: {
              create: {
                first_name: profileInput.first_name,
                second_name: profileInput.second_name,
                id_number: profileInput.id_number,
                phone_number: profileInput.phone_number,
              },
            },
            group: {
              connect: {
                id: 1,
              },
            },
            role: {
              connect: {
                id: role_id,
              },
            },
          },
        });

        return newUser;
      },
    });
  },
});

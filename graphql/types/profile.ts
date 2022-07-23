import { enumType, extendType, intArg, objectType } from "nexus";
import { User } from "./User";

export const Profile = objectType({
  name: "Profile",
  definition(t) {
    t.int("id");
    t.string("profile_id");
    t.string("first_name");
    t.string("second_name");
    t.string("phone_number");
    t.string("id_number");
    t.field("user", {
      type: User,
      //@ts-ignore
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.profile
          .findUnique({
            where: {
              //@ts-ignore
              id: _parent.id,
            },
          })
          .user();
      },
    });

    t.string("createdAt");
    t.string("updatedAt");
  },
});

export const findProfileByUserId = extendType({
  type: "Query",
  definition: (t) => {
    t.field("findProfileByUserId", {
      type: "Profile",
      args: { user_id: intArg() },
      //@ts-ignore
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.profile.findUnique({
          where: {
            //@ts-ignore
            user_id: args.user_id,
          },
        });
      },
    });
  },
});

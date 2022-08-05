import { extendType, nonNull, stringArg } from "nexus";
import * as argon2 from "argon2";

type LoginArgs = {
  email: string;
  password: string;
};

export const login = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("login", {
      type: "User",
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      //@ts-ignore
      async resolve(_parent, args, ctx) {
        const { email, password }: LoginArgs = args;

        const findUser = await ctx.prisma.user.findUnique({
          where: { email },
        });

        if (!findUser) {
          throw new Error("user not found please contact owner");
        }

        const valid = await argon2.verify(findUser.password, password);

        if (!valid) {
          throw new Error("incorrect password or email please try again");
        }

        return await ctx.prisma.user.findUnique({
          where: { email },
        });
      },
    });
  },
});

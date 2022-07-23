import { enumType, objectType } from "nexus";
import { Role } from "./role";

export const Permission = objectType({
  name: "Contribution",
  definition(t) {
    t.int("id");
    t.string("type");
    t.string("description");
    t.list.field("permissions", {
      type: Role,
      //@ts-ignore
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.permission
          .findUnique({
            where: {
              //@ts-ignore
              id: _parent.id,
            },
          })
          .roles();
      },
    });

    t.string("createdAt");
    t.string("updatedAt");
  },
});

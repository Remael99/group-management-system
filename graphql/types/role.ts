import { enumType, objectType } from "nexus";
import { Permission } from "./permission";
import { User } from "./User";

export const Role = objectType({
  name: "Role",
  definition(t) {
    t.int("id");
    t.field("Type", { type: RoleType });
    t.string("description");
    t.list.field("users", {
      type: User,
      //@ts-ignore
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.role
          .findUnique({
            where: {
              //@ts-ignore
              id: _parent.id,
            },
          })
          .users();
      },
    });
    t.list.field("permissions", {
      type: Permission,
      //@ts-ignore
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.role
          .findUnique({
            where: {
              //@ts-ignore
              id: _parent.id,
            },
          })
          .permissions();
      },
    });

    t.string("createdAt");
    t.string("updatedAt");
  },
});

const RoleType = enumType({
  name: "Type",
  members: ["SUPER_ADMIN", "ADMIN", "USER"],
});

// enum RoleType {
//   SUPER_ADMIN
//   ADMIN
//   USER
// }

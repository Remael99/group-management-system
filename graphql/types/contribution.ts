import { enumType, objectType } from "nexus";

export const Contribution = objectType({
  name: "Contribution",
  definition(t) {
    t.int("id");
    t.string("contribuiton_id");
    t.string("amount");
    t.int("user_id");
    t.string("group_id");
    t.string("createdAt");
    t.string("updatedAt");
  },
});

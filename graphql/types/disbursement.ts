import { enumType, objectType } from "nexus";

export const Disbursement = objectType({
  name: "Disbursement",
  definition(t) {
    t.int("id");
    t.string("disbursement_id");
    t.string("amount");
    t.int("user_id");
    t.string("group_id");
    t.string("createdAt");
    t.string("updatedAt");
  },
});

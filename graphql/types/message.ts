import { enumType, objectType } from "nexus";
import { Role } from "./role";

export const Message = objectType({
  name: "Message",
  definition(t) {
    t.int("id");
    t.string("message_id");
    t.string("user_id");
    t.string("message");
    t.string("created_by");

    t.string("createdAt");
    t.string("updatedAt");
  },
});
